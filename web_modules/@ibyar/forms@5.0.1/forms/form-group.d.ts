import { AttributeDirective, OnInit } from '@ibyar/core';
import { AbstractControl } from './form-control.js';
import { AbstractFormArray } from './form-array.js';
export type GroupControlType<T, K extends keyof T> = T[K] extends Array<infer A> ? AbstractFormArray<A> : T[K] extends {
    [key in K]: infer G;
} ? AbstractFormGroup<G> : AbstractControl<T[K]>;
export type GroupeControls<T> = {
    [K in keyof T]: GroupControlType<T, K>;
};
export declare abstract class AbstractFormGroup<T> extends AbstractControl<T> {
    controls: GroupeControls<T>;
    constructor(controls?: GroupeControls<T>);
    abstract get<K extends keyof T>(name: K): GroupControlType<T, K> | undefined;
    abstract addControl<K extends keyof T>(name: K, control: GroupControlType<T, K>): void;
    abstract removeControl<K extends keyof T>(name: K): void;
}
export declare class FormGroup<T> extends AbstractFormGroup<T> {
    get valid(): boolean;
    get invalid(): boolean;
    get pristine(): boolean;
    get dirty(): boolean;
    get touched(): boolean;
    get untouched(): boolean;
    get<K extends keyof T>(key: K): GroupControlType<T, K> | undefined;
    addControl<K extends keyof T>(name: K, control: GroupControlType<T, K>): void;
    removeControl<K extends keyof T>(name: K): void;
    updateValue(value: T | null): void;
    updateValidity(): void;
}
export declare class FormGroupDirective<T> extends AttributeDirective implements OnInit {
    protected el: HTMLFormElement;
    formGroup: import("@ibyar/core").InputWithoutTransform<FormGroup<T>>;
    onInit(): void;
    onSubmit(event: Event): void;
    get valid(): boolean;
}
//# sourceMappingURL=form-group.d.ts.map