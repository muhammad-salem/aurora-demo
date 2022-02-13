import { operate } from '../util/lift.js';
import { noop } from '../util/noop.js';
import { OperatorSubscriber } from './OperatorSubscriber.js';
import { innerFrom } from '../observable/innerFrom.js';
export function bufferWhen(closingSelector) {
    return operate(function (source, subscriber) {
        var buffer = null;
        var closingSubscriber = null;
        var openBuffer = function () {
            closingSubscriber === null || closingSubscriber === void 0 ? void 0 : closingSubscriber.unsubscribe();
            var b = buffer;
            buffer = [];
            b && subscriber.next(b);
            innerFrom(closingSelector()).subscribe((closingSubscriber = new OperatorSubscriber(subscriber, openBuffer, noop)));
        };
        openBuffer();
        source.subscribe(new OperatorSubscriber(subscriber, function (value) { return buffer === null || buffer === void 0 ? void 0 : buffer.push(value); }, function () {
            buffer && subscriber.next(buffer);
            subscriber.complete();
        }, undefined, function () { return (buffer = closingSubscriber = null); }));
    });
}
//# bufferWhen.js.map