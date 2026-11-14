import type { DeclarationExpression, ExpressionNode } from '../api/expression.js';
import type { NodeFactory } from './node.js';
import { ClassDeclaration, ClassExpression } from '../api/class/class.js';
import { FunctionDeclaration, FunctionExpression } from '../api/definition/function.js';
import { Identifier, TaggedTemplateExpression, TemplateLiteral } from '../api/definition/values.js';
import { BlockStatement } from '../api/statement/control/block.js';
import { VariableDeclarationNode } from '../api/statement/declarations/declares.js';
import { AllowLabelledFunctionStatement, FunctionBodyType, FunctionInfo, FunctionKind, FunctionSyntaxKind, ParseFunctionFlag, ParsingArrowHeadFlag, PropertyKindInfo, VariableDeclarationContext } from './enums.js';
import { TokenStream } from './stream.js';
import { Token, TokenExpression } from './token.js';
import { LanguageMode } from './language.js';
export type InlineParserOptions = {
    mode?: LanguageMode;
    acceptIN?: boolean;
    factory?: NodeFactory;
    addLocation?: boolean;
};
export type Range = [number, number];
export type RangeOrVoid = Range | undefined;
export type PositionMark = {
    range?: Range;
};
export declare abstract class AbstractParser {
    protected scanner: TokenStream;
    protected factory: NodeFactory;
    protected acceptIN: boolean;
    protected previousAcceptIN: boolean[];
    protected functionKind: FunctionKind;
    protected previousFunctionKind: FunctionKind[];
    get languageMode(): LanguageMode;
    set languageMode(mode: LanguageMode);
    constructor(scanner: TokenStream, factory: NodeFactory, acceptIN?: boolean);
    abstract scan(): ExpressionNode;
    protected position(): number;
    protected setAcceptIN(acceptIN: boolean): void;
    protected restoreAcceptIN(): void;
    protected getLastFunctionKind(): FunctionKind;
    protected setFunctionKind(functionKind: FunctionKind): void;
    protected restoreFunctionKind(): void;
    protected setStatue(acceptIN: boolean, functionKind: FunctionKind): void;
    protected restoreStatue(): void;
    protected current(): TokenExpression;
    protected next(): TokenExpression;
    protected peek(): TokenExpression;
    protected peekAhead(): TokenExpression;
    protected peekAheadPosition(): number;
    protected peekPosition(): number;
    protected createRange(): undefined;
    protected createRange(start: Required<PositionMark>): Range;
    protected createRange(start?: PositionMark): RangeOrVoid;
    protected createRangeByStart(start: Required<PositionMark>): Range;
    protected createStartPosition(): Range;
    protected updateRangeEnd(range: Range): void;
    protected consume(token: Token): TokenExpression;
    protected check(token: Token): boolean;
    protected checkAndGetValue(token: Token): ExpressionNode | undefined;
    protected checkValue(value: ExpressionNode): boolean;
    protected expect(token: Token): TokenExpression;
    protected expectAndGetValue(token: Token): ExpressionNode;
    protected checkInOrOf(): 'IN' | 'OF' | false;
    protected peekInOrOf(): 'IN' | 'OF' | false;
    protected isArguments(node: ExpressionNode): boolean;
    protected isEval(node: ExpressionNode): boolean;
    protected isEvalOrArguments(node: ExpressionNode): boolean;
    protected isNextLetKeyword(): boolean;
    protected markParenthesized(expression: ExpressionNode): void;
    protected clearParenthesized(expression: ExpressionNode): void;
    protected isParenthesized(expression: ExpressionNode): boolean;
    protected isAssignableIdentifier(expression: ExpressionNode): boolean;
    protected isValidReferenceExpression(expression: ExpressionNode): boolean;
    protected expectSemicolon(): void;
    protected peekAnyIdentifier(): boolean;
    protected expectContextualKeyword(keyword: string): boolean;
    protected checkContextualKeyword(keyword: string): boolean;
    protected peekContextualKeyword(keyword: string): boolean;
    protected methodKindFor(isStatic: boolean, flag: ParseFunctionFlag): FunctionKind;
    protected isGenerator(): boolean;
    protected isAsyncFunction(): boolean;
    protected is_async_function(): boolean;
    protected is_async_generator(): boolean;
    protected is_resumable(): boolean;
    protected isAwaitAllowed(): boolean;
    protected isAwaitAsIdentifierDisallowed(): boolean;
    protected shouldBanArguments(): boolean;
    protected errorMessage(message: string): string;
    protected reportErrorMessage(message: string): void;
}
export declare class JavaScriptInlineParser extends AbstractParser {
    static parse(source: string | TokenExpression[] | TokenStream, { mode, acceptIN, factory, addLocation }?: InlineParserOptions): ExpressionNode;
    constructor(scanner: TokenStream, factory: NodeFactory, acceptIN?: boolean);
    scan(): ExpressionNode;
    /**
     * Statement ::
     * Block
     * VariableStatement
     * EmptyStatement
     * ExpressionStatement
     * IfStatement
     * IterationStatement
     * ContinueStatement
     * BreakStatement
     * ReturnStatement
     * WithStatement
     * LabelledStatement
     * SwitchStatement
     * ThrowStatement
     * TryStatement
     * DebuggerStatement
     */
    protected parseStatement(allowFunction?: AllowLabelledFunctionStatement): ExpressionNode;
    protected parseDebuggerStatement(): import("../index.js").DebuggerStatement;
    protected parseTryStatement(): ExpressionNode;
    protected parseNonRestrictedIdentifier(): Identifier;
    protected parseBlock(): BlockStatement;
    /**
     * ECMA 262 6th Edition
     * 	StatementListItem[Yield, Return] :
     * 	Statement[?Yield, ?Return]
     * 	Declaration[?Yield]
     * //
     * Declaration[Yield] :
     * 	HoistableDeclaration[?Yield]
     * 	ClassDeclaration[?Yield]
     * 	LexicalDeclaration[In, ?Yield]
     * //
     * HoistableDeclaration[Yield, Default] :
     * 	FunctionDeclaration[?Yield, ?Default]
     * 	GeneratorDeclaration[?Yield, ?Default]
     * //
     * LexicalDeclaration[In, Yield] :
     * 	LetOrConst BindingList[?In, ?Yield] ;
     */
    protected parseStatementListItem(): ExpressionNode | undefined;
    protected parseFunctionExpression(): FunctionExpression | FunctionDeclaration;
    protected parseAsyncFunctionDeclaration(names: string[] | undefined, defaultExport: boolean, start: PositionMark): FunctionDeclaration;
    protected parseIfStatement(): ExpressionNode;
    protected parseScopedStatement(): ExpressionNode;
    protected parseDoWhileStatement(): ExpressionNode;
    protected parseWhileStatement(): import("../index.js").WhileNode;
    protected parseThrowStatement(): ExpressionNode;
    protected parseSwitchStatement(): ExpressionNode;
    protected parseForStatement(): import("../index.js").ForNode | import("../index.js").ForOfNode | import("../index.js").ForInNode;
    protected parseStandardForLoopWithLexicalDeclarations(initializer: VariableDeclarationNode, start: PositionMark): import("../index.js").ForNode;
    protected parseForEachStatementWithDeclarations(initializer: VariableDeclarationNode, forMode: 'IN' | 'OF', start: PositionMark): import("../index.js").ForOfNode | import("../index.js").ForInNode;
    protected parseForEachStatementWithoutDeclarations(initializer: ExpressionNode, forMode: 'IN' | 'OF', start: PositionMark): import("../index.js").ForOfNode | import("../index.js").ForInNode;
    protected parseStandardForLoop(initializer: ExpressionNode, start: PositionMark): import("../index.js").ForNode;
    protected parseForAwaitStatement(): import("../index.js").ForAwaitOfNode;
    protected parseVariableDeclarations(varContext: VariableDeclarationContext): VariableDeclarationNode;
    protected parseBindingPattern(isPattern: boolean): ExpressionNode;
    protected parseAndClassifyIdentifier(next: TokenExpression): ExpressionNode;
    protected parseContinueStatement(): ExpressionNode;
    protected parseBreakStatement(): ExpressionNode;
    protected parseReturnStatement(): ExpressionNode;
    protected parseExpressionOrLabelledStatement(allowFunction: AllowLabelledFunctionStatement): ExpressionNode;
    protected parseExpression(): ExpressionNode;
    protected parseFunctionDeclaration(): FunctionDeclaration;
    protected parseAsyncFunctionLiteral(): FunctionExpression | FunctionDeclaration;
    protected parseHoistableDeclaration(names: string[] | undefined, defaultExport: boolean, start: PositionMark): FunctionExpression | FunctionDeclaration;
    protected parseHoistableDeclaration01(flag: FunctionKind, names: string[] | undefined, defaultExport: boolean, start: PositionMark): FunctionExpression | FunctionDeclaration;
    protected parseIdentifier(kind?: FunctionKind): Identifier;
    protected getIdentifier(): Identifier;
    protected parseFunctionLiteral(flag: FunctionKind, functionSyntaxKind: FunctionSyntaxKind, name: Identifier | undefined, start: PositionMark): FunctionDeclaration | FunctionExpression;
    protected parseFunctionBody(kind: FunctionKind, bodyType: FunctionBodyType.BLOCK, functionSyntaxKind: FunctionSyntaxKind): ExpressionNode[];
    protected parseFunctionBody(kind: FunctionKind, bodyType: FunctionBodyType.EXPRESSION, functionSyntaxKind: FunctionSyntaxKind): ExpressionNode;
    protected parseAndRewriteAsyncGeneratorFunctionBody(kind: FunctionKind): ExpressionNode[];
    protected parseAndRewriteGeneratorFunctionBody(kind: FunctionKind): ExpressionNode[];
    protected parseAsyncFunctionBody(): ExpressionNode[];
    protected parseStatementList(endToken: Token): ExpressionNode[];
    protected parseFormalParameterList(functionInfo: FunctionInfo): DeclarationExpression[];
    protected parseFormalParameter(functionInfo: FunctionInfo): DeclarationExpression;
    protected parseExpressionCoverGrammar(): ExpressionNode;
    protected parseArrowParametersWithRest(list: ExpressionNode[]): ExpressionNode;
    protected expressionListToExpression(list: ExpressionNode[]): ExpressionNode;
    protected parseMemberExpression(): ExpressionNode;
    protected parsePrimaryExpression(): ExpressionNode;
    protected parseTemplateLiteral(tag?: ExpressionNode): ExpressionNode;
    protected createTemplateLiteralExpressionNode(strings: string[], expressions: ExpressionNode[], tag?: ExpressionNode, range?: RangeOrVoid): TaggedTemplateExpression | TemplateLiteral;
    protected parseMemberWithPresentNewPrefixesExpression(): ExpressionNode;
    protected parseArguments(maybeArrow?: ParsingArrowHeadFlag): ExpressionNode[];
    protected parseAssignmentExpressionCoverGrammar(): ExpressionNode;
    protected parseAssignmentExpression(): ExpressionNode;
    private checkParamType;
    protected parseArrowFunctionLiteral(parameters: DeclarationExpression[], kind: FunctionKind, range: Range): ExpressionNode;
    protected parseRegExpLiteral(): ExpressionNode;
    protected parseArrayLiteral(isPattern: boolean): import("../index.js").ArrayExpression | import("../index.js").ArrayPattern;
    protected parsePossibleDestructuringSubPattern(): ExpressionNode;
    protected parseObjectLiteral(isPattern: boolean): ExpressionNode;
    protected parseObjectPropertyDefinition(isPattern: boolean): ExpressionNode;
    protected parseProperty(propInfo: PropertyKindInfo): ExpressionNode;
    protected parseMemberExpressionContinuation(expression: ExpressionNode): ExpressionNode;
    protected doParseMemberExpressionContinuation(expression: ExpressionNode): ExpressionNode;
    protected parsePropertyOrPrivatePropertyName(): ExpressionNode;
    protected parsePipelineExpression(expression: ExpressionNode): ExpressionNode;
    protected parsePipelineBody(lhs: ExpressionNode): ExpressionNode;
    protected parseConditionalExpression(): ExpressionNode;
    protected parseLogicalExpression(): ExpressionNode;
    protected parseBinaryContinuation(x: ExpressionNode, prec: number, prec1: number): ExpressionNode;
    protected parseBinaryExpression(precedence: number): ExpressionNode;
    protected parseUnaryExpression(): ExpressionNode;
    protected parseUnaryOrPrefixExpression(): ExpressionNode;
    protected parsePostfixExpression(): ExpressionNode;
    protected parsePostfixContinuation(expression: ExpressionNode): ExpressionNode;
    protected parseLeftHandSideExpression(): ExpressionNode;
    protected parseLeftHandSideContinuation(result: ExpressionNode): ExpressionNode;
    protected parseAwaitExpression(): ExpressionNode;
    protected parseNullishExpression(expression: ExpressionNode): ExpressionNode;
    protected parseConditionalContinuation(expression: ExpressionNode): ExpressionNode;
    protected parseYieldExpression(): ExpressionNode;
    protected parseNewTargetExpression(start?: PositionMark): ExpressionNode;
    protected parseClassExpression(): ClassExpression;
    protected parseClassDeclaration(names: string[] | undefined, defaultExport: boolean, start: PositionMark): ClassDeclaration;
    protected parseClassLiteral(name: ExpressionNode | undefined, isStrictReserved: boolean): ExpressionNode;
    protected parseSuperExpression(): ExpressionNode;
    protected parseImportExpressions(): ExpressionNode;
    protected parseWithStatement(): ExpressionNode;
}
//# sourceMappingURL=inline.d.ts.map