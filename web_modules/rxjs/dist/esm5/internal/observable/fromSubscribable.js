import { Observable } from '../Observable.js';
export function fromSubscribable(subscribable) {
    return new Observable(function (subscriber) { return subscribable.subscribe(subscriber); });
}
//# sourceMappingURL=fromSubscribable.js.map