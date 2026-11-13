import type { ExpressionNode } from '../api/expression.js';
import { LanguageMode } from './language.js';
export declare class Token {
    private name;
    private precedence;
    /**
     * ___ ? ___ : ___
     */
    static readonly CONDITIONAL: Token;
    /**
     * ___ ?? ___
     */
    static readonly NULLISH: Token;
    /**
     * ___ |> ___ : ___ : ?
     * ___ |> ___ ( ___, ___ , ?)
     */
    static readonly PIPELINE: Token;
    /**
     * ___ || ___
     */
    static readonly OR: Token;
    /**
     * ___ && ___
     */
    static readonly AND: Token;
    /**
     * ___ | ___
     */
    static readonly BIT_OR: Token;
    /**
     * ___ ^ ___
     */
    static readonly BIT_XOR: Token;
    /**
     * ___ | ___
     */
    static readonly BIT_AND: Token;
    /**
     * ___ << ___
     */
    static readonly SHL: Token;
    /**
     * ___ >> ___
     */
    static readonly SAR: Token;
    /**
     * ___ >>> ___
     */
    static readonly SHR: Token;
    /**
     * ___ * ___
     */
    static readonly MUL: Token;
    /**
     * ___ / ___
     */
    static readonly DIV: Token;
    /**
     * ___ % ___
     */
    static readonly MOD: Token;
    /**
     * ___ %% ___
     */
    static readonly MODULO: Token;
    /**
     * ___ > ___
     */
    static readonly LARGER: Token;
    /**
     * ___ > ___
     */
    static readonly SMALLER: Token;
    /**
     * ___ ** ___
     */
    static readonly EXP: Token;
    /**
     * ___ + ___
     */
    static readonly ADD: Token;
    /**
     * ___ - ___
     */
    static readonly SUB: Token;
    /**
     * ! ___
     */
    static readonly NOT: Token;
    /**
     * ~ ___
     */
    static readonly BIT_NOT: Token;
    /**
     * ___ < ___
     */
    static readonly LT: Token;
    /**
     * ___ > ___
     */
    static readonly GT: Token;
    /**
     * ___++
     *
     * ++___
     */
    static readonly INC: Token;
    /**
     * ___--
     *
     * --___
     */
    static readonly DEC: Token;
    /**
     * ___ == ___
     */
    static readonly EQ: Token;
    /**
     * ___ === ___
     */
    static readonly EQ_STRICT: Token;
    /**
     * ___ != ___
     */
    static readonly NE: Token;
    /**
     * ___ !== ___
     */
    static readonly NE_STRICT: Token;
    /**
     * ___ <= ___
     */
    static readonly LTE: Token;
    /**
     * ___ >= ___
     */
    static readonly GTE: Token;
    /**
     * ___ <=> ___
     */
    static readonly SPACESHIP: Token;
    /**
     * ___ = ___
     */
    static readonly ASSIGN: Token;
    /**
     * ___ += ___
     */
    static readonly ADD_ASSIGN: Token;
    /**
     * ___ -= ___
     */
    static readonly SUB_ASSIGN: Token;
    /**
     * ___ *= ___
     */
    static readonly MUL_ASSIGN: Token;
    /**
     * ___ /= ___
     */
    static readonly DIV_ASSIGN: Token;
    /**
     * ___ %= ___
     */
    static readonly MOD_ASSIGN: Token;
    /**
     * ___ %% ___
     */
    static readonly MODULO_ASSIGN: Token;
    /**
     * ___ > ___
     */
    static readonly LARGER_ASSIGN: Token;
    /**
     * ___ > ___
     */
    static readonly SMALLER_ASSIGN: Token;
    /**
     * ___ **= ___
     */
    static readonly EXP_ASSIGN: Token;
    /**
     * ___ ^= ___
     */
    static readonly BIT_XOR_ASSIGN: Token;
    /**
     * ___ &= ___
     */
    static readonly BIT_AND_ASSIGN: Token;
    /**
     * ___ |= ___
     */
    static readonly BIT_OR_ASSIGN: Token;
    /**
     * ___ &&= ___
     */
    static readonly AND_ASSIGN: Token;
    /**
     * ___ ||= ___
     */
    static readonly OR_ASSIGN: Token;
    /**
     * ___ ??= ___
     */
    static readonly NULLISH_ASSIGN: Token;
    /**
     * ___ <<= ___
     */
    static readonly SHL_ASSIGN: Token;
    /**
     * ___ >>= ___
     */
    static readonly SAR_ASSIGN: Token;
    /**
     * ___ >>>= ___
     */
    static readonly SHR_ASSIGN: Token;
    /**
     * ___ . ___
     */
    static readonly PERIOD: Token;
    /**
     * ___ ?. ___
     *
     *  ___?.[___]
     *
     *  ___?.()
     */
    static readonly QUESTION_PERIOD: Token;
    /**
     * ___ :: ___
     */
    static readonly BIND: Token;
    /**
     * ___ ?:: ___
     *
     *  ___?::[___]
     *
     *  ___?::()
     */
    static readonly QUESTION_BIND: Token;
    /**
     * (
     */
    static readonly LPAREN: Token;
    /**
     * )
     */
    static readonly RPAREN: Token;
    /**
     * [
     */
    static readonly LBRACK: Token;
    /**
     * ]
     */
    static readonly RBRACK: Token;
    /**
     * {
     */
    static readonly LBRACE: Token;
    /**
     * }
     */
    static readonly RBRACE: Token;
    /**
     * :
     */
    static readonly COLON: Token;
    /**
     * ...
     */
    static readonly ELLIPSIS: Token;
    /**
     * ;
     */
    static readonly SEMICOLON: Token;
    /**
     * end of source
     */
    static readonly EOS: Token;
    /**
     * =>
     */
    static readonly ARROW: Token;
    /**
     * ___, ___, ___
     */
    static readonly COMMA: Token;
    static readonly ASYNC: Token;
    static readonly AWAIT: Token;
    static readonly BREAK: Token;
    static readonly CASE: Token;
    static readonly CATCH: Token;
    static readonly CLASS: Token;
    static readonly CONST: Token;
    static readonly USING: Token;
    static readonly CONTINUE: Token;
    static readonly DEBUGGER: Token;
    static readonly DEFAULT: Token;
    static readonly DELETE: Token;
    static readonly DO: Token;
    static readonly ELSE: Token;
    static readonly ENUM: Token;
    static readonly EXPORT: Token;
    static readonly EXTENDS: Token;
    static readonly FALSE_LITERAL: Token;
    static readonly FINALLY: Token;
    static readonly FOR: Token;
    static readonly FUNCTION: Token;
    static readonly GET: Token;
    static readonly IF: Token;
    static readonly IMPLEMENTS: Token;
    static readonly IMPORT: Token;
    static readonly PRIVATE_NAME: Token;
    static readonly IN: Token;
    static readonly INSTANCEOF: Token;
    static readonly LET: Token;
    static readonly NEW: Token;
    static readonly NULL_LITERAL: Token;
    static readonly UNDEFINED_LITERAL: Token;
    static readonly PACKAGE: Token;
    static readonly INTERFACE: Token;
    static readonly PRIVATE: Token;
    static readonly PROTECTED: Token;
    static readonly PUBLIC: Token;
    static readonly RETURN: Token;
    static readonly SET: Token;
    static readonly STATIC: Token;
    static readonly SUPER: Token;
    static readonly SWITCH: Token;
    static readonly THIS: Token;
    static readonly THROW: Token;
    static readonly TRUE_LITERAL: Token;
    static readonly TRY: Token;
    static readonly TYPEOF: Token;
    static readonly VAR: Token;
    static readonly VOID: Token;
    static readonly WHILE: Token;
    static readonly WITH: Token;
    static readonly YIELD: Token;
    static readonly NUMBER: Token;
    static readonly BIGINT: Token;
    static readonly STRING: Token;
    static readonly IDENTIFIER: Token;
    /**
     * TEMPLATE_SPAN ::
     *
     * 		` LiteralChars* ${
     * 		| } LiteralChars* ${
     */
    static readonly TEMPLATE_SPAN: Token;
    /**
     * TEMPLATE_TAIL ::
     *
     * 		` LiteralChars* `
     * 		| } LiteralChar* `
     */
    static readonly TEMPLATE_TAIL: Token;
    static readonly ILLEGAL: Token;
    static readonly ESCAPED_KEYWORD: Token;
    static readonly WHITESPACE: Token;
    static readonly REGEXP_LITERAL: Token;
    static isPair(token: Token): boolean;
    static isOpenPair(token: Token): boolean;
    static isClosePair(token: Token): boolean;
    static openOf(token: Token): Token;
    static closeOf(token: Token): Token;
    static isAnyIdentifier(token: Token): boolean;
    static isIdentifier(token: Token): boolean;
    static isLiteral(token: Token): boolean;
    static isArrowOrAssignmentOp(token: Token): boolean;
    static isAssignment(token: Token): boolean;
    static isLogicalAssignmentOp(token: Token): boolean;
    static isAutoSemicolon(token: Token): boolean;
    static isMember(token: Token): boolean;
    static isTemplate(token: Token): boolean;
    static isNextLetKeyword(token: Token): boolean;
    static isInRangeIdentifierAndAsync(token: Token): boolean;
    static isPropertyOrCall(token: Token): boolean;
    static isPropertyName(token: Token): boolean;
    private static isInRange;
    static isProperty(token: number | Token): boolean;
    static isBinary(token: number | Token): boolean;
    static isCompare(token: Token): boolean;
    static isOrderedRelationalCompare(token: Token): boolean;
    static isEquality(token: Token): boolean;
    static binaryOpForAssignment(token: Token): boolean;
    static isBitOp(token: Token): boolean;
    static isUnary(token: Token): boolean;
    static isCount(token: Token): boolean;
    static isUnaryOrCount(token: Token): boolean;
    static isShift(token: Token): boolean;
    static isStrictReservedWord(token: Token): boolean;
    static isPipelineOperator(token: Token): boolean;
    static isValidIdentifier(token: Token, mode: LanguageMode, isGenerator: boolean, disallowAwait: boolean): boolean;
    static precedence(token: Token, acceptIN: boolean): number;
    constructor(name: string, precedence: number);
    getName(): string;
    getPrecedence(): number;
    equal(token: Token): boolean;
}
export declare class TokenExpression {
    token: Token;
    range: [number, number];
    value?: ExpressionNode | undefined;
    constructor(token: Token, range: [number, number], value?: ExpressionNode | undefined);
    getValue<T extends ExpressionNode>(): T;
    isType(type: Token): boolean;
    isNotType(type: Token): boolean;
    test(func: (token: Token, value?: ExpressionNode) => boolean): boolean;
    toString(): string;
}
//# sourceMappingURL=token.d.ts.map