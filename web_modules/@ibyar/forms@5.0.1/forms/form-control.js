import { __esDecorate, __runInitializers } from "../../../tslib@2.9.1/tslib.es6.js";
import { AttributeDirective, Directive } from '../../core@5.0.1/index.js';
export class AbstractControl {
    value;
    disabled;
    validators;
    asyncValidators;
    errors;
    addValidator(validator) {
        this.addValidatorByArray(validator, this.validators ??= []);
    }
    removeValidator(validator) {
        this.removeValidatorByArray(validator, this.validators);
    }
    addAsyncValidator(asyncValidator) {
        this.addValidatorByArray(asyncValidator, this.asyncValidators ??= []);
    }
    removeAsyncValidator(asyncValidator) {
        this.removeValidatorByArray(asyncValidator, this.asyncValidators);
    }
    addValidatorByArray(validator, list) {
        const found = list.some(this.isFound(validator, validator.constructor));
        if (found) {
            return;
        }
        list.push(validator);
    }
    isFound(validator, classConstructor) {
        if (classConstructor) {
            return (v) => v === validator || v instanceof classConstructor;
        }
        return (v) => v === validator;
    }
    removeValidatorByArray(validator, list) {
        if (!Array.isArray(list)) {
            return;
        }
        const index = list.indexOf(validator);
        if (index === -1) {
            return;
        }
        list.splice(index, 1);
    }
}
export class FormControl extends AbstractControl {
    constructor(value, disabled) {
        super();
        this.value = value;
        this.disabled = disabled;
    }
    get valid() {
        throw new Error('Method not implemented.');
    }
    get invalid() {
        throw new Error('Method not implemented.');
    }
    get pristine() {
        throw new Error('Method not implemented.');
    }
    get dirty() {
        throw new Error('Method not implemented.');
    }
    get touched() {
        throw new Error('Method not implemented.');
    }
    get untouched() {
        throw new Error('Method not implemented.');
    }
    updateValue(value) {
        throw new Error('Method not implemented.');
    }
    updateValidity() {
        throw new Error('Method not implemented.');
    }
}
let FormControlDirective = (() => {
    let _classDecorators = [Directive({
            selector: 'formControl'
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AttributeDirective;
    var FormControlDirective = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            FormControlDirective = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return FormControlDirective = _classThis;
})();
export { FormControlDirective };
let FormControlNameDirective = (() => {
    let _classDecorators = [Directive({
            selector: 'formControlName'
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AttributeDirective;
    var FormControlNameDirective = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            FormControlNameDirective = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return FormControlNameDirective = _classThis;
})();
export { FormControlNameDirective };
//# sourceMappingURL=form-control.js.map