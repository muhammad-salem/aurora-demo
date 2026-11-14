import { __esDecorate, __runInitializers } from "../../../tslib@2.9.1/tslib.es6.js";
import { Injectable } from '../../core@5.0.1/index.js';
import { FormArray } from '../forms/form-array.js';
import { FormControl } from '../forms/form-control.js';
import { FormGroup } from '../forms/form-group.js';
import { isControlValue } from './types.js';
let FormBuilder = (() => {
    let _classDecorators = [Injectable({ provideIn: 'root' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var FormBuilder = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            FormBuilder = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        control(value, options) {
            const { value: controlValue, disabled } = isControlValue(value) ? value : { value, disabled: false };
            const formControl = new FormControl(controlValue, disabled);
            this.initValidators(formControl, options);
            return formControl;
        }
        group(controls, options) {
            const formGroup = new FormGroup(controls);
            this.initValidators(formGroup, options);
            return formGroup;
        }
        array(controls, options) {
            const formArray = new FormArray(controls);
            this.initValidators(formArray, options);
            return formArray;
        }
        initValidators(control, options) {
            if (!options) {
                return;
            }
            const validators = this.getSafeArrayValue(options.validators);
            const asyncValidators = this.getSafeArrayValue(options.asyncValidators);
            validators.forEach(validator => control.addValidator(validator));
            asyncValidators.forEach(validator => control.addAsyncValidator(validator));
        }
        getSafeArrayValue(object) {
            return Array.isArray(object)
                ? object
                : typeof object === 'object' && object !== null ? [object] : [];
        }
    };
    return FormBuilder = _classThis;
})();
export { FormBuilder };
//# sourceMappingURL=form-builder.js.map