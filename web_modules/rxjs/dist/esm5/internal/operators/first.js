import { EmptyError } from '../util/EmptyError.js';
import { filter } from './filter.js';
import { take } from './take.js';
import { defaultIfEmpty } from './defaultIfEmpty.js';
import { throwIfEmpty } from './throwIfEmpty.js';
import { identity } from '../util/identity.js';
export function first(predicate, defaultValue) {
    var hasDefaultValue = arguments.length >= 2;
    return function (source) {
        return source.pipe(predicate ? filter(function (v, i) { return predicate(v, i, source); }) : identity, take(1), hasDefaultValue ? defaultIfEmpty(defaultValue) : throwIfEmpty(function () { return new EmptyError(); }));
    };
}
//# sourceMappingURL=first.js.map