import { __read, __spreadArray } from "../../../../../tslib/tslib.es6.js";
import { combineLatestInit } from '../observable/combineLatest.js';
import { operate } from '../util/lift.js';
import { argsOrArgArray } from '../util/argsOrArgArray.js';
import { mapOneOrManyArgs } from '../util/mapOneOrManyArgs.js';
import { pipe } from '../util/pipe.js';
import { popResultSelector } from '../util/args.js';
export function combineLatest() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var resultSelector = popResultSelector(args);
    return resultSelector
        ? pipe(combineLatest.apply(void 0, __spreadArray([], __read(args))), mapOneOrManyArgs(resultSelector))
        : operate(function (source, subscriber) {
            combineLatestInit(__spreadArray([source], __read(argsOrArgArray(args))))(subscriber);
        });
}
//# combineLatest.js.map