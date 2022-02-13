var SpreadElement_1;
import { __decorate, __metadata } from "../../../../tslib/tslib.es6.js";
import { AbstractExpressionNode } from '../abstract.js';
import { Deserializer } from '../deserialize/deserialize.js';
let SpreadElement = SpreadElement_1 = class SpreadElement extends AbstractExpressionNode {
    constructor(argument) {
        super();
        this.argument = argument;
    }
    static fromJSON(node, deserializer) {
        return new SpreadElement_1(deserializer(node.argument));
    }
    getArgument() {
        return this.argument;
    }
    shareVariables(scopeList) {
        this.argument.shareVariables(scopeList);
    }
    set(stack, value) {
        throw new Error('SpreadElement#set() Method has no implementation.');
    }
    get(stack) {
        const value = this.argument.get(stack);
        if (Array.isArray(value)) {
            this.spreadFromArray(stack, value);
        }
        else if (Reflect.has(value, Symbol.iterator)) {
            this.spreadFromIterator(stack, value);
        }
    }
    spreadFromArray(stack, array) {
        let length = stack.get('length');
        array.forEach(value => stack.declareVariable('block', length++, value));
    }
    spreadFromIterator(stack, iterator) {
        let length = stack.get('length');
        while (true) {
            const iteratorResult = iterator.next();
            if (iteratorResult.done) {
                break;
            }
            stack.declareVariable('block', length++, iteratorResult.value);
        }
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
SpreadElement = SpreadElement_1 = __decorate([
    Deserializer('SpreadElement'),
    __metadata("design:paramtypes", [Object])
], SpreadElement);
export { SpreadElement };
//# spread.js.map