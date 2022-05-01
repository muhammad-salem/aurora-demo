var MemberExpression_1;
import { __decorate, __metadata } from "../../../../tslib/tslib.es6.js";
import { Deserializer } from '../deserialize/deserialize.js';
import { AbstractExpressionNode } from '../abstract.js';
let MemberExpression = MemberExpression_1 = class MemberExpression extends AbstractExpressionNode {
    constructor(object, property, computed, optional = false) {
        super();
        this.object = object;
        this.property = property;
        this.computed = computed;
        this.optional = optional;
    }
    static fromJSON(node, deserializer) {
        return new MemberExpression_1(deserializer(node.object), deserializer(node.property), node.computed, node.optional);
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
    set(stack, value) {
        const objectScope = this.object.findScope(stack);
        let propertyKey;
        if (this.computed) {
            propertyKey = this.property.get(stack);
            objectScope.set(propertyKey, value);
        }
        else {
            stack.pushScope(objectScope);
            this.property.set(stack, value);
            stack.clearTo(objectScope);
        }
        return value;
    }
    get(stack, thisContext) {
        const objectRef = thisContext ?? this.object.get(stack);
        if (objectRef === undefined || objectRef === null) {
            if (this.optional) {
                return;
            }
            throw new TypeError(`Cannot read property '${this.property.toString()}' of ${objectRef}`);
        }
        let value;
        if (this.computed) {
            value = objectRef[this.property.get(stack)];
        }
        else {
            value = this.property.get(stack, objectRef);
        }
        return value;
    }
    findScope(stack, objectScope) {
        if (!objectScope) {
            objectScope = this.object.findScope(stack);
        }
        return this.property.findScope(stack, objectScope);
    }
    dependency(computed) {
        return [this];
    }
    dependencyPath(computed) {
        if (this.computed) {
            const objPath = this.object.dependencyPath(computed);
            const propertyDependency = this.property.dependency(true);
            const propertyDependencyPath = propertyDependency.map(exp => exp.dependencyPath(true));
            const computedPath = {
                computed: true,
                path: ':' + propertyDependencyPath.flatMap(paths => paths).map(prop => prop.path).join(':'),
                computedPath: propertyDependencyPath.flatMap(paths => paths.flatMap(prop => prop.computed ? prop.computedPath : [])),
            };
            return objPath.concat(computedPath);
        }
        return this.object.dependencyPath(computed).concat(this.property.dependencyPath(computed));
    }
    toString() {
        if (this.computed) {
            return `${this.object.toString()}${this.optional ? '?.' : ''}[${this.property.toString()}]`;
        }
        return `${this.object.toString()}${this.optional ? '?.' : '.'}${this.property.toString()}`;
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
MemberExpression = MemberExpression_1 = __decorate([
    Deserializer('MemberExpression'),
    __metadata("design:paramtypes", [Object, Object, Boolean, Boolean])
], MemberExpression);
export { MemberExpression };
//# sourceMappingURL=member.js.map