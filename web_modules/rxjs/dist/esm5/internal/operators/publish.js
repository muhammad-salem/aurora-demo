import { Subject } from '../Subject.js';
import { multicast } from './multicast.js';
import { connect } from './connect.js';
export function publish(selector) {
    return selector ? function (source) { return connect(selector)(source); } : function (source) { return multicast(new Subject())(source); };
}
//# sourceMappingURL=publish.js.map