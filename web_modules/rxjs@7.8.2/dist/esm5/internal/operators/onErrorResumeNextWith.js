import { __read, __spreadArray } from "../../../../../tslib@2.9.1/tslib.es6.js";
import { argsOrArgArray } from '../util/argsOrArgArray.js';
import { onErrorResumeNext as oERNCreate } from '../observable/onErrorResumeNext.js';
export function onErrorResumeNextWith() {
    var sources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        sources[_i] = arguments[_i];
    }
    var nextSources = argsOrArgArray(sources);
    return function (source) { return oERNCreate.apply(void 0, __spreadArray([source], __read(nextSources))); };
}
export var onErrorResumeNext = onErrorResumeNextWith;
//# onErrorResumeNextWith.js.map