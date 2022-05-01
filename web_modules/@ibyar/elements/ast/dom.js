export class Attribute {
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }
}
export class ElementAttribute extends Attribute {
}
export class LiveAttribute extends Attribute {
}
export function createLiveAttribute(name, value) {
    return new LiveAttribute(name, value);
}
export class TextContent extends Attribute {
    constructor(text) {
        super(TextContent.propName, text);
    }
}
TextContent.propName = 'textContent';
export class LiveTextContent extends TextContent {
}
export function isLiveTextContent(text) {
    return text instanceof LiveTextContent;
}
export class CommentNode {
    constructor(comment) {
        this.comment = comment;
    }
}
export class BaseNode {
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
            const substring = valueSource.substring(2, valueSource.length - 2);
            if (!(/\{\{(.+)\}\}/g).test(substring)) {
                this.addInput(attrName, substring);
                return;
            }
        }
        valueSource = parseStringTemplate(valueSource);
        if (this.templateAttrs) {
            this.templateAttrs.push(new LiveAttribute(attrName, valueSource));
        }
        else {
            this.templateAttrs = [new LiveAttribute(attrName, valueSource)];
        }
    }
}
export class DomAttributeDirectiveNode extends BaseNode {
    constructor(name) {
        super();
        this.name = name;
    }
}
export class DomParentNode extends BaseNode {
    addChild(child) {
        if (this.children) {
            this.children.push(child);
        }
        else {
            this.children = [child];
        }
    }
    addTextChild(text) {
        const children = (this.children ?? (this.children = []));
        parseTextChild(text).forEach(childText => children.push(childText));
    }
}
export class DomFragmentNode extends DomParentNode {
    constructor(children) {
        super();
        if (children) {
            this.children = children;
        }
    }
}
export class DomElementNode extends DomParentNode {
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
}
export class DomStructuralDirectiveNode extends BaseNode {
    constructor(name, node, value) {
        super();
        this.name = name;
        this.node = node;
        this.value = value;
    }
}
export function isDOMDirectiveNode(node) {
    return node instanceof DomStructuralDirectiveNode;
}
export function parseTextChild(text) {
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