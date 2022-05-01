import { dateTimestampProvider } from '../scheduler/dateTimestampProvider.js';
import { map } from './map.js';
export function timestamp(timestampProvider) {
    if (timestampProvider === void 0) { timestampProvider = dateTimestampProvider; }
    return map(function (value) { return ({ value: value, timestamp: timestampProvider.now() }); });
}
//# sourceMappingURL=timestamp.js.map