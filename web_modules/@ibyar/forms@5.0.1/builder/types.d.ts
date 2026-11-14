import { AsyncValidator, Validator } from '../forms/validators.js';
export type ControlOptions = {
    validators?: Validator | Validator[];
    asyncValidators?: AsyncValidator | AsyncValidator[];
};
export type ControlValue<T = any> = {
    value?: T | null;
    disabled: boolean;
};
export declare function isControlValue<T>(ref: any): ref is ControlValue<T>;
//# sourceMappingURL=types.d.ts.map