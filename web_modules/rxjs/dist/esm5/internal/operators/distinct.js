import { operate } from '../util/lift.js';
import { createOperatorSubscriber } from './OperatorSubscriber.js';
import { noop } from '../util/noop.js';
import { innerFrom } from '../observable/innerFrom.js';
export function distinct(keySelector, flushes) {
    return operate(function (source, subscriber) {
        var distinctKeys = new Set();
        source.subscribe(createOperatorSubscriber(subscriber, function (value) {
            var key = keySelector ? keySelector(value) : value;
            if (!distinctKeys.has(key)) {
                distinctKeys.add(key);
                subscriber.next(value);
            }
        }));
        flushes && innerFrom(flushes).subscribe(createOperatorSubscriber(subscriber, function () { return distinctKeys.clear(); }, noop));
    });
}
//# distinct.js.map