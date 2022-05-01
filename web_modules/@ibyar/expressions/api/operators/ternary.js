var ConditionalExpression_1;
import { __decorate, __metadata } from "../../../../tslib/tslib.es6.js";
import { AbstractExpressionNode } from '../abstract.js';
import { Deserializer } from '../deserialize/deserialize.js';
let ConditionalExpression = ConditionalExpression_1 = class ConditionalExpression extends AbstractExpressionNode {
    constructor(test, alternate, consequent) {
        super();
        this.test = test;
        this.alternate = alternate;
        this.consequent = consequent;
    }
    static fromJSON(node, deserializer) {
        return new ConditionalExpression_1(deserializer(node.test), deserializer(node.alternate), deserializer(node.consequent));
    }
    static visit(node, visitNode) {
        visitNode(node.test);
        visitNode(node.alternate);
        visitNode(node.consequent);
    }
    getTest() {
        return this.test;
    }
    getAlternate() {
        return this.alternate;
    }
    getConsequent() {
        return this.consequent;
    }
    shareVariables(scopeList) {
        this.test.shareVariables(scopeList);
        this.alternate.shareVariables(scopeList);
        this.consequent.shareVariables(scopeList);
    }
    set(stack, value) {
        throw new Error(`ConditionalExpression#set() has no implementation.`);
    }
    get(stack) {
        return this.test.get(stack) ? this.consequent.get(stack) : this.alternate.get(stack);
    }
    dependency(computed) {
        return this.test.dependency(computed)
            .concat(this.alternate.dependency(computed), this.consequent.dependency(computed));
    }
    dependencyPath(computed) {
        return this.test.dependencyPath(computed)
            .concat(this.alternate.dependencyPath(computed), this.consequent.dependencyPath(computed));
    }
    toString() {
        return `${this.test.toString()} ? (${this.alternate.toString()}):(${this.consequent.toString()})`;
    }
    toJson() {
        return {
            test: this.test.toJSON(),
            alternate: this.alternate.toJSON(),
            consequent: this.consequent.toJSON()
        };
    }
};
ConditionalExpression = ConditionalExpression_1 = __decorate([
    Deserializer('ConditionalExpression'),
    __metadata("design:paramtypes", [Object, Object, Object])
], ConditionalExpression);
export { ConditionalExpression };
//# sourceMappingURL=ternary.js.map