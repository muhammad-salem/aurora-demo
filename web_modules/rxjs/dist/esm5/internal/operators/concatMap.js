import { mergeMap } from './mergeMap.js';
import { isFunction } from '../util/isFunction.js';
export function concatMap(project, resultSelector) {
    return isFunction(resultSelector) ? mergeMap(project, resultSelector, 1) : mergeMap(project, 1);
}
//# sourceMappingURL=concatMap.js.map