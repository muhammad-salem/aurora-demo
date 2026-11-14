import { DomElementNode, DomStructuralDirectiveNode, DomNode, DomChild, Attribute, BaseNode, DomAttributeDirectiveNode } from '../ast/dom.js';
export declare class EscapeHTMLCharacter {
    static ESCAPE_MAP: {
        [key: string]: string;
    };
    test: RegExp;
    replace: RegExp;
    constructor();
    escaper(match: string): string;
    unescape(text: string): string;
}
export declare class NodeParserHelper {
    protected checkNode(node: DomElementNode): DomElementNode | DomStructuralDirectiveNode;
    protected extractDirectiveAttributesFromNode(directiveName: string, directive: BaseNode, node: DomElementNode): void;
    protected extractDirectiveNames(node: BaseNode): string[];
    protected getAttributeDirectives(attributes: Attribute<string, any>[]): string[];
}
export declare class NodeParser extends NodeParserHelper {
    private index;
    private stateFn;
    private tagNameRegExp;
    private childStack;
    private stackTrace;
    private get currentNode();
    private commentOpenCount;
    private commentCloseCount;
    private tempText;
    private propertyName;
    private propertyValue;
    private propType;
    private escaper;
    private skipCount;
    private flowScopeCount;
    private flowChainCount;
    private interpolationCount;
    private insideString?;
    parse(html: string): DomChild[];
    private reset;
    private parseText;
    private parseTag;
    private parseComment;
    private parseCloseTag;
    private parseOpenTag;
    private parsePropertyName;
    private parseRefName;
    private parseInputOutput;
    private parseControlFlow;
    private parseControlFlowExpression;
    private parsePossibleSuccessorsControlFlow;
    private parsePossibleSuccessorsControlFlowName;
    private parseSuccessorsControlFlowName;
    private parseLocalTemplateVariables;
    private parsePropertyValue;
    private checkTextChild;
    private popStructuralDirectiveNodes;
    private popElement;
    private getLastStructuralDirectiveNode;
}
export declare class HTMLParser {
    nodeParser: NodeParser;
    parse(html: string): DomChild[];
    toDomRootNode(html: string): DomNode;
    stringify(stack?: DomNode | DomNode[]): string;
    deserializeAttributes(attribute: Attribute<any, any>): void;
    deserializeBaseNode(node: BaseNode): void;
    deserializeNode(node: DomNode | DomAttributeDirectiveNode): DomAttributeDirectiveNode | DomNode;
}
export declare const htmlParser: HTMLParser;
//# sourceMappingURL=html-parser.d.ts.map