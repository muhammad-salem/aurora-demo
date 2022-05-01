import { __decorate } from "../../../tslib/tslib.es6.js";
import { Pipe } from '../../core/index.js';
let ToJSONPipe = class ToJSONPipe {
    transform(text, reviver) {
        return JSON.parse(text, reviver);
    }
};
ToJSONPipe = __decorate([
    Pipe({
        name: 'toJson'
    })
], ToJSONPipe);
export { ToJSONPipe };
//# sourceMappingURL=to-json.pipe.js.map