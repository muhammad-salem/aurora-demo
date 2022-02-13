import { operate } from '../util/lift.js';
import { noop } from '../util/noop.js';
import { OperatorSubscriber } from './OperatorSubscriber.js';
export function sample(notifier) {
    return operate(function (source, subscriber) {
        var hasValue = false;
        var lastValue = null;
        source.subscribe(new OperatorSubscriber(subscriber, function (value) {
            hasValue = true;
            lastValue = value;
        }));
        var emit = function () {
            if (hasValue) {
                hasValue = false;
                var value = lastValue;
                lastValue = null;
                subscriber.next(value);
            }
        };
        notifier.subscribe(new OperatorSubscriber(subscriber, emit, noop));
    });
}
//# sample.js.map