import { signalScopeFactory } from './factory.js';
import { OutputEventEmitter } from '../component/events.js';
export function input(initialValue, opts) {
    const signal = signalScopeFactory.signal(initialValue);
    if (opts?.transform) {
        const setOriginal = signal.set;
        signal.set = (value) => setOriginal(opts.transform(value));
    }
    ;
    return signal;
}
function required(opts) {
    return input(undefined, opts);
}
input.required = required;
export function output(opts) {
    return new OutputEventEmitter(opts);
}
//# sourceMappingURL=initializer.js.map