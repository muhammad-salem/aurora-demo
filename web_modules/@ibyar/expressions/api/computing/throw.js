var ThrowStatement_1, CatchClauseNode_1, TryCatchNode_1;
import { __decorate, __metadata } from "../../../../tslib/tslib.es6.js";
import { AbstractExpressionNode } from '../abstract.js';
import { Deserializer } from '../deserialize/deserialize.js';
/**
 * The expression whose value is to be returned.
 * If omitted, undefined is returned instead.
 */
let ThrowStatement = ThrowStatement_1 = class ThrowStatement extends AbstractExpressionNode {
    constructor(argument) {
        super();
        this.argument = argument;
    }
    static fromJSON(node, deserializer) {
        return new ThrowStatement_1(deserializer(node.argument));
    }
    static visit(node, visitNode) {
        visitNode(node.argument);
    }
    getArgument() {
        return this.argument;
    }
    shareVariables(scopeList) {
        this.argument.shareVariables(scopeList);
    }
    set(stack, value) {
        throw new Error(`ThrowStatement#set() has no implementation.`);
    }
    get(stack) {
        throw this.argument.get(stack);
    }
    dependency(computed) {
        return this.argument.dependency(computed);
    }
    dependencyPath(computed) {
        return this.argument.dependencyPath(computed);
    }
    toString() {
        return `throw ${this.argument.toString()}`;
    }
    toJson() {
        return { argument: this.argument?.toJSON() };
    }
};
ThrowStatement = ThrowStatement_1 = __decorate([
    Deserializer('ThrowStatement'),
    __metadata("design:paramtypes", [Object])
], ThrowStatement);
export { ThrowStatement };
let CatchClauseNode = CatchClauseNode_1 = class CatchClauseNode extends AbstractExpressionNode {
    constructor(body, param) {
        super();
        this.body = body;
        this.param = param;
    }
    static fromJSON(node, deserializer) {
        return new CatchClauseNode_1(deserializer(node.body), node.param ? deserializer(node.param) : void 0);
    }
    getParam() {
        return this.param;
    }
    getBody() {
        return this.body;
    }
    shareVariables(scopeList) { }
    set(stack, error) {
        this.param?.set(stack, error);
    }
    get(stack, thisContext) {
        return this.body.get(stack);
    }
    dependency(computed) {
        return this.body.dependency();
    }
    dependencyPath(computed) {
        return this.body.dependencyPath(computed);
    }
    toString() {
        return `catch (${this.param?.toString() || ''}) ${this.body.toString()}`;
    }
    toJson(key) {
        return {
            param: this.param?.toJSON(),
            body: this.body.toJSON()
        };
    }
};
CatchClauseNode = CatchClauseNode_1 = __decorate([
    Deserializer('CatchClause'),
    __metadata("design:paramtypes", [Object, Object])
], CatchClauseNode);
export { CatchClauseNode };
let TryCatchNode = TryCatchNode_1 = class TryCatchNode extends AbstractExpressionNode {
    constructor(block, handler, finalizer) {
        super();
        this.block = block;
        this.handler = handler;
        this.finalizer = finalizer;
    }
    static fromJSON(node, deserializer) {
        return new TryCatchNode_1(deserializer(node.block), node.handler ? deserializer(node.handler) : void 0, node.finalizer ? deserializer(node.finalizer) : void 0);
    }
    getBlock() {
        return this.block;
    }
    getHandler() {
        return this.handler;
    }
    getFinalizer() {
        return this.finalizer;
    }
    shareVariables(scopeList) { }
    set(stack, value) {
        throw new Error(`TryCatchNode#set() has no implementation.`);
    }
    get(stack) {
        const scope = stack.lastScope();
        if (this.block && this.handler && this.finalizer) {
            try {
                const blockScope = stack.pushBlockScope();
                this.block.get(stack);
                stack.clearTo(blockScope);
            }
            catch (error) {
                stack.clearTill(scope);
                const blockScope = stack.pushBlockScope();
                this.handler.set(stack, error);
                this.handler.get(stack);
                stack.clearTo(blockScope);
            }
            finally {
                stack.clearTill(scope);
                const blockScope = stack.pushBlockScope();
                this.finalizer.get(stack);
                stack.clearTo(blockScope);
            }
        }
        else if (this.block && this.handler) {
            try {
                const blockScope = stack.pushBlockScope();
                this.block.get(stack);
                stack.clearTo(blockScope);
            }
            catch (error) {
                stack.clearTill(scope);
                const blockScope = stack.pushBlockScope();
                stack.clearTo(blockScope);
                this.handler.set(stack, error);
                this.handler.get(stack);
                stack.clearTo(blockScope);
            }
        }
        else if (this.block && this.finalizer) {
            try {
                const blockScope = stack.pushBlockScope();
                this.block.get(stack);
                stack.clearTo(blockScope);
            }
            finally {
                stack.clearTill(scope);
                const blockScope = stack.pushBlockScope();
                this.finalizer.get(stack);
                stack.clearTo(blockScope);
            }
        }
        else {
            throw new Error(`Uncaught SyntaxError: Missing catch or finally after try`);
        }
        stack.clearTill(scope);
    }
    dependency(computed) {
        return this.block.dependency()
            .concat(this.handler?.dependency() || [])
            .concat(this.finalizer?.dependency() || []);
    }
    dependencyPath(computed) {
        return this.block.dependencyPath(computed)
            .concat(this.handler?.dependencyPath(computed) || [], this.finalizer?.dependencyPath(computed) || []);
    }
    toString() {
        return `try ${this.block.toString()} ${this.handler?.toString() || ''} ${this.finalizer ? `finally ${this.finalizer.toString()}` : ''}`;
    }
    toJson() {
        return {
            block: this.block.toJSON(),
            handler: this.handler?.toJSON(),
            finalizer: this.finalizer?.toJSON(),
        };
    }
};
TryCatchNode = TryCatchNode_1 = __decorate([
    Deserializer('TryStatement'),
    __metadata("design:paramtypes", [Object, Object, Object])
], TryCatchNode);
export { TryCatchNode };
//# sourceMappingURL=throw.js.map