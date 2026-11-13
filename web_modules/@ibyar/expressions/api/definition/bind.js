import { __esDecorate, __runInitializers } from "../../../../tslib/tslib.es6.js";
import { Deserializer } from '../deserialize/deserialize.js';
import { AbstractExpressionNode } from '../abstract.js';
/**
 * ```js
 * const x = {method: function(){...}};
 * const z = x::method;
 * ```
 */
let BindExpression = (() => {
    let _classDecorators = [Deserializer('BindExpression')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AbstractExpressionNode;
    var BindExpression = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            BindExpression = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        object;
        property;
        computed;
        optional;
        static fromJSON(node, deserializer) {
            return new BindExpression(deserializer(node.object), deserializer(node.property), node.computed, node.optional, node.range, node.loc);
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
    return BindExpression = _classThis;
})();
export { BindExpression };
//# sourceMappingURL=bind.js.map