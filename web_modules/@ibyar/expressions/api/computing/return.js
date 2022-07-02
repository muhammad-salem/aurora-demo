var ReturnStatement_1;
import { __decorate, __metadata } from "../../../../tslib/tslib.es6.js";
import { AbstractExpressionNode, ReturnValue } from '../abstract.js';
import { Deserializer } from '../deserialize/deserialize.js';
/**
 * The expression whose value is to be returned.
 * If omitted, undefined is returned instead.
 */
let ReturnStatement = ReturnStatement_1 = class ReturnStatement extends AbstractExpressionNode {
    constructor(argument) {
        super();
        this.argument = argument;
    }
    static fromJSON(node, deserializer) {
        return new ReturnStatement_1(node.argument ? deserializer(node.argument) : void 0);
    }
    static visit(node, visitNode) {
        node.argument && visitNode(node.argument);
    }
    getArgument() {
        return this.argument;
    }
    shareVariables(scopeList) {
        this.argument?.shareVariables(scopeList);
    }
    set(stack, value) {
        throw new Error(`ReturnStatement#set() has no implementation.`);
    }
    get(stack) {
        return new ReturnValue(this.argument?.get(stack));
        // nothing should be written after this operation in a function body.
    }
    dependency(computed) {
        return this.argument?.dependency(computed) || [];
    }
    dependencyPath(computed) {
        return this.argument?.dependencyPath(computed) || [];
    }
    toString() {
        return `return ${this.argument?.toString() || ''}`;
    }
    toJson() {
        return { argument: this.argument?.toJSON() };
    }
};
ReturnStatement = ReturnStatement_1 = __decorate([
    Deserializer('ReturnStatement'),
    __metadata("design:paramtypes", [Object])
], ReturnStatement);
export { ReturnStatement };
//# sourceMappingURL=return.js.map