import { AsyncSubject } from '../AsyncSubject.js';
import { ConnectableObservable } from '../observable/ConnectableObservable.js';
export function publishLast() {
    return function (source) {
        var subject = new AsyncSubject();
        return new ConnectableObservable(source, function () { return subject; });
    };
}
//# sourceMappingURL=publishLast.js.map