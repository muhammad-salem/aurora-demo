import { BehaviorSubject } from '../BehaviorSubject.js';
import { ConnectableObservable } from '../observable/ConnectableObservable.js';
export function publishBehavior(initialValue) {
    return function (source) {
        var subject = new BehaviorSubject(initialValue);
        return new ConnectableObservable(source, function () { return subject; });
    };
}
//# sourceMappingURL=publishBehavior.js.map