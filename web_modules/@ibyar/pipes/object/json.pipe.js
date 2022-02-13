import { __decorate } from "../../../tslib/tslib.es6.js";
import { Pipe } from '../../core/index.js';
let JSONPipe = class JSONPipe {
    transform(obj, replacer, space) {
        return JSON.stringify(obj, replacer, space);
    }
};
JSONPipe = __decorate([
    Pipe({
        name: 'json'
    })
], JSONPipe);
export { JSONPipe };
//# json.pipe.js.map