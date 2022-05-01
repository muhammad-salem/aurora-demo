var ChainExpression_1;
import { __decorate, __metadata } from "../../../../tslib/tslib.es6.js";
import { AbstractExpressionNode } from '../abstract.js';
import { Deserializer } from '../deserialize/deserialize.js';
let ChainExpression = ChainExpression_1 = class ChainExpression extends AbstractExpressionNode {
    constructor(expression) {
        super();
        this.expression = expression;
    }
    static fromJSON(node, deserializer) {
        return new ChainExpression_1(deserializer(node.expression));
    }
    static visit(node, visitNode) {
        visitNode(node.expression);
    }
    getExpression() {
        return this.expression;
    }
    shareVariables(scopeList) { }
    set(stack, value) {
        throw new Error(`ChainExpression.#set() has no implementation.`);
    }
    get(stack, thisContext) {
        return this.expression.get(stack, thisContext);
    }
    findScope(stack, objectScope) {
        return this.expression.findScope(stack, objectScope);
    }
    dependency(computed) {
        return this.expression.dependency(computed);
    }
    dependencyPath(computed) {
        return this.expression.dependencyPath(computed);
    }
    toString() {
        return this.expression.toString();
    }
    toJson() {
        return {
            expression: this.expression.toJSON(),
        };
    }
};
ChainExpression = ChainExpression_1 = __decorate([
    Deserializer('ChainExpression'),
    __metadata("design:paramtypes", [Object])
], ChainExpression);
export { ChainExpression };
//# sourceMappingURL=chaining.js.map