import { __esDecorate, __runInitializers } from "../../../../tslib/tslib.es6.js";
import { Identifier } from './values.js';
import { AbstractExpressionNode } from '../abstract.js';
import { Deserializer } from '../deserialize/deserialize.js';
import { RestElement } from '../computing/rest.js';
let Property = (() => {
    let _classDecorators = [Deserializer('Property')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AbstractExpressionNode;
    var Property = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            Property = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        key;
        value;
        kind;
        method;
        shorthand;
        computed;
        static fromJSON(node, deserializer) {
            return new Property(deserializer(node.key), deserializer(node.value), node.kind, node.method, node.shorthand, node.computed, node.range, node.loc);
        }
        static visit(node, visitNode) {
            visitNode(node.key);
            visitNode(node.value);
        }
        constructor(key, value, kind, method, shorthand, computed, range, loc) {
            super(range, loc);
            this.key = key;
            this.value = value;
            this.kind = kind;
            this.method = method;
            this.shorthand = shorthand;
            this.computed = computed;
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
        get(stack, thisContext) {
            const name = this.key instanceof Identifier ? this.key.getName() : this.key.get(stack);
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
            const propertyName = this.shorthand ? this.key.getName() : this.key.get(stack);
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
    return Property = _classThis;
})();
export { Property };
let ObjectExpression = (() => {
    let _classDecorators = [Deserializer('ObjectExpression')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AbstractExpressionNode;
    var ObjectExpression = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ObjectExpression = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        properties;
        static fromJSON(node, deserializer) {
            return new ObjectExpression(node.properties.map(deserializer), node.range, node.loc);
        }
        static visit(node, visitNode) {
            node.properties.forEach(visitNode);
        }
        constructor(properties, range, loc) {
            super(range, loc);
            this.properties = properties;
        }
        getProperties() {
            return this.properties;
        }
        set(stack) {
            throw new Error('ObjectExpression#set() has no implementation.');
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
    return ObjectExpression = _classThis;
})();
export { ObjectExpression };
let ObjectPattern = (() => {
    let _classDecorators = [Deserializer('ObjectPattern')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AbstractExpressionNode;
    var ObjectPattern = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ObjectPattern = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        properties;
        static fromJSON(node, deserializer) {
            return new ObjectPattern(node.properties.map(deserializer), node.range, node.loc);
        }
        static visit(node, visitNode) {
            node.properties.forEach(visitNode);
        }
        constructor(properties, range, loc) {
            super(range, loc);
            this.properties = properties;
        }
        getProperties() {
            return this.properties;
        }
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
    return ObjectPattern = _classThis;
})();
export { ObjectPattern };
//# sourceMappingURL=object.js.map