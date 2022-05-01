import { Identifier, Token, TokenExpression, TokenStream } from '../../expressions/index.js';
class TokenConstant {
}
TokenConstant.LET = new TokenExpression(Token.LET);
TokenConstant.COMMA = new TokenExpression(Token.COMMA);
TokenConstant.ASSIGN = new TokenExpression(Token.ASSIGN);
TokenConstant.IMPLICIT = new TokenExpression(Token.IDENTIFIER, new Identifier('$implicit'));
TokenConstant.EOS = new TokenExpression(Token.EOS);
export class DirectiveExpressionParser {
    constructor(directiveName, stream) {
        this.directiveName = directiveName;
        this.stream = stream;
        this.templateExpressions = new Array();
        this.directiveInputs = new Map();
    }
    static parse(directiveName, expression) {
        const stream = TokenStream.getTokenStream(expression);
        const parser = new DirectiveExpressionParser(directiveName, stream);
        try {
            parser.scan();
        }
        catch (error) {
            console.error('error parsing template expression', expression, parser, error);
        }
        return parser.getDirectiveExpressionType();
    }
    getDirectiveExpressionType() {
        return {
            templateExpressions: this.templateExpressions,
            directiveInputs: this.directiveInputs
        };
    }
    scan() {
        if (this.isDeclareKeyword()) {
            this.parseTemplateInput();
        }
        else {
            this.parseExpression(this.directiveName);
        }
        if (this.stream.peek().isType(Token.EOS)) {
            return;
        }
        this.consumeSemicolonOrComma();
        while (this.stream.peek().isNotType(Token.EOS)) {
            this.parseTemplateInput() || this.parseDirectiveAndTemplateInputs();
            this.consumeSemicolonOrComma();
        }
    }
    consume(token) {
        if (this.stream.next().isNotType(token)) {
            throw new Error(this.stream.createError(`Parsing ${JSON.stringify(token)}`));
        }
    }
    check(token) {
        const peek = this.stream.peek();
        if (peek.isType(token)) {
            this.stream.next();
            return true;
        }
        return false;
    }
    consumeToList(token, list) {
        const next = this.stream.next();
        if (next.isNotType(token)) {
            throw new Error(this.stream.createError(`Parsing ${JSON.stringify(token)}`));
        }
        list.push(next);
    }
    consumeIfToken(token, list) {
        const next = this.stream.peek();
        if (next.isNotType(token)) {
            return false;
        }
        list.push(next);
        this.stream.next();
        return true;
    }
    isDeclareKeyword() {
        const peek = this.stream.peek();
        return peek.isType(Token.LET) || peek.isType(Token.CONST) || peek.isType(Token.VAR);
    }
    isIdentifier() {
        return this.stream.peek().isType(Token.IDENTIFIER);
    }
    isAsKeyword() {
        const peek = this.stream.peek();
        return peek.isType(Token.IDENTIFIER) && (peek.getValue().getName() == 'as');
    }
    consumeAsKeyword() {
        this.consume(Token.IDENTIFIER);
    }
    isSemicolon() {
        return this.stream.peek().isType(Token.SEMICOLON);
    }
    isComma() {
        return this.stream.peek().isType(Token.COMMA);
    }
    consumeSemicolonOrComma() {
        let peek = this.stream.peek();
        if (peek.isType(Token.SEMICOLON) || peek.isType(Token.COMMA)) {
            this.stream.next();
            return;
        }
    }
    parseTemplateInput() {
        if (this.isDeclareKeyword()) {
            let peek = this.stream.peek();
            const list = [peek];
            this.consume(peek.token);
            peek = this.stream.peek();
            if (Token.isOpenPair(peek.token) && peek.isNotType(Token.L_PARENTHESES)) {
                this.stream.readTill(Token.closeOf(peek.token), list);
            }
            else if (peek.isType(Token.IDENTIFIER)) {
                this.consumeToList(Token.IDENTIFIER, list);
            }
            else {
                throw new Error(this.stream.createError(`Can't parse let/const/var {IDENTIFIER/ObjectPattern}`));
            }
            if (this.consumeIfToken(Token.ASSIGN, list)) {
                this.stream.readTokensConsiderPair(list, Token.SEMICOLON, Token.COMMA, Token.LET, Token.CONST, Token.VAR, Token.EOS);
            }
            else {
                list.push(TokenConstant.ASSIGN, TokenConstant.IMPLICIT);
            }
            this.templateExpressions.push(list);
            return true;
        }
        return false;
    }
    parseExpression(inputName) {
        const list = [];
        this.stream.readTokensConsiderPair(list, Token.SEMICOLON, Token.COMMA, Token.LET, Token.EOS);
        this.directiveInputs.set(inputName, list.map(this.mapTokenToString).join(' '));
    }
    parseDirectiveAndTemplateInputs() {
        if (this.stream.peek().isType(Token.EOS)) {
            return;
        }
        let inputToken;
        if (this.isIdentifier()) {
            inputToken = this.stream.next();
        }
        else {
            inputToken = this.stream.next();
            const identifierName = inputToken.token.getName();
            inputToken = new TokenExpression(Token.IDENTIFIER, new Identifier(identifierName));
        }
        if (this.isAsKeyword()) {
            this.consumeAsKeyword();
            const aliasToken = this.stream.next();
            const aliasList = [];
            aliasList.push(aliasToken, TokenConstant.ASSIGN, inputToken, TokenConstant.EOS);
            this.templateExpressions.push(aliasList);
            return;
        }
        this.check(Token.ASSIGN) || this.check(Token.COLON);
        const list = [];
        this.stream.readTokensConsiderPair(list, Token.SEMICOLON, Token.COMMA, Token.LET, Token.CONST, Token.VAR, Token.EOS);
        if (this.isAsKeyword()) {
            this.consumeAsKeyword();
            const aliasToken = this.stream.next();
            const aliasList = [];
            aliasList.push(TokenConstant.LET, aliasToken, TokenConstant.ASSIGN, inputToken, TokenConstant.EOS);
            this.templateExpressions.push(aliasList);
        }
        const inputName = inputToken.getValue().getName();
        this.directiveInputs.set(inputName, list.map(this.mapTokenToString).join(' '));
    }
    mapTokenToString(token) {
        if (token.value) {
            return token.value.toString();
        }
        return token.token.getName();
    }
}
//# sourceMappingURL=parser.js.map