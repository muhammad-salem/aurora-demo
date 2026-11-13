import { ReactiveScope } from '@ibyar/expressions';
import { isOnInit } from '../component/lifecycle.js';
import { classRegistryProvider } from '../providers/provider.js';
import { AttributeDirective } from './directive.js';
export class ElementReactiveScope extends ReactiveScope {
    el;
    directiveMap = new Map();
    constructor(el) {
        super({});
        this.el = el;
        this._ctx.this = el;
    }
    getElement() {
        return this.el;
    }
    getDirectives() {
        return this.directiveMap;
    }
    get(propertyKey) {
        if (propertyKey === 'this') {
            return this.el;
        }
        if (this.directiveMap.has(propertyKey)) {
            const directive = this.directiveMap.get(propertyKey);
            return directive;
        }
        for (const directive of this.directiveMap.values()) {
            if (propertyKey in directive) {
                return Reflect.get(directive, propertyKey);
            }
        }
        const directiveRef = classRegistryProvider.getDirectiveRef(propertyKey);
        if (directiveRef && directiveRef.modelClass instanceof AttributeDirective) {
            const directive = new directiveRef.modelClass(this.el);
            this.directiveMap.set(propertyKey, directive);
            this._ctx[propertyKey] = directive;
            if (isOnInit(directive)) {
                directive.onInit();
            }
            return Reflect.get(directive, propertyKey);
        }
        return void 0;
    }
    set(propertyKey, value, receiver) {
        if (propertyKey in this.el) {
            return Reflect.set(this.el, propertyKey, value);
        }
        if (this.directiveMap.has(propertyKey)) {
            const directive = this.directiveMap.get(propertyKey);
            return Reflect.set(directive, propertyKey, value);
        }
        for (const directive of this.directiveMap.values()) {
            if (propertyKey in directive) {
                return Reflect.set(directive, propertyKey, value);
            }
        }
        const directiveRef = classRegistryProvider.getDirectiveRef(propertyKey);
        if (directiveRef && directiveRef.modelClass.prototype instanceof AttributeDirective) {
            const directive = new directiveRef.modelClass(this.el);
            this.directiveMap.set(propertyKey, directive);
            const result = Reflect.set(directive, propertyKey, value);
            if (isOnInit(directive)) {
                directive.onInit();
            }
            return result;
        }
        return false;
    }
    has(propertyKey) {
        if (propertyKey in this._ctx) {
            return true;
        }
        if (this.directiveMap.has(propertyKey)) {
            return true;
        }
        for (const directive of this.directiveMap.values()) {
            if (propertyKey in directive) {
                return true;
            }
        }
        if (classRegistryProvider.hasDirective(propertyKey)) {
            return true;
        }
        if (classRegistryProvider.directiveHasInput(propertyKey)) {
            return true;
        }
        return false;
    }
    getClass() {
        return ElementReactiveScope;
    }
}
//# sourceMappingURL=providers.js.map