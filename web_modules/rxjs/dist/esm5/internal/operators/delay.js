import { asyncScheduler } from '../scheduler/async.js';
import { delayWhen } from './delayWhen.js';
import { timer } from '../observable/timer.js';
export function delay(due, scheduler) {
    if (scheduler === void 0) { scheduler = asyncScheduler; }
    var duration = timer(due, scheduler);
    return delayWhen(function () { return duration; });
}
//# sourceMappingURL=delay.js.map