import { innerFrom } from '../observable/innerFrom.js';
import { observeOn } from '../operators/observeOn.js';
import { subscribeOn } from '../operators/subscribeOn.js';
export function scheduleObservable(input, scheduler) {
    return innerFrom(input).pipe(subscribeOn(scheduler), observeOn(scheduler));
}
//# sourceMappingURL=scheduleObservable.js.map