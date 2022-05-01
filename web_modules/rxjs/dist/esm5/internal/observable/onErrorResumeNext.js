import { EMPTY } from './empty.js';
import { onErrorResumeNext as onErrorResumeNextWith } from '../operators/onErrorResumeNext.js';
import { argsOrArgArray } from '../util/argsOrArgArray.js';
export function onErrorResumeNext() {
    var sources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        sources[_i] = arguments[_i];
    }
    return onErrorResumeNextWith(argsOrArgArray(sources))(EMPTY);
}
//# sourceMappingURL=onErrorResumeNext.js.map