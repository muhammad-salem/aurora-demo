import { Signal, SignalScope } from '@ibyar/expressions';
import { InjectionToken } from '../di/provider.js';
import { Type } from '../utils/typeof.js';
import { HTMLComponent } from './custom-element.js';
import { OutputEventInit } from '../annotation/options.js';
export interface InputOptions<T, TransformT> {
    alias?: string;
    transform?: (v: TransformT) => T;
}
export type InputOptionsWithoutTransform<T> = Omit<InputOptions<T, T>, 'transform'>;
export type InputOptionsWithTransform<T, TransformT> = Required<Pick<InputOptions<T, TransformT>, 'transform'>> & InputOptions<T, TransformT>;
export interface InputWithTransform<T, TransformT = T> extends Signal<T> {
    options?: InputOptions<T, TransformT>;
}
export interface InputWithoutTransform<T> extends InputWithTransform<T, T> {
    options?: InputOptionsWithoutTransform<T>;
}
export declare class InputSignal<T, TransformT = T> extends Signal<T> implements InputWithoutTransform<T> {
    options?: (InputOptions<T, TransformT> & {
        required?: boolean;
    }) | undefined;
    constructor(scope: SignalScope, index: number, initValue?: T, options?: (InputOptions<T, TransformT> & {
        required?: boolean;
    }) | undefined);
    set(value: T): void;
    set(value: TransformT): void;
}
export declare function isInputSignal<T = any>(signal: any): signal is InputSignal<T>;
export declare function input<T>(): InputWithoutTransform<T>;
export declare function input<T, TransformT = T>(initValue: T, options: InputOptionsWithTransform<T, TransformT>): InputWithTransform<T, TransformT>;
export declare function input<T>(initValue: T, options?: InputOptionsWithoutTransform<T>): InputWithoutTransform<T>;
export declare function input<T, TransformT = T>(initValue?: T, options?: InputOptions<T, TransformT>): InputWithTransform<T, TransformT>;
export declare namespace input {
    var required: typeof requiredInput;
}
declare function requiredInput<T, TransformT = T>(options?: InputOptions<T, TransformT>): InputWithTransform<T, TransformT>;
export declare class FormValueSignal<T> extends Signal<T> {
    options?: {
        required?: boolean;
    } | undefined;
    constructor(scope: SignalScope, index: number, initValue?: T, options?: {
        required?: boolean;
    } | undefined);
}
export declare function formValue<T>(initValue?: T): FormValueSignal<T>;
export declare namespace formValue {
    var required: typeof requiredFormValue;
}
declare function requiredFormValue<T>(): FormValueSignal<T>;
type OutputOption = OutputEventInit & {
    alias?: string;
};
export interface OutputSignal<T> extends Signal<T> {
    set: never;
    update: never;
}
export declare class OutputSignal<T> extends Signal<T> {
    options?: OutputOption | undefined;
    constructor(scope: SignalScope, index: number, options?: OutputOption | undefined);
    emit(value: T): void;
}
export declare function isOutputSignal<T = any>(signal: any): signal is OutputSignal<T>;
export declare function output<T>(options?: OutputOption): OutputSignal<T>;
export declare const VIEW_TOKEN: InjectionToken<HTMLElement>;
export declare function view(): HTMLElement;
export declare function view<T extends keyof HTMLElementTagNameMap>(extend: T): HTMLElementTagNameMap[T];
export declare function view<T>(type: Type<T>): HTMLComponent<T>;
export declare function view<T, V extends keyof HTMLElementTagNameMap>(type: Type<T>, extend: V): HTMLComponent<T> & HTMLElementTagNameMap[V];
export declare class ViewChildSignal<T> extends Signal<T> {
    selector: string | Type<T> | HTMLElement | keyof HTMLElementTagNameMap;
    constructor(scope: SignalScope, index: number, selector: string | Type<T> | HTMLElement | keyof HTMLElementTagNameMap);
}
export declare function isViewChildSignal<T = any>(signal: any): signal is ViewChildSignal<T>;
export declare function viewChild<T extends HTMLElement>(selector: Type<T>): Signal<T>;
export declare function viewChild<T>(selector: Type<T>): Signal<HTMLComponent<T>>;
export declare function viewChild<T extends keyof HTMLElementTagNameMap>(selector: T): Signal<HTMLElementTagNameMap[T]>;
export declare function viewChild<T extends HTMLElement>(templateName: string): Signal<T>;
export {};
//# sourceMappingURL=initializer.d.ts.map