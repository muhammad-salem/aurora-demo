import { __decorate } from "../../../tslib/tslib.es6.js";
import { Pipe } from '../../core/index.js';
let KeyValuePipe = class KeyValuePipe {
    transform(obj, compareFn) {
        let pair = [];
        if (obj instanceof Map) {
            obj.forEach((value, key) => pair.push({ key: key, value: value }));
        }
        else if (obj instanceof Array) {
            obj.forEach((value, index) => pair.push({ key: index, value: value }));
        }
        else {
            Object.keys(obj).forEach(key => pair.push({ key: key, value: Reflect.get(obj, key) }));
        }
        if (compareFn) {
            pair = pair.sort(compareFn);
        }
        return pair;
    }
};
KeyValuePipe = __decorate([
    Pipe({
        name: 'keyvalue'
    })
], KeyValuePipe);
export { KeyValuePipe };
//# sourceMappingURL=key-value.pipe.js.map