import { operate } from '../util/lift.js';
import { OperatorSubscriber } from './OperatorSubscriber.js';
export function defaultIfEmpty(defaultValue) {
    return operate(function (source, subscriber) {
        var hasValue = false;
        source.subscribe(new OperatorSubscriber(subscriber, function (value) {
            hasValue = true;
            subscriber.next(value);
        }, function () {
            if (!hasValue) {
                subscriber.next(defaultValue);
            }
            subscriber.complete();
        }));
    });
}
//# defaultIfEmpty.js.map