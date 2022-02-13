import { operate } from '../util/lift.js';
import { OperatorSubscriber } from './OperatorSubscriber.js';
export function pairwise() {
    return operate(function (source, subscriber) {
        var prev;
        var hasPrev = false;
        source.subscribe(new OperatorSubscriber(subscriber, function (value) {
            var p = prev;
            prev = value;
            hasPrev && subscriber.next([p, value]);
            hasPrev = true;
        }));
    });
}
//# pairwise.js.map