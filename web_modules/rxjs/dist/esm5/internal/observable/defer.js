import { Observable } from '../Observable.js';
import { innerFrom } from './innerFrom.js';
export function defer(observableFactory) {
    return new Observable(function (subscriber) {
        innerFrom(observableFactory()).subscribe(subscriber);
    });
}
//# sourceMappingURL=defer.js.map