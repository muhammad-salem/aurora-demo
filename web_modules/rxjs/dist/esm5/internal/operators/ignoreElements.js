import { operate } from '../util/lift.js';
import { OperatorSubscriber } from './OperatorSubscriber.js';
import { noop } from '../util/noop.js';
export function ignoreElements() {
    return operate(function (source, subscriber) {
        source.subscribe(new OperatorSubscriber(subscriber, noop));
    });
}
//# ignoreElements.js.map