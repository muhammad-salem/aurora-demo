import { __esDecorate, __runInitializers } from "../../../../tslib@2.9.1/tslib.es6.js";
import { AbstractExpressionNode } from '../abstract.js';
import { Deserializer } from '../deserialize/deserialize.js';
let UpdateExpression = (() => {
    let _classDecorators = [Deserializer('UpdateExpression')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AbstractExpressionNode;
    var UpdateExpression = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            UpdateExpression = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        operator;
        argument;
        prefix;
        static fromJSON(node, deserializer) {
            return new UpdateExpression(node.operator, deserializer(node.argument), node.prefix, node.range, node.loc);
        }
        static visit(node, visitNode) {
            visitNode(node.argument);
        }
        static PostfixEvaluations = {
            '++': num => { return num.value++; },
            '--': num => { return num.value--; }
        };
        static PrefixEvaluations = {
            '++': num => { return ++num.value; },
            '--': num => { return --num.value; }
        };
        constructor(operator, argument, prefix, range, loc) {
            super(range, loc);
            this.operator = operator;
            this.argument = argument;
            this.prefix = prefix;
        }
        getOperator() {
            return this.operator;
        }
        getArgument() {
            return this.argument;
        }
        set(stack, value) {
            this.argument.set(stack, value);
        }
        get(stack) {
            const num = { value: this.argument.get(stack) };
            const returnValue = this.prefix
                ? UpdateExpression.PrefixEvaluations[this.operator](num)
                : UpdateExpression.PostfixEvaluations[this.operator](num);
            this.set(stack, num.value);
            return returnValue;
        }
        dependency(computed) {
            return this.argument.dependency(computed);
        }
        dependencyPath(computed) {
            return this.argument.dependencyPath(computed);
        }
        toString() {
            if (this.prefix) {
                return `${this.operator}${this.argument.toString()}`;
            }
            return `${this.argument.toString()}${this.operator}`;
        }
        toJson() {
            return {
                operator: this.operator,
                argument: this.argument.toJSON(),
                prefix: this.prefix
            };
        }
        static {
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return UpdateExpression = _classThis;
})();
export { UpdateExpression };
//# sourceMappingURL=update.js.map