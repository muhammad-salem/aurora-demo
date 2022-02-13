var SequenceExpression_1;
import { __decorate, __metadata } from "../../../../tslib/tslib.es6.js";
import { AbstractExpressionNode } from '../abstract.js';
import { Deserializer } from '../deserialize/deserialize.js';
let SequenceExpression = SequenceExpression_1 = class SequenceExpression extends AbstractExpressionNode {
    constructor(expressions) {
        super();
        this.expressions = expressions;
    }
    static fromJSON(node, deserializer) {
        return new SequenceExpression_1(node.expressions.map(expression => deserializer(expression)));
    }
    static visit(node, visitNode, visitNodeList) {
        visitNodeList(node.expressions);
    }
    getExpressions() {
        return this.expressions;
    }
    shareVariables(scopeList) {
        this.expressions.forEach(statement => statement.shareVariables(scopeList));
    }
    set(stack) {
        throw new Error(`SequenceExpression.#set() has no implementation.`);
    }
    get(stack) {
        return this.expressions.map(expr => expr.get(stack)).pop();
    }
    dependency(computed) {
        return this.expressions.flatMap(exp => exp.dependency(computed));
    }
    dependencyPath(computed) {
        return this.expressions.flatMap(expression => expression.dependencyPath(computed));
    }
    toString() {
        return this.expressions.map(key => key.toString()).join(', ');
    }
    toJson() {
        return {
            expressions: this.expressions.map(expression => expression.toJSON())
        };
    }
};
SequenceExpression = SequenceExpression_1 = __decorate([
    Deserializer('SequenceExpression'),
    __metadata("design:paramtypes", [Array])
], SequenceExpression);
export { SequenceExpression };
//# comma.js.map