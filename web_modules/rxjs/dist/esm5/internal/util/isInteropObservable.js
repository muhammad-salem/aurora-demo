import { observable as Symbol_observable } from '../symbol/observable.js';
import { isFunction } from './isFunction.js';
export function isInteropObservable(input) {
    return isFunction(input[Symbol_observable]);
}
//# sourceMappingURL=isInteropObservable.js.map