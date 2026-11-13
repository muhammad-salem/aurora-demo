import { PipeTransform } from '@ibyar/core';
export declare class DiffPipe<T> implements PipeTransform<Array<T>, Array<T>> {
    transform(input: Array<T>, ...diffArrays: Array<T>[]): Array<T>;
}
//# sourceMappingURL=diff.pipe.d.ts.map