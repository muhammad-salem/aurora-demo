var ForNode_1, ForOfNode_1, ForInNode_1, ForAwaitOfNode_1;
import { __decorate, __metadata } from "../../../../../tslib/tslib.es6.js";
import { AbstractExpressionNode, ReturnValue } from '../../abstract.js';
import { Deserializer } from '../../deserialize/deserialize.js';
import { BreakStatement, ContinueStatement } from '../control/terminate.js';
let ForNode = ForNode_1 = class ForNode extends AbstractExpressionNode {
    constructor(body, init, test, update) {
        super();
        this.body = body;
        this.init = init;
        this.test = test;
        this.update = update;
    }
    static fromJSON(node, deserializer) {
        return new ForNode_1(deserializer(node.body), node.init && deserializer(node.init), node.test && deserializer(node.test), node.update && deserializer(node.update));
    }
    static visit(node, visitNode) {
        visitNode(node.body);
        node.init && visitNode(node.init);
        node.test && visitNode(node.test);
        node.update && visitNode(node.update);
    }
    getBody() {
        return this.body;
    }
    getInit() {
        return this.init;
    }
    getTest() {
        return this.test;
    }
    getUpdate() {
        return this.update;
    }
    shareVariables(scopeList) {
        this.init?.shareVariables(scopeList);
        this.test?.shareVariables(scopeList);
        this.update?.shareVariables(scopeList);
        this.body.shareVariables(scopeList);
    }
    set(stack, value) {
        throw new Error(`ForNode#set() has no implementation.`);
    }
    get(stack) {
        const forBlock = stack.pushBlockScope();
        for (this.init?.get(stack); this.test?.get(stack) ?? true; this.update?.get(stack)) {
            const result = this.body.get(stack);
            if (ContinueStatement.ContinueSymbol === result) {
                continue;
            }
            if (BreakStatement.BreakSymbol === result) {
                break;
            }
            if (result instanceof ReturnValue) {
                stack.clearTo(forBlock);
                return result;
            }
        }
        stack.clearTo(forBlock);
        return void 0;
    }
    dependency(computed) {
        let dependency = this.body.dependency(computed);
        this.init && (dependency = dependency.concat(this.init.dependency(computed)));
        this.test && (dependency = dependency.concat(this.test.dependency(computed)));
        this.update && (dependency = dependency.concat(this.update.dependency(computed)));
        return dependency;
    }
    dependencyPath(computed) {
        let dependencyPath = this.body.dependencyPath(computed);
        this.init && (dependencyPath = dependencyPath.concat(this.init.dependencyPath(computed)));
        this.test && (dependencyPath = dependencyPath.concat(this.test.dependencyPath(computed)));
        this.update && (dependencyPath = dependencyPath.concat(this.update.dependencyPath(computed)));
        return dependencyPath;
    }
    toString() {
        return `for (${this.init?.toString()};${this.test?.toString()};${this.init?.toString()}) ${this.body.toString()}`;
    }
    toJson() {
        return {
            body: this.body.toJSON(),
            init: this.init?.toJSON(),
            test: this.test?.toJSON(),
            update: this.update?.toJSON(),
        };
    }
};
ForNode = ForNode_1 = __decorate([
    Deserializer('ForStatement'),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], ForNode);
export { ForNode };
let ForOfNode = ForOfNode_1 = class ForOfNode extends AbstractExpressionNode {
    constructor(left, right, body) {
        super();
        this.left = left;
        this.right = right;
        this.body = body;
    }
    static fromJSON(node, deserializer) {
        return new ForOfNode_1(deserializer(node.left), deserializer(node.right), deserializer(node.body));
    }
    static visit(node, visitNode) {
        visitNode(node.left);
        visitNode(node.right);
        visitNode(node.body);
    }
    getLeft() {
        return this.left;
    }
    getRight() {
        return this.right;
    }
    getBody() {
        return this.body;
    }
    shareVariables(scopeList) {
        this.right.shareVariables(scopeList);
        this.body.shareVariables(scopeList);
    }
    set(stack, value) {
        throw new Error(`ForOfNode#set() has no implementation.`);
    }
    get(stack) {
        const iterable = this.right.get(stack);
        for (const iterator of iterable) {
            const forBlock = stack.pushBlockScope();
            this.left.declareVariable(stack, iterator);
            const result = this.body.get(stack);
            if (ContinueStatement.ContinueSymbol === result) {
                continue;
            }
            else if (BreakStatement.BreakSymbol === result) {
                break;
            }
            else if (result instanceof ReturnValue) {
                stack.clearTo(forBlock);
                return result;
            }
            stack.clearTo(forBlock);
        }
        return void 0;
    }
    dependency(computed) {
        return this.right.dependency(computed);
    }
    dependencyPath(computed) {
        return this.right.dependencyPath(computed);
    }
    toString() {
        return `for (${this.left?.toString()} of ${this.right.toString()}) ${this.body.toString()}`;
    }
    toJson() {
        return {
            left: this.left.toJSON(),
            right: this.right.toJSON(),
            body: this.body.toJSON(),
        };
    }
};
ForOfNode = ForOfNode_1 = __decorate([
    Deserializer('ForOfStatement'),
    __metadata("design:paramtypes", [Object, Object, Object])
], ForOfNode);
export { ForOfNode };
let ForInNode = ForInNode_1 = class ForInNode extends AbstractExpressionNode {
    constructor(left, right, body) {
        super();
        this.left = left;
        this.right = right;
        this.body = body;
    }
    static fromJSON(node, deserializer) {
        return new ForInNode_1(deserializer(node.left), deserializer(node.right), deserializer(node.body));
    }
    static visit(node, visitNode) {
        visitNode(node.left);
        visitNode(node.right);
        visitNode(node.body);
    }
    getLeft() {
        return this.left;
    }
    getRight() {
        return this.right;
    }
    getBody() {
        return this.body;
    }
    shareVariables(scopeList) {
        this.right.shareVariables(scopeList);
        this.body.shareVariables(scopeList);
    }
    set(stack, value) {
        throw new Error(`ForOfNode#set() has no implementation.`);
    }
    get(stack) {
        const iterable = this.right.get(stack);
        for (const iterator in iterable) {
            const forBlock = stack.pushBlockScope();
            this.left.declareVariable(stack, iterator);
            const result = this.body.get(stack);
            if (ContinueStatement.ContinueSymbol === result) {
                continue;
            }
            else if (BreakStatement.BreakSymbol === result) {
                break;
            }
            else if (result instanceof ReturnValue) {
                stack.clearTo(forBlock);
                return result;
            }
            stack.clearTo(forBlock);
        }
        return void 0;
    }
    dependency(computed) {
        return this.right.dependency(computed);
    }
    dependencyPath(computed) {
        return this.right.dependencyPath(computed);
    }
    toString() {
        return `for (${this.left.toString()} in ${this.right.toString()}) ${this.body.toString()}`;
    }
    toJson() {
        return {
            left: this.left.toJSON(),
            right: this.right.toJSON(),
            body: this.body.toJSON(),
        };
    }
};
ForInNode = ForInNode_1 = __decorate([
    Deserializer('ForInStatement'),
    __metadata("design:paramtypes", [Object, Object, Object])
], ForInNode);
export { ForInNode };
let ForAwaitOfNode = ForAwaitOfNode_1 = class ForAwaitOfNode extends AbstractExpressionNode {
    constructor(left, right, body) {
        super();
        this.left = left;
        this.right = right;
        this.body = body;
    }
    static fromJSON(node, deserializer) {
        return new ForAwaitOfNode_1(deserializer(node.left), deserializer(node.right), deserializer(node.body));
    }
    static visit(node, visitNode) {
        visitNode(node.left);
        visitNode(node.right);
        visitNode(node.body);
    }
    getLeft() {
        return this.left;
    }
    getRight() {
        return this.right;
    }
    getBody() {
        return this.body;
    }
    shareVariables(scopeList) {
        this.right.shareVariables(scopeList);
        this.body.shareVariables(scopeList);
    }
    set(stack, value) {
        throw new Error(`ForAwaitOfNode#set() has no implementation.`);
    }
    get(stack) {
        const iterable = this.right.get(stack);
        const forAwaitBody = (iterator) => {
            const forBlock = stack.pushBlockScope();
            this.left.declareVariable(stack, iterator);
            const result = this.body.get(stack);
            stack.clearTo(forBlock);
            return result;
        };
        stack.forAwaitAsyncIterable = { iterable, forAwaitBody };
    }
    dependency(computed) {
        return this.right.dependency(computed);
    }
    dependencyPath(computed) {
        return this.right.dependencyPath(computed);
    }
    toString() {
        return `for (${this.left?.toString()} of ${this.right.toString()}) ${this.body.toString()}`;
    }
    toJson() {
        return {
            left: this.left.toJSON(),
            right: this.right.toJSON(),
            body: this.body.toJSON(),
        };
    }
};
ForAwaitOfNode = ForAwaitOfNode_1 = __decorate([
    Deserializer('ForAwaitOfStatement'),
    __metadata("design:paramtypes", [Object, Object, Object])
], ForAwaitOfNode);
export { ForAwaitOfNode };
//# sourceMappingURL=for.js.map