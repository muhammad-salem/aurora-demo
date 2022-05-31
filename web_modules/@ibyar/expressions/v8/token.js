export class Token {
    constructor(name, precedence) {
        this.name = name;
        this.precedence = precedence;
    }
    static isPair(token) {
        switch (token) {
            case Token.L_PARENTHESES:
            case Token.L_BRACKETS:
            case Token.L_CURLY:
            case Token.R_CURLY:
            case Token.R_BRACKETS:
            case Token.R_PARENTHESES:
                return true;
            default:
                return false;
        }
    }
    static isOpenPair(token) {
        switch (token) {
            case Token.L_PARENTHESES:
            case Token.L_BRACKETS:
            case Token.L_CURLY:
                return true;
            default:
                return false;
        }
    }
    static isClosePair(token) {
        switch (token) {
            case Token.R_CURLY:
            case Token.R_BRACKETS:
            case Token.R_PARENTHESES:
                return true;
            default:
                return false;
        }
    }
    static openOf(token) {
        switch (token) {
            case Token.R_CURLY:
                return Token.L_CURLY;
            case Token.R_BRACKETS:
                return Token.L_BRACKETS;
            case Token.R_PARENTHESES:
                return Token.L_PARENTHESES;
        }
        return token;
    }
    static closeOf(token) {
        switch (token) {
            case Token.L_CURLY:
                return Token.R_CURLY;
            case Token.L_BRACKETS:
                return Token.R_BRACKETS;
            case Token.L_PARENTHESES:
                return Token.R_PARENTHESES;
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
            case Token.R_CURLY:
            case Token.EOS:
                return true;
        }
        return false;
    }
    static isMember(token) {
        switch (token) {
            case Token.TEMPLATE_LITERALS:
            case Token.PERIOD:
            case Token.L_BRACKETS:
                return true;
        }
        return false;
    }
    static isTemplate(token) {
        switch (token) {
            case Token.TEMPLATE_LITERALS:
                return true;
        }
        return false;
    }
    static isNextLetKeyword(token) {
        switch (token) {
            case Token.L_CURLY:
            case Token.L_BRACKETS:
            case Token.IDENTIFIER:
            case Token.STATIC:
            case Token.LET:
            case Token.YIELD:
            case Token.AWAIT:
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
            case Token.TEMPLATE_LITERALS:
            case Token.PERIOD:
            case Token.L_BRACKETS:
            case Token.QUESTION_PERIOD:
            case Token.L_PARENTHESES:
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
        return Token.isInRange(token, Token.PERIOD, Token.L_BRACKETS);
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
            case Token.AWAIT:
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
    static isValidIdentifier(token) {
        if (Token.isInRange(token.precedence, Token.IDENTIFIER, Token.ASYNC))
            return true;
        if (token == Token.AWAIT || token == Token.YIELD)
            return false;
        return Token.isStrictReservedWord(token) && false;
    }
    getName() {
        return this.name;
    }
    getPrecedence() {
        return this.precedence;
    }
}
Token.CONDITIONAL = new Token('?', 3);
Token.NULLISH = new Token('??', 3);
Token.PIPELINE = new Token('|>', 3);
Token.OR = new Token('||', 4);
Token.AND = new Token('&&', 5);
Token.BIT_OR = new Token('|', 6);
Token.BIT_XOR = new Token('^', 7);
Token.BIT_AND = new Token('&', 8);
Token.SHL = new Token('<<', 11);
Token.SAR = new Token('>>', 11);
Token.SHR = new Token('>>>', 11);
Token.MUL = new Token('*', 13);
Token.DIV = new Token('/', 13);
Token.MOD = new Token('%', 13);
Token.MODULO = new Token('%%', 13);
Token.LARGER = new Token('>?', 13);
Token.SMALLER = new Token('<?', 13);
Token.EXP = new Token('**', 14);
Token.ADD = new Token('+', 12);
Token.SUB = new Token('-', 12);
Token.NOT = new Token('!', 0);
Token.BIT_NOT = new Token('~', 0);
Token.LT = new Token('<', 10);
Token.GT = new Token('>', 10);
Token.INC = new Token('++', 0);
Token.DEC = new Token('--', 0);
Token.EQ = new Token('==', 9);
Token.EQ_STRICT = new Token('===', 9);
Token.NE = new Token('!=', 9);
Token.NE_STRICT = new Token('!==', 9);
Token.LTE = new Token('<=', 10);
Token.GTE = new Token('>=', 10);
Token.SPACESHIP = new Token('<=>', 10);
Token.ASSIGN = new Token('=', 2);
Token.ADD_ASSIGN = new Token('+=', 2);
Token.SUB_ASSIGN = new Token('-=', 2);
Token.MUL_ASSIGN = new Token('*=', 2);
Token.DIV_ASSIGN = new Token('/=', 2);
Token.MOD_ASSIGN = new Token('%=', 2);
Token.MODULO_ASSIGN = new Token('%%=', 2);
Token.LARGER_ASSIGN = new Token('>?=', 2);
Token.SMALLER_ASSIGN = new Token('<?=', 2);
Token.EXP_ASSIGN = new Token('**=', 2);
Token.BIT_XOR_ASSIGN = new Token('^=', 2);
Token.BIT_AND_ASSIGN = new Token('&=', 2);
Token.BIT_OR_ASSIGN = new Token('|=', 2);
Token.AND_ASSIGN = new Token('&&=', 2);
Token.OR_ASSIGN = new Token('||=', 2);
Token.NULLISH_ASSIGN = new Token('??=', 2);
Token.SHL_ASSIGN = new Token('<<=', 2);
Token.SAR_ASSIGN = new Token('>>=', 2);
Token.SHR_ASSIGN = new Token('>>>=', 2);
Token.PERIOD = new Token('.', 0);
Token.QUESTION_PERIOD = new Token('?.', 0);
Token.BIND = new Token('::', 0);
Token.QUESTION_BIND = new Token('?::', 0);
Token.L_PARENTHESES = new Token('(', 0);
Token.R_PARENTHESES = new Token(')', 0);
Token.L_BRACKETS = new Token('[', 0);
Token.R_BRACKETS = new Token(']', 0);
Token.L_CURLY = new Token('{', 0);
Token.R_CURLY = new Token('}', 0);
Token.COLON = new Token(':', 0);
Token.ELLIPSIS = new Token('...', 0);
Token.SEMICOLON = new Token(';', 0);
Token.EOS = new Token('EOS', 0);
Token.ARROW = new Token('=>', 0);
Token.COMMA = new Token(',', 1);
Token.ASYNC = new Token('async', 0);
Token.AWAIT = new Token('await', 0);
Token.BREAK = new Token('break', 0);
Token.CASE = new Token('case', 0);
Token.CATCH = new Token('catch', 0);
Token.CLASS = new Token('class', 0);
Token.CONST = new Token('const', 0);
Token.CONTINUE = new Token('continue', 0);
Token.DEBUGGER = new Token('debugger', 0);
Token.DEFAULT = new Token('default', 0);
Token.DELETE = new Token('delete', 0);
Token.DO = new Token('do', 0);
Token.ELSE = new Token('else', 0);
Token.ENUM = new Token('enum', 0);
Token.EXPORT = new Token('export', 0);
Token.EXTENDS = new Token('extends', 0);
Token.FALSE_LITERAL = new Token('false', 0);
Token.FINALLY = new Token('finally', 0);
Token.FOR = new Token('for', 0);
Token.FUNCTION = new Token('function', 0);
Token.GET = new Token('get', 0);
Token.IF = new Token('if', 0);
Token.IMPLEMENTS = new Token('implements', 0);
Token.IMPORT = new Token('import', 0);
Token.PRIVATE_NAME = new Token('PRIVATE_NAME', 0);
Token.IN = new Token('in', 10);
Token.INSTANCEOF = new Token('instanceof', 10);
Token.LET = new Token('let', 0);
Token.NEW = new Token('new', 0);
Token.NULL_LITERAL = new Token('null', 0);
Token.UNDEFINED_LITERAL = new Token('undefined', 0);
Token.PACKAGE = new Token('package', 0);
Token.INTERFACE = new Token('interface', 0);
Token.PRIVATE = new Token('private', 0);
Token.PROTECTED = new Token('protected', 0);
Token.PUBLIC = new Token('public', 0);
Token.RETURN = new Token('return', 0);
Token.SET = new Token('set', 0);
Token.STATIC = new Token('static', 0);
Token.SUPER = new Token('super', 0);
Token.SWITCH = new Token('switch', 0);
Token.THIS = new Token('this', 0);
Token.THROW = new Token('throw', 0);
Token.TRUE_LITERAL = new Token('true', 0);
Token.TRY = new Token('try', 0);
Token.TYPEOF = new Token('typeof', 0);
Token.VAR = new Token('var', 0);
Token.VOID = new Token('void', 0);
Token.WHILE = new Token('while', 0);
Token.YIELD = new Token('yield', 0);
Token.NUMBER = new Token('NUMBER', 0);
Token.BIGINT = new Token('BIGINT', 0);
Token.STRING = new Token('STRING', 0);
Token.IDENTIFIER = new Token('IDENTIFIER', 0);
Token.TEMPLATE_LITERALS = new Token('TEMPLATE_LITERALS', 0);
Token.ILLEGAL = new Token('ILLEGAL', 0);
Token.ESCAPED_KEYWORD = new Token('ESCAPED_KEYWORD', 0);
Token.WHITESPACE = new Token('WHITESPACE', 0);
Token.REGEXP_LITERAL = new Token('REGEXP_LITERAL', 0);
export class TokenExpression {
    constructor(token, value) {
        this.token = token;
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
        return func(this.token);
    }
    toString() {
        return JSON.stringify(this);
    }
}
//# sourceMappingURL=token.js.map