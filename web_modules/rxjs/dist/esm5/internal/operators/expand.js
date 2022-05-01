import { operate } from '../util/lift.js';
import { mergeInternals } from './mergeInternals.js';
export function expand(project, concurrent, scheduler) {
    if (concurrent === void 0) { concurrent = Infinity; }
    concurrent = (concurrent || 0) < 1 ? Infinity : concurrent;
    return operate(function (source, subscriber) {
        return mergeInternals(source, subscriber, project, concurrent, undefined, true, scheduler);
    });
}
//# sourceMappingURL=expand.js.map