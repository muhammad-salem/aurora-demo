var SlicePipe_1;
import { __decorate } from "../../../tslib/tslib.es6.js";
import { Pipe } from '../../core/index.js';
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
//# slice.pipe.js.map