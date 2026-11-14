import { Token, TokenExpression, TokenStream } from '@ibyar/expressions';
export type DirectiveExpressionType = {
    templateExpressions: Array<TokenExpression[]>;
    directiveInputs: Map<string, string>;
};
export declare class DirectiveExpressionParser {
    protected directiveName: string;
    protected stream: TokenStream;
    static parse(directiveName: string, expression: string): DirectiveExpressionType;
    protected templateExpressions: TokenExpression[][];
    protected directiveInputs: Map<string, string>;
    constructor(directiveName: string, stream: TokenStream);
    getDirectiveExpressionType(): DirectiveExpressionType;
    scan(): void;
    protected consume(token: Token): void;
    protected check(token: Token): boolean;
    protected consumeToList(token: Token, list: TokenExpression[]): void;
    protected consumeIfToken(token: Token, list: TokenExpression[]): boolean;
    protected isDeclareKeyword(): boolean;
    protected isIdentifier(): boolean;
    protected isAsKeyword(): boolean;
    protected consumeAsKeyword(): void;
    protected isSemicolon(): boolean;
    protected isComma(): boolean;
    protected consumeSemicolonOrComma(): void;
    protected parseTemplateInput(allowComma: boolean): boolean;
    private consumeDeclarations;
    protected parseExpression(inputName: string): void;
    /**
     * check if the first is
     * @returns `boolean`
     */
    protected parseDirectiveAndTemplateInputs(): void;
    private mapTokenToString;
}
//# sourceMappingURL=parser.d.ts.map