import { isFunction } from './isFunction.js';
export function isScheduler(value) {
    return value && isFunction(value.schedule);
}
//# isScheduler.js.map