import { OnDestroy, StructuralDirective } from '@ibyar/core';
import { TrackBy } from '@ibyar/platform';
export declare class ForContext<T> {
    $implicit: T;
    index: number;
    count: number;
    constructor($implicit: T, index: number, count: number);
    get first(): boolean;
    get last(): boolean;
    get even(): boolean;
    get odd(): boolean;
    update<P extends ForContext<T>>(forContext: Partial<P>): void;
}
export declare class ForOfContext<T> extends ForContext<T> {
    ['of']: T[];
    constructor($implicit: T, forOf: T[], index: number, count: number);
}
export declare class ForInContext<T> extends ForContext<T> {
    ['in']: T[];
    constructor($implicit: T, forIn: T[], index: number, count: number);
}
export declare abstract class AbstractForDirective<T> extends StructuralDirective implements OnDestroy {
    protected _forOf: T[] | null | undefined;
    protected _forTrackBy: TrackBy<T, any>;
    private _$implicitTrackBy;
    protected _updateUI(): void;
    onDestroy(): void;
}
export declare class ForDirective<T> extends AbstractForDirective<T> {
    of: import("@ibyar/core").InputWithTransform<T[] | null | undefined, T[] | null | undefined>;
    trackBy: import("@ibyar/core").InputWithTransform<TrackBy<T, any> | null | undefined, TrackBy<T, any>>;
}
export declare class ForOfDirective<T> extends AbstractForDirective<T> {
    of: import("@ibyar/core").InputWithTransform<T[] | null | undefined, T[] | null | undefined>;
    trackBy: import("@ibyar/core").InputWithTransform<TrackBy<T, any> | null | undefined, TrackBy<T, any>>;
}
export declare class ForAwaitDirective<T> extends StructuralDirective implements OnDestroy {
    private _forAwait;
    of: import("@ibyar/core").InputWithTransform<AsyncIterable<T> | null | undefined, AsyncIterable<T> | null | undefined>;
    private _updateUI;
    onDestroy(): void;
}
export declare class ForInDirective<T = {
    [key: PropertyKey]: any;
}> extends StructuralDirective implements OnDestroy {
    private _forIn;
    in: import("@ibyar/core").InputWithTransform<T | null | undefined, T | null | undefined>;
    private _updateUI;
    onDestroy(): void;
}
//# sourceMappingURL=for.d.ts.map