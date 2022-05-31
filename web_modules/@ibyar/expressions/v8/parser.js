import { Token } from './token.js';
import { TokenStream } from './stream.js';
import { OfNode, Identifier, ThisNode, GetIdentifier, SetIdentifier, AsyncIdentifier, NullNode, StringLiteral, AwaitIdentifier, ConstructorIdentifier, NameIdentifier, EvalIdentifier, ArgumentsIdentifier, TaggedTemplateExpression, TemplateLiteral } from '../api/definition/values.js';
import { EmptyStatement } from '../api/statement/control/empty.js';
import { BlockStatement } from '../api/statement/control/block.js';
import { ArrowFunctionExpression, ArrowFunctionType, FunctionKind, Param, FunctionExpression, FunctionDeclaration } from '../api/definition/function.js';
import { IfStatement } from '../api/statement/control/if.js';
import { NewExpression } from '../api/computing/new.js';
import { SpreadElement } from '../api/computing/spread.js';
import { RestElement } from '../api/computing/rest.js';
import { AssignmentExpression } from '../api/operators/assignment.js';
import { GroupingExpression } from '../api/operators/grouping.js';
import { MemberExpression } from '../api/definition/member.js';
import { BindExpression } from '../api/definition/bind.js';
import { ObjectExpression, Property, ObjectPattern } from '../api/definition/object.js';
import { ArrayExpression, ArrayPattern } from '../api/definition/array.js';
import { CallExpression } from '../api/computing/call.js';
import { DoWhileNode, WhileNode } from '../api/statement/iterations/while.js';
import { CatchClauseNode, ThrowStatement, TryCatchNode } from '../api/computing/throw.js';
import { SwitchCase, DefaultExpression, SwitchStatement } from '../api/statement/control/switch.js';
import { BreakStatement, ContinueStatement } from '../api/statement/control/terminate.js';
import { ReturnStatement } from '../api/computing/return.js';
import { YieldExpression } from '../api/computing/yield.js';
import { VariableDeclarator, VariableDeclarationNode } from '../api/statement/declarations/declares.js';
import { ForNode, ForOfNode, ForInNode, ForAwaitOfNode } from '../api/statement/iterations/for.js';
import { ConditionalExpression } from '../api/operators/ternary.js';
import { PipelineExpression } from '../api/operators/pipeline.js';
import { LogicalExpression } from '../api/operators/logical.js';
import { SequenceExpression } from '../api/operators/comma.js';
import { ChainExpression } from '../api/operators/chaining.js';
import { ExpressionStatement } from '../api/definition/statement.js';
import { buildPostfixExpression, buildUnaryExpression, expressionFromLiteral, shortcutNumericLiteralBinaryExpression } from './nodes.js';
import { BinaryExpression } from '../api/operators/binary.js';
export var ParsingArrowHeadFlag;
(function (ParsingArrowHeadFlag) {
    ParsingArrowHeadFlag[ParsingArrowHeadFlag["CertainlyNotArrowHead"] = 0] = "CertainlyNotArrowHead";
    ParsingArrowHeadFlag[ParsingArrowHeadFlag["MaybeArrowHead"] = 1] = "MaybeArrowHead";
    ParsingArrowHeadFlag[ParsingArrowHeadFlag["AsyncArrowFunction"] = 2] = "AsyncArrowFunction";
})(ParsingArrowHeadFlag || (ParsingArrowHeadFlag = {}));
export var PropertyKind;
(function (PropertyKind) {
    PropertyKind[PropertyKind["Value"] = 0] = "Value";
    PropertyKind[PropertyKind["Shorthand"] = 1] = "Shorthand";
    PropertyKind[PropertyKind["ShorthandOrClassField"] = 2] = "ShorthandOrClassField";
    PropertyKind[PropertyKind["Assign"] = 3] = "Assign";
    PropertyKind[PropertyKind["Method"] = 4] = "Method";
    PropertyKind[PropertyKind["ClassField"] = 5] = "ClassField";
    PropertyKind[PropertyKind["AccessorGetter"] = 6] = "AccessorGetter";
    PropertyKind[PropertyKind["AccessorSetter"] = 7] = "AccessorSetter";
    PropertyKind[PropertyKind["Spread"] = 8] = "Spread";
    PropertyKind[PropertyKind["NotSet"] = 9] = "NotSet";
})(PropertyKind || (PropertyKind = {}));
export function isAccessor(kind) {
    return kind === PropertyKind.AccessorGetter || kind === PropertyKind.AccessorSetter;
}
export function parsePropertyKindFromToken(token, info) {
    switch (token) {
        case Token.COLON:
            info.kind = PropertyKind.Value;
            return true;
        case Token.COMMA:
            info.kind = PropertyKind.Shorthand;
            return true;
        case Token.R_CURLY:
            info.kind = PropertyKind.ShorthandOrClassField;
            return true;
        case Token.ASSIGN:
            info.kind = PropertyKind.Assign;
            return true;
        case Token.L_PARENTHESES:
            info.kind = PropertyKind.Method;
            return true;
        case Token.MUL:
        case Token.SEMICOLON:
            info.kind = PropertyKind.ClassField;
            return true;
        default:
            break;
    }
    return false;
}
export var PreParserIdentifierType;
(function (PreParserIdentifierType) {
    PreParserIdentifierType["NullIdentifier"] = "NullIdentifier";
    PreParserIdentifierType["UnknownIdentifier"] = "UnknownIdentifier";
    PreParserIdentifierType["EvalIdentifier"] = "EvalIdentifier";
    PreParserIdentifierType["ArgumentsIdentifier"] = "ArgumentsIdentifier";
    PreParserIdentifierType["ConstructorIdentifier"] = "ConstructorIdentifier";
    PreParserIdentifierType["AwaitIdentifier"] = "AwaitIdentifier";
    PreParserIdentifierType["AsyncIdentifier"] = "AsyncIdentifier";
    PreParserIdentifierType["NameIdentifier"] = "NameIdentifier";
    PreParserIdentifierType["PrivateNameIdentifier"] = "PrivateNameIdentifier";
})(PreParserIdentifierType || (PreParserIdentifierType = {}));
export class AbstractParser {
    constructor(scanner) {
        this.scanner = scanner;
    }
    position() {
        return this.scanner.getPos();
    }
    current() {
        return this.scanner.currentToken();
    }
    next() {
        return this.scanner.next();
    }
    peek() {
        return this.scanner.peek();
    }
    peekAhead() {
        return this.scanner.peekAhead();
    }
    peekAheadPosition() {
        return this.scanner.peekAheadPosition();
    }
    peekPosition() {
        return this.scanner.peekPosition();
    }
    consume(token) {
        if (this.scanner.next().isNotType(token)) {
            throw new Error(this.errorMessage(`Parsing ${JSON.stringify(token)}`));
        }
    }
    check(token) {
        const next = this.scanner.peek();
        if (next.isType(token)) {
            this.scanner.next();
            return true;
        }
        return false;
    }
    checkValue(value) {
        const next = this.scanner.peek();
        if (next.value == value) {
            this.scanner.next();
            return true;
        }
        return false;
    }
    expect(token) {
        const current = this.scanner.next();
        if (current.isNotType(token)) {
            throw new Error(this.errorMessage(`Unexpected Token: ${JSON.stringify(token)}, current is ${JSON.stringify(current)}`));
        }
    }
    checkInOrOf() {
        if (this.check(Token.IN)) {
            return 'IN';
        }
        else if (this.checkValue(OfNode)) {
            return 'OF';
        }
        return false;
    }
    peekInOrOf() {
        var next = this.peek();
        if (next.isType(Token.IN)) {
            return 'IN';
        }
        else if (next.value === OfNode) {
            return 'OF';
        }
        return false;
    }
    isEvalOrArguments(name) {
        if (name.toString() === 'eval') {
            return true;
        }
        else if (name.toString() === 'arguments') {
            return true;
        }
        return false;
    }
    isNextLetKeyword() {
        if (this.peek().isNotType(Token.LET)) {
            return false;
        }
        const nextNextToken = this.peekAhead().token;
        switch (nextNextToken) {
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
    isIdentifier(expression) {
        return expression instanceof Identifier;
    }
    isParenthesized(expression) {
        return expression instanceof GroupingExpression || expression instanceof SequenceExpression;
    }
    isAssignableIdentifier(expression) {
        if (!(expression instanceof Identifier)) {
            return false;
        }
        if (this.isEvalOrArguments(expression)) {
            return false;
        }
        return true;
    }
    isPattern(expression) {
        return expression instanceof ObjectPattern || expression instanceof ArrayPattern;
    }
    isProperty(expression) {
        return expression instanceof MemberExpression;
    }
    isCallNew(expression) {
        return expression instanceof NewExpression;
    }
    isCall(expression) {
        return expression instanceof CallExpression;
    }
    isEmptyStatement(expression) {
        return expression instanceof EmptyStatement;
    }
    isThisProperty(expression) {
        if (this.isProperty(expression)) {
            if (expression.getObject() === ThisNode || expression.getObject().toString() === 'this') {
                return true;
            }
        }
        return false;
    }
    isValidReferenceExpression(expression) {
        return this.isAssignableIdentifier(expression) || this.isProperty(expression);
    }
    expectSemicolon() {
        const tok = this.peek();
        if (tok.isType(Token.SEMICOLON)) {
            this.next();
            return;
        }
        if (this.scanner.hasLineTerminatorBeforeNext() || Token.isAutoSemicolon(tok.token)) {
            return;
        }
        if (this.scanner.currentToken().isType(Token.AWAIT)) {
            throw new Error(this.errorMessage(`Await Not In Async Context/Function`));
        }
    }
    peekAnyIdentifier() {
        return Token.isAnyIdentifier(this.peek().token);
    }
    errorMessage(message) {
        return this.scanner.createError(message);
    }
}
export class JavaScriptParser extends AbstractParser {
    static parse(source) {
        const stream = (typeof source === 'string' || Array.isArray(source))
            ? TokenStream.getTokenStream(source)
            : source;
        const parser = new JavaScriptParser(stream);
        return parser.scan();
    }
    scan() {
        const list = this.parseStatementList(Token.EOS);
        if (list.length === 1) {
            return list[0];
        }
        return new ExpressionStatement(list);
    }
    parseStatement() {
        switch (this.peek().token) {
            case Token.L_CURLY:
                return this.parseBlock();
            case Token.SEMICOLON:
                this.consume(Token.SEMICOLON);
                return EmptyStatement.INSTANCE;
            case Token.IF:
                return this.parseIfStatement();
            case Token.DO:
                return this.parseDoWhileStatement();
            case Token.WHILE:
                return this.parseWhileStatement();
            case Token.FOR:
                return this.parseForStatement();
            case Token.CONTINUE:
                return this.parseContinueStatement();
            case Token.BREAK:
                return this.parseBreakStatement();
            case Token.RETURN:
                return this.parseReturnStatement();
            case Token.THROW:
                return this.parseThrowStatement();
            case Token.TRY:
                return this.parseTryStatement();
            case Token.SWITCH:
                return this.parseSwitchStatement();
            case Token.VAR:
            case Token.LET:
            case Token.CONST:
                return this.parseVariableDeclarations();
            case Token.ASYNC:
                if (this.peekAhead().isType(Token.FUNCTION)) {
                    this.consume(Token.ASYNC);
                    this.consume(Token.FUNCTION);
                    if (this.peek().isType(Token.MUL)) {
                        return this.parseFunctionExpression(FunctionKind.ASYNC_GENERATOR);
                    }
                    return this.parseFunctionExpression(FunctionKind.ASYNC);
                }
            default:
                return this.parseExpressionOrLabelledStatement();
        }
    }
    parseTryStatement() {
        this.consume(Token.TRY);
        const tryBlock = this.parseBlock();
        if (tryBlock instanceof BlockStatement) {
            tryBlock.isStatement = true;
        }
        let peek = this.peek();
        if (peek.isNotType(Token.CATCH) && peek.isNotType(Token.FINALLY)) {
            throw new Error(this.errorMessage(`Uncaught SyntaxError: Missing catch or finally after try`));
        }
        let catchBlock;
        if (this.check(Token.CATCH)) {
            let catchVar;
            const hasBinding = this.check(Token.L_PARENTHESES);
            if (hasBinding) {
                catchVar = this.parseIdentifier();
                this.expect(Token.R_PARENTHESES);
            }
            const block = this.parseBlock();
            if (block instanceof BlockStatement) {
                block.isStatement = true;
            }
            catchBlock = new CatchClauseNode(block, catchVar);
        }
        let finallyBlock;
        if (this.check(Token.FINALLY)) {
            finallyBlock = this.parseBlock();
            if (finallyBlock instanceof BlockStatement) {
                finallyBlock.isStatement = true;
            }
        }
        return new TryCatchNode(tryBlock, catchBlock, finallyBlock);
    }
    parseBlock() {
        this.expect(Token.L_CURLY);
        const statements = [];
        const block = new BlockStatement(statements, false);
        while (this.peek().isNotType(Token.R_CURLY)) {
            const stat = this.parseStatementListItem();
            if (!stat) {
                return block;
            }
            else if (stat instanceof EmptyStatement) {
                continue;
            }
            statements.push(stat);
        }
        this.expect(Token.R_CURLY);
        return block;
    }
    parseStatementListItem() {
        switch (this.peek().token) {
            case Token.FUNCTION:
                this.consume(Token.FUNCTION);
                if (this.peek().isType(Token.MUL)) {
                    this.consume(Token.MUL);
                    return this.parseFunctionExpression(FunctionKind.GENERATOR);
                }
                return this.parseFunctionExpression(FunctionKind.NORMAL);
            case Token.CLASS:
                this.consume(Token.CLASS);
                return this.parseClassDeclaration(undefined, false);
            case Token.VAR:
            case Token.LET:
            case Token.CONST:
                return this.parseVariableDeclarations();
            case Token.ASYNC:
                if (this.peekAhead().isType(Token.FUNCTION)) {
                    this.consume(Token.ASYNC);
                    this.consume(Token.FUNCTION);
                    if (this.peek().isType(Token.MUL)) {
                        this.consume(Token.MUL);
                        return this.parseFunctionExpression(FunctionKind.ASYNC_GENERATOR);
                    }
                    return this.parseFunctionExpression(FunctionKind.ASYNC);
                }
                break;
            default:
                break;
        }
        return this.parseStatement();
    }
    parseFunctionExpression(type) {
        let funcName;
        const peek = this.peek();
        if (peek.isNotType(Token.L_PARENTHESES)) {
            if (peek.isType(Token.L_BRACKETS)) {
                this.consume(Token.L_BRACKETS);
                funcName = this.parseMemberExpression();
                this.expect(Token.R_BRACKETS);
            }
            else {
                funcName = this.parseIdentifier();
            }
        }
        return this.parseFunctionLiteral(type, funcName);
    }
    parseIfStatement() {
        this.consume(Token.IF);
        this.consume(Token.L_PARENTHESES);
        const condition = this.parseExpression();
        this.consume(Token.R_PARENTHESES);
        const thenStatement = this.parseStatement();
        if (thenStatement instanceof BlockStatement) {
            thenStatement.isStatement = true;
        }
        let elseStatement;
        if (this.peek().isType(Token.ELSE)) {
            this.consume(Token.ELSE);
            elseStatement = this.parseStatement();
        }
        return new IfStatement(condition, thenStatement, elseStatement);
    }
    parseDoWhileStatement() {
        this.consume(Token.DO);
        const body = this.parseStatement();
        if (body instanceof BlockStatement) {
            body.isStatement = true;
        }
        this.expect(Token.WHILE);
        this.expect(Token.L_PARENTHESES);
        const condition = this.parseExpression();
        this.expect(Token.R_PARENTHESES);
        this.check(Token.SEMICOLON);
        return new DoWhileNode(condition, body);
    }
    parseWhileStatement() {
        this.consume(Token.WHILE);
        this.expect(Token.L_PARENTHESES);
        const condition = this.parseExpression();
        this.expect(Token.R_PARENTHESES);
        const body = this.parseStatement();
        if (body instanceof BlockStatement) {
            body.isStatement = true;
        }
        return new WhileNode(condition, body);
    }
    parseThrowStatement() {
        this.consume(Token.THROW);
        if (this.scanner.hasLineTerminatorBeforeNext()) {
            throw new Error(this.scanner.createError(`New line After Throw`));
        }
        const exception = this.parseExpression();
        this.expectSemicolon();
        return new ThrowStatement(exception);
    }
    parseSwitchStatement() {
        this.consume(Token.SWITCH);
        this.expect(Token.L_PARENTHESES);
        const tag = this.parseExpression();
        this.expect(Token.R_PARENTHESES);
        const cases = [];
        const switchStatement = new SwitchStatement(tag, cases);
        let defaultSeen = false;
        this.expect(Token.L_CURLY);
        while (this.peek().isNotType(Token.R_CURLY)) {
            const statements = [];
            let label;
            if (this.check(Token.CASE)) {
                label = this.parseExpression();
            }
            else {
                this.expect(Token.DEFAULT);
                if (defaultSeen) {
                    throw new Error(this.errorMessage(`Multiple Defaults In Switch`));
                }
                defaultSeen = true;
            }
            this.expect(Token.COLON);
            while (this.peek().isNotType(Token.CASE)
                && this.peek().isNotType(Token.DEFAULT)
                && this.peek().isNotType(Token.R_CURLY)) {
                const statement = this.parseStatementListItem();
                if (!statement || this.isEmptyStatement(statement)) {
                    continue;
                }
                statements.push(statement);
            }
            const block = new BlockStatement(statements, true);
            const clause = defaultSeen ? new DefaultExpression(block) : new SwitchCase(label, block);
            cases.push(clause);
        }
        this.expect(Token.R_CURLY);
        return switchStatement;
    }
    parseForStatement() {
        this.consume(Token.FOR);
        const isAwait = this.check(Token.AWAIT);
        this.expect(Token.L_PARENTHESES);
        const peek = this.peek();
        const startsWithLet = peek.isType(Token.LET) || peek.isType(Token.VAR);
        let initializer;
        if (peek.isType(Token.CONST) || (startsWithLet && this.isNextLetKeyword())) {
            initializer = this.parseVariableDeclarations();
        }
        else if (peek.isType(Token.SEMICOLON)) {
            initializer = EmptyStatement.INSTANCE;
        }
        else {
            initializer = this.parseExpressionCoverGrammar();
        }
        if (initializer instanceof BinaryExpression) {
            const objectNode = initializer.getRight();
            initializer = initializer.getLeft();
            this.expect(Token.R_PARENTHESES);
            const statement = this.parseStatement();
            return new ForInNode(initializer, objectNode, statement);
        }
        const forMode = this.checkInOrOf();
        if (forMode) {
            const object = forMode === 'IN' ? this.parseAssignmentExpression() : this.parseExpression();
            this.expect(Token.R_PARENTHESES);
            const statement = this.parseStatement();
            if (statement instanceof BlockStatement) {
                statement.isStatement = true;
            }
            if (isAwait && forMode === 'OF') {
                return new ForAwaitOfNode(initializer, object, statement);
            }
            else if (forMode === 'OF') {
                return new ForOfNode(initializer, object, statement);
            }
            else if (forMode === 'IN') {
                return new ForInNode(initializer, object, statement);
            }
            else {
                throw new Error(this.errorMessage(`parsing for loop: ${this.position()}`));
            }
        }
        this.expect(Token.SEMICOLON);
        let condition;
        if (!this.check(Token.SEMICOLON)) {
            condition = this.parseExpression();
            this.expect(Token.SEMICOLON);
        }
        let finalExpression;
        if (!this.check(Token.R_PARENTHESES)) {
            finalExpression = this.parseExpression();
            this.expect(Token.R_PARENTHESES);
        }
        const body = this.parseStatement();
        if (body instanceof BlockStatement) {
            body.isStatement = true;
        }
        return new ForNode(body, initializer, condition, finalExpression);
    }
    parseVariableDeclarations() {
        let mode;
        const token = this.peek().token;
        switch (token) {
            case Token.CONST:
                this.consume(token);
                mode = 'const';
                break;
            case Token.VAR:
                this.consume(token);
                mode = 'var';
                break;
            case Token.LET:
            default:
                this.consume(token);
                mode = 'let';
                break;
        }
        const variables = [];
        do {
            let name;
            let value;
            if (Token.isAnyIdentifier(this.peek().token)) {
                name = this.parseAndClassifyIdentifier(this.next());
                if (this.isEvalOrArguments(name)) {
                    throw new Error(this.errorMessage(`Strict Eval Arguments`));
                }
            }
            else {
                name = this.parseBindingPattern(true);
            }
            if (this.check(Token.ASSIGN)) {
                value = this.parseAssignmentExpression();
            }
            else if (!this.peekInOrOf()) {
                if (mode === 'const' && (name === undefined || value === undefined)) {
                    throw new Error(this.errorMessage(`Declaration Missing Initializer : ${this.position()}`));
                }
            }
            variables.push(new VariableDeclarator(name, value));
        } while (this.check(Token.COMMA));
        return new VariableDeclarationNode(variables, mode);
    }
    parseBindingPattern(isPattern) {
        const token = this.peek().token;
        if (Token.isAnyIdentifier(token)) {
            const name = this.parseAndClassifyIdentifier(this.next());
            if (this.isEvalOrArguments(name)) {
                throw new Error(this.errorMessage(`Strict Eval Arguments`));
            }
            return name;
        }
        if (token == Token.L_BRACKETS) {
            return this.parseArrayLiteral(isPattern);
        }
        else if (token == Token.L_CURLY) {
            return this.parseObjectLiteral(isPattern);
        }
        else {
            throw new Error(this.errorMessage(`Unexpected Token: ${this.next().getValue()}`));
        }
    }
    parseAndClassifyIdentifier(next) {
        if (next.isType(Token.IDENTIFIER)) {
            return next.getValue();
        }
        else if (next.isType(Token.SET)) {
            const value = this.parseFunctionDeclaration();
            return new Property(next.getValue(), value, 'set');
        }
        else if (next.isType(Token.GET)) {
            const value = this.parseFunctionDeclaration();
            return new Property(next.getValue(), value, 'get');
        }
        else if (next.isType(Token.AWAIT)) {
            throw new Error(this.errorMessage(`un supported expression (await)`));
        }
        return next.getValue();
    }
    parseContinueStatement() {
        this.consume(Token.CONTINUE);
        this.expectSemicolon();
        return ContinueStatement.CONTINUE_INSTANCE;
    }
    parseBreakStatement() {
        this.consume(Token.BREAK);
        this.expectSemicolon();
        return BreakStatement.BREAK_INSTANCE;
    }
    parseReturnStatement() {
        this.consume(Token.RETURN);
        const tokenExp = this.peek();
        let returnValue;
        if (this.scanner.hasLineTerminatorBeforeNext() || Token.isAutoSemicolon(tokenExp.token)) {
        }
        else {
            returnValue = this.parseExpression();
        }
        this.expectSemicolon();
        return new ReturnStatement(returnValue);
    }
    parseExpressionOrLabelledStatement() {
        switch (this.peek().token) {
            case Token.FUNCTION:
            case Token.L_CURLY:
                throw new Error(this.errorMessage(`Unreachable state`));
            case Token.CLASS:
                throw new Error(this.errorMessage(`Unexpected Token ${this.next().getValue().toString()}`));
            case Token.LET: {
                const nextNext = this.peekAhead();
                if (nextNext.isNotType(Token.L_BRACKETS) &&
                    ((nextNext.isNotType(Token.L_CURLY) && nextNext.isNotType(Token.IDENTIFIER)))) {
                    break;
                }
                throw new Error(this.errorMessage(`Unexpected Lexical Declaration ${this.position()}`));
            }
            default:
                break;
        }
        const startsWithIdentifier = Token.isAnyIdentifier(this.peek().token);
        const expression = this.parseExpressionCoverGrammar();
        if (this.peek().isType(Token.COLON) && startsWithIdentifier && this.isIdentifier(expression)) {
            this.consume(Token.COLON);
            if (this.peek().isType(Token.FUNCTION)) {
                return this.parseFunctionDeclaration();
            }
            return this.parseStatement();
        }
        this.expectSemicolon();
        return expression;
    }
    parseExpression() {
        return this.parseExpressionCoverGrammar();
    }
    parseFunctionDeclaration() {
        this.consume(Token.FUNCTION);
        if (this.check(Token.MUL)) {
            throw new Error(this.errorMessage(`Error Generator In Single Statement Context`));
        }
        return this.parseHoistableDeclaration(FunctionKind.NORMAL);
    }
    parseFunctionDeclarationAndGenerator() {
        this.consume(Token.FUNCTION);
        if (this.check(Token.MUL)) {
            return this.parseHoistableDeclaration(FunctionKind.GENERATOR);
        }
        return this.parseHoistableDeclaration(FunctionKind.NORMAL);
    }
    parseHoistableDeclaration(flag) {
        if (FunctionKind.ASYNC === flag && this.check(Token.MUL)) {
            flag = FunctionKind.ASYNC_GENERATOR;
        }
        let name;
        if (this.peek().isNotType(Token.L_PARENTHESES)) {
            name = this.parseIdentifier();
        }
        return this.parseFunctionLiteral(flag, name);
    }
    parseIdentifier() {
        const next = this.next();
        if (!Token.isValidIdentifier(next.token)) {
            throw new Error(this.errorMessage(`Unexpected Token: ${next.getValue()}`));
        }
        if (next.isType(Token.IDENTIFIER)) {
            return next.getValue();
        }
        return this.getIdentifier();
    }
    getIdentifier() {
        const current = this.current();
        const string = current.getValue().toString();
        switch (current.token) {
            case Token.AWAIT:
                return AwaitIdentifier;
            case Token.ASYNC:
                return AsyncIdentifier;
            case Token.PRIVATE_NAME:
                return new Identifier(`#${string}`);
            default:
                break;
        }
        if (string == 'constructor') {
            return ConstructorIdentifier;
        }
        if (string == 'name') {
            return NameIdentifier;
        }
        if (string == 'eval') {
            return EvalIdentifier;
        }
        else if (string == 'arguments') {
            return ArgumentsIdentifier;
        }
        throw new Error(this.errorMessage(`can't identify token ${string}`));
    }
    parseFunctionLiteral(flag, name) {
        const functionInfo = {};
        this.expect(Token.L_PARENTHESES);
        const formals = this.parseFormalParameterList(functionInfo);
        this.expect(Token.R_PARENTHESES);
        const body = this.parseFunctionBody();
        if (name) {
            return new FunctionDeclaration(formals, body, flag, name, functionInfo.rest);
        }
        return new FunctionExpression(formals, body, flag, name, functionInfo.rest);
    }
    parseArrowFunctionBody() {
        const isExpression = this.peek().isNotType(Token.L_CURLY);
        if (isExpression) {
            const expression = this.parseAssignmentExpression();
            return expression;
        }
        else {
            return this.parseFunctionBody();
        }
    }
    parseFunctionBody() {
        this.expect(Token.L_CURLY);
        const list = this.parseStatementList(Token.R_CURLY);
        this.expect(Token.R_CURLY);
        return list;
    }
    parseStatementList(endToken) {
        const list = [];
        while (this.peek().isNotType(endToken)) {
            const stat = this.parseStatementListItem();
            if (!stat) {
                break;
            }
            if (this.isEmptyStatement(stat)) {
                continue;
            }
            list.push(stat);
        }
        return list;
    }
    parseFormalParameterList(functionInfo) {
        const parameters = [];
        if (this.peek().isNotType(Token.R_PARENTHESES)) {
            while (true) {
                const param = this.parseFormalParameter(functionInfo);
                parameters.push(param);
                if (functionInfo.rest) {
                    if (this.peek().isType(Token.COMMA)) {
                        throw new Error(this.errorMessage(`Param After Rest`));
                    }
                    break;
                }
                if (!this.check(Token.COMMA))
                    break;
                if (this.peek().isType(Token.R_PARENTHESES)) {
                    break;
                }
            }
        }
        return parameters;
    }
    parseFormalParameter(functionInfo) {
        functionInfo.rest = this.check(Token.ELLIPSIS);
        let pattern = this.parseBindingPattern(true);
        let initializer;
        if (this.check(Token.ASSIGN)) {
            if (functionInfo.rest) {
                throw new Error(this.errorMessage(`Rest Default Initializer`));
            }
            const value = this.parseAssignmentExpression();
            initializer = new Param(pattern, value);
        }
        else {
            initializer = new Param(pattern);
        }
        return initializer;
    }
    parseExpressionCoverGrammar(info) {
        let variableIndex = 0;
        const list = [];
        let expression;
        while (true) {
            if (this.peek().isType(Token.ELLIPSIS)) {
                if (info) {
                    info.rest = true;
                }
                return this.parseArrowParametersWithRest(list, variableIndex);
            }
            expression = this.parseAssignmentExpressionCoverGrammar();
            list.push(expression);
            if (!this.check(Token.COMMA))
                break;
            if (this.peek().isType(Token.R_PARENTHESES) && this.peekAhead().isType(Token.ARROW)) {
                break;
            }
        }
        if (list.length == 1)
            return expression;
        return this.expressionListToExpression(list);
    }
    parseArrowParametersWithRest(list, variableIndex) {
        this.consume(Token.ELLIPSIS);
        const pattern = this.parseBindingPattern(true);
        if (this.peek().isType(Token.ASSIGN)) {
            throw new Error(this.errorMessage(`Error A rest parameter cannot have an initializer`));
        }
        if (this.peek().isType(Token.COMMA)) {
            throw new Error(this.errorMessage(`Error A rest parameter or binding pattern may not have a trailing comma`));
        }
        if (this.peek().isNotType(Token.R_PARENTHESES) || this.peekAhead().isNotType(Token.ARROW)) {
            throw new Error(this.errorMessage(`Error Unexpected Token At ${this.position()}`));
        }
        list.push(pattern);
        return this.expressionListToExpression(list);
    }
    expressionListToExpression(list) {
        if (list.length === 1) {
            return list[0];
        }
        return new SequenceExpression(list);
    }
    parseMemberExpression() {
        const result = this.parsePrimaryExpression();
        return this.parseMemberExpressionContinuation(result);
    }
    toParamNode(expression) {
        if (expression instanceof AssignmentExpression) {
            return new Param(expression.getLeft(), expression.getRight());
        }
        if (expression instanceof GroupingExpression) {
            return new Param(expression.getNode());
        }
        return new Param(expression);
    }
    parsePrimaryExpression() {
        let token = this.peek();
        if (Token.isAnyIdentifier(token.token)) {
            this.consume(token.token);
            let kind = ArrowFunctionType.NORMAL;
            if (token.isType(Token.ASYNC) && !this.scanner.hasLineTerminatorBeforeNext()) {
                if (this.peek().isType(Token.FUNCTION)) {
                    return this.parseFunctionDeclarationAndGenerator();
                }
                ;
                if (Token.isAnyIdentifier(this.peek().token) && this.peekAhead().isType(Token.ARROW)) {
                    token = this.next();
                    kind = ArrowFunctionType.ASYNC;
                }
            }
            if (this.peek().isType(Token.ARROW)) {
                const name = this.parseAndClassifyIdentifier(token);
                const params = [];
                if (name instanceof SequenceExpression) {
                    params.push(...name.getExpressions().map(this.toParamNode));
                }
                else {
                    params.push(this.toParamNode(name));
                }
                return this.parseArrowFunctionLiteral(params, kind);
            }
            return this.parseAndClassifyIdentifier(token);
        }
        if (Token.isLiteral(token.token)) {
            return expressionFromLiteral(this.next());
        }
        switch (token.token) {
            case Token.NEW:
                return this.parseMemberWithPresentNewPrefixesExpression();
            case Token.THIS:
                this.consume(Token.THIS);
                return ThisNode;
            case Token.DIV:
            case Token.DIV_ASSIGN:
                return this.parseRegExpLiteral();
            case Token.FUNCTION:
                this.consume(Token.FUNCTION);
                if (this.peek().isType(Token.MUL)) {
                    this.consume(Token.MUL);
                    return this.parseFunctionExpression(FunctionKind.GENERATOR);
                }
                return this.parseFunctionExpression(FunctionKind.NORMAL);
            case Token.SUPER: {
                return this.parseSuperExpression();
            }
            case Token.IMPORT:
                return this.parseImportExpressions();
            case Token.L_BRACKETS:
                return this.parseArrayLiteral(false);
            case Token.L_CURLY:
                return this.parseObjectLiteral(false);
            case Token.L_PARENTHESES: {
                this.consume(Token.L_PARENTHESES);
                if (this.check(Token.R_PARENTHESES)) {
                    if (!this.peek().isType(Token.ARROW)) {
                        throw new Error(this.errorMessage(`Unexpected Token: ${Token.R_PARENTHESES.getName()}`));
                    }
                    return this.parseArrowFunctionLiteral([], ArrowFunctionType.NORMAL);
                }
                const peekToken = this.peek();
                let expression;
                const info = {};
                if (peekToken.isType(Token.FUNCTION)) {
                    this.consume(Token.FUNCTION);
                    expression = this.parseFunctionLiteral(FunctionKind.NORMAL);
                }
                else if (peekToken.isType(Token.ASYNC) && this.peekAhead().isType(Token.FUNCTION)) {
                    this.consume(Token.ASYNC);
                    this.consume(Token.FUNCTION);
                    expression = this.parseFunctionLiteral(FunctionKind.ASYNC);
                }
                else {
                    expression = this.parseExpressionCoverGrammar(info);
                }
                this.expect(Token.R_PARENTHESES);
                if (this.peek().isType(Token.ARROW)) {
                    if (expression instanceof SequenceExpression) {
                        expression = this.parseArrowFunctionLiteral(expression.getExpressions(), ArrowFunctionType.NORMAL, info.rest);
                    }
                    else {
                        expression = this.parseArrowFunctionLiteral([expression], ArrowFunctionType.NORMAL, info.rest);
                    }
                }
                return expression;
            }
            case Token.CLASS: {
                this.consume(Token.CLASS);
                let name;
                let isStrictReserved = false;
                if (this.peekAnyIdentifier()) {
                    name = this.parseAndClassifyIdentifier(this.next());
                    isStrictReserved = Token.isStrictReservedWord(this.current().token);
                }
                return this.parseClassLiteral(name, isStrictReserved);
            }
            case Token.TEMPLATE_LITERALS:
                return this.parseTemplateLiteral();
            default:
                break;
        }
        throw new Error(this.errorMessage(`Unexpected Token: ${JSON.stringify(this.next())}`));
    }
    parseTemplateLiteral(tag) {
        const template = this.next().getValue();
        const exprs = template.expressions.map(expr => JavaScriptParser.parse(expr));
        if (tag) {
            return new TaggedTemplateExpression(tag, template.strings, exprs);
        }
        else {
            return new TemplateLiteral(template.strings, exprs);
        }
    }
    parseMemberWithPresentNewPrefixesExpression() {
        this.consume(Token.NEW);
        let classRef;
        if (this.peek().isType(Token.IMPORT) && this.peekAhead().isType(Token.L_PARENTHESES)) {
            throw new Error(this.errorMessage(`parsing new import (`));
        }
        else if (this.peek().isType(Token.SUPER)) {
            throw new Error(this.errorMessage(`parsing new super() is never allowed`));
        }
        else if (this.peek().isType(Token.PERIOD)) {
            classRef = this.parseNewTargetExpression();
            return this.parseMemberExpressionContinuation(classRef);
        }
        else {
            classRef = this.parseMemberExpression();
        }
        if (this.peek().isType(Token.L_PARENTHESES)) {
            const args = this.parseArguments();
            classRef = new NewExpression(classRef, args);
            return this.parseMemberExpressionContinuation(classRef);
        }
        if (this.peek().isType(Token.QUESTION_PERIOD)) {
            throw new Error(this.errorMessage(`parsing new xxx?.yyy at position`));
        }
        return new NewExpression(classRef);
    }
    parseArguments(maybeArrow) {
        this.consume(Token.L_PARENTHESES);
        const args = [];
        while (this.peek().isNotType(Token.R_PARENTHESES)) {
            const isSpread = this.check(Token.ELLIPSIS);
            let argument = this.parseAssignmentExpressionCoverGrammar();
            if (ParsingArrowHeadFlag.MaybeArrowHead === maybeArrow) {
                if (isSpread) {
                    if (argument instanceof AssignmentExpression) {
                        throw new Error(this.errorMessage(` Rest parameter may not have a default initializer'`));
                    }
                    if (this.peek().isType(Token.COMMA)) {
                        throw new Error(this.errorMessage(`parsing '...spread,arg =>'`));
                    }
                }
            }
            if (isSpread) {
                argument = new SpreadElement(argument);
            }
            args.push(argument);
            if (!this.check(Token.COMMA))
                break;
        }
        if (!this.check(Token.R_PARENTHESES)) {
            throw new Error(this.errorMessage(`parsing arguments call, expecting ')'`));
        }
        return args;
    }
    parseAssignmentExpressionCoverGrammar() {
        if (this.peek().isType(Token.YIELD)) {
            return this.parseYieldExpression();
        }
        let expression = this.parseConditionalExpression();
        const op = this.peek().token;
        if (!Token.isArrowOrAssignmentOp(op))
            return expression;
        if (op === Token.ARROW) {
            if (!this.isIdentifier(expression) && !this.isParenthesized(expression)) {
                throw new Error(this.errorMessage(`Malformed Arrow Fun Param List`));
            }
            if (expression instanceof SequenceExpression) {
                const params = expression.getExpressions().map(expr => new Param(expr));
                return this.parseArrowFunctionLiteral(params, ArrowFunctionType.NORMAL);
            }
            if (expression instanceof GroupingExpression) {
                return this.parseArrowFunctionLiteral([new Param(expression.getNode())], ArrowFunctionType.NORMAL);
            }
            return this.parseArrowFunctionLiteral([new Param(expression)], ArrowFunctionType.NORMAL);
        }
        if (this.isAssignableIdentifier(expression)) {
            if (this.isParenthesized(expression)) {
                throw new Error(this.errorMessage(`Invalid Destructuring Target`));
            }
        }
        else if (this.isProperty(expression)) {
        }
        else if (this.isPattern(expression) && Token.isAssignment(op)) {
            if (this.isParenthesized(expression)) {
            }
        }
        else {
            if (!this.isValidReferenceExpression(expression)) {
                throw new Error(this.errorMessage(`Invalid Reference Expression`));
            }
            if (Token.isLogicalAssignmentOp(op)) {
                throw new Error(this.errorMessage(`Invalid Lhs In Assignment`));
            }
        }
        this.consume(op);
        const right = this.parseAssignmentExpression();
        if (!Token.isAssignment(op)) {
            throw new Error(this.errorMessage(`Invalid Destructuring Target`));
        }
        return new AssignmentExpression(op.getName(), expression, right);
    }
    parseAssignmentExpression() {
        return this.parseAssignmentExpressionCoverGrammar();
    }
    parseArrowFunctionLiteral(parameters, flag, rest) {
        this.consume(Token.ARROW);
        const body = this.parseArrowFunctionBody();
        return new ArrowFunctionExpression(parameters, body, flag, rest);
    }
    parseRegExpLiteral() {
        if (!this.scanner.scanRegExpPattern()) {
            throw new Error('Unterminated RegExp');
        }
        return this.scanner.currentToken().getValue();
    }
    parseArrayLiteral(isPattern) {
        this.consume(Token.L_BRACKETS);
        const values = [];
        let firstSpreadIndex = -1;
        while (!this.check(Token.R_BRACKETS)) {
            let elem;
            if (this.peek().isType(Token.COMMA)) {
                this.consume(Token.COMMA);
                continue;
            }
            else if (this.check(Token.ELLIPSIS)) {
                const argument = this.parsePossibleDestructuringSubPattern();
                elem = isPattern
                    ? new RestElement(argument)
                    : new SpreadElement(argument);
                if (firstSpreadIndex < 0) {
                    firstSpreadIndex = values.length;
                }
                if (this.peek().isType(Token.COMMA)) {
                    throw new Error(this.errorMessage(`Element After Rest @${this.position()}`));
                }
            }
            else {
                elem = this.parsePossibleDestructuringSubPattern();
            }
            values.push(elem);
        }
        if (isPattern) {
            return new ArrayPattern(values);
        }
        return new ArrayExpression(values);
    }
    parsePossibleDestructuringSubPattern() {
        return this.parseAssignmentExpressionCoverGrammar();
    }
    parseObjectLiteral(isPattern) {
        this.consume(Token.L_CURLY);
        const properties = [];
        while (!this.check(Token.R_CURLY)) {
            const property = this.parseObjectPropertyDefinition(isPattern);
            properties.push(property);
            if (this.peek().isNotType(Token.R_CURLY)) {
                this.expect(Token.COMMA);
            }
        }
        if (isPattern) {
            return new ObjectPattern(properties);
        }
        return new ObjectExpression(properties);
    }
    parseObjectPropertyDefinition(isPattern) {
        const propInfo = { kind: PropertyKind.NotSet };
        const nameExpression = this.parseProperty(propInfo);
        switch (propInfo.kind) {
            case PropertyKind.Spread:
                let value = nameExpression;
                if (isPattern) {
                    value = new RestElement(value.getArgument());
                }
                return new Property(value.getArgument(), value, 'init');
            case PropertyKind.Value: {
                this.consume(Token.COLON);
                const value = this.parsePossibleDestructuringSubPattern();
                return new Property(nameExpression, value, 'init');
            }
            case PropertyKind.Assign:
            case PropertyKind.ShorthandOrClassField:
            case PropertyKind.Shorthand: {
                const lhs = new Identifier(propInfo.name);
                if (!this.isAssignableIdentifier(lhs)) {
                    throw new Error(this.errorMessage('Strict Eval Arguments'));
                }
                let value;
                if (this.peek().isType(Token.ASSIGN)) {
                    this.consume(Token.ASSIGN);
                    const rhs = this.parseAssignmentExpression();
                    value = new AssignmentExpression(Token.ASSIGN.getName(), lhs, rhs);
                }
                else {
                    value = lhs;
                }
                return new Property(nameExpression, value, 'init');
            }
            case PropertyKind.Method: {
                const value = this.parseFunctionLiteral(propInfo.funcFlag);
                return new Property(nameExpression, value, 'init');
            }
            case PropertyKind.AccessorGetter:
            case PropertyKind.AccessorSetter: {
                const isGet = propInfo.kind == PropertyKind.AccessorGetter;
                const value = this.parseFunctionLiteral(propInfo.funcFlag);
                return new Property(nameExpression, value, isGet ? 'get' : 'set');
            }
            case PropertyKind.ClassField:
            case PropertyKind.NotSet:
                return NullNode;
        }
    }
    parseProperty(propInfo) {
        let nextToken = this.peek();
        if (this.check(Token.ASYNC)) {
            nextToken = this.peek();
            if (nextToken.isNotType(Token.MUL)
                && parsePropertyKindFromToken(nextToken.token, propInfo)
                || this.scanner.hasLineTerminatorBeforeNext()) {
                return AsyncIdentifier;
            }
            propInfo.kind = PropertyKind.Method;
            propInfo.funcFlag = FunctionKind.ASYNC;
        }
        if (this.check(Token.MUL)) {
            propInfo.kind = PropertyKind.Method;
            propInfo.funcFlag = FunctionKind.ASYNC_GENERATOR;
        }
        nextToken = this.peek();
        if (propInfo.kind == PropertyKind.NotSet && nextToken.isType(Token.GET) || nextToken.isType(Token.SET)) {
            const token = this.next();
            if (parsePropertyKindFromToken(this.peek().token, propInfo)) {
                return nextToken.isType(Token.GET) ? GetIdentifier : SetIdentifier;
            }
            if (token.isType(Token.GET)) {
                propInfo.kind = PropertyKind.AccessorGetter;
            }
            else if (token.isType(Token.SET)) {
                propInfo.kind = PropertyKind.AccessorSetter;
            }
        }
        let propertyName;
        switch (nextToken.token) {
            case Token.PRIVATE_NAME:
                this.consume(Token.PRIVATE_NAME);
                if (propInfo.kind == PropertyKind.NotSet) {
                    parsePropertyKindFromToken(this.peek().token, propInfo);
                }
                propertyName = this.getIdentifier();
                break;
            case Token.STRING:
            case Token.NUMBER:
            case Token.BIGINT:
                this.consume(nextToken.token);
                propertyName = nextToken.getValue();
                propInfo.name = propertyName.getValue();
                break;
            case Token.L_BRACKETS:
                this.consume(Token.L_BRACKETS);
                propertyName = this.parseAssignmentExpression();
                this.expect(Token.R_BRACKETS);
                if (propInfo.kind === PropertyKind.NotSet) {
                    parsePropertyKindFromToken(this.peek().token, propInfo);
                }
                propInfo.name = propertyName.toString();
                return propertyName;
            case Token.ELLIPSIS:
                if (propInfo.kind == PropertyKind.NotSet) {
                    this.consume(Token.ELLIPSIS);
                    propertyName = this.parsePossibleDestructuringSubPattern();
                    propInfo.kind = PropertyKind.Spread;
                    if (!this.isValidReferenceExpression(propertyName)) {
                        throw new Error(this.errorMessage('Invalid Rest Binding/Assignment Pattern'));
                    }
                    if (this.peek().isNotType(Token.R_CURLY)) {
                        throw new Error(this.errorMessage('Element After Rest'));
                    }
                    propInfo.name = propertyName.toString();
                    return propertyName;
                }
            default:
                propertyName = new StringLiteral(this.parsePropertyName().toString());
                propInfo.name = propertyName.toString();
                break;
        }
        if (propInfo.kind === PropertyKind.NotSet) {
            parsePropertyKindFromToken(this.peek().token, propInfo);
        }
        return propertyName;
    }
    parseMemberExpressionContinuation(expression) {
        if (!Token.isMember(this.peek().token))
            return expression;
        return this.doParseMemberExpressionContinuation(expression);
    }
    doParseMemberExpressionContinuation(expression) {
        if (!Token.isMember(this.peek().token)) {
            throw new Error(this.errorMessage(`Parsing member expression`));
        }
        do {
            switch (this.peek().token) {
                case Token.L_BRACKETS: {
                    this.consume(Token.L_BRACKETS);
                    const index = this.parseExpressionCoverGrammar();
                    expression = new MemberExpression(expression, index, true);
                    this.expect(Token.R_BRACKETS);
                    break;
                }
                case Token.PERIOD: {
                    this.consume(Token.PERIOD);
                    const key = this.parsePropertyName();
                    expression = new MemberExpression(expression, key, false);
                    break;
                }
                case Token.TEMPLATE_LITERALS: {
                    expression = this.parseTemplateLiteral(expression);
                    break;
                }
                default:
                    break;
            }
        } while (Token.isMember(this.peek().token));
        return expression;
    }
    parsePropertyName() {
        const next = this.next();
        if (next.getValue() instanceof Identifier) {
            return next.getValue();
        }
        if (Token.isPropertyName(next.token)) {
            return new Identifier(next.token.getName());
        }
        throw new Error(this.errorMessage(`Parsing property expression: Unexpected Token`));
    }
    parsePipelineExpression(expression) {
        let token;
        while (Token.isPipelineOperator(token = this.peek().token)) {
            this.consume(token);
            expression = this.parsePipelineBody(expression);
        }
        return expression;
    }
    parsePipelineBody(lhs) {
        let body;
        let token = this.peek();
        switch (token.token) {
            case Token.FUNCTION:
                this.consume(Token.FUNCTION);
                if (this.peek().isType(Token.MUL)) {
                    this.consume(Token.MUL);
                    body = this.parseFunctionExpression(FunctionKind.GENERATOR);
                    break;
                }
                body = this.parseFunctionExpression(FunctionKind.NORMAL);
                break;
            case Token.ASYNC:
                if (this.peekAhead().isType(Token.FUNCTION)) {
                    this.consume(Token.ASYNC);
                    this.consume(Token.FUNCTION);
                    if (this.peek().isType(Token.MUL)) {
                        this.consume(Token.MUL);
                        body = this.parseFunctionExpression(FunctionKind.ASYNC_GENERATOR);
                        break;
                    }
                    body = this.parseFunctionExpression(FunctionKind.ASYNC);
                    break;
                }
                break;
            default:
                break;
        }
        if (body) {
            return new PipelineExpression(lhs, body);
        }
        if (token.isType(Token.L_PARENTHESES)) {
            body = this.parsePrimaryExpression();
            return new PipelineExpression(lhs, body);
        }
        const func = this.parseMemberExpression();
        let args = [];
        switch (this.peek().token) {
            case Token.COLON:
                do {
                    this.consume(Token.COLON);
                    const isSpread = this.check(Token.ELLIPSIS);
                    if (this.peek().isType(Token.CONDITIONAL)) {
                        this.consume(Token.CONDITIONAL);
                        if (isSpread) {
                            args.push('...?');
                        }
                        else {
                            args.push('?');
                        }
                    }
                    else {
                        const arg = this.parseAssignmentExpressionCoverGrammar();
                        if (isSpread) {
                            args.push(new SpreadElement(arg));
                        }
                        else {
                            args.push(arg);
                        }
                    }
                } while (this.peek().isType(Token.COLON));
                break;
            case Token.L_PARENTHESES:
                this.consume(Token.L_PARENTHESES);
                let indexed = false;
                while (this.peek().isNotType(Token.R_PARENTHESES)) {
                    const isSpread = this.check(Token.ELLIPSIS);
                    if (this.peek().isType(Token.CONDITIONAL)) {
                        this.consume(Token.CONDITIONAL);
                        indexed = true;
                        if (isSpread) {
                            args.push('...?');
                        }
                        else {
                            args.push('?');
                        }
                    }
                    else {
                        const arg = this.parseAssignmentExpressionCoverGrammar();
                        if (isSpread) {
                            args.push(new SpreadElement(arg));
                        }
                        else {
                            args.push(arg);
                        }
                    }
                    this.check(Token.COMMA);
                }
                this.expect(Token.R_PARENTHESES);
                if (!indexed) {
                    body = new CallExpression(func, args);
                    return new PipelineExpression(lhs, body);
                }
                break;
            default:
                break;
        }
        return new PipelineExpression(lhs, func, args);
    }
    parseConditionalExpression() {
        let expression = this.parseLogicalExpression();
        expression = this.parsePipelineExpression(expression);
        return this.peek().isType(Token.CONDITIONAL) ? this.parseConditionalContinuation(expression) : expression;
    }
    parseLogicalExpression() {
        let expression = this.parseBinaryExpression(6);
        const peek = this.peek();
        if (peek.isType(Token.AND) || peek.isType(Token.OR)) {
            const precedence = peek.token.getPrecedence();
            expression = this.parseBinaryContinuation(expression, 4, precedence);
        }
        else if (peek.isType(Token.NULLISH)) {
            expression = this.parseNullishExpression(expression);
        }
        return expression;
    }
    parseBinaryContinuation(x, prec, prec1) {
        do {
            while (this.peek().token.getPrecedence() === prec1) {
                let y;
                let op = this.next();
                const is_right_associative = op.isType(Token.EXP);
                const next_prec = is_right_associative ? prec1 : prec1 + 1;
                y = this.parseBinaryExpression(next_prec);
                if (Token.isCompare(op.token)) {
                    let cmp = op.token;
                    switch (op.token) {
                        case Token.NE:
                            cmp = Token.EQ;
                            break;
                        case Token.NE_STRICT:
                            cmp = Token.EQ_STRICT;
                            break;
                        default: break;
                    }
                    x = shortcutNumericLiteralBinaryExpression(x, y, cmp);
                    if (op.isNotType(cmp)) {
                        x = buildUnaryExpression(x, Token.NOT);
                    }
                }
                else {
                    x = shortcutNumericLiteralBinaryExpression(x, y, op.token);
                }
            }
            --prec1;
        } while (prec1 >= prec);
        return x;
    }
    parseBinaryExpression(precedence) {
        const x = this.parseUnaryExpression();
        const precedence1 = this.peek().token.getPrecedence();
        if (precedence1 >= precedence) {
            return this.parseBinaryContinuation(x, precedence, precedence1);
        }
        return x;
    }
    parseUnaryExpression() {
        const op = this.peek();
        if (Token.isUnaryOrCount(op.token)) {
            return this.parseUnaryOrPrefixExpression();
        }
        if (op.isType(Token.AWAIT)) {
            return this.parseAwaitExpression();
        }
        return this.parsePostfixExpression();
    }
    parseUnaryOrPrefixExpression() {
        const op = this.next();
        const expression = this.parseUnaryExpression();
        if (Token.isUnary(op.token)) {
            if (op.isType(Token.DELETE)) {
                if (this.isIdentifier(expression)) {
                    throw new Error(this.errorMessage(`"delete identifier" is a syntax error in strict mode`));
                }
                if (expression instanceof MemberExpression && expression.getProperty().toString().startsWith('#')) {
                    throw new Error(this.errorMessage(`"Delete Private Field" is a syntax error`));
                }
            }
            if (this.peek().isType(Token.EXP)) {
                throw new Error(this.errorMessage(`Unexpected Token Unary Exponentiation`));
            }
        }
        if (Token.isCount(op.token) || Token.isUnary(op.token)) {
            return buildUnaryExpression(expression, op.token);
        }
        throw new Error(this.errorMessage(`while rewrite unary operation`));
    }
    parsePostfixExpression() {
        const expression = this.parseLeftHandSideExpression();
        if (!Token.isCount(this.peek().token) || this.scanner.hasLineTerminatorBeforeNext()) {
            return expression;
        }
        return this.parsePostfixContinuation(expression);
    }
    parsePostfixContinuation(expression) {
        if (!this.isValidReferenceExpression(expression)) {
            throw new Error(this.errorMessage(`Invalid LHS In Postfix Op.`));
        }
        const op = this.next();
        return buildPostfixExpression(expression, op.token);
    }
    parseLeftHandSideExpression() {
        const result = this.parseMemberExpression();
        if (!Token.isPropertyOrCall(this.peek().token))
            return result;
        return this.parseLeftHandSideContinuation(result);
    }
    parseLeftHandSideContinuation(result) {
        if (this.peek().isType(Token.L_PARENTHESES)
            && this.isIdentifier(result)
            && this.scanner.currentToken().isType(Token.ASYNC)
            && !this.scanner.hasLineTerminatorBeforeNext()) {
            const args = this.parseArguments(ParsingArrowHeadFlag.AsyncArrowFunction);
            if (this.peek().isType(Token.ARROW)) {
                if (!args.length)
                    return new EmptyStatement;
                return this.expressionListToExpression(args);
            }
            result = new CallExpression(result, args);
            if (!Token.isPropertyOrCall(this.peek().token))
                return result;
        }
        let optionalChaining = false;
        let isOptional = false;
        do {
            switch (this.peek().token) {
                case Token.QUESTION_PERIOD: {
                    if (isOptional) {
                        throw new Error(this.errorMessage(`Failure Expression`));
                    }
                    this.consume(Token.QUESTION_PERIOD);
                    isOptional = true;
                    optionalChaining = true;
                    if (Token.isPropertyOrCall(this.peek().token))
                        continue;
                    const key = this.parsePropertyName();
                    result = new MemberExpression(result, key, false, isOptional);
                    break;
                }
                case Token.L_BRACKETS: {
                    this.consume(Token.L_BRACKETS);
                    const index = this.parseExpressionCoverGrammar();
                    result = new MemberExpression(result, index, true, isOptional);
                    this.expect(Token.R_BRACKETS);
                    break;
                }
                case Token.PERIOD: {
                    if (isOptional) {
                        throw new Error(this.errorMessage(`Unexpected Token:${this.position()}`));
                    }
                    this.consume(Token.PERIOD);
                    const key = this.parsePropertyName();
                    result = new MemberExpression(result, key, false, isOptional);
                    break;
                }
                case Token.L_PARENTHESES: {
                    const args = this.parseArguments();
                    if (result.toString() === 'eval') {
                        throw new Error(this.errorMessage(`'eval(...)' is not supported.`));
                    }
                    result = new CallExpression(result, args, isOptional);
                    break;
                }
                case Token.BIND: {
                    if (isOptional) {
                        throw new Error(this.errorMessage(`Unexpected Token:${this.position()}`));
                    }
                    this.consume(Token.BIND);
                    const key = this.parsePropertyName();
                    result = new BindExpression(result, key, false, isOptional);
                    break;
                }
                case Token.QUESTION_BIND: {
                    if (isOptional) {
                        throw new Error(this.errorMessage(`Failure Expression`));
                    }
                    this.consume(Token.QUESTION_BIND);
                    isOptional = true;
                    optionalChaining = true;
                    const key = this.parsePropertyName();
                    result = new BindExpression(result, key, true, isOptional);
                    break;
                }
                default:
                    if (optionalChaining) {
                        throw new Error(this.errorMessage(`Optional Chaining No Template support`));
                    }
                    result = this.parseTemplateLiteral(result);
                    break;
            }
            if (isOptional) {
                isOptional = false;
            }
        } while (Token.isPropertyOrCall(this.peek().token));
        if (optionalChaining) {
            result = new ChainExpression(result);
        }
        return result;
    }
    parseAwaitExpression() {
        this.consume(Token.AWAIT);
        const value = this.parseUnaryExpression();
        if (this.peek().isType(Token.EXP)) {
            throw new Error(this.scanner.createError(`Unexpected Token Unary Exponentiation`));
        }
        return buildUnaryExpression(value, Token.AWAIT);
    }
    parseNullishExpression(expression) {
        const list = [];
        list.push(expression);
        while (this.peek().isType(Token.NULLISH)) {
            this.consume(Token.NULLISH);
            expression = this.parseBinaryExpression(6);
            list.push(expression);
        }
        expression = list.pop();
        expression = list.reverse()
            .reduce((previous, current) => new LogicalExpression(Token.NULLISH.getName(), current, previous), expression);
        return expression;
    }
    parseConditionalContinuation(expression) {
        this.consume(Token.CONDITIONAL);
        const left = this.parseAssignmentExpression();
        this.expect(Token.COLON);
        const right = this.parseAssignmentExpression();
        return new ConditionalExpression(expression, left, right);
    }
    parseYieldExpression() {
        this.consume(Token.YIELD);
        let delegating = false;
        let expression;
        if (this.check(Token.MUL)) {
            delegating = true;
        }
        switch (this.peek().token) {
            case Token.EOS:
            case Token.SEMICOLON:
            case Token.R_CURLY:
            case Token.R_BRACKETS:
            case Token.R_PARENTHESES:
            case Token.COLON:
            case Token.COMMA:
            case Token.IN:
                if (!delegating)
                    break;
                throw new Error(this.errorMessage(`Delegating yields require an RHS`));
            default:
                expression = this.parseAssignmentExpressionCoverGrammar();
                break;
        }
        return new YieldExpression(delegating, expression);
    }
    parseNewTargetExpression() {
        throw new Error(this.errorMessage('Expression (new.target) not supported.'));
    }
    parseClassDeclaration(names, defaultExport) {
        throw new Error(this.errorMessage(`Expression (class) not supported.`));
    }
    parseClassLiteral(name, isStrictReserved) {
        throw new Error(this.errorMessage(`Expression (class) not supported.`));
    }
    parseSuperExpression() {
        throw new Error(this.errorMessage('Expression (supper) not supported.'));
    }
    parseImportExpressions() {
        throw new Error(this.errorMessage('Expression (import) not supported.'));
    }
}
//# sourceMappingURL=parser.js.map