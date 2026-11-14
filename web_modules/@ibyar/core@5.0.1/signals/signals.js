import { SignalScope } from '../../expressions@5.0.1/index.js';
import { signalScopeFactory } from './factory.js';
export function pushNewSignalScope() {
    const scope = SignalScope.create();
    signalScopeFactory.push(scope);
    return scope;
}
export function pushSignalScope(scope) {
    signalScopeFactory.push(scope);
}
export function clearSignalScope(scope) {
    signalScopeFactory.pop(scope);
}
export function signal(initialValue) {
    return signalScopeFactory.signal(initialValue);
}
export function computed(computation) {
    return signalScopeFactory.computed(computation);
}
export function lazy(computation) {
    return signalScopeFactory.lazy(computation);
}
export function effect(effectFn) {
    return signalScopeFactory.effect(effectFn);
}
export function untracked(nonReactiveReads) {
    return signalScopeFactory.untracked(nonReactiveReads);
}
//# sourceMappingURL=signals.js.map