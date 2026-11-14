import type { DeclarationExpression } from '../api/expression.js';
import { ModuleScope, ReactiveScope, Scope, Context, WebModuleScope } from './scope.js';
export interface AwaitPromiseInfo {
    promise: Promise<any>;
    node: DeclarationExpression;
    declareVariable: boolean;
}
export interface AsyncIterableInfo {
    iterable: AsyncIterable<any>;
    forAwaitBody: (iterator: any) => any;
}
export interface Stack {
    /**
     * a list of promises to resolve in an 'async' scope as 'async function'
     */
    awaitPromise: Array<AwaitPromiseInfo>;
    /**
     * resolve await promise in 'await for in' scope
     */
    forAwaitAsyncIterable?: AsyncIterableInfo;
    /**
     * is this stack has a propertyKey
     * @param propertyKey
     */
    has(propertyKey: PropertyKey): boolean;
    /**
     * get the first value for provided property key,
     *
     * will search current stack in all scope till find the first key, else undefined
     * @param propertyKey
     */
    get(propertyKey: PropertyKey): any;
    /**
     * set the value of `propertyKey` in its context provider with `value`.
     * else define it in the first scope 'local scope'
     * @param propertyKey
     * @param value
     * @param receiver
     */
    set(propertyKey: PropertyKey, value: any, receiver?: any): boolean;
    /**
     * declare variable at last scope in the stack,
     *
     * @param propertyKey the name of property mey be string | number | symbol,
     * @param propertyValue if not exist will be initialize with 'undefined' value
     */
    declareVariable(propertyKey: PropertyKey, propertyValue?: any): any;
    /**
     * get context object of this provider,
     * search for the first context object that has `propertyKey`.
     *
     * search for the first context that have property key,
     * if not found will return the stack local scop as a default value
     * @param propertyKey the property key
     */
    findScope<T extends Context>(propertyKey: PropertyKey): Scope<T>;
    resolveAwait(value: AwaitPromiseInfo): void;
    /**
     * get a reference to the last scope in this stack
     */
    lastScope<T extends Context>(): Scope<T>;
    /**
     * clear every thing after this scope, and even this scope
     * @param scope
     */
    clearTo<T extends Context>(scope: Scope<T>): boolean;
    /**
     * clear every thing after this scope, but not this scope
     * @param scope
     */
    clearTill<T extends Context>(scope: Scope<T>): boolean;
    popScope<T extends Context>(): Scope<T>;
    removeScope<T extends Context>(scope: Scope<T>): void;
    pushScope<T extends Context>(scope: Scope<T>): void;
    pushBlockScope<T extends Context>(): Scope<T>;
    pushBlockScopeFor<T extends Context>(context: T): Scope<T>;
    pushReactiveScope<T extends Context>(): ReactiveScope<T>;
    pushReactiveScopeFor<T extends Context>(context: T): ReactiveScope<T>;
    /**
     * create new stack instance with the same reference to the current scope array
     */
    copyStack(): Stack;
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
     * import module scope from another stack, by the help of ModuleScopeResolver.
     *
     * used with import statement
     */
    importModule(source: string, importCallOptions?: ImportCallOptions): ModuleScope;
    /**
     * get the current module for this stack.
     *
     * used with export statement
     */
    getModule(): ModuleScope | undefined;
    /**
     * register action to do on destroy this stack
     */
    onDestroy(action: () => void): void;
}
export declare class Stack implements Stack {
    static for(...contexts: Context[]): Stack;
    static forScopes(...scopes: Scope<Context>[]): Stack;
    static moduleScope(resolver: ModuleScopeResolver, moduleSource: string, ...globalScopes: Scope<Context>[]): Stack;
    awaitPromise: AwaitPromiseInfo[];
    forAwaitAsyncIterable?: AsyncIterableInfo | undefined;
    protected readonly stack: Array<Scope<any>>;
    protected readonly moduleScope?: ModuleScope;
    protected readonly moduleSource?: string;
    protected readonly resolver?: ModuleScopeResolver;
    protected readonly onDestroyActions: (() => void)[];
    constructor();
    constructor(globalScope: Scope<Context>);
    constructor(globalScope: Scope<Context>, resolver: ModuleScopeResolver, moduleSource: string);
    constructor(stack: Array<Scope<Context>>);
    constructor(stack: Array<Scope<Context>>, resolver: ModuleScopeResolver, moduleSource: string);
    constructor(stack: Stack);
    constructor(stack: Stack, resolver: ModuleScopeResolver, moduleSource: string);
    private initModuleContext;
    detectChanges(): void;
    private getReactiveScopeControls;
    private getReactiveScope;
}
export interface ModuleScopeResolver {
    resolve(source: string, moduleScope: ModuleScope, importCallOptions?: ImportCallOptions): ModuleScope;
    resolveURL(specified: string, parent: string | URL): string;
}
export declare function createRootURL(source: string): URL;
export interface ResolverConfig {
    /**
     * allow import modules from external http(s) module
     */
    allowImportExternal?: boolean;
}
/**
 * file system provider
 */
export interface ModuleSourceProvider {
    [url: string]: string;
}
export declare class ModuleScopeResolver implements ModuleScopeResolver {
    protected globalStack: Stack;
    protected provider: ModuleSourceProvider;
    protected config?: ResolverConfig | undefined;
    protected modules: [string, ModuleScope][];
    constructor(globalStack: Stack, provider: ModuleSourceProvider, config?: ResolverConfig | undefined);
    private register;
    resolve(source: keyof ModuleSourceProvider): ModuleScope;
    resolve(source: keyof ModuleSourceProvider, moduleScope: ModuleScope, importCallOptions?: ImportCallOptions): ModuleScope;
    protected findScopeBySource(source: string, importCallOptions?: ImportCallOptions): ModuleScope;
    protected findSourceByScope(moduleScope: ModuleScope): string;
    protected resolveExternalModule(source: string, importCallOptions?: ImportCallOptions): WebModuleScope;
    protected readonly isValidHTTPUrl: (string: string) => boolean;
}
//# sourceMappingURL=stack.d.ts.map