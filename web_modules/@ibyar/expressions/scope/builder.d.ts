import { Context, ReactiveScope, ReactiveControlScope, ReadOnlyScope, Scope } from './scope.js';
export declare class ScopeBuilder {
    static for<T extends Context>(ctx: T, propertyKeys?: (keyof T)[]): Scope<T>;
    static blockScope<T extends Context>(propertyKeys?: (keyof T)[]): Scope<T>;
    static readOnlyScopeFor<T extends Context>(ctx: T, propertyKeys?: (keyof T)[]): ReadOnlyScope<T>;
    static blockReadOnlyScope<T extends Context>(propertyKeys?: (keyof T)[]): ReadOnlyScope<T>;
    static reactiveScopeFor<T extends Context>(context: T, propertyKeys?: (keyof T)[]): ReactiveScope<T>;
    static blockReactiveScope<T extends Context>(propertyKeys?: (keyof T)[]): ReactiveScope<T>;
    static reactiveScopeForThis<T extends Context>(ctx: T, propertyKeys?: (keyof T)[]): Scope<{
        this: T;
    }>;
    static readOnlyScopeAndReactiveScopeForThis<T extends Context>(ctx: T, propertyKeys?: (keyof T)[]): ReadOnlyScope<{
        this: T;
    }>;
    static reactiveScopeAndScopeForThis<T extends Context>(ctx: T, propertyKeys?: (keyof T)[]): Scope<{
        this: T;
    }>;
    static reactiveScopeControlFor<T extends Context>(context: T, propertyKeys?: (keyof T)[]): ReactiveControlScope<T>;
    static blockReactiveScopeControl<T extends Context>(propertyKeys?: (keyof T)[]): ReactiveControlScope<T>;
    static reactiveScopeControlForThis<T extends Context>(ctx: T, propertyKeys?: (keyof T)[]): Scope<{
        this: T;
    }>;
    static readOnlyScopeAndReactiveScopeControlForThis<T extends Context>(ctx: T, propertyKeys?: (keyof T)[]): ReadOnlyScope<{
        this: T;
    }>;
}
//# sourceMappingURL=builder.d.ts.map