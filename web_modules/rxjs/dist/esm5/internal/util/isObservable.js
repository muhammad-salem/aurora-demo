import { Observable } from '../Observable.js';
import { isFunction } from './isFunction.js';
export function isObservable(obj) {
    return !!obj && (obj instanceof Observable || (isFunction(obj.lift) && isFunction(obj.subscribe)));
}
//# isObservable.js.map