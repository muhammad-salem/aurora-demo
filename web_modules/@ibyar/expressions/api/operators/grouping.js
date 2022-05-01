var GroupingExpression_1;
import { __decorate, __metadata } from "../../../../tslib/tslib.es6.js";
import { AbstractExpressionNode } from '../abstract.js';
import { Deserializer } from '../deserialize/deserialize.js';
let GroupingExpression = GroupingExpression_1 = class GroupingExpression extends AbstractExpressionNode {
    constructor(node) {
        super();
        this.node = node;
    }
    static fromJSON(node, deserializer) {
        return new GroupingExpression_1(deserializer(node.node));
    }
    static visit(node, visitNode) {
        visitNode(node.node);
    }
    getNode() {
        return this.node;
    }
    shareVariables(scopeList) {
        this.node.shareVariables(scopeList);
    }
    set(stack, value) {
        this.node.set(stack, value);
    }
    get(stack) {
        return this.node.get(stack);
    }
    dependency(computed) {
        return this.node.dependency(computed);
    }
    dependencyPath(computed) {
        return this.node.dependencyPath(computed);
    }
    toString() {
        return `(${this.node.toString()})`;
    }
    toJson() {
        return { node: this.node.toJSON() };
    }
};
GroupingExpression = GroupingExpression_1 = __decorate([
    Deserializer('GroupingExpression'),
    __metadata("design:paramtypes", [Object])
], GroupingExpression);
export { GroupingExpression };
//# sourceMappingURL=grouping.js.map