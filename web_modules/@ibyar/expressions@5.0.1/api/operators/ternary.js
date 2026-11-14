import { __esDecorate, __runInitializers } from "../../../../tslib@2.9.1/tslib.es6.js";
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
        consequent;
        alternate;
        static fromJSON(node, deserializer) {
            return new ConditionalExpression(deserializer(node.test), deserializer(node.consequent), deserializer(node.alternate), node.range, node.loc);
        }
        static visit(node, visitNode) {
            visitNode(node.test);
            visitNode(node.consequent);
            visitNode(node.alternate);
        }
        constructor(test, consequent, alternate, range, loc) {
            super(range, loc);
            this.test = test;
            this.consequent = consequent;
            this.alternate = alternate;
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
                .concat(this.consequent.dependency(computed), this.alternate.dependency(computed));
        }
        dependencyPath(computed) {
            return this.test.dependencyPath(computed)
                .concat(this.consequent.dependencyPath(computed), this.alternate.dependencyPath(computed));
        }
        toString() {
            return `${this.test.toString()} ? (${this.consequent.toString()}):(${this.alternate.toString()})`;
        }
        toJson() {
            return {
                test: this.test.toJSON(),
                consequent: this.consequent.toJSON(),
                alternate: this.alternate.toJSON()
            };
        }
    };
    return ConditionalExpression = _classThis;
})();
export { ConditionalExpression };
//# sourceMappingURL=ternary.js.map