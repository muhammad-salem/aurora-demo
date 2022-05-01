import { operate } from '../util/lift.js';
import { createFind } from './find.js';
export function findIndex(predicate, thisArg) {
    return operate(createFind(predicate, thisArg, 'index'));
}
//# sourceMappingURL=findIndex.js.map