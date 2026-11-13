import { __esDecorate, __runInitializers } from "../../../../tslib/tslib.es6.js";
import { InfixExpressionNode } from '../abstract.js';
import { Deserializer } from '../deserialize/deserialize.js';
let LogicalExpression = (() => {
    let _classDecorators = [Deserializer('LogicalExpression')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = InfixExpressionNode;
    var LogicalExpression = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            LogicalExpression = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static fromJSON(node, deserializer) {
            return new LogicalExpression(node.operator, deserializer(node.left), deserializer(node.right), node.range, node.loc);
        }
        static visit(node, visitNode) {
            visitNode(node.left);
            visitNode(node.right);
        }
        static Evaluations = {
            '&&': (exp, context) => {
                let value = exp.left.get(context);
                if (value) {
                    value = exp.right.get(context);
                }
                return value;
            },
            '||': (exp, context) => {
                let value = exp.left.get(context);
                if (!value) {
                    value = exp.right.get(context);
                }
                return value;
            },
            '??': (exp, context) => {
                let value = exp.left.get(context);
                if (value === undefined || value === null) {
                    value = exp.right.get(context);
                }
                return value;
            }
        };
        get(context) {
            return LogicalExpression.Evaluations[this.operator](this, context);
        }
        static {
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return LogicalExpression = _classThis;
})();
export { LogicalExpression };
//# sourceMappingURL=logical.js.map