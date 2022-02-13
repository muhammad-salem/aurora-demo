import { __read, __spreadArray } from "../../../../../tslib/tslib.es6.js";
import { merge } from './merge.js';
export function mergeWith() {
    var otherSources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        otherSources[_i] = arguments[_i];
    }
    return merge.apply(void 0, __spreadArray([], __read(otherSources)));
}
//# mergeWith.js.map