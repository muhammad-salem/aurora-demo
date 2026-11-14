import { __esDecorate, __runInitializers } from "../../../tslib@2.9.1/tslib.es6.js";
import { Pipe } from '../../core@5.0.1/index.js';
let EveryPipe = (() => {
    let _classDecorators = [Pipe({ name: 'every' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var EveryPipe = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            EveryPipe = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        transform(input, predicate) {
            return Array.isArray(input) ? input.every(predicate) : false;
        }
    };
    return EveryPipe = _classThis;
})();
export { EveryPipe };
//# sourceMappingURL=every.pipe.js.map