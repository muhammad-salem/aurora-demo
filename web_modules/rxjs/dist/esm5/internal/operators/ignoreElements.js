import { operate } from '../util/lift.js';
import { createOperatorSubscriber } from './OperatorSubscriber.js';
import { noop } from '../util/noop.js';
export function ignoreElements() {
    return operate(function (source, subscriber) {
        source.subscribe(createOperatorSubscriber(subscriber, noop));
    });
}
//# sourceMappingURL=ignoreElements.js.map