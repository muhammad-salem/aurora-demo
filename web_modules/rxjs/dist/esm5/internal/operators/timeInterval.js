import { asyncScheduler } from '../scheduler/async.js';
import { operate } from '../util/lift.js';
import { createOperatorSubscriber } from './OperatorSubscriber.js';
export function timeInterval(scheduler) {
    if (scheduler === void 0) { scheduler = asyncScheduler; }
    return operate(function (source, subscriber) {
        var last = scheduler.now();
        source.subscribe(createOperatorSubscriber(subscriber, function (value) {
            var now = scheduler.now();
            var interval = now - last;
            last = now;
            subscriber.next(new TimeInterval(value, interval));
        }));
    });
}
var TimeInterval = (function () {
    function TimeInterval(value, interval) {
        this.value = value;
        this.interval = interval;
    }
    return TimeInterval;
}());
export { TimeInterval };
//# sourceMappingURL=timeInterval.js.map