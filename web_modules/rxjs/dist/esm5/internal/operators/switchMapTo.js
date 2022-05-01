import { switchMap } from './switchMap.js';
import { isFunction } from '../util/isFunction.js';
export function switchMapTo(innerObservable, resultSelector) {
    return isFunction(resultSelector) ? switchMap(function () { return innerObservable; }, resultSelector) : switchMap(function () { return innerObservable; });
}
//# sourceMappingURL=switchMapTo.js.map