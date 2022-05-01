import { mergeMap } from './mergeMap.js';
import { identity } from '../util/identity.js';
export function mergeAll(concurrent) {
    if (concurrent === void 0) { concurrent = Infinity; }
    return mergeMap(identity, concurrent);
}
//# sourceMappingURL=mergeAll.js.map