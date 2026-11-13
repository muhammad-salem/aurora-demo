import { AttributeDirective } from '@ibyar/core';
import { AbstractControl } from './form-control.js';
import { AbstractFormGroup } from './form-group.js';
export type ArrayControlType<T> = T extends {
    [key in keyof T]: any;
} ? AbstractFormGroup<T> : T extends Array<infer A> ? AbstractFormArray<A> : AbstractControl<T>;
export type ArrayControls<T> = Array<ArrayControlType<T>>;
export declare abstract class AbstractFormArray<T> extends AbstractControl<T> {
    protected controls: ArrayControls<T>;
    constructor(controls: ArrayControls<T>);
    abstract at(index: number): ArrayControlType<T> | undefined;
    abstract push(control: ArrayControlType<T>): number;
}
export declare class FormArray<T> extends AbstractFormArray<T> {
    get valid(): boolean;
    get invalid(): boolean;
    get pristine(): boolean;
    get dirty(): boolean;
    get touched(): boolean;
    get untouched(): boolean;
    at(index: number): ArrayControlType<T> | undefined;
    push(control: ArrayControlType<T>): number;
    updateValue(value: T | null): void;
    updateValidity(): void;
}
export declare class FormArrayDirective extends AttributeDirective {
}
export declare class FormArrayNameDirective extends AttributeDirective {
}
//# sourceMappingURL=form-array.d.ts.map