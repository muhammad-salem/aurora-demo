import { asyncScheduler } from '../scheduler/async.js';
import { throttle } from './throttle.js';
import { timer } from '../observable/timer.js';
export function throttleTime(duration, scheduler, config) {
    if (scheduler === void 0) { scheduler = asyncScheduler; }
    var duration$ = timer(duration, scheduler);
    return throttle(function () { return duration$; }, config);
}
//# throttleTime.js.map