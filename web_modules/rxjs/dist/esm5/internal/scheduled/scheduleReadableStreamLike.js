import { scheduleAsyncIterable } from './scheduleAsyncIterable.js';
import { readableStreamLikeToAsyncGenerator } from '../util/isReadableStreamLike.js';
export function scheduleReadableStreamLike(input, scheduler) {
    return scheduleAsyncIterable(readableStreamLikeToAsyncGenerator(input), scheduler);
}
//# sourceMappingURL=scheduleReadableStreamLike.js.map