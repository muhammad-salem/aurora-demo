export type TrackBy<T, R = T> = (index: number, item: T) => R;
export type DiffOptions<T, R = T> = {
    trackBy?: TrackBy<T, R>;
};
/**
 * in memory patch operations
 */
export declare enum PatchOperation {
    ADD = "add",
    REMOVE = "remove",
    MOVE = "move"
}
export type PatchArray<T> = {
    currentIndex: number;
    nextIndex: number;
    op: PatchOperation;
    item: T;
};
export type PatchObject = {
    key: string;
    op: PatchOperation;
};
export type DiffPatch<T> = PatchArray<T> | PatchObject;
export declare class JSONPatch {
    protected diffArray<T, R = T>(input: T[], output: T[], options?: DiffOptions<T, R>): PatchArray<T>[];
    protected diffObject<T = any>(input: T, output: T): PatchObject[];
    diff<T = any>(input: T, output: T): PatchObject[];
    diff<T>(input: T[], output: T[]): PatchArray<T>[];
    diff<T, R>(input: T[], output: T[], options?: DiffOptions<T, R>): PatchArray<T>[];
}
export declare function diff<T = any>(input: T, output: T): PatchObject[];
export declare function diff<T>(input: T[], output: T[]): PatchArray<T>[];
export declare function diff<T, R>(input: T[], output: T[], options?: DiffOptions<T, R>): PatchArray<T>[];
//# sourceMappingURL=diff.d.ts.map