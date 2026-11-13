import { ExpressionNode } from '../api/expression.js';
import { Token, TokenExpression } from './token.js';
import { LanguageMode } from './language.js';
export declare const IdentifierRegex: RegExp;
export declare const IdentifierStartRegex: RegExp;
export declare const IdentifierPartRegex: RegExp;
export interface PreTemplateLiteral extends ExpressionNode {
}
export declare class PreTemplateLiteral {
    strings: string[];
    expressions: string[];
    constructor(strings: string[], expressions: string[]);
}
export interface TemplateStringLiteral extends ExpressionNode {
}
export declare class TemplateStringLiteral {
    string: string;
    range: [number, number];
    constructor(string: string, range: [number, number]);
}
export declare abstract class TokenStream {
    protected mode: LanguageMode;
    static getTokenStream(source: string | TokenExpression[], mode?: LanguageMode): TokenStream;
    protected pos: number;
    protected savedPosition: number;
    protected current: TokenExpression;
    protected savedCurrent: TokenExpression;
    protected last?: TokenExpression;
    constructor(mode?: LanguageMode);
    setLanguageMode(mode: LanguageMode): void;
    getLanguageMode(): LanguageMode;
    save(): void;
    restore(): void;
    reset(): void;
    lastToken(): TokenExpression | undefined;
    currentToken(): TokenExpression;
    seekTo(expect: Token): boolean;
    getPos(): number;
    setPos(pos: number): void;
    getSavedPos(): number;
    getStreamer(expect?: Token): TokenStream;
    readTill(expect: Token | undefined, tokens: TokenExpression[]): void;
    readTokens(expect: Token, tokens: TokenExpression[]): void;
    readTokensConsiderPair(tokens: TokenExpression[], ...expect: Token[]): void;
    readTokensPair(open: Token, close: Token, tokens: TokenExpression[]): void;
    toTokens(): TokenExpression[];
    [Symbol.iterator](): IterableIterator<TokenExpression>;
    scanRegExpPattern(): boolean;
    peek(): TokenExpression;
    peekAhead(): TokenExpression;
    peekPosition(): number;
    peekAheadPosition(): number;
    abstract next(): TokenExpression;
    abstract hasLineTerminatorBeforeNext(): boolean;
    abstract hasLineTerminatorAfterNext(): boolean;
    abstract createError(message: String): string;
    abstract scanTemplateContinuation(): TokenExpression;
}
export declare class TokenStreamer extends TokenStream {
    private tokens;
    constructor(tokens: TokenExpression[], mode?: LanguageMode);
    next(): TokenExpression;
    createError(message: String): string;
    hasLineTerminatorBeforeNext(): boolean;
    hasLineTerminatorAfterNext(): boolean;
    scanTemplateContinuation(): TokenExpression;
}
export declare class TokenStreamImpl extends TokenStream {
    private expression;
    static REGEXP_FLAGS: string[];
    static UnicodePattern: RegExp;
    static DecimalPattern: RegExp;
    static AsciiPattern: RegExp;
    static OctalPattern: RegExp;
    constructor(expression: string, mode?: LanguageMode);
    private newToken;
    next(): TokenExpression;
    hasLineTerminatorBeforeNext(): boolean;
    hasLineTerminatorAfterNext(): boolean;
    private isString;
    private isTemplateLiteral;
    private scanTemplateSpan;
    scanTemplateContinuation(): TokenExpression;
    private scanEscape;
    private scanUnicodeEscape;
    private scanHexNumber;
    private scanUnlimitedLengthHexNumber;
    private hexValue;
    private scanOctalEscape;
    private isParentheses;
    private isBracket;
    private isCurlY;
    private isComma;
    private isSemicolon;
    private isProperty;
    private isWhitespace;
    /**
     * [JavaScript 5 Comment Types](https://developer.adobe.com/experience-manager/reference-materials/6-5/javadoc/org/mozilla/javascript/ast/Comment.html)
     * @returns boolean
     */
    private isComment;
    private isLineTerminator;
    private isStringLiteralLineTerminator;
    private mayTerminateString;
    scanRegExpPattern(): boolean;
    private unescape;
    private isRadixInteger;
    private isNumber;
    private isOperator;
    private isStatement;
    protected getCoordinates(): {
        line: number;
        column: number;
    };
    createError(message: String): string;
}
//# sourceMappingURL=stream.d.ts.map