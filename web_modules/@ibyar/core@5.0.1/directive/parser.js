import { Identifier, Token, TokenExpression, TokenStream } from '../../expressions@5.0.1/index.js';
class TokenConstant {
    static LET = new TokenExpression(Token.LET, [-1, -1]);
    static COMMA = new TokenExpression(Token.COMMA, [-1, -1]);
    static ASSIGN = new TokenExpression(Token.ASSIGN, [-1, -1]);
    static IMPLICIT = new TokenExpression(Token.IDENTIFIER, [-1, -1], new Identifier('$implicit'));
    static EOS = new TokenExpression(Token.EOS, [-1, -1]);
}
export class DirectiveExpressionParser {
    directiveName;
    stream;
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
    templateExpressions = new Array();
    directiveInputs = new Map();
    constructor(directiveName, stream) {
        this.directiveName = directiveName;
        this.stream = stream;
    }
    getDirectiveExpressionType() {
        return {
            templateExpressions: this.templateExpressions,
            directiveInputs: this.directiveInputs
        };
    }
    scan() {
        // parse 'let/const/var' if found, or switch to expression mode.
        if (this.isDeclareKeyword()) {
            this.parseTemplateInput(false);
        }
        else {
            // parse expression, possible ends is semicolon, comma, let and 'EOS'
            this.parseExpression(this.directiveName);
        }
        if (this.stream.peek().isType(Token.EOS)) {
            return;
        }
        this.consumeSemicolonOrComma();
        // parse let and parseDirectiveAndTemplateInputs
        while (this.stream.peek().isNotType(Token.EOS)) {
            this.parseTemplateInput(true) || this.parseDirectiveAndTemplateInputs();
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
    parseTemplateInput(allowComma) {
        // let = "let" :local "=" :export ";"?
        if (this.isDeclareKeyword()) {
            let peek = this.stream.peek();
            const list = [peek];
            this.consume(peek.token);
            this.consumeDeclarations(list);
            while (allowComma && this.stream.currentToken().isType(Token.COMMA)) {
                list.push(TokenConstant.COMMA);
                this.consumeDeclarations(list);
            }
            this.templateExpressions.push(list);
            return true;
        }
        return false;
    }
    consumeDeclarations(list) {
        const peek = this.stream.peek();
        if (Token.isOpenPair(peek.token) && peek.isNotType(Token.LPAREN)) {
            // object and array pattern, destructing
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
    }
    parseExpression(inputName) {
        const list = [];
        this.stream.readTokensConsiderPair(list, Token.SEMICOLON, Token.COMMA, Token.LET, Token.EOS);
        this.directiveInputs.set(inputName, list.map(this.mapTokenToString).join(' '));
    }
    /**
     * check if the first is
     * @returns `boolean`
     */
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
            inputToken = new TokenExpression(Token.IDENTIFIER, [-1, -1], new Identifier(identifierName));
        }
        // only template input
        // mapping from directive scope(context) to template scope
        if (this.isAsKeyword()) {
            // as = :export "as" :local ";"?
            this.consumeAsKeyword();
            // rewrite `input as alias`
            // ==> in template -> alias = input
            const aliasToken = this.stream.next();
            const aliasList = [];
            aliasList.push(aliasToken, TokenConstant.ASSIGN, inputToken, TokenConstant.EOS);
            this.templateExpressions.push(aliasList);
            return;
        }
        this.check(Token.ASSIGN) || this.check(Token.COLON);
        const list = [];
        // keyExp = :key ":"? :expression ("as" :local)? ";"?
        this.stream.readTokensConsiderPair(list, Token.SEMICOLON, Token.COMMA, Token.LET, Token.CONST, Token.VAR, Token.EOS);
        // mix for directive input and template input
        if (this.isAsKeyword()) {
            this.consumeAsKeyword();
            // rewrite `input {x: 7, y: 9} as alias` 
            // ==> in directive ->`input = {x: 7, y: 9}`
            // ==> or in template -> let alias = input
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