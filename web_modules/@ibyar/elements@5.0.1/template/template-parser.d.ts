import { DomNode, CommentNode, DomElementNode, TextContent } from '../ast/dom.js';
export declare class TemplateParser {
    parse(template: HTMLTemplateElement): DomNode;
    createComponent(child: ChildNode): CommentNode | DomElementNode | (TextContent | import("../index.js").LiveTextContent)[];
    toDomRenderRootNode<T>(template: DomNode | HTMLTemplateElement | string): (model: T) => HTMLTemplateElement | DomNode;
}
export declare const templateParser: TemplateParser;
//# sourceMappingURL=template-parser.d.ts.map