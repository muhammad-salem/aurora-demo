import { operate } from '../util/lift.js';
import { createOperatorSubscriber } from './OperatorSubscriber.js';
export function skipWhile(predicate) {
    return operate(function (source, subscriber) {
        var taking = false;
        var index = 0;
        source.subscribe(createOperatorSubscriber(subscriber, function (value) { return (taking || (taking = !predicate(value, index++))) && subscriber.next(value); }));
    });
}
//# sourceMappingURL=skipWhile.js.map