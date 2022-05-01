import { __read, __spreadArray } from "../../../../../tslib/tslib.es6.js";
import { map } from "../operators/map.js";
var isArray = Array.isArray;
function callOrApply(fn, args) {
    return isArray(args) ? fn.apply(void 0, __spreadArray([], __read(args))) : fn(args);
}
export function mapOneOrManyArgs(fn) {
    return map(function (args) { return callOrApply(fn, args); });
}
//# sourceMappingURL=mapOneOrManyArgs.js.map