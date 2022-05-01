import { concatAll } from '../operators/concatAll.js';
import { popScheduler } from '../util/args.js';
import { from } from './from.js';
export function concat() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return concatAll()(from(args, popScheduler(args)));
}
//# sourceMappingURL=concat.js.map