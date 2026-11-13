import { __esDecorate, __runInitializers } from "../../../../tslib/tslib.es6.js";
import { AbstractExpressionNode } from '../abstract.js';
import { Deserializer } from '../deserialize/deserialize.js';
/**
 * The grouping operator consists of a pair of parentheses around
 * an expression or sub-expression to override the normal operator
 * precedence so that expressions with lower precedence can be evaluated
 * before an expression with higher priority.
 * As it sounds, it groups what's inside of the parentheses.
 */
let GroupingExpression = (() => {
    let _classDecorators = [Deserializer('GroupingExpression')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AbstractExpressionNode;
    var GroupingExpression = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            GroupingExpression = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        node;
        static fromJSON(node, deserializer) {
            return new GroupingExpression(deserializer(node.node), node.range, node.loc);
        }
        static visit(node, visitNode) {
            visitNode(node.node);
        }
        constructor(node, range, loc) {
            super(range, loc);
            this.node = node;
        }
        getNode() {
            return this.node;
        }
        set(stack, value) {
            this.node.set(stack, value);
        }
        get(stack) {
            return this.node.get(stack);
        }
        dependency(computed) {
            return this.node.dependency(computed);
        }
        dependencyPath(computed) {
            return this.node.dependencyPath(computed);
        }
        toString() {
            return `(${this.node.toString()})`;
        }
        toJson() {
            return { node: this.node.toJSON() };
        }
    };
    return GroupingExpression = _classThis;
})();
export { GroupingExpression };
//# sourceMappingURL=grouping.js.map