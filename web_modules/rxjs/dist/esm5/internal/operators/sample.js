import { operate } from '../util/lift.js';
import { noop } from '../util/noop.js';
import { createOperatorSubscriber } from './OperatorSubscriber.js';
export function sample(notifier) {
    return operate(function (source, subscriber) {
        var hasValue = false;
        var lastValue = null;
        source.subscribe(createOperatorSubscriber(subscriber, function (value) {
            hasValue = true;
            lastValue = value;
        }));
        notifier.subscribe(createOperatorSubscriber(subscriber, function () {
            if (hasValue) {
                hasValue = false;
                var value = lastValue;
                lastValue = null;
                subscriber.next(value);
            }
        }, noop));
    });
}
//# sourceMappingURL=sample.js.map