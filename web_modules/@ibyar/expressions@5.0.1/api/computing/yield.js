import { __esDecorate, __runInitializers } from "../../../../tslib@2.9.1/tslib.es6.js";
import { AbstractExpressionNode, YieldDelegateValue, YieldValue } from '../abstract.js';
import { Deserializer } from '../deserialize/deserialize.js';
let YieldExpression = (() => {
    let _classDecorators = [Deserializer('YieldExpression')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AbstractExpressionNode;
    var YieldExpression = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            YieldExpression = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        delegate;
        argument;
        static fromJSON(node, deserializer) {
            return new YieldExpression(node.delegate, node.argument ? deserializer(node.argument) : void 0, node.range, node.loc);
        }
        static visit(node, visitNode) {
            node.argument && visitNode(node.argument);
        }
        constructor(delegate, argument, range, loc) {
            super(range, loc);
            this.delegate = delegate;
            this.argument = argument;
        }
        getArgument() {
            return this.argument;
        }
        set(stack, value) {
            throw new Error(`YieldExpression#set() has no implementation.`);
        }
        get(stack) {
            const value = this.argument?.get(stack);
            if (this.delegate) {
                return new YieldDelegateValue(value);
            }
            return new YieldValue(value);
        }
        dependency(computed) {
            return this.argument?.dependency(computed) || [];
        }
        dependencyPath(computed) {
            return this.argument?.dependencyPath(computed) || [];
        }
        toString() {
            return `yield${this.delegate ? '*' : ''} ${this.argument?.toString() || ''}`;
        }
        toJson() {
            return {
                delegate: this.delegate,
                argument: this.argument?.toJSON()
            };
        }
    };
    return YieldExpression = _classThis;
})();
export { YieldExpression };
//# sourceMappingURL=yield.js.map