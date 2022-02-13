import { __decorate } from "../../../tslib/tslib.es6.js";
import { Pipe } from '../../core/index.js';
let EveryPipe = class EveryPipe {
    transform(input, predicate) {
        return Array.isArray(input) ? input.every(predicate) : false;
    }
};
EveryPipe = __decorate([
    Pipe({ name: 'every' })
], EveryPipe);
export { EveryPipe };
//# every.pipe.js.map