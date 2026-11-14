import { ReactiveNode, SignalScope } from '@ibyar/expressions';
export declare function pushNewSignalScope(): SignalScope;
export declare function pushSignalScope(scope: SignalScope): void;
export declare function clearSignalScope(scope: SignalScope): void;
export declare function signal<T>(initialValue?: T): import("@ibyar/expressions").Signal<T>;
export declare function computed<T>(computation: () => T): import("@ibyar/expressions").Computed<T>;
export declare function lazy<T>(computation: () => T): import("@ibyar/expressions").Lazy<T>;
export declare function effect(effectFn: (onCleanup?: (clean: () => void) => void) => void): import("@ibyar/expressions").SignalDestroyRef;
export declare function untracked<T>(reactiveNode: ReactiveNode<T>): T;
export declare function untracked<T>(nonReactiveReadsFn: () => T): T;
//# sourceMappingURL=signals.d.ts.map