import { __esDecorate, __runInitializers } from "../../../tslib@2.9.1/tslib.es6.js";
import { Pipe } from '../../core@5.0.1/index.js';
let ChunkPipe = (() => {
    let _classDecorators = [Pipe({ name: 'chunk' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ChunkPipe = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ChunkPipe = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        transform(input, size) {
            if (input === undefined || input === null)
                return input;
            if (typeof input === 'string') {
                return this.chunk(input.split(''), size);
            }
            return Array.isArray(input) ? this.chunk(input, size) : input;
        }
        chunk(input, size) {
            return Array(Math.ceil(input.length / size))
                .fill([])
                .map((_, index) => index * size)
                .map(begin => input.slice(begin, begin + size));
        }
    };
    return ChunkPipe = _classThis;
})();
export { ChunkPipe };
//# sourceMappingURL=chunk.pipe.js.map