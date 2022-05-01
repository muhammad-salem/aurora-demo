import { scanInternals } from './scanInternals.js';
import { operate } from '../util/lift.js';
export function reduce(accumulator, seed) {
    return operate(scanInternals(accumulator, seed, arguments.length >= 2, false, true));
}
//# sourceMappingURL=reduce.js.map