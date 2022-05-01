import { scheduled } from '../scheduled/scheduled.js';
import { innerFrom } from './innerFrom.js';
export function from(input, scheduler) {
    return scheduler ? scheduled(input, scheduler) : innerFrom(input);
}
//# sourceMappingURL=from.js.map