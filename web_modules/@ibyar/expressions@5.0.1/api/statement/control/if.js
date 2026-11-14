import { __esDecorate, __runInitializers } from "../../../../../tslib@2.9.1/tslib.es6.js";
import { AbstractExpressionNode } from '../../abstract.js';
import { Deserializer } from '../../deserialize/deserialize.js';
/**
 * The if statement executes a statement if a specified condition is truthy.
 * If the condition is falsy, another statement can be executed.
 *
 */
let IfStatement = (() => {
    let _classDecorators = [Deserializer('IfStatement')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AbstractExpressionNode;
    var IfStatement = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            IfStatement = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        test;
        consequent;
        alternate;
        static fromJSON(node, deserializer) {
            return new IfStatement(deserializer(node.test), deserializer(node.consequent), node.alternate ? deserializer(node.alternate) : void 0, node.range, node.loc);
        }
        static visit(node, visitNode) {
            visitNode(node.test);
            visitNode(node.consequent);
            node.alternate && visitNode(node.alternate);
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
        getConsequent() {
            return this.consequent;
        }
        getAlternate() {
            return this.alternate;
        }
        set(stack, value) {
            throw new Error(`IfStatement#set() has no implementation.`);
        }
        get(stack) {
            const condition = this.test.get(stack);
            if (condition) {
                const ifBlock = stack.pushBlockScope();
                const value = this.consequent.get(stack);
                stack.clearTo(ifBlock);
                return value;
            }
            else if (this.alternate) {
                const elseBlock = stack.pushBlockScope();
                const value = this.alternate.get(stack);
                stack.clearTo(elseBlock);
                return value;
            }
            return void 0;
        }
        dependency(computed) {
            return this.test.dependency(computed)
                .concat(this.consequent.dependency(computed), this.alternate?.dependency(computed) || []);
        }
        dependencyPath(computed) {
            return this.test.dependencyPath(computed).concat(this.consequent.dependencyPath(computed), this.alternate?.dependencyPath(computed) || []);
        }
        toString() {
            return `if (${this.test.toString()}) ${this.consequent.toString()}${this.alternate ? ' else ' : ''}${this.alternate ? this.alternate.toString() : ''}`;
        }
        toJson() {
            return {
                test: this.test.toJSON(),
                consequent: this.consequent.toJSON(),
                alternate: this.alternate?.toJSON()
            };
        }
    };
    return IfStatement = _classThis;
})();
export { IfStatement };
//# sourceMappingURL=if.js.map