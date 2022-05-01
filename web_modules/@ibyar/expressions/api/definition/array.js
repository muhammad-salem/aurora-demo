var ArrayExpression_1, ArrayPattern_1;
import { __decorate, __metadata } from "../../../../tslib/tslib.es6.js";
import { AbstractExpressionNode } from '../abstract.js';
import { Deserializer } from '../deserialize/deserialize.js';
import { RestElement } from '../computing/rest.js';
let ArrayExpression = ArrayExpression_1 = class ArrayExpression extends AbstractExpressionNode {
    constructor(elements) {
        super();
        this.elements = elements;
    }
    static fromJSON(node, deserializer) {
        return new ArrayExpression_1(node.elements.map(expression => deserializer(expression)));
    }
    static visit(node, visitNode) {
        node.elements.forEach(visitNode);
    }
    getElements() {
        return this.elements;
    }
    shareVariables(scopeList) {
        this.elements.forEach(item => item.shareVariables(scopeList));
    }
    set(stack) {
        throw new Error("ArrayExpression#set() has no implementation.");
    }
    get(stack) {
        return this.elements.map(item => item.get(stack));
    }
    dependency(computed) {
        return this.elements.flatMap(item => item.dependency(computed));
    }
    dependencyPath(computed) {
        return this.elements.flatMap(item => item.dependencyPath(computed));
    }
    toString() {
        return this.elements.map(item => item.toString()).toString();
    }
    toJson() {
        return {
            elements: this.elements.map(item => item.toJSON())
        };
    }
};
ArrayExpression = ArrayExpression_1 = __decorate([
    Deserializer('ArrayExpression'),
    __metadata("design:paramtypes", [Array])
], ArrayExpression);
export { ArrayExpression };
let ArrayPattern = ArrayPattern_1 = class ArrayPattern extends AbstractExpressionNode {
    constructor(elements) {
        super();
        this.elements = elements;
    }
    static fromJSON(node, deserializer) {
        return new ArrayPattern_1(node.elements.map(expression => deserializer(expression)));
    }
    static visit(node, visitNode) {
        node.elements.forEach(visitNode);
    }
    getElements() {
        return this.elements;
    }
    shareVariables(scopeList) { }
    set(stack, values) {
        throw new Error('ArrayPattern#set() has no implementation.');
    }
    get(scopeProvider) {
        throw new Error('ArrayPattern#get() has no implementation.');
    }
    declareVariable(stack, values) {
        if (Array.isArray(values)) {
            this.declareVariableFromArray(stack, values);
        }
        else if (Reflect.has(values, Symbol.iterator)) {
            this.declareVariableFromIterator(stack, values);
        }
    }
    declareVariableFromArray(stack, values) {
        for (let index = 0; index < this.elements.length; index++) {
            const elem = this.elements[index];
            if (elem instanceof RestElement) {
                const rest = values.slice(index);
                elem.declareVariable(stack, rest);
                break;
            }
            elem.declareVariable(stack, values[index]);
        }
    }
    declareVariableFromIterator(stack, iterator) {
        let index = 0;
        while (true) {
            let iteratorResult = iterator.next();
            if (iteratorResult.done) {
                break;
            }
            const elem = this.elements[index++];
            if (elem instanceof RestElement) {
                const rest = [iteratorResult.value];
                while (!iteratorResult.done) {
                    iteratorResult = iterator.next();
                    rest.push(iteratorResult.value);
                }
                elem.declareVariable(stack, rest);
                break;
            }
            elem.declareVariable(stack, iteratorResult.value);
            if (index >= this.elements.length) {
                break;
            }
        }
    }
    dependency(computed) {
        return this.elements.flatMap(item => item.dependency(computed));
    }
    dependencyPath(computed) {
        return this.elements.flatMap(item => item.dependencyPath(computed));
    }
    toString() {
        return this.elements.map(item => item.toString()).toString();
    }
    toJson() {
        return {
            elements: this.elements.map(item => item.toJSON())
        };
    }
};
ArrayPattern = ArrayPattern_1 = __decorate([
    Deserializer('ArrayPattern'),
    __metadata("design:paramtypes", [Array])
], ArrayPattern);
export { ArrayPattern };
//# sourceMappingURL=array.js.map