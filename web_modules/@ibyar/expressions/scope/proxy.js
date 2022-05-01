export class FunctionProxyHandler {
    constructor(thisContext) {
        this.thisContext = thisContext;
    }
    apply(targetFunc, targetThisArg, argArray) {
        return targetFunc.apply(this.computeThisArg(targetThisArg), argArray);
    }
    computeThisArg(targetThisArg) {
        switch (true) {
            case this.thisContext instanceof Map:
            case this.thisContext instanceof Set:
            case this.thisContext instanceof Date:
            case this.thisContext instanceof WeakMap:
            case this.thisContext instanceof WeakSet:
            case this.thisContext instanceof Promise:
                return this.thisContext;
            default:
                return targetThisArg;
        }
    }
}
export class ScopeProxyHandler {
    constructor(scope) {
        this.scope = scope;
        this.proxyMap = new Map();
        this.proxyValueMap = new WeakMap();
    }
    has(model, propertyKey) {
        return this.scope.has(propertyKey);
    }
    get(model, propertyKey, receiver) {
        if (this.proxyMap.has(propertyKey)) {
            return this.proxyMap.get(propertyKey);
        }
        const value = this.scope.get(propertyKey);
        if (value == null) {
            return value;
        }
        if (typeof value === 'object') {
            const scope = this.scope.getScope(propertyKey);
            if (scope) {
                const proxy = new Proxy(value, new ScopeProxyHandler(scope));
                this.proxyMap.set(propertyKey, proxy);
                this.proxyValueMap.set(proxy, value);
                return proxy;
            }
        }
        else if (typeof value === 'function') {
            const proxy = new Proxy(value, this.functionHandler
                ?? (this.functionHandler = new FunctionProxyHandler(this.scope.getContext())));
            this.proxyMap.set(propertyKey, proxy);
            this.proxyValueMap.set(proxy, value);
            return proxy;
        }
        return value;
    }
    set(model, propertyKey, value, receiver) {
        if ((typeof value === 'object' || typeof value === 'function') && this.proxyValueMap.has(value)) {
            value = this.proxyValueMap.get(value);
        }
        return this.scope.set(propertyKey, value);
    }
    deleteProperty(model, propertyKey) {
        const isDelete = Reflect.deleteProperty(model, propertyKey);
        if (isDelete) {
            this.scope.set(propertyKey, undefined);
            if (this.proxyMap.has(propertyKey)) {
                this.proxyMap.delete(propertyKey);
            }
        }
        return isDelete;
    }
}
export function createRevocableProxyForContext(context, scope) {
    return Proxy.revocable(context, new ScopeProxyHandler(scope));
}
export function createProxyForContext(scope) {
    return new Proxy(scope.getContext(), new ScopeProxyHandler(scope));
}
//# sourceMappingURL=proxy.js.map