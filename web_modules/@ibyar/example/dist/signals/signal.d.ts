import { OnDestroy, OnInit } from '@ibyar/aurora';
export declare class SignalScopeService {
    date: import("@ibyar/expressions").Signal<Date>;
}
export declare class SimpleCounter implements OnInit, OnDestroy {
    count: import("@ibyar/expressions").Signal<number>;
    x: import("@ibyar/expressions").Signal<number>;
    y: import("@ibyar/expressions").Signal<number>;
    z: import("@ibyar/expressions").Signal<number>;
    a: import("@ibyar/expressions").Signal<boolean>;
    readonly name: import("@ibyar/core").InputWithoutTransform<string>;
    readonly age: import("@ibyar/core").InputWithTransform<unknown, unknown>;
    readonly inputWithAlias: import("@ibyar/core").InputWithoutTransform<string>;
    readonly requiredInputWithAlias: import("@ibyar/core").InputWithTransform<unknown, unknown>;
    readonly event: import("@ibyar/core").OutputSignal<string>;
    logEvents: import("@ibyar/expressions").Computed<void>;
    l: import("@ibyar/expressions").Lazy<number>;
    e: import("@ibyar/expressions").Computed<number>;
    Error: ErrorConstructor;
    g: import("@ibyar/expressions").Computed<number>;
    h: import("@ibyar/expressions").Computed<number>;
    service: SignalScopeService;
    date: import("@ibyar/expressions").Computed<string>;
    private effectSubscription;
    private interval;
    onInit(): void;
    increment(): void;
    updateLazyValue(): void;
    onDestroy(): void;
}
//# sourceMappingURL=signal.d.ts.map