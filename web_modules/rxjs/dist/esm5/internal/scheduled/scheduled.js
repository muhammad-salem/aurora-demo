import { scheduleObservable } from './scheduleObservable.js';
import { schedulePromise } from './schedulePromise.js';
import { scheduleArray } from './scheduleArray.js';
import { scheduleIterable } from './scheduleIterable.js';
import { scheduleAsyncIterable } from './scheduleAsyncIterable.js';
import { isInteropObservable } from '../util/isInteropObservable.js';
import { isPromise } from '../util/isPromise.js';
import { isArrayLike } from '../util/isArrayLike.js';
import { isIterable } from '../util/isIterable.js';
import { isAsyncIterable } from '../util/isAsyncIterable.js';
import { createInvalidObservableTypeError } from '../util/throwUnobservableError.js';
import { isReadableStreamLike } from '../util/isReadableStreamLike.js';
import { scheduleReadableStreamLike } from './scheduleReadableStreamLike.js';
export function scheduled(input, scheduler) {
    if (input != null) {
        if (isInteropObservable(input)) {
            return scheduleObservable(input, scheduler);
        }
        if (isArrayLike(input)) {
            return scheduleArray(input, scheduler);
        }
        if (isPromise(input)) {
            return schedulePromise(input, scheduler);
        }
        if (isAsyncIterable(input)) {
            return scheduleAsyncIterable(input, scheduler);
        }
        if (isIterable(input)) {
            return scheduleIterable(input, scheduler);
        }
        if (isReadableStreamLike(input)) {
            return scheduleReadableStreamLike(input, scheduler);
        }
    }
    throw createInvalidObservableTypeError(input);
}
//# sourceMappingURL=scheduled.js.map