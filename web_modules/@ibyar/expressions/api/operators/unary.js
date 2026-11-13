import { __esDecorate, __runInitializers } from "../../../../tslib/tslib.es6.js";
import { Deserializer } from '../deserialize/deserialize.js';
import { AbstractExpressionNode } from '../abstract.js';
import { MemberExpression } from '../definition/member.js';
import { Literal } from '../definition/values.js';
let UnaryExpression = (() => {
    let _classDecorators = [Deserializer('UnaryExpression')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AbstractExpressionNode;
    var UnaryExpression = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            UnaryExpression = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        operator;
        argument;
        static fromJSON(node, deserializer) {
            return new UnaryExpression(node.operator, deserializer(node.argument), node.range, node.loc);
        }
        static visit(node, visitNode) {
            visitNode(node.argument);
        }
        static Evaluations = {
            '+': (value) => { return +value; },
            '-': (value) => { return -value; },
            '~': (value) => { return ~value; },
            '!': (value) => { return !value; },
            'void': (value) => { return void value; },
            'typeof': (value) => { return typeof value; },
        };
        constructor(operator, argument, range, loc) {
            super(range, loc);
            this.operator = operator;
            this.argument = argument;
        }
        getOperator() {
            return this.operator;
        }
        getArgument() {
            return this.argument;
        }
        set(stack, value) {
            return this.argument.set(stack, value);
        }
        get(stack, thisContext) {
            switch (this.operator) {
                case 'delete': return this.executeDelete(stack, thisContext);
                default:
                    const value = this.argument.get(stack);
                    return UnaryExpression.Evaluations[this.operator](value);
            }
        }
        executeDelete(stack, thisContext) {
            if (this.argument instanceof MemberExpression) {
                const scope = this.argument.findScope(stack);
                let propertyKey;
                const right = this.argument.getProperty();
                if (right instanceof MemberExpression) {
                    // [Symbol.asyncIterator]
                    propertyKey = this.argument.getProperty().get(stack);
                }
                else if (right instanceof Literal) {
                    // x[10], x['string'], x.name
                    propertyKey = right.getValue();
                }
                else {
                    // x[u == 3 ? 'y': 'n']
                    propertyKey = this.argument.getProperty().get(stack);
                }
                return scope.delete(propertyKey);
            }
            return false;
        }
        dependency(computed) {
            return this.argument.dependency(computed);
        }
        dependencyPath(computed) {
            return this.argument.dependencyPath(computed);
        }
        toString() {
            switch (this.operator) {
                case 'void':
                case 'delete':
                case 'typeof':
                    return `${this.operator} ${this.argument.toString()}`;
                default:
                    return `${this.operator}${this.argument.toString()}`;
            }
        }
        toJson() {
            return {
                operator: this.operator,
                argument: this.argument.toJSON(),
                prefix: true
            };
        }
        static {
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return UnaryExpression = _classThis;
})();
export { UnaryExpression };
//# sourceMappingURL=unary.js.map