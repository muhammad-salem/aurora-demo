import { __esDecorate, __runInitializers } from "../../../tslib@2.9.1/tslib.es6.js";
import { Pipe } from '../../core@5.0.1/index.js';
let UpperCasePipe = (() => {
    let _classDecorators = [Pipe({
            name: 'uppercase'
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var UpperCasePipe = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            UpperCasePipe = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        transform(value) {
            if (value == null)
                return null;
            if (typeof value !== 'string') {
                throw Error(`InvalidPipeArgument: '${value}' of '${UpperCasePipe.name}' pipe`);
            }
            return value.toUpperCase();
        }
    };
    return UpperCasePipe = _classThis;
})();
export { UpperCasePipe };
//# sourceMappingURL=upper-case.pipe.js.map