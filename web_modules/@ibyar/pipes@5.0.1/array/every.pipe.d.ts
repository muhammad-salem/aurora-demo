import { PipeTransform } from '@ibyar/core';
export declare class EveryPipe<T> implements PipeTransform<Array<T>, boolean> {
    transform(input: Array<T>, predicate: (value: T, index: number, array: T[]) => unknown): boolean;
}
//# sourceMappingURL=every.pipe.d.ts.map