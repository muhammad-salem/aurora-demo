var Property_1, ObjectExpression_1, ObjectPattern_1;
import { __decorate, __metadata } from "../../../../tslib/tslib.es6.js";
import { AbstractExpressionNode } from '../abstract.js';
import { Deserializer } from '../deserialize/deserialize.js';
import { RestElement } from '../computing/rest.js';
let Property = Property_1 = class Property extends AbstractExpressionNode {
    constructor(key, value, kind, method, shorthand, computed) {
        super();
        this.key = key;
        this.value = value;
        this.kind = kind;
        this.method = method;
        this.shorthand = shorthand;
        this.computed = computed;
    }
    static fromJSON(node, deserializer) {
        return new Property_1(deserializer(node.key), deserializer(node.value), node.kind, node.method, node.shorthand, node.computed);
    }
    static visit(node, visitNode) {
        visitNode(node.key);
        visitNode(node.value);
    }
    getKey() {
        return this.key;
    }
    getValue() {
        return this.value;
    }
    set(stack, value) {
        this.key.set(stack, value);
    }
    shareVariables(scopeList) {
        this.value.shareVariables(scopeList);
    }
    get(stack, thisContext) {
        const name = this.key.get(stack);
        let value;
        switch (this.kind) {
            case 'get':
                const get = this.value.get(stack);
                Object.defineProperty(thisContext, name, { get, configurable: true, enumerable: true });
                value = get;
                break;
            case 'set':
                const set = this.value.get(stack);
                Object.defineProperty(thisContext, name, { set, configurable: true, enumerable: true });
                value = set;
                break;
            default:
            case 'init':
                value = this.value.get(stack);
                Object.defineProperty(thisContext, name, { value, configurable: true, enumerable: true, writable: true });
                break;
        }
        return value;
    }
    declareVariable(stack, objectValue) {
        const propertyName = this.key.get(stack);
        const propertyValue = objectValue[propertyName];
        this.value.declareVariable(stack, propertyValue);
    }
    dependency(computed) {
        return this.key.dependency(computed).concat(this.value.dependency(computed));
    }
    dependencyPath(computed) {
        return this.key.dependencyPath(computed).concat(this.value.dependencyPath(computed));
    }
    toString() {
        const key = this.computed ? `[${this.key.toString()}]` : this.key.toString();
        if (this.shorthand) {
            return key;
        }
        let value = '';
        switch (this.kind) {
            case 'get':
            case 'set':
                const expression = this.value;
                value += this.kind;
                value += ' ' + key;
                value += expression.paramsAndBodyToString();
                break;
            case 'init':
                if (this.method) {
                    const expression = this.value;
                    value += ' ' + key;
                    value += expression.paramsAndBodyToString();
                }
                else {
                    value += this.value.toString();
                    return `${key}: ${value}`;
                }
                break;
            default:
                break;
        }
        return value;
    }
    toJson() {
        return {
            key: this.key.toJSON(),
            value: this.value.toJSON(),
            kind: this.kind
        };
    }
};
Property = Property_1 = __decorate([
    Deserializer('Property'),
    __metadata("design:paramtypes", [Object, Object, String, Boolean, Boolean, Boolean])
], Property);
export { Property };
let ObjectExpression = ObjectExpression_1 = class ObjectExpression extends AbstractExpressionNode {
    constructor(properties) {
        super();
        this.properties = properties;
    }
    static fromJSON(node, deserializer) {
        return new ObjectExpression_1(node.properties.map(deserializer));
    }
    static visit(node, visitNode) {
        node.properties.forEach(visitNode);
    }
    getProperties() {
        return this.properties;
    }
    set(stack) {
        throw new Error('ObjectExpression#set() has no implementation.');
    }
    shareVariables(scopeList) {
        this.properties.forEach(prop => prop.shareVariables(scopeList));
    }
    get(stack) {
        const newObject = {};
        for (const property of this.properties) {
            property.get(stack, newObject);
        }
        return newObject;
    }
    dependency(computed) {
        return this.properties.flatMap(property => property.dependency(computed));
    }
    dependencyPath(computed) {
        return this.properties.flatMap(property => property.dependencyPath(computed));
    }
    toString() {
        return `{ ${this.properties.map(item => item.toString()).join(', ')} }`;
    }
    toJson() {
        return {
            properties: this.properties.map(item => item.toJSON())
        };
    }
};
ObjectExpression = ObjectExpression_1 = __decorate([
    Deserializer('ObjectExpression'),
    __metadata("design:paramtypes", [Array])
], ObjectExpression);
export { ObjectExpression };
let ObjectPattern = ObjectPattern_1 = class ObjectPattern extends AbstractExpressionNode {
    constructor(properties) {
        super();
        this.properties = properties;
    }
    static fromJSON(node, deserializer) {
        return new ObjectPattern_1(node.properties.map(deserializer));
    }
    static visit(node, visitNode) {
        node.properties.forEach(visitNode);
    }
    getProperties() {
        return this.properties;
    }
    shareVariables(scopeList) { }
    set(stack, objectValue) {
        throw new Error('ObjectPattern#set() has no implementation.');
    }
    get(scopeProvider) {
        throw new Error('ObjectPattern#get() has no implementation.');
    }
    declareVariable(stack, objectValue) {
        for (const property of this.properties) {
            if (property instanceof RestElement) {
                objectValue = this.getFromObject(stack, objectValue);
            }
            property.declareVariable(stack, objectValue);
        }
    }
    getFromObject(stack, objectValue) {
        const keys = [];
        keys.push(...Object.keys(objectValue));
        keys.push(...Object.getOwnPropertySymbols(objectValue));
        const restObject = {};
        const context = stack.lastScope().getContext();
        for (const key of keys) {
            if (!(key in context)) {
                restObject[key] = objectValue[key];
            }
        }
        return restObject;
    }
    dependency(computed) {
        return this.properties.flatMap(property => property.dependency(computed));
    }
    dependencyPath(computed) {
        return this.properties.flatMap(property => property.dependencyPath(computed));
    }
    toString() {
        return `{ ${this.properties.map(item => item.toString()).join(', ')} }`;
    }
    toJson() {
        return {
            properties: this.properties.map(item => item.toJSON())
        };
    }
};
ObjectPattern = ObjectPattern_1 = __decorate([
    Deserializer('ObjectPattern'),
    __metadata("design:paramtypes", [Array])
], ObjectPattern);
export { ObjectPattern };
//# sourceMappingURL=object.js.map