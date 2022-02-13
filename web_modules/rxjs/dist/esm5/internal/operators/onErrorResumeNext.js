import { __read, __spreadArray } from "../../../../../tslib/tslib.es6.js";
import { operate } from '../util/lift.js';
import { innerFrom } from '../observable/innerFrom.js';
import { argsOrArgArray } from '../util/argsOrArgArray.js';
import { OperatorSubscriber } from './OperatorSubscriber.js';
import { noop } from '../util/noop.js';
export function onErrorResumeNext() {
    var sources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        sources[_i] = arguments[_i];
    }
    var nextSources = argsOrArgArray(sources);
    return operate(function (source, subscriber) {
        var remaining = __spreadArray([source], __read(nextSources));
        var subscribeNext = function () {
            if (!subscriber.closed) {
                if (remaining.length > 0) {
                    var nextSource = void 0;
                    try {
                        nextSource = innerFrom(remaining.shift());
                    }
                    catch (err) {
                        subscribeNext();
                        return;
                    }
                    var innerSub = new OperatorSubscriber(subscriber, undefined, noop, noop);
                    subscriber.add(nextSource.subscribe(innerSub));
                    innerSub.add(subscribeNext);
                }
                else {
                    subscriber.complete();
                }
            }
        };
        subscribeNext();
    });
}
//# onErrorResumeNext.js.map