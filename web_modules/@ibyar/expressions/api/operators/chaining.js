import { __esDecorate, __runInitializers } from "../../../../tslib/tslib.es6.js";
import { AbstractExpressionNode } from '../abstract.js';
import { Deserializer } from '../deserialize/deserialize.js';
let ChainExpression = (() => {
    let _classDecorators = [Deserializer('ChainExpression')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AbstractExpressionNode;
    var ChainExpression = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ChainExpression = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        expression;
        static fromJSON(node, deserializer) {
            return new ChainExpression(deserializer(node.expression), node.range, node.loc);
        }
        static visit(node, visitNode) {
            visitNode(node.expression);
        }
        constructor(expression, range, loc) {
            super(range, loc);
            this.expression = expression;
        }
        getExpression() {
            return this.expression;
        }
        set(stack, value) {
            throw new Error(`ChainExpression.#set() has no implementation.`);
        }
        get(stack, thisContext) {
            return this.expression.get(stack, thisContext);
        }
        findScope(stack, objectScope) {
            return this.expression.findScope(stack, objectScope);
        }
        dependency(computed) {
            return this.expression.dependency(computed);
        }
        dependencyPath(computed) {
            return this.expression.dependencyPath(computed);
        }
        toString() {
            return this.expression.toString();
        }
        toJson() {
            return {
                expression: this.expression.toJSON(),
            };
        }
    };
    return ChainExpression = _classThis;
})();
export { ChainExpression };
//# sourceMappingURL=chaining.js.map