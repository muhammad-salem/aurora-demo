export function hasBindingHook(ctx) {
    switch (true) {
        // exclude classes that have binding hook
        case ctx instanceof Map:
        case ctx instanceof Set:
        case ctx instanceof Date:
        case ctx instanceof WeakMap:
        case ctx instanceof WeakSet:
        case ctx instanceof Promise:
        case HTMLElement && ctx instanceof HTMLElement:
            return true;
        default:
            return false;
    }
}
/**
 * crete new proxy handler object as scoped context
 */
export class ScopeProxyHandler {
    // private functionHandler: FunctionProxyHandler<Function>;
    constructor(scope) {
        this.scope = scope;
    }
    has(model, propertyKey) {
        return this.scope.has(propertyKey);
    }
    get(model, propertyKey, receiver) {
        const value = this.scope.get(propertyKey);
        if (!(value && typeof value === 'object')) {
            return value;
        }
        const scope = this.scope.getInnerScope(propertyKey);
        if (!scope) {
            return value;
        }
        return createProxyForContext(scope);
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