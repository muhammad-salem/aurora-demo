import { __read, __spreadArray } from "../../../../../tslib/tslib.es6.js";
import { operate } from '../util/lift.js';
import { concatAll } from './concatAll.js';
import { popScheduler } from '../util/args.js';
import { from } from '../observable/from.js';
export function concat() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var scheduler = popScheduler(args);
    return operate(function (source, subscriber) {
        concatAll()(from(__spreadArray([source], __read(args)), scheduler)).subscribe(subscriber);
    });
}
//# concat.js.map