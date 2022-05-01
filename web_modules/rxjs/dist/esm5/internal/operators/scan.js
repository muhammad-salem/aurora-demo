import { operate } from '../util/lift.js';
import { scanInternals } from './scanInternals.js';
export function scan(accumulator, seed) {
    return operate(scanInternals(accumulator, seed, arguments.length >= 2, true));
}
//# sourceMappingURL=scan.js.map