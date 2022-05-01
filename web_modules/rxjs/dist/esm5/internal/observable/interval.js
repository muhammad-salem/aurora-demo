import { asyncScheduler } from '../scheduler/async.js';
import { timer } from './timer.js';
export function interval(period, scheduler) {
    if (period === void 0) { period = 0; }
    if (scheduler === void 0) { scheduler = asyncScheduler; }
    if (period < 0) {
        period = 0;
    }
    return timer(period, period, scheduler);
}
//# sourceMappingURL=interval.js.map