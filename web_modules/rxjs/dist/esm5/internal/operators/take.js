import { EMPTY } from '../observable/empty.js';
import { operate } from '../util/lift.js';
import { OperatorSubscriber } from './OperatorSubscriber.js';
export function take(count) {
    return count <= 0
        ?
            function () { return EMPTY; }
        : operate(function (source, subscriber) {
            var seen = 0;
            source.subscribe(new OperatorSubscriber(subscriber, function (value) {
                if (++seen <= count) {
                    subscriber.next(value);
                    if (count <= seen) {
                        subscriber.complete();
                    }
                }
            }));
        });
}
//# take.js.map