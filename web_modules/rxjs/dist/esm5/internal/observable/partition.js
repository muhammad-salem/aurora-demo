import { not } from '../util/not.js';
import { filter } from '../operators/filter.js';
import { innerFrom } from './innerFrom.js';
export function partition(source, predicate, thisArg) {
    return [filter(predicate, thisArg)(innerFrom(source)), filter(not(predicate, thisArg))(innerFrom(source))];
}
//# sourceMappingURL=partition.js.map