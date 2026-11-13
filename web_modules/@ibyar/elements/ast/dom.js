/**
 * a normal attribute with its source value without any binding.
 */
export class Attribute {
    name;
    value;
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }
    toJSON() {
        return Object.assign({}, this, { type: 'Attribute' });
    }
}
export class ElementAttribute extends Attribute {
    toJSON() {
        return Object.assign({}, this, { type: 'ElementAttribute' });
    }
}
/**
 * an attribute with its source value for binding
 */
export class LiveAttribute extends Attribute {
    toJSON() {
        return Object.assign({}, this, { type: 'LiveAttribute' });
    }
}
/**
 *
 * @param name
 * @param value
 * @returns LiveAttribute
 */
export function createLiveAttribute(name, value) {
    return new LiveAttribute(name, value);
}
/**
 * a normal text
 */
export class TextContent extends Attribute {
    static propName = 'textContent';
    constructor(text) {
        super(TextContent.propName, text);
    }
    toJSON() {
        return Object.assign({}, this, { type: 'TextContent' });
    }
}
/**
 * a text that its content is binding to variable from the component model.
 */
export class LiveTextContent extends TextContent {
    toJSON() {
        return Object.assign({}, this, { type: 'LiveTextContent' });
    }
}
export function isLiveTextContent(text) {
    return text instanceof LiveTextContent;
}
export function isLocalTemplateVariables(text) {
    return text instanceof LocalTemplateVariables;
}
/**
 * to comment in dom
 */
export class CommentNode {
    comment;
    constructor(comment) {
        this.comment = comment;
    }
    toJSON() {
        return Object.assign({}, this, { type: 'CommentNode' });
    }
}
export class LocalTemplateVariables {
    declarations;
    constructor(declarations) {
        this.declarations = declarations;
    }
    toJSON() {
        return Object.assign({}, this, { type: 'LocalTemplateVariables' });
    }
}
export class BaseNode {
    /**
     * hold static attr and event that will resolve normally from the global window.
     */
    attributes;
    /**
     * hold the attrs/inputs name marked as one way binding
     */
    inputs;
    /**
     * hold the name of events that should be connected to a listener
     */
    outputs;
    /**
     * hold the name of attributes marked for 2 way data binding
     */
    twoWayBinding;
    /**
     * directive attribute
     */
    templateAttrs;
    /**
     * attributes directive
     */
    attributeDirectives;
    addAttribute(attrName, value) {
        if (this.attributes) {
            this.attributes.push(new ElementAttribute(attrName, value ?? true));
        }
        else {
            this.attributes = [new ElementAttribute(attrName, value ?? true)];
        }
    }
    addInput(attrName, valueSource) {
        if (this.inputs) {
            this.inputs.push(new LiveAttribute(attrName, valueSource));
        }
        else {
            this.inputs = [new LiveAttribute(attrName, valueSource)];
        }
    }
    addOutput(eventName, handlerSource) {
        if (this.outputs) {
            this.outputs.push(new LiveAttribute(eventName, handlerSource));
        }
        else {
            this.outputs = [new LiveAttribute(eventName, handlerSource)];
        }
    }
    addTwoWayBinding(eventName, handlerSource) {
        if (this.twoWayBinding) {
            this.twoWayBinding.push(new LiveAttribute(eventName, handlerSource));
        }
        else {
            this.twoWayBinding = [new LiveAttribute(eventName, handlerSource)];
        }
    }
    addTemplateAttr(attrName, valueSource) {
        valueSource = valueSource.trim();
        if (/^\{\{(.+)\}\}$/g.test(valueSource)) {
            // as one way binding
            const substring = valueSource.substring(2, valueSource.length - 2);
            if (!(/\{\{(.+)\}\}/g).test(substring)) {
                this.addInput(attrName, substring);
                return;
            }
        }
        // as string 
        valueSource = parseStringTemplate(valueSource);
        if (this.templateAttrs) {
            this.templateAttrs.push(new LiveAttribute(attrName, valueSource));
        }
        else {
            this.templateAttrs = [new LiveAttribute(attrName, valueSource)];
        }
    }
    toJSON() {
        return Object.assign({}, this, { type: 'BaseNode' });
    }
}
export class DomAttributeDirectiveNode extends BaseNode {
    /**
     * name of the directive
     */
    name;
    constructor(name) {
        super();
        this.name = name;
    }
    toJSON() {
        return Object.assign({}, this, { type: 'DomAttributeDirectiveNode' });
    }
}
export class DomParentNode extends BaseNode {
    /**
     * element children list
     */
    children;
    addChild(child) {
        if (this.children) {
            this.children.push(child);
        }
        else {
            this.children = [child];
        }
    }
    addTextChild(text) {
        const children = (this.children ??= []);
        parseTextChild(text).forEach(childText => children.push(childText));
    }
    toJSON() {
        return Object.assign({}, this, { type: 'DomParentNode' });
    }
}
/**
 * parent for a list of elements
 */
export class DomFragmentNode extends DomParentNode {
    constructor(children) {
        super();
        if (children) {
            this.children = children;
        }
    }
    toJSON() {
        return Object.assign({}, this, { type: 'DomFragmentNode' });
    }
}
/**
 * dom structural successor structural fragment node
 */
export class DomStructuralDirectiveSuccessorNode extends DomFragmentNode {
    name;
    constructor(name) {
        super([]);
        this.name = name;
    }
    toJSON() {
        return Object.assign({}, this, { type: 'StructuralDirectiveSuccessorNode' });
    }
}
export class DomElementNode extends DomParentNode {
    /**
     * the tag name of the element
     */
    tagName;
    /**
     * used to upgrade an element to another custom-element name
     */
    is;
    /**
     * a given name for element
     */
    templateRefName;
    constructor(tagName, is) {
        super();
        this.tagName = tagName;
        if (is) {
            this.is = is;
        }
    }
    setTagName(tagName) {
        this.tagName = tagName;
    }
    setTemplateRefName(name, value) {
        this.templateRefName = new Attribute(name, value);
    }
    toJSON() {
        return Object.assign({}, this, { type: 'DomElementNode' });
    }
}
/**
 * structural directive
 */
export class DomStructuralDirectiveNode extends BaseNode {
    /**
     * name of the directive
     */
    name;
    /**
     * value of the directive
     */
    value;
    /**
     * the value of the template node, that this directive going to host-on
     */
    node;
    /**
     * successors directives
     */
    successors;
    constructor(name, node, value) {
        super();
        this.name = name;
        this.node = node;
        this.value = value;
    }
    toJSON() {
        return Object.assign({}, this, { type: 'DomStructuralDirectiveNode' });
    }
}
export function isDOMDirectiveNode(node) {
    return node instanceof DomStructuralDirectiveNode;
}
export function parseTextChild(text) {
    // split from end with '}}', then search for the first '{{'
    let all = [];
    let temp = text;
    let last = temp.lastIndexOf('}}');
    let first;
    while (last > -1) {
        first = text.lastIndexOf('{{', last);
        if (first > -1) {
            let lastPart = temp.substring(last + 2);
            if (lastPart) {
                all.push(new TextContent(lastPart));
            }
            const liveText = new LiveTextContent(temp.substring(first + 2, last));
            all.push(liveText);
            temp = temp.substring(0, first);
            last = temp.lastIndexOf('}}');
        }
        else {
            break;
        }
    }
    if (temp) {
        all.push(new TextContent(temp));
    }
    return all.reverse();
}
export function parseStringTemplate(text) {
    const node = parseTextChild(text);
    const map = node.map(str => (str instanceof LiveTextContent ? '${' + str.value + '}' : str.value)).join('');
    return '`' + map + '`';
}
//# sourceMappingURL=dom.js.map