import { iterator as Symbol_iterator } from '../symbol/iterator.js';
import { isFunction } from './isFunction.js';
export function isIterable(input) {
    return isFunction(input === null || input === void 0 ? void 0 : input[Symbol_iterator]);
}
//# sourceMappingURL=isIterable.js.map