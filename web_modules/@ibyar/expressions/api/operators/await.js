var AwaitExpression_1;
import { __decorate, __metadata } from "../../../../tslib/tslib.es6.js";
import { Deserializer } from '../deserialize/deserialize.js';
import { AbstractExpressionNode, AwaitPromise } from '../abstract.js';
let AwaitExpression = AwaitExpression_1 = class AwaitExpression extends AbstractExpressionNode {
    constructor(argument) {
        super();
        this.argument = argument;
    }
    static fromJSON(node, serializer) {
        return new AwaitExpression_1(serializer(node.argument));
    }
    static visit(node, visitNode) {
        visitNode(node.argument);
    }
    getArgument() {
        return this.argument;
    }
    shareVariables(scopeList) {
        this.argument.shareVariables(scopeList);
    }
    set(stack, value) {
        throw new Error('AwaitExpression#set() has no implementation.');
    }
    get(stack, thisContext) {
        const promise = this.argument.get(stack);
        return new AwaitPromise(promise);
    }
    dependency(computed) {
        return this.argument.dependency(computed);
    }
    dependencyPath(computed) {
        return this.argument.dependencyPath(computed);
    }
    toString() {
        return `await ${this.argument.toString()}`;
    }
    toJson() {
        return {
            argument: this.argument.toJSON()
        };
    }
};
AwaitExpression = AwaitExpression_1 = __decorate([
    Deserializer('AwaitExpression'),
    __metadata("design:paramtypes", [Object])
], AwaitExpression);
export { AwaitExpression };
//# sourceMappingURL=await.js.map