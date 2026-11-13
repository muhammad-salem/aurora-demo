import { __esDecorate, __runInitializers } from "../../../tslib/tslib.es6.js";
import { Pipe } from '../../core/index.js';
let DiffPipe = (() => {
    let _classDecorators = [Pipe({ name: 'diff' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var DiffPipe = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            DiffPipe = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        transform(input, ...diffArrays) {
            if (!Array.isArray(input)) {
                return input;
            }
            return diffArrays.reduce((d, c) => d.filter(e => !~c.indexOf(e)), input);
        }
    };
    return DiffPipe = _classThis;
})();
export { DiffPipe };
//# sourceMappingURL=diff.pipe.js.map