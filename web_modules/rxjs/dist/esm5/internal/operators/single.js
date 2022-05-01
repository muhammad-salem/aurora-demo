import { EmptyError } from '../util/EmptyError.js';
import { SequenceError } from '../util/SequenceError.js';
import { NotFoundError } from '../util/NotFoundError.js';
import { operate } from '../util/lift.js';
import { createOperatorSubscriber } from './OperatorSubscriber.js';
export function single(predicate) {
    return operate(function (source, subscriber) {
        var hasValue = false;
        var singleValue;
        var seenValue = false;
        var index = 0;
        source.subscribe(createOperatorSubscriber(subscriber, function (value) {
            seenValue = true;
            if (!predicate || predicate(value, index++, source)) {
                hasValue && subscriber.error(new SequenceError('Too many matching values'));
                hasValue = true;
                singleValue = value;
            }
        }, function () {
            if (hasValue) {
                subscriber.next(singleValue);
                subscriber.complete();
            }
            else {
                subscriber.error(seenValue ? new NotFoundError('No matching values') : new EmptyError());
            }
        }));
    });
}
//# sourceMappingURL=single.js.map