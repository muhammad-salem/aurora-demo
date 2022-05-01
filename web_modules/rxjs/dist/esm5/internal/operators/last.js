import { EmptyError } from '../util/EmptyError.js';
import { filter } from './filter.js';
import { takeLast } from './takeLast.js';
import { throwIfEmpty } from './throwIfEmpty.js';
import { defaultIfEmpty } from './defaultIfEmpty.js';
import { identity } from '../util/identity.js';
export function last(predicate, defaultValue) {
    var hasDefaultValue = arguments.length >= 2;
    return function (source) {
        return source.pipe(predicate ? filter(function (v, i) { return predicate(v, i, source); }) : identity, takeLast(1), hasDefaultValue ? defaultIfEmpty(defaultValue) : throwIfEmpty(function () { return new EmptyError(); }));
    };
}
//# sourceMappingURL=last.js.map