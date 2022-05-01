import { __decorate } from "../../../tslib/tslib.es6.js";
import { Pipe } from '../../core/index.js';
let ChunkPipe = class ChunkPipe {
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
ChunkPipe = __decorate([
    Pipe({ name: 'chunk' })
], ChunkPipe);
export { ChunkPipe };
//# sourceMappingURL=chunk.pipe.js.map