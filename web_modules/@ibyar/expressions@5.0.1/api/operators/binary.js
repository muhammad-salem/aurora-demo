import { __esDecorate, __runInitializers } from "../../../../tslib@2.9.1/tslib.es6.js";
import { InfixExpressionNode } from '../abstract.js';
import { Deserializer } from '../deserialize/deserialize.js';
let BinaryExpression = (() => {
    let _classDecorators = [Deserializer('BinaryExpression')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = InfixExpressionNode;
    var BinaryExpression = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            BinaryExpression = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static fromJSON(node, deserializer) {
            return new BinaryExpression(node.operator, deserializer(node.left), deserializer(node.right), node.range, node.loc);
        }
        static visit(node, visitNode) {
            visitNode(node.left);
            visitNode(node.right);
        }
        static Evaluations = {
            '==': (evalNode) => { return evalNode.left == evalNode.right; },
            '!=': (evalNode) => { return evalNode.left != evalNode.right; },
            '===': (evalNode) => { return evalNode.left === evalNode.right; },
            '!==': (evalNode) => { return evalNode.left !== evalNode.right; },
            '<': (evalNode) => { return evalNode.left < evalNode.right; },
            '<=': (evalNode) => { return evalNode.left <= evalNode.right; },
            '>': (evalNode) => { return evalNode.left > evalNode.right; },
            '>=': (evalNode) => { return evalNode.left >= evalNode.right; },
            '*': (evalNode) => { return evalNode.left * evalNode.right; },
            '/': (evalNode) => { return evalNode.left / evalNode.right; },
            '%': (evalNode) => { return evalNode.left % evalNode.right; },
            '+': (evalNode) => { return evalNode.left + evalNode.right; },
            '-': (evalNode) => { return evalNode.left - evalNode.right; },
            'in': (evalNode) => { return evalNode.left in evalNode.right; },
            'instanceof': (evalNode) => { return evalNode.left instanceof evalNode.right; },
            '<<': (evalNode) => { return evalNode.left << evalNode.right; },
            '>>': (evalNode) => { return evalNode.left >> evalNode.right; },
            '>>>': (evalNode) => { return evalNode.left >>> evalNode.right; },
            '&': (evalNode) => { return evalNode.left & evalNode.right; },
            '^': (evalNode) => { return evalNode.left ^ evalNode.right; },
            '|': (evalNode) => { return evalNode.left | evalNode.right; },
            '**': (evalNode) => { return evalNode.left ** evalNode.right; },
            '%%': (evalNode) => { return ((evalNode.left % evalNode.right) + evalNode.right) % evalNode.right; },
            '>?': (evalNode) => { return evalNode.left > evalNode.right ? evalNode.left : evalNode.right; },
            '<?': (evalNode) => { return evalNode.left > evalNode.right ? evalNode.right : evalNode.left; },
            '<=>': (evalNode) => {
                if ((evalNode.left === null || evalNode.right === null) || (typeof evalNode.left != typeof evalNode.right)) {
                    return null;
                }
                if (typeof evalNode.left === 'string') {
                    return evalNode.left.localeCompare(evalNode.right);
                }
                else {
                    if (evalNode.left > evalNode.right) {
                        return 1;
                    }
                    else if (evalNode.left < evalNode.right) {
                        return -1;
                    }
                    return 0;
                }
            }
        };
        set(context, value) {
            throw new Error(`BinaryExpression#set() for operator:(${this.operator}) has no implementation.`);
        }
        get(stack) {
            const evalNode = {
                left: this.left.get(stack),
                right: this.right.get(stack)
            };
            return BinaryExpression.Evaluations[this.operator](evalNode);
        }
        static {
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return BinaryExpression = _classThis;
})();
export { BinaryExpression };
//# sourceMappingURL=binary.js.map