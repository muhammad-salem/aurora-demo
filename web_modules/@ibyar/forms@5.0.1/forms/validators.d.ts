import type { AbstractControl } from './form-control.js';
/**
 * Defines the map of errors returned from failed validation checks.
 */
export type ValidationErrors = {
    /**
     * Adds a custom error message to the element;
     * if you set a custom error message, the element is considered to be invalid,
     * and the specified error is displayed.
     * This lets you use JavaScript code to establish a validation failure
     * other than those offered by the standard HTML validation constraints.
     * The message is shown to the user when reporting the problem.
     */
    customValidityMessage?: string | null;
    /**
     * any error name that
     */
    [error: string]: any;
};
export interface Validator {
    validate(control: AbstractControl<any>): ValidationErrors | null;
    updateCustomValidityMessage(message?: string | null): void;
}
export interface AsyncValidator {
    validate(control: AbstractControl<any>): Promise<ValidationErrors | null>;
    updateCustomValidityMessage(message?: string | null): void;
}
export declare class RequiredValidator implements Validator {
    private message?;
    constructor(message?: string | null | undefined);
    validate(control: AbstractControl<any>): ValidationErrors | null;
    updateCustomValidityMessage(message?: string | null): void;
}
export declare class RequiredTrueValidator implements Validator {
    private message?;
    constructor(message?: string | null | undefined);
    validate(control: AbstractControl<boolean>): ValidationErrors | null;
    updateCustomValidityMessage(message?: string | null): void;
}
export declare class MinimumValidator implements Validator {
    private min;
    private message?;
    constructor(min: number, message?: string | null | undefined);
    validate(control: AbstractControl<string>): ValidationErrors | null;
    updateCustomValidityMessage(message?: string | null): void;
}
export declare class MaximumValidator implements Validator {
    private max;
    private message?;
    constructor(max: number, message?: string | null | undefined);
    validate(control: AbstractControl<string>): ValidationErrors | null;
    updateCustomValidityMessage(message?: string | null): void;
}
export declare class EmailValidator implements Validator {
    private message?;
    constructor(message?: string | null | undefined);
    validate(control: AbstractControl<string>): ValidationErrors | null;
    updateCustomValidityMessage(message?: string | null): void;
}
export declare class MinLengthValidator implements Validator {
    private minLength;
    private message?;
    constructor(minLength: number, message?: string | null | undefined);
    validate(control: AbstractControl<string>): ValidationErrors | null;
    updateCustomValidityMessage(message?: string | null): void;
}
export declare class MaxLengthValidator implements Validator {
    private maxLength;
    private message?;
    constructor(maxLength: number, message?: string | null | undefined);
    validate(control: AbstractControl<string>): ValidationErrors | null;
    updateCustomValidityMessage(message?: string | null): void;
}
export declare class PatternValidator implements Validator {
    private message?;
    private regex;
    private regexStr;
    constructor(pattern: RegExp | string, message?: string | null | undefined);
    validate(control: AbstractControl<string>): ValidationErrors | null;
    updateCustomValidityMessage(message?: string | null): void;
}
export declare class Validators {
    static required(customValidityMessage?: string): RequiredValidator;
    static requiredTrue(customValidityMessage?: string): RequiredTrueValidator;
    static min(min: number, customValidityMessage?: string): MinimumValidator;
    static max(max: number, customValidityMessage?: string): MaximumValidator;
    static email(customValidityMessage?: string): EmailValidator;
    static minLength(minLength: number, customValidityMessage?: string): MinLengthValidator;
    static maxLength(maxLength: number, customValidityMessage?: string): MaxLengthValidator;
    static pattern(pattern: string | RegExp, customValidityMessage?: string): PatternValidator | null;
}
//# sourceMappingURL=validators.d.ts.map