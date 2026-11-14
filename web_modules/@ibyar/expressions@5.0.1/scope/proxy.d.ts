import type { Scope, Context } from './scope.js';
export declare function hasBindingHook<T>(ctx: T): boolean;
/**
 * crete new proxy handler object as scoped context
 */
export declare class ScopeProxyHandler<T extends Context> implements ProxyHandler<Context> {
    private scope;
    constructor(scope: Scope<T>);
    has(model: T, propertyKey: PropertyKey): boolean;
    get(model: T, propertyKey: PropertyKey, receiver: any): any;
    set(model: T, propertyKey: PropertyKey, value: any, receiver: any): boolean;
    deleteProperty(model: T, propertyKey: string | symbol): boolean;
}
export type RevocableProxy<T> = {
    proxy: T;
    revoke: () => void;
};
export declare function createRevocableProxyForContext<T extends object>(context: T, scope: Scope<T>): RevocableProxy<T>;
export declare function createProxyForContext<T extends object>(scope: Scope<T>): T;
//# sourceMappingURL=proxy.d.ts.map