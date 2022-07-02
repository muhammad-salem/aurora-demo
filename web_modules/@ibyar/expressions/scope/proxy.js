export class FunctionProxyHandler {
    constructor(thisContext) {
        this.thisContext = thisContext;
    }
    apply(targetFunc, targetThisArg, argArray) {
        return targetFunc.apply(this.computeThisArg(targetThisArg), argArray);
    }
    computeThisArg(targetThisArg) {
        switch (true) {
            // exclude classes that have binding hook
            case this.thisContext instanceof Map:
            case this.thisContext instanceof Set:
            case this.thisContext instanceof Date:
            case this.thisContext instanceof WeakMap:
            case this.thisContext instanceof WeakSet:
            case this.thisContext instanceof Promise:
            case this.thisContext instanceof HTMLElement:
                return this.thisContext;
            default:
                return targetThisArg;
        }
    }
}
/**
 * crete new proxy handler object as scoped context
 */
export class ScopeProxyHandler {
    constructor(scope) {
        this.scope = scope;
    }
    has(model, propertyKey) {
        return this.scope.has(propertyKey);
    }
    get(model, propertyKey, receiver) {
        const value = this.scope.get(propertyKey);
        if (value == null) {
            return value;
        }
        if (typeof value === 'object') {
            const scope = this.scope.getScope(propertyKey);
            if (scope) {
                return new Proxy(value, new ScopeProxyHandler(scope));
            }
        }
        else if (typeof value === 'function') {
            return new Proxy(value, this.functionHandler
                ?? (this.functionHandler = new FunctionProxyHandler(this.scope.getContext())));
        }
        return value;
    }
    set(model, propertyKey, value, receiver) {
        return this.scope.set(propertyKey, value);
    }
    deleteProperty(model, propertyKey) {
        return this.scope.delete(propertyKey);
    }
}
export function createRevocableProxyForContext(context, scope) {
    return Proxy.revocable(context, new ScopeProxyHandler(scope));
}
export function createProxyForContext(scope) {
    return new Proxy(scope.getContext(), new ScopeProxyHandler(scope));
}
//# sourceMappingURL=proxy.js.map