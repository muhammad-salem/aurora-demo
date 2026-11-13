import { ReactiveSignal } from '@ibyar/expressions';
import { OutputEventEmitter, OutputEventOptions } from '../component/events.js';
export interface InputOptions<T, TransformT> {
    alias?: string;
    transform?: (v: TransformT) => T;
}
export type InputOptionsWithoutTransform<T> = Omit<InputOptions<T, T>, 'transform'> & {
    transform?: undefined;
};
export type InputOptionsWithTransform<T, TransformT> = Required<Pick<InputOptions<T, TransformT>, 'transform'>> & InputOptions<T, TransformT>;
export interface InputSignalWithTransform<T, TransformT> extends ReactiveSignal<T> {
}
export interface InputSignal<T, TransformT = T> extends InputSignalWithTransform<T, TransformT> {
}
export declare function input<T>(): InputSignal<T>;
export declare function input<T>(initialValue: T, opts?: InputOptionsWithoutTransform<T>): InputSignal<T>;
export declare function input<T, TransformT = T>(initialValue: T, opts: InputOptionsWithTransform<T, TransformT>): InputSignalWithTransform<T, TransformT>;
export declare namespace input {
    var required: {
        <T>(): InputSignal<T>;
        <T>(opts?: InputOptionsWithoutTransform<T>): InputSignal<T>;
        <T, TransformT = T>(opts: InputOptionsWithTransform<T, TransformT>): InputSignalWithTransform<T, TransformT>;
    };
}
export declare function output<T>(opts?: OutputEventOptions): OutputEventEmitter<T>;
//# sourceMappingURL=initializer.d.ts.map