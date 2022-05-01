import { executeSchedule } from '../util/executeSchedule.js';
import { operate } from '../util/lift.js';
import { createOperatorSubscriber } from './OperatorSubscriber.js';
export function observeOn(scheduler, delay) {
    if (delay === void 0) { delay = 0; }
    return operate(function (source, subscriber) {
        source.subscribe(createOperatorSubscriber(subscriber, function (value) { return executeSchedule(subscriber, scheduler, function () { return subscriber.next(value); }, delay); }, function () { return executeSchedule(subscriber, scheduler, function () { return subscriber.complete(); }, delay); }, function (err) { return executeSchedule(subscriber, scheduler, function () { return subscriber.error(err); }, delay); }));
    });
}
//# sourceMappingURL=observeOn.js.map