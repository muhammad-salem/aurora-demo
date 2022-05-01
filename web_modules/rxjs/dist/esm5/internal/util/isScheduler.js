import { isFunction } from './isFunction.js';
export function isScheduler(value) {
    return value && isFunction(value.schedule);
}
//# sourceMappingURL=isScheduler.js.map