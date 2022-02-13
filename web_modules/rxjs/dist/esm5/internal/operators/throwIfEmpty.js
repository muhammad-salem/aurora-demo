import { EmptyError } from '../util/EmptyError.js';
import { operate } from '../util/lift.js';
import { OperatorSubscriber } from './OperatorSubscriber.js';
export function throwIfEmpty(errorFactory) {
    if (errorFactory === void 0) { errorFactory = defaultErrorFactory; }
    return operate(function (source, subscriber) {
        var hasValue = false;
        source.subscribe(new OperatorSubscriber(subscriber, function (value) {
            hasValue = true;
            subscriber.next(value);
        }, function () { return (hasValue ? subscriber.complete() : subscriber.error(errorFactory())); }));
    });
}
function defaultErrorFactory() {
    return new EmptyError();
}
//# throwIfEmpty.js.map