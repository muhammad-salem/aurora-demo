import { ReactiveNode, Signal, SignalScope } from '@ibyar/expressions';
declare class SignalScopeFactory {
    private scopes;
    private effectState;
    push(scope: SignalScope): void;
    pop(scop: SignalScope): void;
    factory<T, S = Signal<T>>(creator: (scope: SignalScope, key: number) => S): S;
    signal<T>(initValue?: T): Signal<T>;
    computed<T>(computation: () => T): import("@ibyar/expressions").Computed<T>;
    lazy<T>(computation: () => T): import("@ibyar/expressions").Lazy<T>;
    effect(effectFn: (onCleanup?: (clean: () => void) => void) => void): import("@ibyar/expressions").SignalDestroyRef;
    untracked<T>(reactiveNode: ReactiveNode<T>): T;
    untracked<T>(nonReactiveReadsFn: () => T): T;
    private assertValidContext;
    private wrapEffect;
}
export declare const signalScopeFactory: SignalScopeFactory;
export {};
//# sourceMappingURL=factory.d.ts.map