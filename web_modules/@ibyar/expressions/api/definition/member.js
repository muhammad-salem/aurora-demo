import { __esDecorate, __runInitializers } from "../../../../tslib/tslib.es6.js";
import { Deserializer } from '../deserialize/deserialize.js';
import { AbstractExpressionNode } from '../abstract.js';
import { Identifier } from './values.js';
let MemberExpression = (() => {
    let _classDecorators = [Deserializer('MemberExpression')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AbstractExpressionNode;
    var MemberExpression = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            MemberExpression = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        object;
        property;
        computed;
        optional;
        static fromJSON(node, deserializer) {
            return new MemberExpression(deserializer(node.object), deserializer(node.property), node.computed, node.optional, node.range, node.loc);
        }
        static visit(node, visitNode) {
            visitNode(node.object);
            visitNode(node.property);
        }
        constructor(object, property, computed, optional = false, range, loc) {
            super(range, loc);
            this.object = object;
            this.property = property;
            this.computed = computed;
            this.optional = optional;
        }
        getObject() {
            return this.object;
        }
        getProperty() {
            return this.property;
        }
        getOptional() {
            return this.optional;
        }
        set(stack, value) {
            const objectScope = this.object.findScope(stack);
            let propertyKey;
            if (this.computed) {
                propertyKey = this.property.get(stack);
                objectScope.set(propertyKey, value);
            }
            else if (this.property instanceof Identifier) {
                objectScope.set(this.property.getName(), value);
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
                throw new TypeError(`Cannot read property '${this.property.toString()}' of ${objectRef}, reading [${this.toString()}]`);
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
    return MemberExpression = _classThis;
})();
export { MemberExpression };
//# sourceMappingURL=member.js.map