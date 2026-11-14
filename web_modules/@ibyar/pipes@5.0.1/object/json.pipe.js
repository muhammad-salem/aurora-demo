import { __esDecorate, __runInitializers } from "../../../tslib@2.9.1/tslib.es6.js";
import { Pipe } from '../../core@5.0.1/index.js';
let JSONPipe = (() => {
    let _classDecorators = [Pipe({
            name: 'json'
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var JSONPipe = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            JSONPipe = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        transform(obj, replacer, space) {
            return JSON.stringify(obj, replacer, space);
        }
    };
    return JSONPipe = _classThis;
})();
export { JSONPipe };
//# sourceMappingURL=json.pipe.js.map