import { ReplaySubject } from '../ReplaySubject.js';
import { multicast } from './multicast.js';
import { isFunction } from '../util/isFunction.js';
export function publishReplay(bufferSize, windowTime, selectorOrScheduler, timestampProvider) {
    if (selectorOrScheduler && !isFunction(selectorOrScheduler)) {
        timestampProvider = selectorOrScheduler;
    }
    var selector = isFunction(selectorOrScheduler) ? selectorOrScheduler : undefined;
    return function (source) { return multicast(new ReplaySubject(bufferSize, windowTime, timestampProvider), selector)(source); };
}
//# sourceMappingURL=publishReplay.js.map