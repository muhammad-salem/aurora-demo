import { from } from './from.js';
export function pairs(obj, scheduler) {
    return from(Object.entries(obj), scheduler);
}
//# pairs.js.map