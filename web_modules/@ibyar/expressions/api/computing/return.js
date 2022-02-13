var ReturnStatement_1;
import { __decorate, __metadata } from "../../../../tslib/tslib.es6.js";
import { AbstractExpressionNode, ReturnValue } from '../abstract.js';
import { Deserializer } from '../deserialize/deserialize.js';
let ReturnStatement = ReturnStatement_1 = class ReturnStatement extends AbstractExpressionNode {
    constructor(argument) {
        super();
        this.argument = argument;
    }
    static fromJSON(node, deserializer) {
        return new ReturnStatement_1(node.argument ? deserializer(node.argument) : void 0);
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
//# return.js.map