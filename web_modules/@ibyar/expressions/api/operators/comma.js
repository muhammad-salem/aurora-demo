import { __esDecorate, __runInitializers } from "../../../../tslib/tslib.es6.js";
import { AbstractExpressionNode } from '../abstract.js';
import { Deserializer } from '../deserialize/deserialize.js';
let SequenceExpression = (() => {
    let _classDecorators = [Deserializer('SequenceExpression')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AbstractExpressionNode;
    var SequenceExpression = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            SequenceExpression = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        expressions;
        static fromJSON(node, deserializer) {
            return new SequenceExpression(node.expressions.map(deserializer), node.range, node.loc);
        }
        static visit(node, visitNode) {
            node.expressions.forEach(visitNode);
        }
        constructor(expressions, range, loc) {
            super(range, loc);
            this.expressions = expressions;
        }
        getExpressions() {
            return this.expressions;
        }
        set(stack) {
            throw new Error(`SequenceExpression.#set() has no implementation.`);
        }
        get(stack) {
            return this.expressions.map(expr => expr.get(stack)).pop();
        }
        dependency(computed) {
            return this.expressions.flatMap(exp => exp.dependency(computed));
        }
        dependencyPath(computed) {
            return this.expressions.flatMap(expression => expression.dependencyPath(computed));
        }
        toString() {
            return this.expressions.map(key => key.toString()).join(', ');
        }
        toJson() {
            return {
                expressions: this.expressions.map(expression => expression.toJSON())
            };
        }
    };
    return SequenceExpression = _classThis;
})();
export { SequenceExpression };
//# sourceMappingURL=comma.js.map