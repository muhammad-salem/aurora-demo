import { asyncScheduler } from '../scheduler/async.js';
import { audit } from './audit.js';
import { timer } from '../observable/timer.js';
export function auditTime(duration, scheduler) {
    if (scheduler === void 0) { scheduler = asyncScheduler; }
    return audit(function () { return timer(duration, scheduler); });
}
//# sourceMappingURL=auditTime.js.map