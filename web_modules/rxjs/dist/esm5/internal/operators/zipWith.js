import { __read, __spreadArray } from "../../../../../tslib/tslib.es6.js";
import { zip } from './zip.js';
export function zipWith() {
    var otherInputs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        otherInputs[_i] = arguments[_i];
    }
    return zip.apply(void 0, __spreadArray([], __read(otherInputs)));
}
//# sourceMappingURL=zipWith.js.map