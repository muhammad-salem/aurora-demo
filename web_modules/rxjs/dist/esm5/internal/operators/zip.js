import { __read, __spreadArray } from "../../../../../tslib/tslib.es6.js";
import { zip as zipStatic } from '../observable/zip.js';
import { operate } from '../util/lift.js';
export function zip() {
    var sources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        sources[_i] = arguments[_i];
    }
    return operate(function (source, subscriber) {
        zipStatic.apply(void 0, __spreadArray([source], __read(sources))).subscribe(subscriber);
    });
}
//# zip.js.map