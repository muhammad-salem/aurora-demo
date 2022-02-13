import { observeNotification } from '../Notification.js';
import { operate } from '../util/lift.js';
import { OperatorSubscriber } from './OperatorSubscriber.js';
export function dematerialize() {
    return operate(function (source, subscriber) {
        source.subscribe(new OperatorSubscriber(subscriber, function (notification) { return observeNotification(notification, subscriber); }));
    });
}
//# dematerialize.js.map