import { isEmptyElement } from '../attributes/common.js';
import { DomElementNode, CommentNode, parseTextChild, TextContent, LiveTextContent, DomFragmentNode, DomStructuralDirectiveNode, ElementAttribute, Attribute, LiveAttribute, DomParentNode, DomAttributeDirectiveNode, DomStructuralDirectiveSuccessorNode, LocalTemplateVariables, } from '../ast/dom.js';
import { directiveRegistry } from '../directives/register-directive.js';
export class EscapeHTMLCharacter {
    static ESCAPE_MAP = {
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&#x27;': "'",
        '&#x60;': '`'
    };
    test;
    replace;
    constructor() {
        const escapeRegexSource = '(?:' + Object.keys(EscapeHTMLCharacter.ESCAPE_MAP).join('|') + ')';
        this.test = new RegExp(escapeRegexSource);
        this.replace = new RegExp(escapeRegexSource, 'g');
    }
    escaper(match) {
        return EscapeHTMLCharacter.ESCAPE_MAP[match];
    }
    unescape(text) {
        if (!text) {
            return text;
        }
        return this.test.test(text) ? text.replace(this.replace, this.escaper) : text;
    }
}
export class NodeParserHelper {
    checkNode(node) {
        if (node instanceof DomStructuralDirectiveNode) {
            return node;
        }
        const attributes = node.attributes;
        if (attributes) {
            let temp;
            temp = attributes.find(attr => attr.name === 'is');
            if (temp) {
                attributes.splice(attributes.indexOf(temp), 1);
                node.is = temp.value;
            }
            temp = attributes.filter(attr => {
                return typeof attr.value === 'string' && (/\{\{(.+)\}\}/g).test(attr.value);
            });
            if (temp?.length) {
                temp.forEach(templateAttrs => {
                    attributes.splice(attributes.indexOf(templateAttrs), 1);
                    node.addTemplateAttr(templateAttrs.name, templateAttrs.value);
                });
            }
            temp = attributes.filter(attr => attr.name.startsWith('on'));
            if (temp?.length) {
                temp.forEach(templateAttrs => {
                    attributes.splice(attributes.indexOf(templateAttrs), 1);
                    node.addOutput(templateAttrs.name.substring(2), templateAttrs.value);
                });
            }
        }
        const directiveNames = this.extractDirectiveNames(node);
        let sdName;
        if (directiveNames.length) {
            const directives = [];
            directiveNames.forEach(attributeName => {
                if (attributeName.startsWith('*')) {
                    if (sdName) {
                        console.error(`Only one Structural Directive is allowed on an element [${sdName}, ${attributeName}]`);
                        return;
                    }
                    sdName = attributeName;
                    return;
                }
                const directive = new DomAttributeDirectiveNode(attributeName);
                if (directiveRegistry.get(attributeName).hasAttributes()) {
                    this.extractDirectiveAttributesFromNode(attributeName, directive, node);
                }
                directives.push(directive);
            });
            if (directives.length) {
                node.attributeDirectives = directives;
            }
        }
        if (sdName) {
            // <div *for [forOf]="array" let-item [trackBy]="method" let-i="index" > {{item}} </div>
            // <div *for="let item of array; let i = index; trackBy=method;" > {{item}} </div>
            // <template #refName *if="isActive; else disabled" > ... </template>
            // <template #disabled > ... </template>
            const temp = node.attributes.find(attr => attr.name == sdName);
            node.attributes.splice(node.attributes.indexOf(temp), 1);
            const isTemplate = node.tagName === 'template';
            const directiveNode = isTemplate ? new DomFragmentNode(node.children) : node;
            const directive = new DomStructuralDirectiveNode(temp.name, directiveNode, (typeof temp?.value === 'boolean') ? undefined : String(temp.value));
            const directiveName = temp.name.substring(1);
            if (isTemplate) {
                directive.inputs = node.inputs;
                directive.outputs = node.outputs;
                directive.attributes = node.attributes;
                directive.templateAttrs = node.templateAttrs;
                directive.attributeDirectives = node.attributeDirectives;
            }
            else if (directiveRegistry.hasAttributes(directiveName)) {
                this.extractDirectiveAttributesFromNode(directiveName, directive, node);
                directive.attributeDirectives = node.attributeDirectives;
            }
            if (isTemplate && node.templateRefName) {
                node.children = [directive];
                return node;
            }
            return directive;
        }
        // <for let-user [of]="users"></for>
        // @for (item of items; track item.id) {
        // 	{ { item.name } }
        // }
        if (directiveRegistry.has('*' + node.tagName)) {
            const children = new DomFragmentNode(node.children);
            const directive = new DomStructuralDirectiveNode('*' + node.tagName, children);
            directive.inputs = node.inputs;
            directive.outputs = node.outputs;
            directive.attributes = node.attributes;
            directive.templateAttrs = node.templateAttrs;
            directive.attributeDirectives = node.attributeDirectives;
            return directive;
        }
        return node;
    }
    extractDirectiveAttributesFromNode(directiveName, directive, node) {
        const attributes = directiveRegistry.getAttributes(directiveName);
        if (!attributes) {
            return;
        }
        const filterByAttrName = createFilterByAttrName(attributes);
        directive.attributes = node.attributes?.filter(filterByAttrName);
        directive.inputs = node.inputs?.filter(filterByAttrName);
        directive.outputs = node.outputs?.filter(filterByAttrName);
        directive.twoWayBinding = node.twoWayBinding?.filter(filterByAttrName);
        directive.templateAttrs = node.templateAttrs?.filter(filterByAttrName);
        node.inputs && directive.inputs?.forEach(createArrayCleaner(node.inputs));
        node.outputs && directive.outputs?.forEach(createArrayCleaner(node.outputs));
        node.twoWayBinding && directive.twoWayBinding?.forEach(createArrayCleaner(node.twoWayBinding));
        node.attributes && directive.attributes?.forEach(createArrayCleaner(node.attributes));
        node.templateAttrs && directive.templateAttrs?.forEach(createArrayCleaner(node.templateAttrs));
    }
    extractDirectiveNames(node) {
        const names = [];
        if (node.attributes?.length) {
            names.push(...this.getAttributeDirectives(node.attributes).filter(name => name.startsWith('*')));
        }
        if (node.inputs?.length) {
            names.push(...this.getAttributeDirectives(node.inputs));
        }
        if (node.twoWayBinding?.length) {
            names.push(...this.getAttributeDirectives(node.twoWayBinding));
        }
        if (node.templateAttrs?.length) {
            names.push(...this.getAttributeDirectives(node.templateAttrs));
        }
        if (node.outputs?.length) {
            names.push(...this.getAttributeDirectives(node.outputs));
        }
        return [...new Set(names)];
    }
    getAttributeDirectives(attributes) {
        return directiveRegistry.filterDirectives(attributes.map(attr => attr.name.split('.')[0]));
    }
}
export class NodeParser extends NodeParserHelper {
    index;
    stateFn;
    tagNameRegExp = /[\-\.0-9_a-z\xB7\xC0-\xD6\xD8-\xF6\xF8-\u037D\u037F-\u1FFF\u200C\u200D\u203F\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]|[\uD800-\uDB7F][\uDC00-\uDFFF]/;
    childStack;
    stackTrace;
    get currentNode() {
        return this.stackTrace[this.stackTrace.length - 1];
    }
    commentOpenCount = 0;
    commentCloseCount = 0;
    tempText;
    propertyName;
    propertyValue;
    propType;
    escaper = new EscapeHTMLCharacter();
    skipCount = 0;
    flowScopeCount = 0;
    flowChainCount = 0;
    interpolationCount = 0;
    insideString;
    parse(html) {
        this.reset();
        for (; this.index < html.length; this.index++) {
            this.stateFn = this.stateFn(html[this.index]);
        }
        this.checkTextChild();
        this.popStructuralDirectiveNodes();
        if (this.stackTrace.length > 0) {
            console.error(this.stackTrace);
            throw new Error(`error parsing html, had ${this.stackTrace.length} element, [${this.stackTrace.map(dom => dom.tagName).join(', ')}], with no closing tag`);
        }
        let stack = this.childStack;
        this.reset();
        return stack;
    }
    reset() {
        this.index = 0;
        this.childStack = [];
        this.stackTrace = [];
        this.propType = 'attr';
        this.commentOpenCount = 0;
        this.commentCloseCount = 0;
        this.skipCount = 0;
        this.flowScopeCount = 0;
        this.flowChainCount = 0;
        this.interpolationCount = 0;
        this.stateFn = this.parseText;
        this.propertyName = this.propertyValue = this.tempText = '';
    }
    parseText(token) {
        if (token === '<' || token === '@') {
            if (token === '@' && this.tempText.at(-1) === '\\') {
                this.tempText = this.tempText.substring(0, this.tempText.length - 2) + token;
                return this.parseText;
            }
            else {
                this.checkTextChild();
                return token === '<' ? this.parseTag : this.parseControlFlow;
            }
        }
        else if (this.interpolationCount === 0 && this.flowScopeCount > 0 && token === '}') {
            this.checkTextChild();
            this.tempText = '';
            this.flowScopeCount--;
            const directive = this.getLastStructuralDirectiveNode();
            if (directive) {
                const lastDirective = chainSuccessor(directive);
                const names = lastDirective.successors?.map(successor => successor.name) ?? [];
                if (!directiveRegistry.hasAllSuccessors(lastDirective.name, names)) {
                    this.flowChainCount++;
                    return this.parsePossibleSuccessorsControlFlow;
                }
                do {
                    this.flowChainCount--;
                    this.popElement();
                } while (this.flowChainCount > 0);
            }
            return this.parseText;
        }
        else if (token === '{') {
            this.interpolationCount++;
        }
        else if (token === '}') {
            this.interpolationCount--;
        }
        this.tempText += token;
        return this.parseText;
    }
    parseTag(token) {
        if (token === '/') {
            return this.parseCloseTag;
        }
        if (token === '!') {
            this.commentOpenCount = 0;
            this.commentCloseCount = 0;
            return this.parseComment;
        }
        this.index--;
        return this.parseOpenTag;
    }
    parseComment(token) {
        if (token === '-') {
            if (this.commentOpenCount < 2) {
                this.commentOpenCount++;
            }
            else {
                this.commentCloseCount++;
            }
            return this.parseComment;
        }
        else if (token === '>' && this.commentCloseCount === 2) {
            this.tempText = this.escaper.unescape(this.tempText);
            this.stackTrace.push(new CommentNode(this.tempText.trim()));
            this.popElement();
            this.tempText = '';
            this.commentOpenCount = 0;
            this.commentCloseCount = 0;
            return this.parseText;
        }
        else if (token === '>' && this.commentCloseCount === 0) {
            const temp = this.tempText.toLowerCase();
            if ('doctype html' === temp) {
                this.tempText = '';
                return this.parseText;
            }
        }
        if (this.commentCloseCount > 0) {
            for (let i = 0; i < this.commentCloseCount; i++) {
                this.tempText += '-';
            }
            this.commentCloseCount = 0;
        }
        this.tempText += token;
        return this.parseComment;
    }
    parseCloseTag(token) {
        if (token === '>') {
            if (!isEmptyElement(this.currentNode.tagName)
                && this.currentNode.tagName.trim().toLowerCase() !== this.tempText.trim().toLowerCase()) {
                throw new Error(`Wrong closed tag at char ${this.index}, tag name: ${this.currentNode.tagName}`);
            }
            this.popElement();
            this.tempText = '';
            return this.parseText;
        }
        this.tempText += token;
        return this.parseCloseTag;
    }
    parseOpenTag(token) {
        if (token === '>') {
            this.stackTrace.push(new DomElementNode(this.tempText));
            if (isEmptyElement(this.tempText)) {
                this.popElement();
            }
            this.tempText = '';
            return this.parseText;
        }
        else if (this.tagNameRegExp.test(token)) {
            this.tempText += token;
            return this.parseOpenTag;
        }
        else if (/\s/.test(token)) {
            this.stackTrace.push(new DomElementNode(this.tempText));
            this.tempText = '';
            this.propType = 'attr';
            return this.parsePropertyName;
        }
        throw new SyntaxError('Error while parsing open tag');
    }
    parsePropertyName(token) {
        if (token === '>') {
            if (this.tempText.trim()) {
                this.propertyName = this.tempText;
                this.currentNode.addAttribute(this.propertyName, true);
                this.propertyName = this.propertyValue = this.tempText = '';
            }
            if (isEmptyElement(this.currentNode.tagName)) {
                this.popElement();
            }
            this.tempText = '';
            return this.parseText;
        }
        else if (token === '/') {
            return this.parsePropertyName;
        }
        else if (/\[/.test(token)) {
            this.propType = 'input';
            return this.parseInputOutput;
        }
        else if (/\(|@/.test(token)) {
            this.propType = 'output';
            return this.parseInputOutput;
        }
        else if (/#/.test(token)) {
            this.propType = 'ref-name';
            return this.parseRefName;
        }
        else if (/=/.test(token)) {
            this.propertyName = this.tempText;
            this.tempText = '';
            return this.parsePropertyName;
        }
        else if (/"/.test(token)) {
            return this.parsePropertyValue;
        }
        else if (/\d/.test(token)) {
            this.tempText += token;
            return this.parsePropertyValue;
        }
        else if (/\s/.test(token)) {
            if (this.tempText.trim()) {
                this.propertyName = this.tempText;
                this.currentNode.addAttribute(this.propertyName, true);
                this.propertyName, this.propertyValue = this.tempText = '';
            }
            return this.parsePropertyName;
        }
        this.tempText += token;
        return this.parsePropertyName;
    }
    parseRefName(token) {
        if (/=/.test(token)) {
            return this.parseRefName;
        }
        else if (/"/.test(token)) {
            this.propertyName = this.tempText;
            this.tempText = '';
            return this.parsePropertyValue;
        }
        else if (/\s/.test(token)) {
            this.currentNode.setTemplateRefName(this.tempText, '');
            this.propertyName = this.tempText = '';
            this.propType = 'attr';
            return this.parsePropertyName;
        }
        else if (/>/.test(token)) {
            this.currentNode.setTemplateRefName(this.tempText, '');
            this.propertyName = this.tempText = '';
            this.propType = 'attr';
            return this.parseText;
        }
        this.tempText += token;
        return this.parseRefName;
    }
    parseInputOutput(token) {
        if (/\(/.test(token)) {
            this.propType = 'two-way';
            return this.parseInputOutput;
        }
        else if (/\)|\]|=/.test(token)) {
            return this.parseInputOutput;
        }
        else if (/"/.test(token)) {
            this.propertyName = this.tempText;
            this.tempText = '';
            return this.parsePropertyValue;
        }
        this.tempText += token;
        return this.parseInputOutput;
    }
    parseControlFlow(token) {
        if (token === '(') {
            const flowName = '*' + this.tempText.trim();
            this.stackTrace.push(new DomStructuralDirectiveNode(flowName, new DomFragmentNode()));
            this.tempText = '';
            this.skipCount = 1;
            return this.parseControlFlowExpression;
        }
        else if (token === '{') {
            if (this.tempText.trim()) {
                const flowName = '*' + this.tempText.trim();
                this.stackTrace.push(new DomStructuralDirectiveNode(flowName, new DomFragmentNode()));
            }
            this.skipCount = 0;
            this.tempText = '';
            this.flowScopeCount++;
            return this.parseText;
        }
        this.tempText += token;
        if (this.tempText.trim() === 'let') {
            this.tempText = '';
            this.insideString = {
                "'": false,
                '"': false,
                '`': false
            };
            return this.parseLocalTemplateVariables;
        }
        return this.parseControlFlow;
    }
    parseControlFlowExpression(token) {
        if (token === ')') {
            this.skipCount--;
            if (this.skipCount == 0 && this.currentNode instanceof DomStructuralDirectiveNode) {
                this.currentNode.value = this.tempText;
                this.tempText = '';
                return this.parseControlFlow;
            }
        }
        else if (token === '(') {
            this.skipCount++;
        }
        this.tempText += token;
        return this.parseControlFlowExpression;
    }
    parsePossibleSuccessorsControlFlow(token) {
        if (/\s/.test(token)) {
            this.tempText += token;
            return this.parsePossibleSuccessorsControlFlow;
        }
        if (token === '@') {
            this.tempText = '';
            return this.parsePossibleSuccessorsControlFlowName;
        }
        do {
            this.flowChainCount--;
            this.popElement();
        } while (this.flowChainCount > 0);
        this.index--;
        return this.parseText;
    }
    parsePossibleSuccessorsControlFlowName(token) {
        if (/\s/.test(token) || token === '{') {
            const successorFlowName = '*' + this.tempText.trim();
            const directive = this.getLastStructuralDirectiveNode();
            if (directive) {
                const isSuccessor = directiveRegistry.hasSuccessor(directive.name, successorFlowName);
                if (isSuccessor) {
                    (directive.successors ??= []).push(new DomStructuralDirectiveSuccessorNode(successorFlowName));
                    this.tempText = '';
                    this.index--;
                    return this.parseSuccessorsControlFlowName;
                }
            }
            this.tempText += token;
            return this.parseText;
        }
        else if (token === '(') {
            this.popStructuralDirectiveNodes();
            this.index--;
            return this.parseControlFlow;
        }
        this.tempText += token;
        return this.parsePossibleSuccessorsControlFlowName;
    }
    parseSuccessorsControlFlowName(token) {
        if (token === '(' || token === '{') {
            this.index--;
            return this.parseControlFlow;
        }
        this.tempText += token;
        return this.parseSuccessorsControlFlowName;
    }
    parseLocalTemplateVariables(token) {
        if ((token == '"' || token === "'" || token === '`') && this.tempText.at(-1) !== '\\') {
            this.insideString[token] = !this.insideString[token];
        }
        else if (token === ';' && !this.insideString?.['"'] && !this.insideString?.['`'] && !this.insideString?.["'"]) {
            const expression = this.tempText.trim();
            this.stackTrace.push(new LocalTemplateVariables(expression));
            this.popElement();
            this.tempText = '';
            this.insideString = undefined;
            return this.parseText;
        }
        this.tempText += token;
        return this.parseLocalTemplateVariables;
    }
    parsePropertyValue(token) {
        if (/"/.test(token)) {
            this.propertyValue = this.tempText;
            switch (this.propType) {
                case 'input':
                    this.currentNode.addInput(this.propertyName, this.propertyValue);
                    break;
                case 'output':
                    this.currentNode.addOutput(this.propertyName, this.propertyValue);
                    break;
                case 'two-way':
                    this.currentNode.addTwoWayBinding(this.propertyName, this.propertyValue);
                    break;
                case 'ref-name':
                    this.currentNode.setTemplateRefName(this.propertyName, this.propertyValue);
                    break;
                case 'attr':
                default:
                    if (/^([-+]?\d*\.?\d+)(?:[eE]([-+]?\d+))?$/.test(this.propertyValue.trim())) {
                        this.currentNode.addAttribute(this.propertyName, +this.propertyValue.trim());
                    }
                    else if (/^(true|false)$/.test(this.propertyValue.trim().toLowerCase())) {
                        if (this.propertyValue.trim().toLowerCase() === 'true') {
                            this.currentNode.addAttribute(this.propertyName, true);
                        }
                        else {
                            this.currentNode.addAttribute(this.propertyName, false);
                        }
                    }
                    else {
                        this.currentNode.addAttribute(this.propertyName, this.propertyValue);
                    }
            }
            this.propertyName, this.propertyValue = this.tempText = '';
            this.propType = 'attr';
            return this.parsePropertyName;
        }
        this.tempText += token;
        return this.parsePropertyValue;
    }
    checkTextChild() {
        if (this.tempText) {
            this.tempText = this.escaper.unescape(this.tempText);
            this.stackTrace.push(this.tempText);
            this.popElement();
            this.tempText = '';
        }
    }
    popStructuralDirectiveNodes() {
        while (this.currentNode instanceof DomStructuralDirectiveNode) {
            this.popElement();
        }
    }
    popElement() {
        const element = this.stackTrace.pop();
        if (!element) {
            return;
        }
        let parent = this.stackTrace.pop();
        let directive;
        if (parent instanceof DomStructuralDirectiveNode && parent.node instanceof DomFragmentNode) {
            directive = parent;
            parent = parent.successors?.at(-1) ?? parent.node ?? parent;
        }
        if (parent instanceof DomParentNode) {
            if (typeof element === 'string') {
                parent.addTextChild(element);
            }
            else if (element instanceof DomElementNode) {
                parent.addChild(this.checkNode(element));
            }
            else {
                parent.addChild(element);
            }
            this.stackTrace.push(directive ?? parent);
        }
        else {
            if (typeof element === 'string') {
                parseTextChild(element).forEach(text => this.childStack.push(text));
            }
            else if (element instanceof DomElementNode) {
                const child = this.checkNode(element);
                this.childStack.push(child);
            }
            else {
                this.childStack.push(element);
            }
        }
    }
    getLastStructuralDirectiveNode() {
        for (let i = this.stackTrace.length - 1; i >= 0; i--) {
            const el = this.stackTrace[i];
            if (el instanceof DomStructuralDirectiveNode) {
                return el;
            }
        }
        for (let i = this.childStack.length - 1; i >= 0; i--) {
            const el = this.childStack[i];
            if (el instanceof DomStructuralDirectiveNode) {
                return el;
            }
        }
        return undefined;
    }
}
function chainSuccessor(directive) {
    if (!directive.successors?.length) {
        return directive;
    }
    const successor = directive.successors.at(-1);
    if (successor instanceof DomStructuralDirectiveSuccessorNode
        && successor.children[0] instanceof DomStructuralDirectiveNode) {
        return chainSuccessor(successor.children[0]);
    }
    return directive;
}
function createFilterByAttrName(attributes) {
    return (attr) => attributes.includes(attr.name.split('.')[0]);
}
function createArrayCleaner(attributes) {
    return (attr) => attributes.splice(attributes.indexOf(attr), 1);
}
export class HTMLParser {
    nodeParser = new NodeParser();
    parse(html) {
        return this.nodeParser.parse(html);
    }
    toDomRootNode(html) {
        let stack = this.nodeParser.parse(html);
        if (!stack || stack.length === 0) {
            return new DomFragmentNode([new TextContent('')]);
        }
        else if (stack?.length === 1) {
            return stack[0];
        }
        else {
            return new DomFragmentNode(stack);
        }
    }
    stringify(stack) {
        if (!Array.isArray(stack)) {
            stack = stack ? [stack] : [];
        }
        let html = '';
        stack.forEach(node => {
            if (node instanceof LiveTextContent) {
                html += `{{${node.value}}}`;
            }
            else if (node instanceof TextContent) {
                html += node.value;
            }
            else if (node instanceof CommentNode) {
                html += `<!-- ${node.comment} -->`;
            }
            else if (node instanceof LocalTemplateVariables) {
                html += `@let ${node.declarations};`;
            }
            else if (node instanceof DomFragmentNode) {
                html += this.stringify(node.children);
            }
            else if (node instanceof DomStructuralDirectiveNode) {
                html += `@${node.name.substring(1)}${node.value ? ` (${node.value})` : ''} {${this.stringify([node.node])}}${Array.isArray(node.successors) ? this.stringify(node.successors) : ''}`;
                html += this.stringify([node.node]);
            }
            else if (node instanceof DomStructuralDirectiveSuccessorNode) {
                html += `@${node.name}`;
                if (node.children.length === 1 && node.children[0] instanceof DomStructuralDirectiveNode) {
                    html += this.stringify(node.children).substring(1);
                }
                else {
                    html += this.stringify(node.children);
                }
            }
            else if (node instanceof DomElementNode) {
                let attrs = '';
                if (node.attributes) {
                    attrs += node.attributes.map(attr => `${attr.name}="${attr.value}"`).join(' ') + ' ';
                }
                if (node.twoWayBinding) {
                    attrs += node.twoWayBinding.map(attr => `[(${attr.name})]="${attr.value}"`).join(' ').concat(' ');
                }
                if (node.inputs) {
                    attrs += node.inputs.map(attr => `[${attr.name}]="${attr.value}"`).join(' ').concat(' ');
                }
                if (node.outputs) {
                    attrs += node.outputs.map(attr => `(${attr.name})="${attr.value}"`).join(' ').concat(' ');
                }
                if (node.templateAttrs) {
                    attrs += node.templateAttrs.map(attr => `${attr.name}="${attr.value}"`).join(' ').concat(' ');
                }
                if (isEmptyElement(node.tagName)) {
                    if (attrs) {
                        html += `<${node.tagName} ${attrs}/>`;
                    }
                    else {
                        html += `<${node.tagName} />`;
                    }
                }
                else {
                    let children = this.stringify(node.children);
                    if (attrs && children) {
                        html += `<${node.tagName} ${attrs}>${children}</${node.tagName}>`;
                    }
                    else if (attrs) {
                        html += `<${node.tagName} ${attrs}></${node.tagName}>`;
                    }
                    else if (children) {
                        html += `<${node.tagName}>${children}<</${node.tagName}>`;
                    }
                    else {
                        html += `<${node.tagName}></${node.tagName}>`;
                    }
                }
            }
        });
        return html;
    }
    deserializeAttributes(attribute) {
        const type = attribute.type;
        switch (type) {
            case 'Attribute':
                inherit(attribute, Attribute);
                break;
            case 'ElementAttribute':
                inherit(attribute, ElementAttribute);
                break;
            case 'LiveAttribute':
                inherit(attribute, LiveAttribute);
                break;
            case 'TextContent':
                inherit(attribute, TextContent);
                break;
            case 'LiveTextContent':
                inherit(attribute, LiveTextContent);
                break;
            default:
                break;
        }
    }
    deserializeBaseNode(node) {
        node.attributes?.forEach(attr => this.deserializeAttributes(attr));
        node.inputs?.forEach(attr => this.deserializeAttributes(attr));
        node.outputs?.forEach(attr => this.deserializeAttributes(attr));
        node.templateAttrs?.forEach(attr => this.deserializeAttributes(attr));
        node.attributeDirectives?.forEach(attr => this.deserializeNode(attr));
    }
    deserializeNode(node) {
        const type = node.type;
        switch (type) {
            case 'TextContent':
                node = inherit(node, TextContent);
                break;
            case 'LiveTextContent':
                node = inherit(node, LiveTextContent);
                break;
            case 'CommentNode':
                node = inherit(node, CommentNode);
                break;
            case 'LocalTemplateVariables':
                node = inherit(node, LocalTemplateVariables);
                break;
            case 'DomFragmentNode':
                node = inherit(node, DomFragmentNode);
                node.children?.forEach(child => this.deserializeNode(child));
                break;
            case 'DomElementNode':
                const dom = node = inherit(node, DomElementNode);
                if (dom.templateRefName) {
                    this.deserializeAttributes(dom.templateRefName);
                }
                this.deserializeBaseNode(node);
                node.children?.forEach(child => this.deserializeNode(child));
                break;
            case 'DomStructuralDirectiveNode':
                node = inherit(node, DomStructuralDirectiveNode);
                this.deserializeBaseNode(node);
                this.deserializeNode((node).node);
                const successors = (node).successors;
                if (successors) {
                    successors.forEach(successor => this.deserializeNode(successor));
                }
                break;
            case 'StructuralDirectiveSuccessorNode':
                node = inherit(node, DomStructuralDirectiveSuccessorNode);
                node.children?.forEach(child => this.deserializeNode(child));
                break;
            case 'DomAttributeDirectiveNode':
                node = inherit(node, DomAttributeDirectiveNode);
                this.deserializeBaseNode(node);
                break;
            default:
                break;
        }
        return node;
    }
}
function inherit(object, type) {
    Object.setPrototypeOf(object, type.prototype);
    return object;
}
export const htmlParser = new HTMLParser();
//# sourceMappingURL=html-parser.js.map