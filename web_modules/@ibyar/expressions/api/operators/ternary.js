import { __esDecorate, __runInitializers } from "../../../../tslib/tslib.es6.js";
import { AbstractExpressionNode } from '../abstract.js';
import { Deserializer } from '../deserialize/deserialize.js';
let ConditionalExpression = (() => {
    let _classDecorators = [Deserializer('ConditionalExpression')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AbstractExpressionNode;
    var ConditionalExpression = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ConditionalExpression = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        test;
        alternate;
        consequent;
        static fromJSON(node, deserializer) {
            return new ConditionalExpression(deserializer(node.test), deserializer(node.alternate), deserializer(node.consequent), node.range, node.loc);
        }
        static visit(node, visitNode) {
            visitNode(node.test);
            visitNode(node.alternate);
            visitNode(node.consequent);
        }
        constructor(test, alternate, consequent, range, loc) {
            super(range, loc);
            this.test = test;
            this.alternate = alternate;
            this.consequent = consequent;
        }
        getTest() {
            return this.test;
        }
        getAlternate() {
            return this.alternate;
        }
        getConsequent() {
            return this.consequent;
        }
        set(stack, value) {
            throw new Error(`ConditionalExpression#set() has no implementation.`);
        }
        get(stack) {
            return this.test.get(stack) ? this.consequent.get(stack) : this.alternate.get(stack);
        }
        dependency(computed) {
            return this.test.dependency(computed)
                .concat(this.alternate.dependency(computed), this.consequent.dependency(computed));
        }
        dependencyPath(computed) {
            return this.test.dependencyPath(computed)
                .concat(this.alternate.dependencyPath(computed), this.consequent.dependencyPath(computed));
        }
        toString() {
            return `${this.test.toString()} ? (${this.alternate.toString()}):(${this.consequent.toString()})`;
        }
        toJson() {
            return {
                test: this.test.toJSON(),
                alternate: this.alternate.toJSON(),
                consequent: this.consequent.toJSON()
            };
        }
    };
    return ConditionalExpression = _classThis;
})();
export { ConditionalExpression };
//# sourceMappingURL=ternary.js.map