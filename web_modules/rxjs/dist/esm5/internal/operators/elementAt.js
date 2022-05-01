import { ArgumentOutOfRangeError } from '../util/ArgumentOutOfRangeError.js';
import { filter } from './filter.js';
import { throwIfEmpty } from './throwIfEmpty.js';
import { defaultIfEmpty } from './defaultIfEmpty.js';
import { take } from './take.js';
export function elementAt(index, defaultValue) {
    if (index < 0) {
        throw new ArgumentOutOfRangeError();
    }
    var hasDefaultValue = arguments.length >= 2;
    return function (source) {
        return source.pipe(filter(function (v, i) { return i === index; }), take(1), hasDefaultValue ? defaultIfEmpty(defaultValue) : throwIfEmpty(function () { return new ArgumentOutOfRangeError(); }));
    };
}
//# sourceMappingURL=elementAt.js.map