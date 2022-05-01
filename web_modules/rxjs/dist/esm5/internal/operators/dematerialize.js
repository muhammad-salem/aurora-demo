import { observeNotification } from '../Notification.js';
import { operate } from '../util/lift.js';
import { createOperatorSubscriber } from './OperatorSubscriber.js';
export function dematerialize() {
    return operate(function (source, subscriber) {
        source.subscribe(createOperatorSubscriber(subscriber, function (notification) { return observeNotification(notification, subscriber); }));
    });
}
//# sourceMappingURL=dematerialize.js.map