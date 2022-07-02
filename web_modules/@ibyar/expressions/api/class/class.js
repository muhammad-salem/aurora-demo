var Super_1, MetaProperty_1, PrivateIdentifier_1, StaticBlock_1, MethodDefinition_1, PropertyDefinition_1, AccessorProperty_1, ClassBody_1, ClassDeclaration_1, ClassExpression_1;
import { __decorate as __decorate_1, __metadata } from "../../../../tslib/tslib.es6.js";
import { __decorate } from '../../../../tslib/tslib.es6.js';
import { AbstractExpressionNode } from '../abstract.js';
import { Deserializer } from '../deserialize/deserialize.js';
import { Identifier } from '../definition/values.js';
import { MemberExpression } from '../definition/member.js';
import { FunctionExpression } from '../definition/function.js';
import { BlockStatement } from '../statement/control/block.js';
import { CallExpression } from '../computing/call.js';
const TEMP_CLASS_NAME = Symbol('TempClassName');
const SUPER = Symbol('Super');
const NEW_TARGET = Symbol('NewTarget');
const IMPORT_META = Symbol('ImportMeta');
const STACK = Symbol('Stack');
const GET_PARAMETERS = Symbol('GetParameters');
const GET_SUPER_PROPERTY = Symbol('GetSuperProperty');
const CALL_SUPER_Method = Symbol('CallSuperMethod');
const CONSTRUCTOR = Symbol('Constructor');
const PRIVATE_SYMBOL = Symbol('Private');
const INSTANCE_PRIVATE_SYMBOL = Symbol('InstancePrivate');
const STATIC_INITIALIZATION_BLOCK = Symbol('StaticBlock');
/**
 * A `super` pseudo-expression.
 */
let Super = Super_1 = class Super extends AbstractExpressionNode {
    constructor() {
        super();
    }
    static fromJSON(node) {
        return Super_1.INSTANCE;
    }
    shareVariables(scopeList) { }
    set(stack, value) {
        throw new Error('Super.#set() Method not implemented.');
    }
    get(stack, thisContext) {
        throw new Error('Super.#get() Method not implemented.');
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
Super.INSTANCE = new Super_1();
Super = Super_1 = __decorate_1([
    Deserializer('Super'),
    __metadata("design:paramtypes", [])
], Super);
export { Super };
/**
 * MetaProperty node represents
 * - `new.target` meta property in ES2015.
 * - `import.meta` meta property in ES2030.
 *
 * In the future, it will represent other meta properties as well.
 */
let MetaProperty = MetaProperty_1 = class MetaProperty extends MemberExpression {
    constructor(meta, property) {
        super(meta, property, false);
        this.meta = meta;
    }
    static getJsonName(identifier) {
        return Reflect.get(identifier, 'name');
    }
    static fromJSON(node, deserializer) {
        if (MetaProperty_1.getJsonName(node.meta) === 'new' && MetaProperty_1.getJsonName(node.property) === 'target') {
            return MetaProperty_1.NewTarget;
        }
        else if (MetaProperty_1.getJsonName(node.meta) === 'import' && MetaProperty_1.getJsonName(node.property) === 'meta') {
            return MetaProperty_1.ImportMeta;
        }
        return new MetaProperty_1(deserializer(node.meta), deserializer(node.property));
    }
    static visit(node, visitNode) {
        visitNode(node.meta);
        visitNode(node.property);
    }
    getMeta() {
        return this.meta;
    }
    shareVariables(scopeList) { }
    get(stack, thisContext) {
        if (MetaProperty_1.getJsonName(this.meta) === 'new' && MetaProperty_1.getJsonName(this.property) === 'target') {
            return stack.get(NEW_TARGET);
        }
        else if (MetaProperty_1.getJsonName(this.meta) === 'import' && MetaProperty_1.getJsonName(this.property) === 'meta') {
            const importObject = stack.getModule()?.get('import');
            return importObject['meta'];
        }
        return super.get(stack, thisContext);
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
MetaProperty.NewTarget = new MetaProperty_1(new Identifier('new'), new Identifier('target'));
MetaProperty.ImportMeta = new MetaProperty_1(new Identifier('import'), new Identifier('meta'));
MetaProperty = MetaProperty_1 = __decorate_1([
    Deserializer('MetaProperty'),
    __metadata("design:paramtypes", [Identifier, Identifier])
], MetaProperty);
export { MetaProperty };
/**
 * A private identifier refers to private class elements. For a private name `#a`, its name is `a`.
 */
let PrivateIdentifier = PrivateIdentifier_1 = class PrivateIdentifier extends AbstractExpressionNode {
    constructor(name) {
        super();
        this.name = name;
    }
    static fromJSON(node) {
        return new PrivateIdentifier_1(node.name);
    }
    getName() {
        return this.name;
    }
    set(stack, value) {
        const privateScope = stack.findScope(PRIVATE_SYMBOL);
        privateScope.getScope(PRIVATE_SYMBOL)?.set(this.name, value);
    }
    get(stack, thisContext) {
        if (thisContext) {
            return thisContext[PRIVATE_SYMBOL][this.name];
        }
        // return stack.get(this.name);
        let privateObj = stack.get('this');
        if (privateObj) {
            return privateObj[PRIVATE_SYMBOL][this.name];
        }
        privateObj = stack.get(PRIVATE_SYMBOL);
        return privateObj[this.name];
    }
    dependency(computed) {
        return [];
    }
    dependencyPath(computed) {
        return [];
    }
    shareVariables(scopeList) { }
    toString() {
        return `#${this.name}`;
    }
    toJson() {
        return {
            name: this.name
        };
    }
};
PrivateIdentifier = PrivateIdentifier_1 = __decorate_1([
    Deserializer('PrivateIdentifier'),
    __metadata("design:paramtypes", [String])
], PrivateIdentifier);
export { PrivateIdentifier };
/**
 * A static block static { } is a block statement serving as an additional static initializer.
 */
let StaticBlock = StaticBlock_1 = class StaticBlock extends BlockStatement {
    static fromJSON(node, deserializer) {
        return new StaticBlock_1(deserializer(node.body));
    }
    constructor(body) {
        super(body);
    }
    get(stack, classConstructor) {
        const constructor = classConstructor;
        constructor[STATIC_INITIALIZATION_BLOCK].push(() => super.get(stack));
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
StaticBlock = StaticBlock_1 = __decorate_1([
    Deserializer('StaticBlock'),
    __metadata("design:paramtypes", [Array])
], StaticBlock);
export { StaticBlock };
export class AbstractDefinition extends AbstractExpressionNode {
    constructor(key, decorators, computed, isStatic, value) {
        super();
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
    getDecorators() {
        return this.decorators;
    }
    shareVariables(scopeList) { }
    set(stack, value) {
        throw new Error('AbstractDefinition.#set() Method not implemented.');
    }
    dependency(computed) {
        return [];
    }
    dependencyPath(computed) {
        return [];
    }
    getTarget(classConstructor) {
        return this.static
            ? (this.key instanceof PrivateIdentifier ? classConstructor[PRIVATE_SYMBOL] : classConstructor)
            : (this.key instanceof PrivateIdentifier ? classConstructor[INSTANCE_PRIVATE_SYMBOL] : classConstructor.prototype);
    }
    getKeyName(stack) {
        switch (true) {
            case this.computed: return this.key.get(stack);
            case this.key instanceof Identifier:
            case this.key instanceof PrivateIdentifier: return this.key.getName();
            default: return this.key.toString();
        }
    }
}
/**
 * - When key is a PrivateIdentifier, computed must be false and kind can not be "constructor".
 */
let MethodDefinition = MethodDefinition_1 = class MethodDefinition extends AbstractDefinition {
    constructor(kind, key, value, decorators, computed, isStatic) {
        super(key, decorators, computed, isStatic, value);
        this.kind = kind;
    }
    static fromJSON(node, deserializer) {
        return new MethodDefinition_1(node.kind, deserializer(node.key), deserializer(node.value), node.decorators.map(deserializer), node.computed, node.static);
    }
    static visit(node, visitNode) {
        visitNode(node.key);
        visitNode(node.value);
        node.decorators.forEach(visitNode);
    }
    getKind() {
        return this.kind;
    }
    getValue() {
        return this.value;
    }
    get(stack, classConstructor) {
        if (this.kind === 'constructor') {
            this.initConstructor(stack, classConstructor);
            return;
        }
        const target = this.getTarget(classConstructor);
        const name = this.getKeyName(stack);
        const value = this.value?.get(stack);
        switch (this.kind) {
            case 'method':
                target[name] = value;
                break;
            case 'set':
                Object.defineProperty(target, name, {
                    configurable: true,
                    enumerable: false,
                    set: value,
                });
                break;
            case 'get':
                Object.defineProperty(target, name, {
                    configurable: true,
                    enumerable: false,
                    get: value,
                });
                break;
            default:
                break;
        }
        const decorators = this.decorators.map(decorator => decorator.get(stack));
        decorators.length && __decorate(decorators, target, name, null);
    }
    initConstructor(stack, classConstructor) {
        const body = this.value.getBody().getBody();
        let superIndex = body
            .findIndex(call => call instanceof CallExpression && Super.INSTANCE === call.getCallee());
        if (superIndex === -1) {
            superIndex = body.length;
        }
        const superCall = body[superIndex];
        const blockBeforeSuper = new BlockStatement(body.slice(0, superIndex));
        const blockAfterSuper = new BlockStatement(body.slice(superIndex + 1));
        if (superCall) {
            classConstructor[GET_PARAMETERS] = function (params) {
                const scope = stack.pushBlockScope();
                this.value.setParameter(stack, params);
                blockBeforeSuper.get(stack);
                const parameters = superCall.getCallParameters(stack);
                stack.clearTo(scope);
                return parameters;
            };
        }
        classConstructor[CONSTRUCTOR] = function (params) {
            const scope = this[STACK].pushBlockScope();
            blockAfterSuper.get(this[STACK]);
            stack.clearTo(scope);
        };
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
MethodDefinition = MethodDefinition_1 = __decorate_1([
    Deserializer('MethodDefinition'),
    __metadata("design:paramtypes", [String, Object, FunctionExpression, Array, Boolean, Boolean])
], MethodDefinition);
export { MethodDefinition };
/**
 * - When key is a PrivateIdentifier, computed must be false.
 */
let PropertyDefinition = PropertyDefinition_1 = class PropertyDefinition extends AbstractDefinition {
    static fromJSON(node, deserializer) {
        return new PropertyDefinition_1(deserializer(node.key), node.decorators.map(deserializer), node.computed, node.static, node.value && deserializer(node.value));
    }
    static visit(node, visitNode) {
        visitNode(node.key);
        node.value && visitNode(node.value);
    }
    constructor(key, decorators, computed, isStatic, value) {
        super(key, decorators, computed, isStatic, value);
    }
    get(stack, classConstructor) {
        const target = this.getTarget(classConstructor);
        const name = this.getKeyName(stack);
        const value = this.value?.get(stack);
        target[name] = value;
        const decorators = this.decorators.map(decorator => decorator.get(stack));
        decorators.length && __decorate(decorators, target, name, null);
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
PropertyDefinition = PropertyDefinition_1 = __decorate_1([
    Deserializer('PropertyDefinition'),
    __metadata("design:paramtypes", [Object, Array, Boolean, Boolean, Object])
], PropertyDefinition);
export { PropertyDefinition };
let AccessorProperty = AccessorProperty_1 = class AccessorProperty extends AbstractDefinition {
    static fromJSON(node, deserializer) {
        return new AccessorProperty_1(deserializer(node.key), node.decorators.map(deserializer), node.computed, node.static, node.value ? deserializer(node.value) : void 0);
    }
    static visit(node, visitNode) {
        visitNode(node.key);
        node.value && visitNode(node.value);
        node.decorators.forEach(visitNode);
    }
    constructor(key, decorators, computed, isStatic, value) {
        super(key, decorators, computed, isStatic, value);
    }
    get(stack, classConstructor) {
        const target = this.getTarget(classConstructor);
        const name = this.getKeyName(stack);
        const value = this.value?.get(stack);
        target[name] = value;
        const ref = this.static ? classConstructor : classConstructor.prototype;
        Object.defineProperty(ref, name, {
            configurable: true,
            enumerable: false,
            set: function (setValue) {
                this[PRIVATE_SYMBOL][name] = setValue;
            },
        });
        Object.defineProperty(ref, name, {
            configurable: true,
            enumerable: false,
            get: function () {
                return this[PRIVATE_SYMBOL][name];
            },
        });
        const decorators = this.decorators.map(decorator => decorator.get(stack));
        decorators.length && __decorate(decorators, ref, name, null);
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
AccessorProperty = AccessorProperty_1 = __decorate_1([
    Deserializer('AccessorProperty'),
    __metadata("design:paramtypes", [Object, Array, Boolean, Boolean, Object])
], AccessorProperty);
export { AccessorProperty };
let ClassBody = ClassBody_1 = class ClassBody extends AbstractExpressionNode {
    constructor(body) {
        super();
        this.body = body;
    }
    static fromJSON(node, deserializer) {
        return new ClassBody_1(node.body.map(deserializer));
    }
    static visit(node, visitNode) {
        node.body.forEach(visitNode);
    }
    getBody() {
        return this.body;
    }
    shareVariables(scopeList) { }
    set(stack, value) {
        throw new Error('Method not implemented.');
    }
    get(stack, classConstructor) {
        this.body.forEach(definition => definition.get(stack, classConstructor));
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
ClassBody = ClassBody_1 = __decorate_1([
    Deserializer('ClassBody'),
    __metadata("design:paramtypes", [Array])
], ClassBody);
export { ClassBody };
export class Class extends AbstractExpressionNode {
    constructor(body, decorators, id, superClass) {
        super();
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
    shareVariables(scopeList) {
        this.sharedVariables = scopeList;
    }
    set(stack) {
        throw new Error(`Class.#set() has no implementation.`);
    }
    get(stack) {
        const className = this.id?.get(stack);
        const parentClass = this.superClass?.get(stack) ?? class {
        };
        let classConstructor = this.createClass(stack, parentClass, className);
        // build class body
        this.body.get(stack, classConstructor);
        // apply class decorators
        const decorators = this.decorators.map(decorator => decorator.get(stack));
        classConstructor = __decorate(decorators, classConstructor);
        // run static initialization block
        classConstructor[STATIC_INITIALIZATION_BLOCK].forEach(block => block());
        Reflect.deleteProperty(classConstructor, STATIC_INITIALIZATION_BLOCK);
        return classConstructor;
    }
    createClass(stack, parentClass, className = TEMP_CLASS_NAME) {
        var _a, _b, _c, _d, _e;
        const TEMP = {
            [className]: (_e = class extends parentClass {
                    constructor(...params) {
                        const parameters = TEMP[className][GET_PARAMETERS](params);
                        super(...parameters);
                        this[_d] = {};
                        this[PRIVATE_SYMBOL] = Object.assign(this[PRIVATE_SYMBOL], TEMP[className][INSTANCE_PRIVATE_SYMBOL]);
                        this[STACK] = stack.copyStack();
                        const instanceStack = this[STACK];
                        instanceStack.pushBlockScope();
                        instanceStack.declareVariable('this', this);
                        instanceStack.declareVariable(NEW_TARGET, new.target);
                        instanceStack.declareVariable(PRIVATE_SYMBOL, this[PRIVATE_SYMBOL]);
                        instanceStack.declareVariable(CALL_SUPER_Method, (name) => super[name]());
                        instanceStack.declareVariable(GET_SUPER_PROPERTY, (name) => super[name]);
                        instanceStack.pushReactiveScope();
                        // init fields and methods values
                        TEMP[className][CONSTRUCTOR]();
                    }
                    static [GET_PARAMETERS](args) {
                        return args;
                    }
                    static [(_a = STATIC_INITIALIZATION_BLOCK, _b = PRIVATE_SYMBOL, _c = INSTANCE_PRIVATE_SYMBOL, CONSTRUCTOR)]() { }
                },
                _d = PRIVATE_SYMBOL,
                _e[_a] = [],
                _e[_b] = {},
                _e[_c] = {},
                _e)
        };
        return TEMP[className];
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
let ClassDeclaration = ClassDeclaration_1 = class ClassDeclaration extends Class {
    static fromJSON(node, deserializer) {
        return new ClassDeclaration_1(deserializer(node.body), deserializer(node.id), node.superClass && deserializer(node.superClass));
    }
    static visit(node, visitNode) {
        visitNode(node.body);
        node.decorators.forEach(visitNode);
        visitNode(node.id);
        node.superClass && visitNode(node.superClass);
    }
    constructor(body, decorators, id, superClass) {
        super(body, decorators, id, superClass);
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
ClassDeclaration = ClassDeclaration_1 = __decorate_1([
    Deserializer('ClassDeclaration'),
    __metadata("design:paramtypes", [ClassBody, Array, Identifier, Object])
], ClassDeclaration);
export { ClassDeclaration };
let ClassExpression = ClassExpression_1 = class ClassExpression extends Class {
    static fromJSON(node, deserializer) {
        return new ClassExpression_1(deserializer(node.body), node.superClass && deserializer(node.superClass));
    }
    static visit(node, visitNode) {
        visitNode(node.body);
        node.decorators.forEach(visitNode);
        node.id && visitNode(node.id);
        node.superClass && visitNode(node.superClass);
    }
};
ClassExpression = ClassExpression_1 = __decorate_1([
    Deserializer('ClassExpression')
], ClassExpression);
export { ClassExpression };
//# sourceMappingURL=class.js.map