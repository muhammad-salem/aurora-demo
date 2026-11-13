import { __read, __spreadArray } from "../../../../../tslib/tslib.es6.js";
import { raceInit } from '../observable/race.js';
import { operate } from '../util/lift.js';
import { identity } from '../util/identity.js';
export function raceWith() {
    var otherSources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        otherSources[_i] = arguments[_i];
    }
    return !otherSources.length
        ? identity
        : operate(function (source, subscriber) {
            raceInit(__spreadArray([source], __read(otherSources)))(subscriber);
        });
}
//# raceWith.js.map