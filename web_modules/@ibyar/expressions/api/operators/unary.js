var UnaryExpression_1;
import { __decorate, __metadata } from "../../../../tslib/tslib.es6.js";
import { Deserializer } from '../deserialize/deserialize.js';
import { AbstractExpressionNode } from '../abstract.js';
import { MemberExpression } from '../definition/member.js';
import { Literal } from '../definition/values.js';
let UnaryExpression = UnaryExpression_1 = class UnaryExpression extends AbstractExpressionNode {
    constructor(operator, argument) {
        super();
        this.operator = operator;
        this.argument = argument;
    }
    static fromJSON(node, deserializer) {
        return new UnaryExpression_1(node.operator, deserializer(node.argument));
    }
    static visit(node, visitNode, visitNodeList) {
        visitNode(node.argument);
    }
    getOperator() {
        return this.operator;
    }
    getArgument() {
        return this.argument;
    }
    shareVariables(scopeList) {
        this.argument.shareVariables(scopeList);
    }
    set(stack, value) {
        return this.argument.set(stack, value);
    }
    get(stack, thisContext) {
        switch (this.operator) {
            case 'delete': return this.getDelete(stack, thisContext);
            default:
                const value = this.argument.get(stack);
                return UnaryExpression_1.Evaluations[this.operator](value);
        }
    }
    getDelete(stack, thisContext) {
        if (this.argument instanceof MemberExpression) {
            const scope = this.argument.findScope(stack);
            let propertyKey;
            const right = this.argument.getProperty();
            if (right instanceof MemberExpression) {
                propertyKey = this.argument.getProperty().get(stack);
            }
            else if (right instanceof Literal) {
                propertyKey = right.getValue();
            }
            else {
                propertyKey = this.argument.getProperty().get(stack);
            }
            return scope.delete(propertyKey);
        }
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
};
UnaryExpression.Evaluations = {
    '+': (value) => { return +value; },
    '-': (value) => { return -value; },
    '~': (value) => { return ~value; },
    '!': (value) => { return !value; },
    'void': (value) => { return void value; },
    'typeof': (value) => { return typeof value; },
};
UnaryExpression = UnaryExpression_1 = __decorate([
    Deserializer('UnaryExpression'),
    __metadata("design:paramtypes", [String, Object])
], UnaryExpression);
export { UnaryExpression };
//# unary.js.map