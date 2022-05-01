import { identity } from '../util/identity.js';
import { operate } from '../util/lift.js';
import { createOperatorSubscriber } from './OperatorSubscriber.js';
export function skipLast(skipCount) {
    return skipCount <= 0
        ?
            identity
        : operate(function (source, subscriber) {
            var ring = new Array(skipCount);
            var seen = 0;
            source.subscribe(createOperatorSubscriber(subscriber, function (value) {
                var valueIndex = seen++;
                if (valueIndex < skipCount) {
                    ring[valueIndex] = value;
                }
                else {
                    var index = valueIndex % skipCount;
                    var oldValue = ring[index];
                    ring[index] = value;
                    subscriber.next(oldValue);
                }
            }));
            return function () {
                ring = null;
            };
        });
}
//# sourceMappingURL=skipLast.js.map