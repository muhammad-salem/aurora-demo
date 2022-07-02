var BindExpression_1;
import { __decorate, __metadata } from "../../../../tslib/tslib.es6.js";
import { Deserializer } from '../deserialize/deserialize.js';
import { AbstractExpressionNode } from '../abstract.js';
/**
 * ```js
 * const x = {method: function(){...}};
 * const z = x::method;
 * ```
 */
let BindExpression = BindExpression_1 = class BindExpression extends AbstractExpressionNode {
    constructor(object, property, computed, optional = false) {
        super();
        this.object = object;
        this.property = property;
        this.computed = computed;
        this.optional = optional;
    }
    static fromJSON(node, deserializer) {
        return new BindExpression_1(deserializer(node.object), deserializer(node.property), node.computed, node.optional);
    }
    static visit(node, visitNode) {
        visitNode(node.object);
        visitNode(node.property);
    }
    getObject() {
        return this.object;
    }
    getProperty() {
        return this.property;
    }
    shareVariables(scopeList) { }
    set(stack) {
        throw new Error("BindExpression#set() has no implementation.");
    }
    get(stack, thisContext) {
        const objectRef = thisContext ?? this.object.get(stack);
        if (typeof objectRef === 'undefined') {
            throw new TypeError(`Cannot read property '${this.property.toString()}' of undefined`);
        }
        let value;
        if (this.computed) {
            value = objectRef[this.property.get(stack)];
        }
        else {
            value = this.property.get(stack, objectRef);
        }
        if (this.optional && (value === undefined || value === null)) {
            return;
        }
        if (typeof value !== 'function') {
            throw new Error(`can't bind to non-function type ${value}`);
        }
        return value.bind(objectRef);
    }
    findScope(stack, objectScope) {
        if (!objectScope) {
            objectScope = this.object.findScope(stack);
        }
        return this.property.findScope(stack, objectScope);
    }
    dependency(computed) {
        return this.object.dependency(computed).concat(this.property.dependency(computed));
    }
    dependencyPath(computed) {
        return this.object.dependencyPath(computed).concat(this.property.dependencyPath(computed));
    }
    toString() {
        if (this.computed) {
            return `${this.object.toString()}${this.optional ? '?::' : '::'}[${this.property.toString()}]`;
        }
        return `${this.object.toString()}${this.optional ? '?::' : '::'}${this.property.toString()}`;
    }
    toJson() {
        return {
            object: this.object.toJSON(),
            property: this.property.toJSON(),
            computed: this.computed,
            optional: this.optional
        };
    }
};
BindExpression = BindExpression_1 = __decorate([
    Deserializer('BindExpression'),
    __metadata("design:paramtypes", [Object, Object, Boolean, Boolean])
], BindExpression);
export { BindExpression };
//# sourceMappingURL=bind.js.map