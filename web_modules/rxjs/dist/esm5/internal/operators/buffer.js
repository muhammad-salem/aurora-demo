import { operate } from '../util/lift.js';
import { noop } from '../util/noop.js';
import { createOperatorSubscriber } from './OperatorSubscriber.js';
export function buffer(closingNotifier) {
    return operate(function (source, subscriber) {
        var currentBuffer = [];
        source.subscribe(createOperatorSubscriber(subscriber, function (value) { return currentBuffer.push(value); }, function () {
            subscriber.next(currentBuffer);
            subscriber.complete();
        }));
        closingNotifier.subscribe(createOperatorSubscriber(subscriber, function () {
            var b = currentBuffer;
            currentBuffer = [];
            subscriber.next(b);
        }, noop));
        return function () {
            currentBuffer = null;
        };
    });
}
//# sourceMappingURL=buffer.js.map