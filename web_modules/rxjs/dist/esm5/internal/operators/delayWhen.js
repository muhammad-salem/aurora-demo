import { concat } from '../observable/concat.js';
import { take } from './take.js';
import { ignoreElements } from './ignoreElements.js';
import { mapTo } from './mapTo.js';
import { mergeMap } from './mergeMap.js';
export function delayWhen(delayDurationSelector, subscriptionDelay) {
    if (subscriptionDelay) {
        return function (source) {
            return concat(subscriptionDelay.pipe(take(1), ignoreElements()), source.pipe(delayWhen(delayDurationSelector)));
        };
    }
    return mergeMap(function (value, index) { return delayDurationSelector(value, index).pipe(take(1), mapTo(value)); });
}
//# delayWhen.js.map