import { TypeOf } from '../api/utils.js';
export type Context = Record<PropertyKey, any>;
export interface Scope<T = Context> {
    /**
     * get value of `propertyKey` in current context
     * @param propertyKey
     */
    get(propertyKey: keyof T): any;
    /**
     * set the value of `propertyKey` in current context, could be instilled with `value`.
     * @param propertyKey
     * @param value
     * @param receiver
     */
    set(propertyKey: keyof T, value?: any, receiver?: any): boolean;
    /**
     * is current context has `propertyKey` in hash map keys
     * @param propertyKey
     */
    has(propertyKey: keyof T): boolean;
    /**
     * delete property from context
     * @param propertyKey
     */
    delete(propertyKey: keyof T): boolean;
    /**
     * get current context object of this scope
     */
    getContext(): T;
    /**
     * get a proxy of the current context object if exists.
     */
    getContextProxy?(): T;
    /**
     * get a scope for an object named as `propertyKey` from cache map,
     *
     * if the current value is not type od `object`, will return `undefined`.
     * @param propertyKey the name of the property
     */
    getInnerScope<S extends Scope<Context>>(propertyKey: keyof T): S | undefined;
    /**
     * create a scope with the same type of this scope
     */
    setInnerScope<S extends Scope<Context>>(propertyKey: keyof T): S;
    /**
     * sc
     * @param propertyKey
     * @param scope
     */
    setInnerScope<S extends Scope<Context>>(propertyKey: keyof T, scope?: S): S;
    getClass(): TypeOf<Scope<Context>>;
}
export declare class Scope<T extends Context> implements Scope<T> {
    protected _ctx: T;
    protected _keys?: (keyof T)[] | undefined;
    static for<T extends Context>(ctx: T, propertyKeys?: (keyof T)[]): Scope<T>;
    static blockScope<T extends Context>(propertyKeys?: (keyof T)[]): Scope<T>;
    protected _inners: Map<keyof T, Scope<any>>;
    constructor(context: T, propertyKeys?: (keyof T)[]);
}
export declare class ReadOnlyScope<T extends Context> extends Scope<T> {
    static for<T extends Context>(ctx: T, propertyKeys?: (keyof T)[]): ReadOnlyScope<T>;
    static blockScope<T extends Context>(propertyKeys?: (keyof T)[]): ReadOnlyScope<T>;
    set(propertyKey: keyof T, value: any, receiver?: any): boolean;
    delete(propertyKey: keyof T): boolean;
    getClass(): TypeOf<ReadOnlyScope<Context>>;
}
export declare class ScopeSubscription<T> {
    private propertyKey;
    private observer;
    constructor(propertyKey: keyof T, observer: ValueChangeObserver<T>);
    pause(): void;
    resume(): void;
    unsubscribe(): void;
}
export type ValueChangedCallback = (newValue: any, oldValue?: any) => void;
export declare class ValueChangeObserver<T> {
    private _subscribers;
    private _lock;
    emit(propertyKey: keyof T, newValue: any, oldValue?: any): void;
    subscribe(propertyKey: keyof T, callback: ValueChangedCallback): ScopeSubscription<T>;
    unsubscribe(propertyKey: keyof T, subscription?: ScopeSubscription<T>): void;
    pause(propertyKey: keyof T, subscription: ScopeSubscription<T>): void;
    resume(propertyKey: keyof T, subscription: ScopeSubscription<T>): void;
    /**
     * check if this Observer has any subscribers
     */
    hasSubscribers(): boolean;
    /**
     * check if there is any subscribers registered by the propertyKey.
     *
     * @param propertyKey
     */
    hasSubscribers(propertyKey: keyof T): boolean;
    /**
     * clear subscription maps
     */
    destroy(): void;
}
export declare class ReactiveScope<T extends Context> extends Scope<T> {
    protected _name?: PropertyKey | undefined;
    protected _parent?: ReactiveScope<any> | undefined;
    static for<T extends Context>(context: T, propertyKeys?: (keyof T)[]): ReactiveScope<T>;
    static blockScope<T extends Context>(propertyKeys?: (keyof T)[]): ReactiveScope<T>;
    static scopeForThis<T extends Context>(ctx: T, propertyKeys?: (keyof T)[]): Scope<{
        this: T;
    }>;
    static readOnlyScopeForThis<T extends Context>(ctx: T, propertyKeys?: (keyof T)[]): ReadOnlyScope<{
        this: T;
    }>;
    static readOnlyScopeForAliasThis<T extends Context>(ctx: T, alias: string): ReadOnlyScope<{
        [alias]: T;
        this: T;
    }>;
    protected _clone: T;
    protected _inners: Map<keyof T, ReactiveScope<any>>;
    protected _observer: ValueChangeObserver<T>;
    constructor(context: T, propertyKeys?: (keyof T)[], _name?: PropertyKey | undefined, _parent?: ReactiveScope<any> | undefined);
    set(propertyKey: keyof T, newValue: any, receiver?: any): boolean;
    delete(propertyKey: keyof T): boolean;
    emit(propertyKey: keyof T, newValue: any, oldValue?: any): void;
    subscribe(propertyKey: keyof T, callback: ValueChangedCallback): ScopeSubscription<T>;
    unsubscribe(propertyKey?: keyof T, subscription?: ScopeSubscription<T>): void;
    detectChanges(): void;
    protected getPropertyKeys<V extends Record<PropertyKey, any>>(...objs: V[]): (keyof V)[];
    getClass(): TypeOf<ReactiveScope<Context>>;
}
/**
 * used control/notify/pause scope about changes in current context
 */
export interface ControlScope<T extends Context> {
    /**
     * get current stacte of applying change detection.
     */
    isAttached(): boolean;
    /**
     * used when want to update ui-view like, you want to replace an array with another
     * without reflect changes on view until reattached again.
     */
    detach(): void;
    /**
     * apply all the not emitted changes, and continue emit in time.
     */
    reattach(): void;
    /**
     * apply changes now,
     * will not effect the state of the detector wither if attached ot not.
     *
     * if a propertyKey is provided, will emit this property only
     * @param propertyKey
     */
    emitChanges(propertyKey?: keyof T, propertyValue?: any): void;
    /**
     * throw error if any changes has been made
     */
    checkNoChanges(): void;
}
export declare class ReactiveControlScope<T extends Context> extends ReactiveScope<T> implements ControlScope<T> {
    static for<T extends Context>(context: T, propertyKeys?: (keyof T)[]): ReactiveControlScope<T>;
    static blockScope<T extends Context>(propertyKeys?: (keyof T)[]): ReactiveControlScope<T>;
    static scopeForThis<T extends Context>(ctx: T, propertyKeys?: (keyof T)[]): Scope<{
        this: T;
    }>;
    static readOnlyScopeForThis<T extends Context>(ctx: T, propertyKeys?: (keyof T)[]): ReadOnlyScope<{
        this: T;
    }>;
    static reactiveScopeForThis<T extends Context>(ctx: T, propertyKeys?: (keyof T)[]): Scope<{
        this: T;
    }>;
    protected _attached: boolean;
    protected _marked: {
        [key: keyof Context]: [any, any];
    };
    emit(propertyKey: keyof T, newValue: any, oldValue?: any): void;
    isAttached(): boolean;
    detach(): void;
    reattach(): void;
    emitChanges(propertyKey?: keyof T, propertyValue?: any): void;
    detectChanges(): void;
    checkNoChanges(): void;
    getClass(): TypeOf<ReactiveControlScope<Context>>;
}
interface ImportMeta {
    url: URL;
    /**
     *
     * Provides a module-relative resolution function scoped to each module, returning
     * the URL string.
     *
     * @param specified The module specifier to resolve relative to `parent`.
     * @param parent The absolute parent module URL to resolve from. If none
     * is specified, the value of `import.meta.url` is used as the default.
     */
    resolve?(specified: string, parent?: string | URL): Promise<string>;
}
export interface ModuleImport {
    meta: ImportMeta;
}
export interface ModuleContext extends Context {
    import: ModuleImport & ((path: string) => Promise<any>);
}
export declare class ModuleScope extends ReactiveScope<ModuleContext> {
    constructor(context: ModuleContext, propertyKeys?: (keyof ModuleContext)[]);
    importModule(propertyKey: keyof ModuleContext, scope: ModuleScope): void;
}
export declare class WebModuleScope extends ModuleScope {
    private source;
    private importCallOptions?;
    private import;
    constructor(source: string, importCallOptions?: ImportCallOptions | undefined);
    private updateContext;
    resolveImport(): Promise<any>;
}
export {};
//# sourceMappingURL=scope.d.ts.map