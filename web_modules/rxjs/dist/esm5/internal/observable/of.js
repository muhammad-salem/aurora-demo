import { popScheduler } from '../util/args.js';
import { from } from './from.js';
export function of() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var scheduler = popScheduler(args);
    return from(args, scheduler);
}
//# sourceMappingURL=of.js.map