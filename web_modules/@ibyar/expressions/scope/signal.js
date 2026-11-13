import { skipChangeDetection } from './cd.js';
import { ReactiveScope } from './scope.js';
function compute(updateFn) {
    try {
        return updateFn();
    }
    catch (error) {
        return error;
    }
}
export class SignalScope extends ReactiveScope {
    static create() {
        return new SignalScope();
    }
    state = [];
    watch = true;
    constructor() {
        super([]);
    }
    getNextKey() {
        return this.getContext().length;
    }
    createSignal(initValue) {
        return new Signal(this, this.getContext().length, initValue);
    }
    createLazy(updateFn) {
        return new Lazy(this, this.getContext().length, updateFn);
    }
    createComputed(updateFn) {
        const index = this.getContext().length;
        this.watchState();
        const value = compute(updateFn);
        const computed = new Computed(this, index, value);
        const observeComputed = () => {
            this.watchState();
            const value = compute(updateFn);
            const state = this.readState();
            this.restoreState();
            Object.keys(subscriptions)
                .filter(index => !state.includes(+index))
                .forEach(index => subscriptions[index].pause());
            state.forEach(index => {
                subscriptions[index]?.resume();
                subscriptions[index] ??= this.subscribe(index, observeComputed);
            });
            this.set(index, value);
        };
        const subscriptions = this.observeState(observeComputed);
        this.restoreState();
        return computed;
    }
    createEffect(effectFn) {
        let cleanupFn;
        let isCleanupRegistered = false;
        const cleanupRegister = onClean => {
            cleanupFn = onClean;
            isCleanupRegistered = true;
        };
        const callback = () => {
            isCleanupRegistered = false;
            const error = compute(() => effectFn(cleanupRegister));
            if (error instanceof Error) {
                console.error(error);
            }
            if (!isCleanupRegistered) {
                cleanupFn = undefined;
            }
        };
        this.watchState();
        callback();
        const observeComputed = () => {
            cleanupFn?.();
            this.watchState();
            callback();
            const state = this.readState();
            this.restoreState();
            Object.keys(subscriptions)
                .filter(index => !state.includes(+index))
                .forEach(index => subscriptions[index].pause());
            state.forEach(index => {
                subscriptions[index]?.resume();
                subscriptions[index] ??= this.subscribe(index, observeComputed);
            });
        };
        const subscriptions = this.observeState(observeComputed);
        this.restoreState();
        return {
            destroy: () => {
                Object.values(subscriptions).forEach(sub => sub.unsubscribe());
                cleanupFn?.();
            },
        };
    }
    watchState() {
        this.state.push([]);
    }
    untrack() {
        this.watch = false;
    }
    observeIndex(index) {
        if (this.watch) {
            this.state.at(-1)?.push(index);
        }
    }
    track() {
        this.watch = true;
    }
    readState() {
        return this.state.at(-1) ?? [];
    }
    observeState(updateFn) {
        return Object.fromEntries(this.readState().map(index => [index, this.subscribe(index, updateFn)]));
    }
    restoreState() {
        this.state.pop();
    }
}
export class ReactiveNode {
    scope;
    index;
    constructor(scope, index) {
        this.scope = scope;
        this.index = index;
        skipChangeDetection(this);
    }
    get() {
        this.scope.observeIndex(this.index);
        return this.scope.get(this.index);
    }
    getScope() {
        return this.scope;
    }
    getIndex() {
        return this.index;
    }
    subscribe(callback) {
        return this.scope.subscribe(this.index, callback);
    }
}
export class Computed extends ReactiveNode {
    constructor(scope, index, initValue) {
        super(scope, index);
        scope.set(index, initValue);
    }
}
export class Lazy extends ReactiveNode {
    updateFn;
    constructor(scope, index, updateFn) {
        super(scope, index);
        this.updateFn = updateFn;
        scope.set(index, compute(updateFn));
    }
    get() {
        const value = compute(this.updateFn);
        this.scope.set(this.index, value);
        return super.get();
    }
}
export class Signal extends ReactiveNode {
    constructor(scope, index, initValue) {
        super(scope, index);
        scope.set(index, initValue);
    }
    set(value) {
        this.scope.set(this.index, value);
    }
    update(updateFn) {
        this.set(updateFn(this.get()));
    }
    asReadonly() {
        return new ReadOnlySignal(this.scope, this.index);
    }
}
export class ReadOnlySignal extends ReactiveNode {
}
export function isSignal(signal) {
    return signal instanceof Signal;
}
export function isComputed(signal) {
    return signal instanceof Computed;
}
export function isLazy(signal) {
    return signal instanceof Lazy;
}
export function isReadOnlySignal(signal) {
    return signal instanceof ReadOnlySignal;
}
export function isReactive(signal) {
    return signal instanceof ReactiveNode;
}
//# sourceMappingURL=signal.js.map