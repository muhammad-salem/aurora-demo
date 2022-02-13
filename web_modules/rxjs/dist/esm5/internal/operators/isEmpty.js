import { operate } from '../util/lift.js';
import { OperatorSubscriber } from './OperatorSubscriber.js';
export function isEmpty() {
    return operate(function (source, subscriber) {
        source.subscribe(new OperatorSubscriber(subscriber, function () {
            subscriber.next(false);
            subscriber.complete();
        }, function () {
            subscriber.next(true);
            subscriber.complete();
        }));
    });
}
//# isEmpty.js.map