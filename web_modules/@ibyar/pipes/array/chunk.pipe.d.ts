import { PipeTransform } from '@ibyar/core';
export declare class ChunkPipe<T> implements PipeTransform<Array<T>, (T | string)[][]> {
    transform(input: Array<T> | string | null | undefined, size: number): (T | string)[][];
    private chunk;
}
//# sourceMappingURL=chunk.pipe.d.ts.map