import { __esDecorate, __runInitializers } from "../../../tslib@2.9.1/tslib.es6.js";
import { Pipe } from '../../core@5.0.1/index.js';
let KeyValuePipe = (() => {
    let _classDecorators = [Pipe({
            name: 'keyvalue'
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var KeyValuePipe = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            KeyValuePipe = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
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
    return KeyValuePipe = _classThis;
})();
export { KeyValuePipe };
//# sourceMappingURL=key-value.pipe.js.map