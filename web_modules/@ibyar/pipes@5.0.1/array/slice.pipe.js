import { __esDecorate, __runInitializers } from "../../../tslib@2.9.1/tslib.es6.js";
import { Pipe } from '../../core@5.0.1/index.js';
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
 */
let SlicePipe = (() => {
    let _classDecorators = [Pipe({ name: 'slice' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var SlicePipe = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            SlicePipe = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        transform(input, start, end) {
            if (input == null)
                return null;
            if (!this.supports(input)) {
                throw Error(`InvalidPipeArgument: '${input}' of '${SlicePipe.name}' pipe`);
            }
            return input.slice(start, end);
        }
        supports(obj) {
            return typeof obj === 'string' || Array.isArray(obj);
        }
    };
    return SlicePipe = _classThis;
})();
export { SlicePipe };
//# sourceMappingURL=slice.pipe.js.map