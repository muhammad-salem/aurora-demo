import { __esDecorate, __runInitializers } from "../../../../../tslib@2.9.1/tslib.es6.js";
import { AbstractExpressionNode, ReturnValue } from '../../abstract.js';
import { Deserializer } from '../../deserialize/deserialize.js';
import { TerminateReturnType } from '../control/terminate.js';
/**
 * The if statement executes a statement if a specified condition is truthy.
 * If the condition is falsy, another statement can be executed.
 *
 */
let ForNode = (() => {
    let _classDecorators = [Deserializer('ForStatement')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AbstractExpressionNode;
    var ForNode = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ForNode = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        body;
        init;
        test;
        update;
        static fromJSON(node, deserializer) {
            return new ForNode(deserializer(node.body), node.init && deserializer(node.init), node.test && deserializer(node.test), node.update && deserializer(node.update), node.range, node.loc);
        }
        static visit(node, visitNode) {
            visitNode(node.body);
            node.init && visitNode(node.init);
            node.test && visitNode(node.test);
            node.update && visitNode(node.update);
        }
        constructor(body, init, test, update, range, loc) {
            super(range, loc);
            this.body = body;
            this.init = init;
            this.test = test;
            this.update = update;
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
        set(stack, value) {
            throw new Error(`ForNode#set() has no implementation.`);
        }
        get(stack) {
            const forBlock = stack.pushBlockScope();
            for (this.init?.get(stack); this.test?.get(stack) ?? true; this.update?.get(stack)) {
                const result = this.body.get(stack);
                // useless case, as it at the end of for statement
                // an array/block statement, should return last signal
                if (result instanceof TerminateReturnType) {
                    if (result.type === 'continue') {
                        continue;
                    }
                    else {
                        break;
                    }
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
    return ForNode = _classThis;
})();
export { ForNode };
let ForOfNode = (() => {
    let _classDecorators = [Deserializer('ForOfStatement')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AbstractExpressionNode;
    var ForOfNode = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ForOfNode = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        left;
        right;
        body;
        static fromJSON(node, deserializer) {
            return new ForOfNode(deserializer(node.left), deserializer(node.right), deserializer(node.body), node.range, node.loc);
        }
        static visit(node, visitNode) {
            visitNode(node.left);
            visitNode(node.right);
            visitNode(node.body);
        }
        constructor(left, right, body, range, loc) {
            super(range, loc);
            this.left = left;
            this.right = right;
            this.body = body;
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
        set(stack, value) {
            throw new Error(`ForOfNode#set() has no implementation.`);
        }
        get(stack) {
            const iterable = this.right.get(stack);
            for (const iterator of iterable) {
                const forBlock = stack.pushBlockScope();
                this.left.declareVariable(stack, iterator);
                const result = this.body.get(stack);
                // useless case, as it at the end of for statement
                // an array/block statement, should return last signal
                if (result instanceof TerminateReturnType) {
                    if (result.type === 'continue') {
                        continue;
                    }
                    else {
                        break;
                    }
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
    return ForOfNode = _classThis;
})();
export { ForOfNode };
let ForInNode = (() => {
    let _classDecorators = [Deserializer('ForInStatement')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AbstractExpressionNode;
    var ForInNode = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ForInNode = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        left;
        right;
        body;
        static fromJSON(node, deserializer) {
            return new ForInNode(deserializer(node.left), deserializer(node.right), deserializer(node.body), node.range, node.loc);
        }
        static visit(node, visitNode) {
            visitNode(node.left);
            visitNode(node.right);
            visitNode(node.body);
        }
        // variable of iterable
        constructor(left, right, body, range, loc) {
            super(range, loc);
            this.left = left;
            this.right = right;
            this.body = body;
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
        set(stack, value) {
            throw new Error(`ForOfNode#set() has no implementation.`);
        }
        get(stack) {
            const iterable = this.right.get(stack);
            for (const iterator in iterable) {
                const forBlock = stack.pushBlockScope();
                this.left.declareVariable(stack, iterator);
                const result = this.body.get(stack);
                // useless case, as it at the end of for statement
                // an array/block statement, should return last signal
                if (result instanceof TerminateReturnType) {
                    if (result.type === 'continue') {
                        continue;
                    }
                    else {
                        break;
                    }
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
    return ForInNode = _classThis;
})();
export { ForInNode };
let ForAwaitOfNode = (() => {
    let _classDecorators = [Deserializer('ForAwaitOfStatement')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AbstractExpressionNode;
    var ForAwaitOfNode = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ForAwaitOfNode = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        left;
        right;
        body;
        static fromJSON(node, deserializer) {
            return new ForAwaitOfNode(deserializer(node.left), deserializer(node.right), deserializer(node.body), node.range, node.loc);
        }
        static visit(node, visitNode) {
            visitNode(node.left);
            visitNode(node.right);
            visitNode(node.body);
        }
        // variable of iterable
        constructor(left, right, body, range, loc) {
            super(range, loc);
            this.left = left;
            this.right = right;
            this.body = body;
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
    return ForAwaitOfNode = _classThis;
})();
export { ForAwaitOfNode };
//# sourceMappingURL=for.js.map