import { isSloppy, } from './language.js';
export class Token {
    name;
    precedence;
    /**
     * ___ ? ___ : ___
     */
    static CONDITIONAL = new Token('?', 3);
    /**
     * ___ ?? ___
     */
    static NULLISH = new Token('??', 3);
    /**
     * ___ |> ___ : ___ : ?
     * ___ |> ___ ( ___, ___ , ?)
     */
    static PIPELINE = new Token('|>', 3);
    /**
     * ___ || ___
     */
    static OR = new Token('||', 4);
    /**
     * ___ && ___
     */
    static AND = new Token('&&', 5);
    /**
     * ___ | ___
     */
    static BIT_OR = new Token('|', 6);
    /**
     * ___ ^ ___
     */
    static BIT_XOR = new Token('^', 7);
    /**
     * ___ | ___
     */
    static BIT_AND = new Token('&', 8);
    /**
     * ___ << ___
     */
    static SHL = new Token('<<', 11);
    /**
     * ___ >> ___
     */
    static SAR = new Token('>>', 11);
    /**
     * ___ >>> ___
     */
    static SHR = new Token('>>>', 11);
    /**
     * ___ * ___
     */
    static MUL = new Token('*', 13);
    /**
     * ___ / ___
     */
    static DIV = new Token('/', 13);
    /**
     * ___ % ___
     */
    static MOD = new Token('%', 13);
    /**
     * ___ %% ___
     */
    static MODULO = new Token('%%', 13);
    /**
     * ___ > ___
     */
    static LARGER = new Token('>?', 13);
    /**
     * ___ > ___
     */
    static SMALLER = new Token('<?', 13);
    /**
     * ___ ** ___
     */
    static EXP = new Token('**', 14);
    /**
     * ___ + ___
     */
    static ADD = new Token('+', 12);
    /**
     * ___ - ___
     */
    static SUB = new Token('-', 12);
    /**
     * ! ___
     */
    static NOT = new Token('!', 0);
    /**
     * ~ ___
     */
    static BIT_NOT = new Token('~', 0);
    /**
     * ___ < ___
     */
    static LT = new Token('<', 10);
    /**
     * ___ > ___
     */
    static GT = new Token('>', 10);
    /**
     * ___++
     *
     * ++___
     */
    static INC = new Token('++', 0);
    /**
     * ___--
     *
     * --___
     */
    static DEC = new Token('--', 0);
    /**
     * ___ == ___
     */
    static EQ = new Token('==', 9);
    /**
     * ___ === ___
     */
    static EQ_STRICT = new Token('===', 9);
    /**
     * ___ != ___
     */
    static NE = new Token('!=', 9);
    /**
     * ___ !== ___
     */
    static NE_STRICT = new Token('!==', 9);
    /**
     * ___ <= ___
     */
    static LTE = new Token('<=', 10);
    /**
     * ___ >= ___
     */
    static GTE = new Token('>=', 10);
    /**
     * ___ <=> ___
     */
    static SPACESHIP = new Token('<=>', 10);
    /**
     * ___ = ___
     */
    static ASSIGN = new Token('=', 2);
    /**
     * ___ += ___
     */
    static ADD_ASSIGN = new Token('+=', 2);
    /**
     * ___ -= ___
     */
    static SUB_ASSIGN = new Token('-=', 2);
    /**
     * ___ *= ___
     */
    static MUL_ASSIGN = new Token('*=', 2);
    /**
     * ___ /= ___
     */
    static DIV_ASSIGN = new Token('/=', 2);
    /**
     * ___ %= ___
     */
    static MOD_ASSIGN = new Token('%=', 2);
    /**
     * ___ %% ___
     */
    static MODULO_ASSIGN = new Token('%%=', 2);
    /**
     * ___ > ___
     */
    static LARGER_ASSIGN = new Token('>?=', 2);
    /**
     * ___ > ___
     */
    static SMALLER_ASSIGN = new Token('<?=', 2);
    /**
     * ___ **= ___
     */
    static EXP_ASSIGN = new Token('**=', 2);
    /**
     * ___ ^= ___
     */
    static BIT_XOR_ASSIGN = new Token('^=', 2);
    /**
     * ___ &= ___
     */
    static BIT_AND_ASSIGN = new Token('&=', 2);
    /**
     * ___ |= ___
     */
    static BIT_OR_ASSIGN = new Token('|=', 2);
    /**
     * ___ &&= ___
     */
    static AND_ASSIGN = new Token('&&=', 2);
    /**
     * ___ ||= ___
     */
    static OR_ASSIGN = new Token('||=', 2);
    /**
     * ___ ??= ___
     */
    static NULLISH_ASSIGN = new Token('??=', 2);
    /**
     * ___ <<= ___
     */
    static SHL_ASSIGN = new Token('<<=', 2);
    /**
     * ___ >>= ___
     */
    static SAR_ASSIGN = new Token('>>=', 2);
    /**
     * ___ >>>= ___
     */
    static SHR_ASSIGN = new Token('>>>=', 2);
    /**
     * ___ . ___
     */
    static PERIOD = new Token('.', 0);
    /**
     * ___ ?. ___
     *
     *  ___?.[___]
     *
     *  ___?.()
     */
    static QUESTION_PERIOD = new Token('?.', 0);
    /**
     * ___ :: ___
     */
    static BIND = new Token('::', 0);
    /**
     * ___ ?:: ___
     *
     *  ___?::[___]
     *
     *  ___?::()
     */
    static QUESTION_BIND = new Token('?::', 0);
    /**
     * (
     */
    static LPAREN = new Token('(', 0);
    /**
     * )
     */
    static RPAREN = new Token(')', 0);
    /**
     * [
     */
    static LBRACK = new Token('[', 0);
    /**
     * ]
     */
    static RBRACK = new Token(']', 0);
    /**
     * {
     */
    static LBRACE = new Token('{', 0);
    /**
     * }
     */
    static RBRACE = new Token('}', 0);
    /**
     * :
     */
    static COLON = new Token(':', 0);
    /**
     * ...
     */
    static ELLIPSIS = new Token('...', 0);
    /**
     * ;
     */
    static SEMICOLON = new Token(';', 0);
    /**
     * end of source
     */
    static EOS = new Token('EOS', 0);
    /**
     * =>
     */
    static ARROW = new Token('=>', 0);
    /**
     * ___, ___, ___
     */
    static COMMA = new Token(',', 1);
    static ASYNC = new Token('async', 0);
    static AWAIT = new Token('await', 0);
    static BREAK = new Token('break', 0);
    static CASE = new Token('case', 0);
    static CATCH = new Token('catch', 0);
    static CLASS = new Token('class', 0);
    static CONST = new Token('const', 0);
    static USING = new Token('using', 0);
    static CONTINUE = new Token('continue', 0);
    static DEBUGGER = new Token('debugger', 0);
    static DEFAULT = new Token('default', 0);
    static DELETE = new Token('delete', 0);
    static DO = new Token('do', 0);
    static ELSE = new Token('else', 0);
    static ENUM = new Token('enum', 0);
    static EXPORT = new Token('export', 0);
    static EXTENDS = new Token('extends', 0);
    static FALSE_LITERAL = new Token('false', 0);
    static FINALLY = new Token('finally', 0);
    static FOR = new Token('for', 0);
    static FUNCTION = new Token('function', 0);
    static GET = new Token('get', 0);
    static IF = new Token('if', 0);
    static IMPLEMENTS = new Token('implements', 0);
    static IMPORT = new Token('import', 0);
    static PRIVATE_NAME = new Token('PRIVATE_NAME', 0);
    static IN = new Token('in', 10);
    static INSTANCEOF = new Token('instanceof', 10);
    static LET = new Token('let', 0);
    static NEW = new Token('new', 0);
    static NULL_LITERAL = new Token('null', 0);
    static UNDEFINED_LITERAL = new Token('undefined', 0);
    static PACKAGE = new Token('package', 0);
    static INTERFACE = new Token('interface', 0);
    static PRIVATE = new Token('private', 0);
    static PROTECTED = new Token('protected', 0);
    static PUBLIC = new Token('public', 0);
    static RETURN = new Token('return', 0);
    static SET = new Token('set', 0);
    static STATIC = new Token('static', 0);
    static SUPER = new Token('super', 0);
    static SWITCH = new Token('switch', 0);
    static THIS = new Token('this', 0);
    static THROW = new Token('throw', 0);
    static TRUE_LITERAL = new Token('true', 0);
    static TRY = new Token('try', 0);
    static TYPEOF = new Token('typeof', 0);
    static VAR = new Token('var', 0);
    static VOID = new Token('void', 0);
    static WHILE = new Token('while', 0);
    static WITH = new Token('with', 0);
    static YIELD = new Token('yield', 0);
    static NUMBER = new Token('NUMBER', 0);
    static BIGINT = new Token('BIGINT', 0);
    static STRING = new Token('STRING', 0);
    static IDENTIFIER = new Token('IDENTIFIER', 0);
    /**
     * TEMPLATE_SPAN ::
     *
     * 		` LiteralChars* ${
     * 		| } LiteralChars* ${
     */
    static TEMPLATE_SPAN = new Token('TEMPLATE_SPAN', 0);
    /**
     * TEMPLATE_TAIL ::
     *
     * 		` LiteralChars* `
     * 		| } LiteralChar* `
     */
    static TEMPLATE_TAIL = new Token('TEMPLATE_TAIL', 0);
    static ILLEGAL = new Token('ILLEGAL', 0);
    static ESCAPED_KEYWORD = new Token('ESCAPED_KEYWORD', 0);
    static WHITESPACE = new Token('WHITESPACE', 0);
    static REGEXP_LITERAL = new Token('REGEXP_LITERAL', 0);
    static isPair(token) {
        switch (token) {
            case Token.LPAREN:
            case Token.LBRACK:
            case Token.LBRACE:
            case Token.RBRACE:
            case Token.RBRACK:
            case Token.RPAREN:
                return true;
            default:
                return false;
        }
    }
    static isOpenPair(token) {
        switch (token) {
            case Token.LPAREN:
            case Token.LBRACK:
            case Token.LBRACE:
                return true;
            default:
                return false;
        }
    }
    static isClosePair(token) {
        switch (token) {
            case Token.RBRACE:
            case Token.RBRACK:
            case Token.RPAREN:
                return true;
            default:
                return false;
        }
    }
    static openOf(token) {
        switch (token) {
            case Token.RBRACE:
                return Token.LBRACE;
            case Token.RBRACK:
                return Token.LBRACK;
            case Token.RPAREN:
                return Token.LPAREN;
        }
        return token;
    }
    static closeOf(token) {
        switch (token) {
            case Token.LBRACE:
                return Token.RBRACE;
            case Token.LBRACK:
                return Token.RBRACK;
            case Token.LPAREN:
                return Token.RPAREN;
        }
        return token;
    }
    static isAnyIdentifier(token) {
        switch (token) {
            case Token.IDENTIFIER:
            case Token.GET:
            case Token.SET:
            case Token.ASYNC:
            case Token.AWAIT:
            case Token.YIELD:
            case Token.LET:
            case Token.STATIC:
                return true;
        }
        return false;
    }
    static isIdentifier(token) {
        switch (token) {
            case Token.IDENTIFIER:
            case Token.GET:
            case Token.SET:
            case Token.ASYNC:
                return true;
        }
        return false;
    }
    static isLiteral(token) {
        switch (token) {
            case Token.UNDEFINED_LITERAL:
            case Token.NULL_LITERAL:
            case Token.TRUE_LITERAL:
            case Token.FALSE_LITERAL:
            case Token.NUMBER:
            case Token.BIGINT:
            case Token.STRING:
            case Token.REGEXP_LITERAL:
                // case Token.SMI:
                return true;
        }
        return false;
    }
    static isArrowOrAssignmentOp(token) {
        return token === Token.ARROW || this.isAssignment(token);
    }
    static isAssignment(token) {
        switch (token) {
            case Token.ASSIGN:
            case Token.ADD_ASSIGN:
            case Token.SUB_ASSIGN:
            case Token.MUL_ASSIGN:
            case Token.DIV_ASSIGN:
            case Token.MOD_ASSIGN:
            case Token.MODULO_ASSIGN:
            case Token.EXP_ASSIGN:
            case Token.BIT_XOR_ASSIGN:
            case Token.BIT_AND_ASSIGN:
            case Token.BIT_OR_ASSIGN:
            case Token.AND_ASSIGN:
            case Token.OR_ASSIGN:
            case Token.NULLISH_ASSIGN:
            case Token.SHL_ASSIGN:
            case Token.SAR_ASSIGN:
            case Token.SHR_ASSIGN:
                return true;
        }
        return false;
    }
    static isLogicalAssignmentOp(token) {
        switch (token) {
            case Token.AND_ASSIGN:
            case Token.OR_ASSIGN:
            case Token.NULLISH_ASSIGN:
                return true;
        }
        return false;
    }
    static isAutoSemicolon(token) {
        switch (token) {
            case Token.SEMICOLON:
            case Token.RBRACE:
            case Token.EOS:
                return true;
        }
        return false;
    }
    static isMember(token) {
        switch (token) {
            case Token.TEMPLATE_SPAN:
            case Token.TEMPLATE_TAIL:
            case Token.PERIOD:
            case Token.LBRACK:
                return true;
        }
        return false;
    }
    static isTemplate(token) {
        switch (token) {
            case Token.TEMPLATE_SPAN:
            case Token.TEMPLATE_TAIL:
                return true;
        }
        return false;
    }
    static isNextLetKeyword(token) {
        switch (token) {
            case Token.LBRACE:
            case Token.LBRACK:
            case Token.IDENTIFIER:
            case Token.STATIC:
            case Token.LET: // `let let;` is disallowed by static semantics, but the
            // token must be first interpreted as a keyword in order
            // for those semantics to apply. This ensures that ASI is
            // not honored when a LineTerminator separates the tokens.
            case Token.YIELD:
            case Token.AWAIT:
            case Token.GET:
            case Token.SET:
            case Token.ASYNC:
                return true;
            // case Token.FUTURE_STRICT_RESERVED_WORD:
            // return is_sloppy(language_mode());
            default:
                return false;
        }
    }
    static isInRangeIdentifierAndAsync(token) {
        switch (token) {
            case Token.IDENTIFIER:
            case Token.GET:
            case Token.SET:
            case Token.ASYNC:
                return true;
            default:
                return false;
        }
    }
    static isPropertyOrCall(token) {
        switch (token) {
            case Token.TEMPLATE_SPAN:
            case Token.TEMPLATE_TAIL:
            case Token.PERIOD:
            case Token.LBRACK:
            case Token.QUESTION_PERIOD:
            case Token.LPAREN:
                return true;
        }
        return false;
    }
    static isPropertyName(token) {
        return /\w/.test(token.getName());
    }
    static isInRange(op, start, end) {
        return op >= start.precedence && op <= end.precedence;
    }
    static isProperty(token) {
        if (token instanceof Token) {
            token = token.precedence;
        }
        return Token.isInRange(token, Token.PERIOD, Token.LBRACK);
    }
    static isBinary(token) {
        if (token instanceof Token) {
            token = token.precedence;
        }
        return Token.isInRange(token, Token.COMMA, Token.SUB);
    }
    static isCompare(token) {
        switch (token) {
            case Token.EQ:
            case Token.EQ_STRICT:
            case Token.NE:
            case Token.NE_STRICT:
            case Token.LT:
            case Token.GT:
            case Token.LTE:
            case Token.GTE:
            case Token.SPACESHIP:
            case Token.INSTANCEOF:
            case Token.IN:
                return true;
        }
        return false;
    }
    static isOrderedRelationalCompare(token) {
        switch (token) {
            case Token.LT:
            case Token.GT:
            case Token.LTE:
            case Token.GTE:
            case Token.SPACESHIP:
                return true;
        }
        return false;
    }
    static isEquality(token) {
        switch (token) {
            case Token.EQ:
            case Token.EQ_STRICT:
                return true;
        }
        return false;
    }
    static binaryOpForAssignment(token) {
        if (Token.isInRange(token.precedence, Token.NULLISH_ASSIGN, Token.SUB_ASSIGN)) {
            const result = token.precedence - Token.NULLISH_ASSIGN.precedence + Token.NULLISH.precedence;
            return Token.isBinary(result);
        }
        return false;
    }
    static isBitOp(token) {
        switch (token) {
            case Token.BIT_NOT:
            case Token.BIT_OR:
            case Token.BIT_XOR:
            case Token.BIT_AND:
            case Token.SHL:
            case Token.SAR:
            case Token.SHR:
                return true;
        }
        return false;
    }
    static isUnary(token) {
        switch (token) {
            case Token.ADD:
            case Token.SUB:
            case Token.NOT:
            case Token.BIT_NOT:
            case Token.DELETE:
            case Token.AWAIT:
            case Token.TYPEOF:
            case Token.VOID:
                return true;
        }
        return false;
    }
    static isCount(token) {
        switch (token) {
            case Token.INC:
            case Token.DEC:
                return true;
        }
        return false;
    }
    static isUnaryOrCount(token) {
        switch (token) {
            case Token.ADD:
            case Token.SUB:
            case Token.INC:
            case Token.DEC:
            case Token.NOT:
            case Token.BIT_NOT:
            case Token.DELETE:
            // case Token.AWAIT:
            case Token.TYPEOF:
            case Token.VOID:
                return true;
        }
        return false;
    }
    static isShift(token) {
        switch (token) {
            case Token.SHL:
            case Token.SAR:
            case Token.SHR:
                return true;
        }
        return false;
    }
    static isStrictReservedWord(token) {
        switch (token) {
            case Token.IMPLEMENTS:
            case Token.INTERFACE:
            case Token.LET:
            case Token.PACKAGE:
            case Token.PRIVATE:
            case Token.PROTECTED:
            case Token.PUBLIC:
            case Token.STATIC:
                return true;
        }
        return false;
    }
    static isPipelineOperator(token) {
        switch (token) {
            case Token.PIPELINE:
                return true;
        }
        return false;
    }
    static isValidIdentifier(token, mode, isGenerator, disallowAwait) {
        if (Token.isInRangeIdentifierAndAsync(token))
            return true;
        if (token == Token.AWAIT)
            return !disallowAwait;
        if (token == Token.YIELD)
            return !isGenerator;
        return Token.isStrictReservedWord(token) && isSloppy(mode);
    }
    static precedence(token, acceptIN) {
        if (!acceptIN && Token.IN === token) {
            return 0;
        }
        return token.getPrecedence();
    }
    constructor(name, precedence) {
        this.name = name;
        this.precedence = precedence;
    }
    getName() {
        return this.name;
    }
    getPrecedence() {
        return this.precedence;
    }
    equal(token) {
        return this === token || this.name === token.name;
    }
}
export class TokenExpression {
    token;
    range;
    value;
    constructor(token, range, value) {
        this.token = token;
        this.range = range;
        this.value = value;
    }
    getValue() {
        return this.value;
    }
    isType(type) {
        return this.token === type;
    }
    isNotType(type) {
        return this.token !== type;
    }
    test(func) {
        return func(this.token, this.value);
    }
    toString() {
        return JSON.stringify(this);
    }
}
//# sourceMappingURL=token.js.map