import { __esDecorate, __runInitializers } from "../../../../tslib@2.9.1/tslib.es6.js";
import { Deserializer } from '../deserialize/deserialize.js';
import { AbstractExpressionNode, AwaitPromise } from '../abstract.js';
let AwaitExpression = (() => {
    let _classDecorators = [Deserializer('AwaitExpression')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AbstractExpressionNode;
    var AwaitExpression = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AwaitExpression = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        argument;
        static fromJSON(node, deserializer) {
            return new AwaitExpression(deserializer(node.argument), node.range, node.loc);
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
            throw new Error('AwaitExpression#set() has no implementation.');
        }
        get(stack, thisContext) {
            const promise = this.argument.get(stack);
            return new AwaitPromise(promise);
        }
        dependency(computed) {
            return this.argument.dependency(computed);
        }
        dependencyPath(computed) {
            return this.argument.dependencyPath(computed);
        }
        toString() {
            return `await ${this.argument.toString()}`;
        }
        toJson() {
            return {
                argument: this.argument.toJSON()
            };
        }
    };
    return AwaitExpression = _classThis;
})();
export { AwaitExpression };
//# sourceMappingURL=await.js.map