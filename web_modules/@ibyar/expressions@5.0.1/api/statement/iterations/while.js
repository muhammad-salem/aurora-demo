import { __esDecorate, __runInitializers } from "../../../../../tslib@2.9.1/tslib.es6.js";
import { AbstractExpressionNode, ReturnValue } from '../../abstract.js';
import { Deserializer } from '../../deserialize/deserialize.js';
import { TerminateReturnType } from '../control/terminate.js';
/**
 * The while statement creates a loop that executes a specified
 * statement as long as the test condition evaluates to true.
 * The condition is evaluated before executing the statement.
 *
 */
let WhileNode = (() => {
    let _classDecorators = [Deserializer('WhileStatement')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AbstractExpressionNode;
    var WhileNode = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            WhileNode = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        test;
        body;
        static fromJSON(node, deserializer) {
            return new WhileNode(deserializer(node.test), deserializer(node.body), node.range, node.loc);
        }
        static visit(node, visitNode) {
            visitNode(node.body);
            visitNode(node.test);
        }
        constructor(test, body, range, loc) {
            super(range, loc);
            this.test = test;
            this.body = body;
        }
        getTest() {
            return this.test;
        }
        getBody() {
            return this.body;
        }
        set(stack, value) {
            throw new Error(`WhileNode#set() has no implementation.`);
        }
        get(stack) {
            const condition = this.test.get(stack);
            const whileBlock = stack.pushBlockScope();
            while (condition) {
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
                    stack.clearTo(whileBlock);
                    return result;
                }
            }
            stack.clearTo(whileBlock);
            return void 0;
        }
        dependency(computed) {
            return this.test.dependency(computed).concat(this.body.dependency(computed));
        }
        dependencyPath(computed) {
            return this.test.dependencyPath(computed).concat(this.body.dependencyPath(computed));
        }
        toString() {
            return `while (${this.test.toString()}) ${this.body.toString()}`;
        }
        toJson() {
            return {
                test: this.test.toJSON(),
                body: this.body.toJSON()
            };
        }
    };
    return WhileNode = _classThis;
})();
export { WhileNode };
let DoWhileNode = (() => {
    let _classDecorators = [Deserializer('DoWhileStatement')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AbstractExpressionNode;
    var DoWhileNode = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            DoWhileNode = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        test;
        body;
        static fromJSON(node, deserializer) {
            return new DoWhileNode(deserializer(node.test), deserializer(node.body), node.range, node.loc);
        }
        static visit(node, visitNode) {
            visitNode(node.test);
            visitNode(node.body);
        }
        constructor(test, body, range, loc) {
            super(range, loc);
            this.test = test;
            this.body = body;
        }
        getTest() {
            return this.test;
        }
        getBody() {
            return this.body;
        }
        set(stack, value) {
            throw new Error(`WhileNode#set() has no implementation.`);
        }
        get(stack) {
            const whileBlock = stack.pushBlockScope();
            do {
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
                    stack.clearTo(whileBlock);
                    return result;
                }
            } while (this.test.get(stack));
            stack.clearTo(whileBlock);
            return void 0;
        }
        dependency(computed) {
            return this.body.dependency(computed).concat(this.test.dependency(computed));
        }
        dependencyPath(computed) {
            return this.body.dependencyPath(computed).concat(this.test.dependencyPath(computed));
        }
        toString() {
            return `do {${this.body.toString()}} while (${this.test.toString()})`;
        }
        toJson() {
            return {
                test: this.test.toJSON(),
                body: this.body.toJSON()
            };
        }
    };
    return DoWhileNode = _classThis;
})();
export { DoWhileNode };
//# sourceMappingURL=while.js.map