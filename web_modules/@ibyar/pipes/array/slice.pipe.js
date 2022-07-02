var SlicePipe_1;
import { __decorate } from "../../../tslib/tslib.es6.js";
import { Pipe } from '../../core/index.js';
/**
 *
 * Creates a new `Array` or `String` containing a subset (slice) of the elements.
 *
 * @usageNotes
 *
 * All behavior is based on the expected behavior of the JavaScript API `Array.prototype.slice()`
 * and `String.prototype.slice()`.
 *
 * When operating on an `Array`, the returned `Array` is always a copy even when all
 * the elements are being returned.
 *
 * When operating on a blank value, the pipe returns the blank value.
 *
 * ### List Example
 *
 * This `ngFor` example:
 *
 * {@example common/pipes/ts/slice_pipe.ts region='SlicePipe_list'}
 *
 * produces the following:
 *
 * ```html
 * <li>b</li>
 * <li>c</li>
 * ```
 *
 * ### String Examples
 *
 * {@example common/pipes/ts/slice_pipe.ts region='SlicePipe_string'}
 *
 * @publicApi
 */
let SlicePipe = SlicePipe_1 = class SlicePipe {
    transform(input, start, end) {
        if (input == null)
            return null;
        if (!this.supports(input)) {
            throw Error(`InvalidPipeArgument: '${input}' of '${SlicePipe_1.name}' pipe`);
        }
        return input.slice(start, end);
    }
    supports(obj) {
        return typeof obj === 'string' || Array.isArray(obj);
    }
};
SlicePipe = SlicePipe_1 = __decorate([
    Pipe({ name: 'slice' })
], SlicePipe);
export { SlicePipe };
//# sourceMappingURL=slice.pipe.js.map