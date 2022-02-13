var RestElement_1;
import { __decorate, __metadata } from "../../../../tslib/tslib.es6.js";
import { AbstractExpressionNode } from '../abstract.js';
import { Deserializer } from '../deserialize/deserialize.js';
let RestElement = RestElement_1 = class RestElement extends AbstractExpressionNode {
    constructor(argument) {
        super();
        this.argument = argument;
    }
    static fromJSON(node, deserializer) {
        return new RestElement_1(deserializer(node.argument));
    }
    getArgument() {
        return this.argument;
    }
    shareVariables(scopeList) {
        this.argument.shareVariables(scopeList);
    }
    set(stack, value) {
        throw new Error('RestElement#set() Method has no implementation.');
    }
    get(stack) {
        throw new Error('RestElement#get() Method has no implementation.');
    }
    declareVariable(stack, scopeType, propertyValue) {
        this.argument.declareVariable(stack, scopeType, propertyValue);
    }
    dependency(computed) {
        return this.argument.dependency(computed);
    }
    dependencyPath(computed) {
        return this.argument.dependencyPath(computed);
    }
    toString() {
        return `...${this.argument.toString()}`;
    }
    toJson() {
        return { argument: this.argument.toJSON() };
    }
};
RestElement = RestElement_1 = __decorate([
    Deserializer('RestElement'),
    __metadata("design:paramtypes", [Object])
], RestElement);
export { RestElement };
//# rest.js.map