import { DomElementNode, DomStructuralDirectiveNode, DomChild, BaseNode, DomFragmentNode, DomNode, DomAttributeDirectiveNode } from './dom.js';
export interface NodeAttr {
    [attr: string]: string;
}
export declare class NodeFactory {
    static Fragment: string;
    static CommentTag: string;
    static DirectiveTag: string;
    static createElement(tagName: string, attrs?: NodeAttr, ...children: (string | DomChild)[]): DomNode;
    static createElementNode(tagName: string, attrs?: NodeAttr, ...children: (string | DomChild)[]): DomElementNode;
    static createFragmentNode(...children: (string | DomChild)[]): DomFragmentNode;
    static createStructuralDirectiveNode(directiveName: string, directiveValue: string, attrs?: NodeAttr, ...children: (string | DomChild)[]): DomStructuralDirectiveNode;
    static createAttributeDirectiveNode(directiveName: string, attrs?: NodeAttr): DomAttributeDirectiveNode;
    static initElementAttrs(element: BaseNode, attrs?: NodeAttr): void;
    static handelAttribute(element: BaseNode, attrName: string, value: string | Function | object): void;
}
//# sourceMappingURL=factory.d.ts.map