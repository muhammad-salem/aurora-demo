import { reduce } from './reduce.js';
import { operate } from '../util/lift.js';
var arrReducer = function (arr, value) { return (arr.push(value), arr); };
export function toArray() {
    return operate(function (source, subscriber) {
        reduce(arrReducer, [])(source).subscribe(subscriber);
    });
}
//# sourceMappingURL=toArray.js.map