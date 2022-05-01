import { concatMap } from './concatMap.js';
import { isFunction } from '../util/isFunction.js';
export function concatMapTo(innerObservable, resultSelector) {
    return isFunction(resultSelector) ? concatMap(function () { return innerObservable; }, resultSelector) : concatMap(function () { return innerObservable; });
}
//# sourceMappingURL=concatMapTo.js.map