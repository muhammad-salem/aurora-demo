import { __read, __spreadArray } from "../../../../../tslib/tslib.es6.js";
import { operate } from '../util/lift.js';
import { argsOrArgArray } from '../util/argsOrArgArray.js';
import { mergeAll } from './mergeAll.js';
import { popNumber, popScheduler } from '../util/args.js';
import { from } from '../observable/from.js';
export function merge() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var scheduler = popScheduler(args);
    var concurrent = popNumber(args, Infinity);
    args = argsOrArgArray(args);
    return operate(function (source, subscriber) {
        mergeAll(concurrent)(from(__spreadArray([source], __read(args)), scheduler)).subscribe(subscriber);
    });
}
//# merge.js.map