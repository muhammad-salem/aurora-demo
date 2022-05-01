var UpdateExpression_1;
import { __decorate, __metadata } from "../../../../tslib/tslib.es6.js";
import { AbstractExpressionNode } from '../abstract.js';
import { Deserializer } from '../deserialize/deserialize.js';
let UpdateExpression = UpdateExpression_1 = class UpdateExpression extends AbstractExpressionNode {
    constructor(operator, argument, prefix) {
        super();
        this.operator = operator;
        this.argument = argument;
        this.prefix = prefix;
    }
    static fromJSON(node, deserializer) {
        return new UpdateExpression_1(node.operator, deserializer(node.argument), node.prefix);
    }
    static visit(node, visitNode) {
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
        this.argument.set(stack, value);
    }
    get(stack) {
        const num = { value: this.argument.get(stack) };
        const returnValue = this.prefix
            ? UpdateExpression_1.PrefixEvaluations[this.operator](num)
            : UpdateExpression_1.PostfixEvaluations[this.operator](num);
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
};
UpdateExpression.PostfixEvaluations = {
    '++': num => { return num.value++; },
    '--': num => { return num.value--; }
};
UpdateExpression.PrefixEvaluations = {
    '++': num => { return ++num.value; },
    '--': num => { return --num.value; }
};
UpdateExpression = UpdateExpression_1 = __decorate([
    Deserializer('UpdateExpression'),
    __metadata("design:paramtypes", [String, Object, Boolean])
], UpdateExpression);
export { UpdateExpression };
//# sourceMappingURL=update.js.map