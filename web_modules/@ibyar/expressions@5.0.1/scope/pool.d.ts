import { ReactiveScope, ReactiveControlScope, ReadOnlyScope, Scope } from './scope.js';
export type ScopeType = 'scope' | 'read-only' | 'reactive' | 'reactive-control';
export declare function getScopeFor<S extends Scope<T>, T extends object>(ctx: T): S | undefined;
export declare function getScopeFor<T extends object>(ctx: T, type: 'scope', propertyKeys?: (keyof T)[]): Scope<T>;
export declare function getScopeFor<T extends object>(ctx: T, type: 'read-only', propertyKeys?: (keyof T)[]): ReadOnlyScope<T>;
export declare function getScopeFor<T extends object>(ctx: T, type: 'reactive', propertyKeys?: (keyof T)[]): ReactiveScope<T>;
export declare function getScopeFor<T extends object>(ctx: T, type: 'reactive-control', propertyKeys?: (keyof T)[]): ReactiveControlScope<T>;
//# sourceMappingURL=pool.d.ts.map