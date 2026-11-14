import { ReactiveScope, ValueChangedCallback } from './scope.js';
export type CleanupFn = () => void;
export type CleanupRegister = (cleanupFn?: CleanupFn) => void;
export type SignalDestroyRef = {
    destroy(): void;
};
export declare class SignalScope extends ReactiveScope<Array<any>> {
    static create(): SignalScope;
    private state;
    private watch;
    constructor();
    getNextKey(): number;
    createSignal<T>(initValue?: T): Signal<T>;
    createLazy<T>(updateFn: () => T): Lazy<T>;
    createComputed<T>(updateFn: () => T): Computed<T>;
    createEffect(effectFn: (onCleanup?: CleanupFn) => void): SignalDestroyRef;
    watchState(): void;
    untrack(): void;
    observeIndex(index: number): void;
    track(): void;
    readState(): number[];
    observeState(updateFn: () => void): {
        [k: string]: import("./scope.js").ScopeSubscription<any[]>;
    };
    restoreState(): void;
}
export declare abstract class ReactiveNode<T> {
    protected scope: SignalScope;
    protected index: number;
    constructor(scope: SignalScope, index: number);
    get(): T;
    getScope(): SignalScope;
    getIndex(): number;
    subscribe(callback: ValueChangedCallback): import("./scope.js").ScopeSubscription<any[]>;
}
export declare class Computed<T> extends ReactiveNode<T> {
    constructor(scope: SignalScope, index: number, initValue: T);
}
export declare class Lazy<T> extends ReactiveNode<T> {
    private updateFn;
    constructor(scope: SignalScope, index: number, updateFn: () => T);
    get(): T;
}
export declare class Signal<T> extends ReactiveNode<T> {
    constructor(scope: SignalScope, index: number, initValue?: T);
    set(value: T): void;
    update(updateFn: (value: T) => T): void;
    asReadonly(): ReadOnlySignal<unknown>;
}
export declare class ReadOnlySignal<T> extends ReactiveNode<T> {
}
export declare function isSignal<T = any>(signal: unknown): signal is Signal<T>;
export declare function isComputed<T = any>(signal: unknown): signal is Computed<T>;
export declare function isLazy<T = any>(signal: unknown): signal is Lazy<T>;
export declare function isReadOnlySignal<T = any>(signal: unknown): signal is ReadOnlySignal<T>;
export declare function isReactive<T = any>(signal: unknown): signal is ReactiveNode<T>;
//# sourceMappingURL=signal.d.ts.map