import { PipeTransform } from '@ibyar/core';
type StringKey<V> = {
    [key: string]: V;
};
type NumberKey<V> = {
    [key: number]: V;
};
export interface KeyValue<K, V> {
    key: K;
    value: V;
}
export type CompareFn<K, V> = (a: KeyValue<K, V>, b: KeyValue<K, V>) => number;
export declare class KeyValuePipe<K, V> implements PipeTransform<StringKey<V> | NumberKey<V> | Map<K, V>, KeyValue<K, V>[]> {
    transform(obj: StringKey<V> | NumberKey<V> | Map<K, V> | Array<V>, compareFn?: CompareFn<K, V>): KeyValue<K, V>[];
}
export {};
//# sourceMappingURL=key-value.pipe.d.ts.map