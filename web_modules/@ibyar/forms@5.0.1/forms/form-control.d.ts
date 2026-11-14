import { AttributeDirective } from '@ibyar/core';
import type { AsyncValidator, Validator } from './validators.js';
export declare abstract class AbstractControl<T> {
    value: T | null | undefined;
    disabled: boolean | null | undefined;
    validators?: Validator[] | null;
    asyncValidators?: AsyncValidator[] | null;
    errors?: {
        [key: string]: any;
    } | null;
    abstract get valid(): boolean;
    abstract get invalid(): boolean;
    abstract get pristine(): boolean;
    abstract get dirty(): boolean;
    abstract get touched(): boolean;
    abstract get untouched(): boolean;
    abstract updateValue(value: T | null): void;
    abstract updateValidity(): void;
    addValidator(validator: Validator): void;
    removeValidator(validator: Validator): void;
    addAsyncValidator(asyncValidator: AsyncValidator): void;
    removeAsyncValidator(asyncValidator: AsyncValidator): void;
    private addValidatorByArray;
    private isFound;
    private removeValidatorByArray;
}
export declare class FormControl<T> extends AbstractControl<T> {
    constructor(value?: T | null, disabled?: boolean);
    get valid(): boolean;
    get invalid(): boolean;
    get pristine(): boolean;
    get dirty(): boolean;
    get touched(): boolean;
    get untouched(): boolean;
    updateValue(value: T | null): void;
    updateValidity(): void;
}
export declare class FormControlDirective extends AttributeDirective {
}
export declare class FormControlNameDirective extends AttributeDirective {
}
//# sourceMappingURL=form-control.d.ts.map