import { __esDecorate, __runInitializers } from "../../../../tslib@2.9.1/tslib.es6.js";
import { AbstractExpressionNode } from '../abstract.js';
import { Deserializer } from '../deserialize/deserialize.js';
import { Identifier } from '../definition/values.js';
import { BlockStatement } from '../statement/control/block.js';
import { CallExpression } from '../computing/call.js';
const TEMP_CLASS_NAME = Symbol('TempClassName');
const PRIVATE_SYMBOL = Symbol('#');
;
class ClassInitializer {
    /**
     * register class public static properties and methods
     */
    staticInitializer = {};
    /**
     * register class private static properties and methods
     */
    staticPrivateInitializer = {};
    /**
     * register static initialization block
     */
    staticInitializerBlock = [];
    /**
     * register class constructor function
     */
    instanceConstructor;
    /**
     * register super parameter resolver
     */
    superParameterResolver = (params) => params;
    /**
     * register in class property
     */
    instanceMethod = {};
    /**
     * register method in instance private space
     */
    privateInstanceMethod = {};
    /**
     * register property in instance itself
     */
    instanceInitializer = [];
    addStaticInitializer(key, attributes) {
        Reflect.set(this.staticInitializer, key, attributes);
    }
    addStaticPrivateInitializer(key, attributes) {
        Reflect.set(this.staticPrivateInitializer, key, attributes);
    }
    addStaticInitializerBlock(block) {
        this.staticInitializerBlock.push(block);
    }
    setConstructor(cstr) {
        this.instanceConstructor = cstr;
    }
    setParameterResolver(resolver) {
        this.superParameterResolver = resolver;
    }
    addInstanceMethod(key, attributes) {
        Reflect.set(this.instanceMethod, key, attributes);
    }
    addPrivateInstanceMethod(key, attributes) {
        Reflect.set(this.privateInstanceMethod, key, attributes);
    }
    addInstanceInitializer(initializer) {
        this.instanceInitializer.push(initializer);
    }
    initClass(classConstructor) {
        Object.defineProperties(classConstructor, this.staticInitializer);
        Object.defineProperties(classConstructor[PRIVATE_SYMBOL], this.staticPrivateInitializer);
        Object.defineProperties(classConstructor.prototype, this.instanceMethod);
        this.staticInitializerBlock.forEach(block => block());
    }
    getSuperArguments(args) {
        return this.superParameterResolver(args);
    }
    initInstance(instance) {
        Object.defineProperties(instance[PRIVATE_SYMBOL], this.privateInstanceMethod);
        this.instanceInitializer.forEach(initializer => {
            const definition = initializer();
            const target = definition.isPrivate ? instance[PRIVATE_SYMBOL] : instance;
            target[definition.key] = definition.value;
        });
        this.instanceConstructor?.apply(instance);
    }
}
/**
 * A `super` pseudo-expression.
 */
let Super = (() => {
    let _classDecorators = [Deserializer('Super')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AbstractExpressionNode;
    var Super = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            Super = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        static fromJSON(node) {
            return new Super(node.range, node.loc);
        }
        constructor(range, loc) {
            super(range, loc);
        }
        set(stack, value) {
            throw new Error('Super.#set() Method not implemented.');
        }
        get(stack, thisContext) {
            return stack.get('super');
        }
        dependency(computed) {
            throw new Error('Super.#dependency() Method not implemented.');
        }
        dependencyPath(computed) {
            throw new Error('Super.#dependencyPath() Method not implemented.');
        }
        toString() {
            return `super`;
        }
        toJson() {
            return {};
        }
    };
    return Super = _classThis;
})();
export { Super };
/**
 * MetaProperty node represents
 * - `new.target` meta property in ES2015.
 * - `import.meta` meta property in ES2030.
 *
 * In the future, it will represent other meta properties as well.
 */
let MetaProperty = (() => {
    let _classDecorators = [Deserializer('MetaProperty')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AbstractExpressionNode;
    var MetaProperty = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            MetaProperty = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        meta;
        property;
        static fromJSON(node, deserializer) {
            return new MetaProperty(deserializer(node.meta), deserializer(node.property), node.range, node.loc);
        }
        static visit(node, visitNode) {
            visitNode(node.meta);
            visitNode(node.property);
        }
        constructor(meta, property, range, loc) {
            super(range, loc);
            this.meta = meta;
            this.property = property;
        }
        getMeta() {
            return this.meta;
        }
        getProperty() {
            return this.property;
        }
        get(stack) {
            const metaRef = this.meta.get(stack);
            if (metaRef === undefined || metaRef === null) {
                throw new TypeError(`Cannot read meta property '${this.property.toString()}' of ${metaRef}, reading [${this.toString()}]`);
            }
            return this.property.get(stack, metaRef);
        }
        set(stack, value) {
            throw new Error(`MetaProperty#set() has no implementation.`);
        }
        dependency(computed) {
            return [];
        }
        dependencyPath(computed) {
            return [];
        }
        toString() {
            return `${this.meta.toString()}.${this.property.toString()}`;
        }
        toJson() {
            return {
                meta: this.meta.toJSON(),
                property: this.property.toJSON(),
            };
        }
    };
    return MetaProperty = _classThis;
})();
export { MetaProperty };
/**
 * A private identifier refers to private class elements. For a private name `#a`, its name is `a`.
 */
let PrivateIdentifier = (() => {
    let _classDecorators = [Deserializer('PrivateIdentifier')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = Identifier;
    var PrivateIdentifier = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            PrivateIdentifier = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        static fromJSON(node) {
            return new PrivateIdentifier(node.name, node.range, node.loc);
        }
        get(stack, thisContext) {
            return thisContext[PRIVATE_SYMBOL][this.name];
        }
        set(stack, value) {
            const thisContext = stack.lastScope().getContext();
            return thisContext[PRIVATE_SYMBOL][this.name] = value;
        }
        toString() {
            return `#${this.name}`;
        }
    };
    return PrivateIdentifier = _classThis;
})();
export { PrivateIdentifier };
/**
 * A static block static { } is a block statement serving as an additional static initializer.
 */
let StaticBlock = (() => {
    let _classDecorators = [Deserializer('StaticBlock')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = BlockStatement;
    var StaticBlock = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            StaticBlock = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        static fromJSON(node, deserializer) {
            return new StaticBlock(deserializer(node.body), node.range, node.loc);
        }
        get(stack, classInitializer) {
            classInitializer?.addStaticInitializerBlock(super.get(stack));
        }
        toString() {
            return `static ${super.toString()}`;
        }
        toJson() {
            return {
                body: this.body.map(node => node.toJSON())
            };
        }
    };
    return StaticBlock = _classThis;
})();
export { StaticBlock };
export class AbstractDefinition extends AbstractExpressionNode {
    key;
    decorators;
    computed;
    value;
    'static';
    constructor(key, decorators, computed, isStatic, value, range, loc) {
        super(range, loc);
        this.key = key;
        this.decorators = decorators;
        this.computed = computed;
        this.value = value;
        this.static = isStatic;
    }
    getKey() {
        return this.key;
    }
    getValue() {
        return this.value;
    }
    isComputed() {
        return this.computed;
    }
    isStatic() {
        return this.static;
    }
    isPrivate() {
        return this.key instanceof PrivateIdentifier;
    }
    getDecorators() {
        return this.decorators;
    }
    set(stack, value) {
        throw new Error('AbstractDefinition.#set() Method not implemented.');
    }
    dependency(computed) {
        return [];
    }
    dependencyPath(computed) {
        return [];
    }
    getKeyName(stack) {
        if (this.computed) {
            // private properties can't be computed
            return this.key.get(stack);
        }
        if (this.key instanceof Identifier) {
            return this.key.getName();
        }
        return this.key.toString();
    }
}
/**
 * - When key is a PrivateIdentifier, computed must be false and kind can not be "constructor".
 */
let MethodDefinition = (() => {
    let _classDecorators = [Deserializer('MethodDefinition')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AbstractDefinition;
    var MethodDefinition = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            MethodDefinition = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        kind;
        static fromJSON(node, deserializer) {
            return new MethodDefinition(node.kind, deserializer(node.key), deserializer(node.value), node.decorators.map(deserializer), node.computed, node.static, node.range, node.loc);
        }
        static visit(node, visitNode) {
            visitNode(node.key);
            visitNode(node.value);
            node.decorators.forEach(visitNode);
        }
        afterInstanceConstruct;
        constructor(kind, key, value, decorators, computed, isStatic, range, loc) {
            super(key, decorators, computed, isStatic, value, range, loc);
            this.kind = kind;
        }
        getKind() {
            return this.kind;
        }
        getValue() {
            return this.value;
        }
        get(stack, initializer) {
            if (this.kind === 'constructor') {
                this.initConstructor(stack, initializer);
                return;
            }
            const name = this.getKeyName(stack);
            const value = this.value?.get(stack);
            const attributes = this.getPropertyAttributes(value);
            if (this.isStatic() && this.isPrivate()) {
                initializer.addStaticPrivateInitializer(name, attributes);
            }
            else if (this.isStatic()) {
                initializer.addStaticInitializer(name, attributes);
            }
            else if (this.isPrivate()) {
                initializer.addPrivateInstanceMethod(name, attributes);
            }
            else {
                initializer.addInstanceMethod(name, attributes);
            }
        }
        getPropertyAttributes(value) {
            switch (this.kind) {
                case 'set': return {
                    writable: true,
                    configurable: true,
                    enumerable: false,
                    set: value,
                };
                case 'get': return {
                    writable: true,
                    configurable: true,
                    enumerable: false,
                    get: value,
                };
                default:
                case 'method': return {
                    writable: true,
                    configurable: true,
                    enumerable: false,
                    value: value
                };
            }
        }
        initConstructor(stack, initializer) {
            const body = this.value.getBody().getBody();
            let superIndex = body
                .findIndex(call => call instanceof CallExpression && call.getCallee() instanceof Super);
            const blockAfterSuper = new BlockStatement(body.slice(superIndex + 1));
            initializer.setConstructor(function (params) {
                const scope = stack.pushBlockScope();
                blockAfterSuper.get(stack);
                stack.clearTo(scope);
            });
            if (superIndex >= 0) {
                const blockBeforeSuper = new BlockStatement(body.slice(0, superIndex));
                const superCall = body[superIndex];
                const cstrExpr = this;
                initializer.setParameterResolver(function (params) {
                    const scope = stack.pushBlockScope();
                    cstrExpr.value.defineFunctionArguments(stack, params);
                    blockBeforeSuper.get(stack);
                    const parameters = superCall.getCallParameters(stack);
                    stack.clearTo(scope);
                    return parameters;
                });
            }
        }
        toString() {
            let str = this.decorators.map(decorator => decorator.toString()).join(' ');
            if (str.length) {
                str += ' ';
            }
            if (this.static) {
                str += 'static ';
            }
            const methodName = this.key.toString();
            switch (this.kind) {
                case 'get':
                    str += 'get ' + methodName;
                    break;
                case 'set':
                    str += 'set ' + methodName;
                    break;
                case 'method':
                    if (this.value.getAsync() && this.value.getGenerator()) {
                        str += 'async *';
                    }
                    else if (this.value.getAsync()) {
                        str += 'async ';
                    }
                    else if (this.value.getGenerator()) {
                        str += '*';
                    }
                    str += methodName;
                    break;
                case 'constructor':
                    str += 'constructor';
                    break;
                default:
                    break;
            }
            str += this.value.paramsAndBodyToString();
            return str;
        }
        toJson() {
            return {
                kind: this.kind,
                key: this.key.toJSON(),
                value: this.value.toJSON(),
                decorators: this.decorators.map(decorator => decorator.toJSON()),
                computed: this.computed,
                static: this.static,
            };
        }
    };
    return MethodDefinition = _classThis;
})();
export { MethodDefinition };
/**
 * - When key is a PrivateIdentifier, computed must be false.
 */
let PropertyDefinition = (() => {
    let _classDecorators = [Deserializer('PropertyDefinition')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AbstractDefinition;
    var PropertyDefinition = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            PropertyDefinition = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        static fromJSON(node, deserializer) {
            return new PropertyDefinition(deserializer(node.key), node.decorators.map(deserializer), node.computed, node.static, node.value && deserializer(node.value), node.range, node.loc);
        }
        static visit(node, visitNode) {
            visitNode(node.key);
            node.value && visitNode(node.value);
        }
        constructor(key, decorators, computed, isStatic, value, range, loc) {
            super(key, decorators, computed, isStatic, value, range, loc);
        }
        get(stack, initializer) {
            const name = this.getKeyName(stack);
            if (!this.isStatic()) {
                initializer.addInstanceInitializer(() => ({ isPrivate: this.isPrivate(), key: name, value: this.value?.get(stack) }));
                return;
            }
            const value = this.value?.get(stack);
            const attributes = { writable: true, configurable: true, enumerable: true, value };
            if (this.isPrivate()) {
                initializer.addStaticPrivateInitializer(name, attributes);
            }
            else {
                initializer.addStaticInitializer(name, attributes);
            }
        }
        toString() {
            const decorators = this.decorators.map(decorator => decorator.toString()).join('\n');
            const name = this.computed ? `[${this.key.toString()}]` : this.key.toString();
            return `${decorators.length ? decorators + ' ' : ''}${this.static ? 'static ' : ''}${name}${this.value ? ` = ${this.value.toString()}` : ''};`;
        }
        toJson() {
            return {
                key: this.key.toJSON(),
                value: this.value?.toJSON(),
                decorators: this.decorators.map(decorator => decorator.toJSON()),
                computed: this.computed,
                static: this.static,
            };
        }
    };
    return PropertyDefinition = _classThis;
})();
export { PropertyDefinition };
let AccessorProperty = (() => {
    let _classDecorators = [Deserializer('AccessorProperty')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AbstractDefinition;
    var AccessorProperty = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AccessorProperty = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        static fromJSON(node, deserializer) {
            return new AccessorProperty(deserializer(node.key), node.decorators.map(deserializer), node.computed, node.static, node.value ? deserializer(node.value) : void 0, node.range, node.loc);
        }
        static visit(node, visitNode) {
            visitNode(node.key);
            node.value && visitNode(node.value);
            node.decorators.forEach(visitNode);
        }
        constructor(key, decorators, computed, isStatic, value, range, loc) {
            super(key, decorators, computed, isStatic, value, range, loc);
        }
        get(stack, initializer) {
            const name = this.getKeyName(stack);
            const accessorAttributes = {
                writable: false,
                configurable: true,
                enumerable: false,
                set: function (value) {
                    this[PRIVATE_SYMBOL][name] = value;
                },
                get: function () {
                    return this[PRIVATE_SYMBOL][name];
                },
            };
            if (!this.isStatic()) {
                initializer.addInstanceInitializer(() => ({ isPrivate: true, key: name, value: this.value?.get(stack) }));
                initializer.addInstanceMethod(name, accessorAttributes);
                return;
            }
            const value = this.value?.get(stack);
            const valueAttribute = { writable: true, configurable: true, enumerable: true, value };
            initializer.addStaticInitializer(name, accessorAttributes);
            initializer.addStaticPrivateInitializer(name, valueAttribute);
        }
        toString() {
            const decorators = this.decorators.map(decorator => decorator.toString()).join('\n');
            const name = this.computed ? `[${this.key.toString()}]` : this.key.toString();
            return `${decorators.length ? decorators.concat(' ') : ''}${this.static ? 'static ' : ''}accessor ${name}${this.value ? ` = ${this.value.toString()}` : ''};`;
        }
        toJson() {
            return {
                key: this.key.toJSON(),
                decorators: this.decorators.map(decorator => decorator.toJSON()),
                computed: this.computed,
                static: this.static,
                value: this.value?.toJSON(),
            };
        }
    };
    return AccessorProperty = _classThis;
})();
export { AccessorProperty };
let ClassBody = (() => {
    let _classDecorators = [Deserializer('ClassBody')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AbstractExpressionNode;
    var ClassBody = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ClassBody = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        body;
        static fromJSON(node, deserializer) {
            return new ClassBody(node.body.map(deserializer), node.range, node.loc);
        }
        static visit(node, visitNode) {
            node.body.forEach(visitNode);
        }
        constructor(body, range, loc) {
            super(range, loc);
            this.body = body;
        }
        getBody() {
            return this.body;
        }
        set(stack, value) {
            throw new Error('Method not implemented.');
        }
        get(stack, initializer) {
            this.body.forEach(definition => definition.get(stack, initializer));
        }
        dependency(computed) {
            throw new Error('Method not implemented.');
        }
        dependencyPath(computed) {
            throw new Error('Method not implemented.');
        }
        toString() {
            return this.body.map(definition => `\t${definition.toString()}`).join('\n');
        }
        toJson() {
            return {
                body: this.body.map(method => method.toJSON())
            };
        }
    };
    return ClassBody = _classThis;
})();
export { ClassBody };
export class Class extends AbstractExpressionNode {
    body;
    decorators;
    id;
    superClass;
    constructor(body, decorators, id, superClass, range, loc) {
        super(range, loc);
        this.body = body;
        this.decorators = decorators;
        this.id = id;
        this.superClass = superClass;
    }
    getBody() {
        return this.body;
    }
    getDecorators() {
        return this.decorators;
    }
    getId() {
        return this.id;
    }
    getSuperClass() {
        return this.superClass;
    }
    set(stack) {
        throw new Error(`Class.#set() has no implementation.`);
    }
    get(stack) {
        // freeze stack
        stack = stack.copyStack();
        const className = this.id?.getName() ?? TEMP_CLASS_NAME;
        const SuperClass = this.superClass?.get(stack) ?? class {
        };
        const initializer = new ClassInitializer();
        const ClassConstructor = this.createClass(SuperClass, className, initializer);
        // build class body
        stack.pushBlockScopeFor({
            'this': ClassConstructor,
            'super': SuperClass,
        });
        this.body.get(stack, initializer);
        initializer.initClass(ClassConstructor);
        return ClassConstructor;
    }
    createClass(parentClass, className, initializer) {
        const nameClassDeclaration = {
            [className]: class extends parentClass {
                static [Symbol.toStringTag] = className;
                static [PRIVATE_SYMBOL] = {};
                [PRIVATE_SYMBOL] = {};
                constructor(...params) {
                    const parameters = initializer.getSuperArguments(params);
                    super(...parameters);
                    initializer.initInstance(this);
                }
            }
        };
        return nameClassDeclaration[className];
    }
    dependency(computed) {
        throw new Error('Method not implemented.');
    }
    dependencyPath(computed) {
        throw new Error('Method not implemented.');
    }
    toString() {
        const decorators = this.decorators.map(decorator => decorator.toString()).join('\n');
        let classDeclaration = 'class ';
        if (this.id) {
            classDeclaration += this.id.toString();
        }
        if (this.superClass) {
            classDeclaration += ' extends ' + this.superClass.toString();
        }
        return `${decorators}${classDeclaration} {\n${this.body.toString()}\n}`;
    }
    toJson() {
        return {
            body: this.body.toJSON(),
            decorators: this.decorators.map(decorator => decorator.toJSON()),
            id: this.id?.toJSON(),
            superClass: this.superClass?.toJSON(),
        };
    }
}
let ClassDeclaration = (() => {
    let _classDecorators = [Deserializer('ClassDeclaration')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = Class;
    var ClassDeclaration = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ClassDeclaration = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        static fromJSON(node, deserializer) {
            return new ClassDeclaration(deserializer(node.body), node.decorators.map(deserializer), deserializer(node.id), node.superClass && deserializer(node.superClass), node.range, node.loc);
        }
        static visit(node, visitNode) {
            visitNode(node.body);
            node.decorators.forEach(visitNode);
            visitNode(node.id);
            node.superClass && visitNode(node.superClass);
        }
        constructor(body, decorators, id, superClass, range, loc) {
            super(body, decorators, id, superClass, range, loc);
        }
        declareVariable(stack, propertyValue) {
            stack.declareVariable(this.id.getName(), propertyValue);
        }
        getDeclarationName() {
            return this.id.getDeclarationName();
        }
        get(stack) {
            const classConstructor = super.get(stack);
            this.id.declareVariable(stack, classConstructor);
            return classConstructor;
        }
    };
    return ClassDeclaration = _classThis;
})();
export { ClassDeclaration };
let ClassExpression = (() => {
    let _classDecorators = [Deserializer('ClassExpression')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = Class;
    var ClassExpression = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ClassExpression = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        static fromJSON(node, deserializer) {
            return new ClassExpression(deserializer(node.body), node.decorators.map(deserializer), node.id && deserializer(node.id), node.superClass && deserializer(node.superClass), node.range, node.loc);
        }
        static visit(node, visitNode) {
            visitNode(node.body);
            node.decorators.forEach(visitNode);
            node.id && visitNode(node.id);
            node.superClass && visitNode(node.superClass);
        }
        constructor(body, decorators, id, superClass, range, loc) {
            super(body, decorators, id, superClass, range, loc);
        }
    };
    return ClassExpression = _classThis;
})();
export { ClassExpression };
//# sourceMappingURL=class.js.map