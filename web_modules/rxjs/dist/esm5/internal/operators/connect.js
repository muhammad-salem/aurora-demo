import { Subject } from '../Subject.js';
import { from } from '../observable/from.js';
import { operate } from '../util/lift.js';
import { fromSubscribable } from '../observable/fromSubscribable.js';
var DEFAULT_CONFIG = {
    connector: function () { return new Subject(); },
};
export function connect(selector, config) {
    if (config === void 0) { config = DEFAULT_CONFIG; }
    var connector = config.connector;
    return operate(function (source, subscriber) {
        var subject = connector();
        from(selector(fromSubscribable(subject))).subscribe(subscriber);
        subscriber.add(source.subscribe(subject));
    });
}
//# sourceMappingURL=connect.js.map