import { mergeAll } from '../operators/mergeAll.js';
import { innerFrom } from './innerFrom.js';
import { EMPTY } from './empty.js';
import { popNumber, popScheduler } from '../util/args.js';
import { from } from './from.js';
export function merge() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var scheduler = popScheduler(args);
    var concurrent = popNumber(args, Infinity);
    var sources = args;
    return !sources.length
        ?
            EMPTY
        : sources.length === 1
            ?
                innerFrom(sources[0])
            :
                mergeAll(concurrent)(from(sources, scheduler));
}
//# sourceMappingURL=merge.js.map