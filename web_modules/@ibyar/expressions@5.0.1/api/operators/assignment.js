import { __esDecorate, __runInitializers } from "../../../../tslib@2.9.1/tslib.es6.js";
import { InfixExpressionNode } from '../abstract.js';
import { Deserializer } from '../deserialize/deserialize.js';
let AssignmentExpression = (() => {
    let _classDecorators = [Deserializer('AssignmentExpression')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = InfixExpressionNode;
    var AssignmentExpression = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AssignmentExpression = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static fromJSON(node, deserializer) {
            return new AssignmentExpression(node.operator, deserializer(node.left), deserializer(node.right), node.range, node.loc);
        }
        static visit(node, visitNode) {
            visitNode(node.left);
            visitNode(node.right);
        }
        static Evaluations = {
            '=': (evalNode) => { return evalNode.left = evalNode.right; },
            '*=': (evalNode) => { return evalNode.left *= evalNode.right; },
            '**=': (evalNode) => { return evalNode.left **= evalNode.right; },
            '/=': (evalNode) => { return evalNode.left /= evalNode.right; },
            '%=': (evalNode) => { return evalNode.left %= evalNode.right; },
            '+=': (evalNode) => { return evalNode.left += evalNode.right; },
            '-=': (evalNode) => { return evalNode.left -= evalNode.right; },
            '<<=': (evalNode) => { return evalNode.left <<= evalNode.right; },
            '>>=': (evalNode) => { return evalNode.left >>= evalNode.right; },
            '>>>=': (evalNode) => { return evalNode.left >>>= evalNode.right; },
            '&=': (evalNode) => { return evalNode.left &= evalNode.right; },
            '^=': (evalNode) => { return evalNode.left ^= evalNode.right; },
            '|=': (evalNode) => { return evalNode.left |= evalNode.right; },
            '%%=': (evalNode) => { return evalNode.left %= ((evalNode.left % evalNode.right) + evalNode.right) % evalNode.right; },
            '>?=': (evalNode) => { return evalNode.left = evalNode.left > evalNode.right ? evalNode.left : evalNode.right; },
            '<?=': (evalNode) => { return evalNode.left = evalNode.left > evalNode.right ? evalNode.right : evalNode.left; },
        };
        static LogicalEvaluations = {
            '&&=': (exp, context) => {
                let value = exp.left.get(context);
                if (value) {
                    value = exp.right.get(context);
                    exp.set(context, value);
                }
                return value;
            },
            '||=': (exp, context) => {
                let value = exp.left.get(context);
                if (!value) {
                    value = exp.right.get(context);
                    exp.set(context, value);
                }
                return value;
            },
            '??=': (exp, context) => {
                let value = exp.left.get(context);
                if (value === undefined || value === null) {
                    value = exp.right.get(context);
                    exp.set(context, value);
                }
                return value;
            },
        };
        constructor(operator, left, right, range, loc) {
            super(operator, left, right, range, loc);
        }
        set(stack, value) {
            return this.left.set(stack, value);
        }
        get(stack) {
            switch (this.operator) {
                case '&&=':
                case '||=':
                case '??=':
                    return AssignmentExpression.LogicalEvaluations[this.operator](this, stack);
            }
            const evalNode = {
                left: this.left.get(stack),
                right: this.right.get(stack)
            };
            const value = AssignmentExpression.Evaluations[this.operator](evalNode);
            this.set(stack, value);
            return value;
        }
        static {
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return AssignmentExpression = _classThis;
})();
export { AssignmentExpression };
//# sourceMappingURL=assignment.js.map