import { ArrayControls, FormArray } from '../forms/form-array.js';
import { FormControl } from '../forms/form-control.js';
import { FormGroup, GroupeControls } from '../forms/form-group.js';
import { ControlOptions, ControlValue } from './types.js';
export declare class FormBuilder {
    control<T>(value?: T | ControlValue<T> | null, options?: ControlOptions): FormControl<T>;
    group<T>(controls: GroupeControls<T>, options?: ControlOptions): FormGroup<T>;
    array<T>(controls: ArrayControls<T>, options?: ControlOptions): FormArray<T>;
    private initValidators;
    private getSafeArrayValue;
}
//# sourceMappingURL=form-builder.d.ts.map