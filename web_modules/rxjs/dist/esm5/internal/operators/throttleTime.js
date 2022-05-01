import { asyncScheduler } from '../scheduler/async.js';
import { defaultThrottleConfig, throttle } from './throttle.js';
import { timer } from '../observable/timer.js';
export function throttleTime(duration, scheduler, config) {
    if (scheduler === void 0) { scheduler = asyncScheduler; }
    if (config === void 0) { config = defaultThrottleConfig; }
    var duration$ = timer(duration, scheduler);
    return throttle(function () { return duration$; }, config);
}
//# sourceMappingURL=throttleTime.js.map