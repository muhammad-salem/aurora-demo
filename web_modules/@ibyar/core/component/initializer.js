import { Signal } from '../../expressions/index.js';
import { signalScopeFactory } from '../signals/factory.js';
import { InjectionToken } from '../di/provider.js';
import { inject } from '../di/inject.js';
export class InputSignal extends Signal {
    options;
    constructor(scope, index, initValue, options) {
        super(scope, index, initValue);
        this.options = options;
    }
    set(value) {
        if (this.options?.transform) {
            value = this.options.transform(value);
        }
        super.set(value);
    }
}
export function isInputSignal(signal) {
    return signal instanceof InputSignal;
}
export function input(initValue, options) {
    options = Object.assign(options ?? {}, { required: false });
    return signalScopeFactory.factory((scope, index) => new InputSignal(scope, index, initValue, options));
}
function requiredInput(options) {
    options = Object.assign(options ?? {}, { required: true });
    return signalScopeFactory.factory((scope, index) => new InputSignal(scope, index, undefined, options));
}
input.required = requiredInput;
export class FormValueSignal extends Signal {
    options;
    constructor(scope, index, initValue, options) {
        super(scope, index, initValue);
        this.options = options;
    }
}
export function formValue(initValue) {
    return signalScopeFactory.factory((scope, index) => new FormValueSignal(scope, index, initValue, { required: false }));
}
function requiredFormValue() {
    return signalScopeFactory.factory((scope, index) => new FormValueSignal(scope, index, undefined, { required: true }));
}
formValue.required = requiredFormValue;
export class OutputSignal extends Signal {
    options;
    constructor(scope, index, options) {
        super(scope, index);
        this.options = options;
    }
    emit(value) {
        this.scope.set(this.index, value);
    }
}
export function isOutputSignal(signal) {
    return signal instanceof OutputSignal;
}
export function output(options) {
    return signalScopeFactory.factory((scope, index) => new OutputSignal(scope, index, options));
}
export const VIEW_TOKEN = new InjectionToken('VIEW');
export function view() {
    return inject(VIEW_TOKEN);
}
export class ViewChildSignal extends Signal {
    selector;
    constructor(scope, index, selector) {
        super(scope, index);
        this.selector = selector;
    }
}
export function isViewChildSignal(signal) {
    return signal instanceof ViewChildSignal;
}
export function viewChild(selector) {
    return signalScopeFactory.factory((scope, index) => new ViewChildSignal(scope, index, selector));
}
//# sourceMappingURL=initializer.js.map