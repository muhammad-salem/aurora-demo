import { DomElementNode, DomStructuralDirectiveNode, DomFragmentNode, parseTextChild, DomAttributeDirectiveNode } from './dom.js';
import { directiveRegistry } from '../directives/register-directive.js';
export class NodeFactory {
    static createElement(tagName, attrs, ...children) {
        if (NodeFactory.Fragment === tagName.toLowerCase()) {
            return NodeFactory.createFragmentNode(...children);
        }
        if (directiveRegistry.has(tagName)) {
            return NodeFactory.createStructuralDirectiveNode(tagName, '', attrs, ...children);
        }
        if (NodeFactory.DirectiveTag === tagName.toLocaleLowerCase() && attrs) {
            if (attrs) {
                let directiveName = Object.keys(attrs).find(attrName => attrName.startsWith('*'));
                let directiveValue;
                if (directiveName) {
                    directiveValue = attrs[directiveName];
                    delete attrs.directiveName;
                    return NodeFactory.createStructuralDirectiveNode(directiveName, directiveValue, attrs, ...children);
                }
                let node = new DomElementNode(tagName, attrs?.is);
                NodeFactory.initElementAttrs(node, attrs);
                children?.forEach(child => {
                    if (typeof child === 'string') {
                        node.addTextChild(child);
                    }
                    else {
                        node.addChild(child);
                    }
                });
                return node;
            }
            else {
                return NodeFactory.createFragmentNode(...children);
            }
        }
        if (attrs) {
            let node = NodeFactory.createElementNode(tagName, attrs, ...children);
            const attrKeys = Object.keys(attrs);
            let directiveName = attrKeys.find(attrName => attrName.startsWith('*'));
            if (directiveName) {
                let directiveValue = attrs[directiveName];
                return NodeFactory.createStructuralDirectiveNode(directiveName, directiveValue, attrs, node);
            }
            return node;
        }
        else {
            return NodeFactory.createElementNode(tagName, attrs, ...children);
        }
    }
    static createElementNode(tagName, attrs, ...children) {
        let node = new DomElementNode(tagName, attrs?.is);
        NodeFactory.initElementAttrs(node, attrs);
        children?.forEach(child => {
            if (typeof child === 'string') {
                node.addTextChild(child);
            }
            else {
                node.addChild(child);
            }
        });
        return node;
    }
    static createFragmentNode(...children) {
        let childStack = children.flatMap(child => {
            if (typeof child === 'string') {
                return parseTextChild(child);
            }
            else {
                return [child];
            }
        });
        return new DomFragmentNode(childStack);
    }
    static createStructuralDirectiveNode(directiveName, directiveValue, attrs, ...children) {
        const fragment = new DomFragmentNode();
        children?.forEach(child => (typeof child === 'string') ? fragment.addTextChild(child) : fragment.addChild(child));
        !directiveName.startsWith('*') && (directiveName = '*' + directiveName);
        const directive = new DomStructuralDirectiveNode(directiveName, fragment, directiveValue);
        attrs && Object.keys(attrs).forEach(attr => directive.addAttribute(attr, attrs[attr]));
        return directive;
    }
    static createAttributeDirectiveNode(directiveName, attrs) {
        const directive = new DomAttributeDirectiveNode(directiveName);
        attrs && Object.keys(attrs).forEach(attr => directive.addAttribute(attr, attrs[attr]));
        return directive;
    }
    static initElementAttrs(element, attrs) {
        if (attrs) {
            Object.keys(attrs).forEach(key => {
                NodeFactory.handelAttribute(element, key, attrs[key]);
            });
            const directives = [];
            Object.keys(attrs).forEach(attributeName => {
                if (directiveRegistry.has(attributeName)) {
                    Reflect.deleteProperty(attrs, attributeName);
                    const directive = new DomAttributeDirectiveNode(attributeName);
                    const directiveInfo = directiveRegistry.get(attributeName);
                    Object.keys(attrs).forEach(attr => {
                        if (directiveInfo.hasAttribute(attr)) {
                            directive.addAttribute(attr, attrs[attr]);
                            Reflect.deleteProperty(attrs, attr);
                        }
                    });
                    directives.push(directive);
                }
            });
            if (directives.length) {
                element.attributeDirectives = directives;
            }
        }
    }
    static handelAttribute(element, attrName, value) {
        if (attrName.startsWith('#') && element instanceof DomElementNode) {
            attrName = attrName.substring(1);
            element.setTemplateRefName(attrName, value);
        }
        else if (attrName === 'is' && element instanceof DomElementNode) {
            element.is = value;
            return;
        }
        else if (attrName.startsWith('[(')) {
            attrName = attrName.substring(2, attrName.length - 2);
            element.addTwoWayBinding(attrName, value);
        }
        else if (attrName.startsWith('$') && typeof value === 'string' && value.startsWith('$')) {
            attrName = attrName.substring(1);
            value = value.substring(1);
            element.addTwoWayBinding(attrName, value);
        }
        else if (attrName.startsWith('[')) {
            attrName = attrName.substring(1, attrName.length - 1);
            element.addInput(attrName, value);
        }
        else if (attrName.startsWith('$') && typeof value === 'string') {
            attrName = attrName.substring(1);
            element.addInput(attrName, value);
        }
        else if (attrName.startsWith('$') && typeof value === 'object') {
            attrName = attrName.substring(1);
            element.addAttribute(attrName, value);
        }
        else if (typeof value === 'string' && value.startsWith('$')) {
            return;
        }
        else if (typeof value === 'string' && (/^\{\{(.+\w*)*\}\}/g).test(value)) {
            value = value.substring(2, value.length - 2);
            element.addInput(attrName, value);
        }
        else if (typeof value === 'string' && (/\{\{(.+)\}\}/g).test(value)) {
            element.addTemplateAttr(attrName, value);
        }
        else if (attrName.startsWith('(')) {
            attrName = attrName.substring(1, attrName.length - 1);
            element.addOutput(attrName, value);
        }
        else if (attrName.startsWith('on')) {
            element.addOutput(attrName.substring(2), value);
        }
        else {
            element.addAttribute(attrName, value);
        }
    }
}
NodeFactory.Fragment = 'fragment';
NodeFactory.CommentTag = 'comment';
NodeFactory.DirectiveTag = 'directive';
//# sourceMappingURL=factory.js.map