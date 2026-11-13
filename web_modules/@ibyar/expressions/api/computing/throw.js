import { __esDecorate, __runInitializers } from "../../../../tslib/tslib.es6.js";
import { AbstractExpressionNode } from '../abstract.js';
import { Deserializer } from '../deserialize/deserialize.js';
/**
 * The expression whose value is to be returned.
 * If omitted, undefined is returned instead.
 */
let ThrowStatement = (() => {
    let _classDecorators = [Deserializer('ThrowStatement')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AbstractExpressionNode;
    var ThrowStatement = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ThrowStatement = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        argument;
        static fromJSON(node, deserializer) {
            return new ThrowStatement(deserializer(node.argument), node.range, node.loc);
        }
        static visit(node, visitNode) {
            visitNode(node.argument);
        }
        constructor(argument, range, loc) {
            super(range, loc);
            this.argument = argument;
        }
        getArgument() {
            return this.argument;
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
    return ThrowStatement = _classThis;
})();
export { ThrowStatement };
let CatchClauseNode = (() => {
    let _classDecorators = [Deserializer('CatchClause')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AbstractExpressionNode;
    var CatchClauseNode = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            CatchClauseNode = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        body;
        param;
        static fromJSON(node, deserializer) {
            return new CatchClauseNode(deserializer(node.body), node.param ? deserializer(node.param) : void 0, node.range, node.loc);
        }
        constructor(body, param, range, loc) {
            super(range, loc);
            this.body = body;
            this.param = param;
        }
        getParam() {
            return this.param;
        }
        getBody() {
            return this.body;
        }
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
    return CatchClauseNode = _classThis;
})();
export { CatchClauseNode };
let TryCatchNode = (() => {
    let _classDecorators = [Deserializer('TryStatement')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AbstractExpressionNode;
    var TryCatchNode = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            TryCatchNode = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        block;
        handler;
        finalizer;
        static fromJSON(node, deserializer) {
            return new TryCatchNode(deserializer(node.block), node.handler ? deserializer(node.handler) : void 0, node.finalizer ? deserializer(node.finalizer) : void 0, node.range, node.loc);
        }
        constructor(block, handler, finalizer, range, loc) {
            super(range, loc);
            this.block = block;
            this.handler = handler;
            this.finalizer = finalizer;
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
    return TryCatchNode = _classThis;
})();
export { TryCatchNode };
//# sourceMappingURL=throw.js.map