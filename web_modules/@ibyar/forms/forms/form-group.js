import { __esDecorate, __runInitializers } from "../../../tslib/tslib.es6.js";
import { AttributeDirective, Directive, HostBinding, HostListener, input } from '../../core/index.js';
import { AbstractControl } from './form-control.js';
export class AbstractFormGroup extends AbstractControl {
    controls;
    constructor(controls) {
        super();
        this.controls = controls ?? {};
    }
}
export class FormGroup extends AbstractFormGroup {
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
    get(key) {
        return this.controls[key];
    }
    addControl(name, control) {
        this.controls[name] = control;
    }
    removeControl(name) {
        delete this.controls[name];
    }
    updateValue(value) {
        throw new Error('Method not implemented.');
    }
    updateValidity() {
        throw new Error('Method not implemented.');
    }
}
let FormGroupDirective = (() => {
    let _classDecorators = [Directive({
            selector: 'formGroup'
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AttributeDirective;
    let _instanceExtraInitializers = [];
    let _onSubmit_decorators;
    let _get_valid_decorators;
    var FormGroupDirective = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _onSubmit_decorators = [HostListener('submit', ['$event'])];
            _get_valid_decorators = [HostBinding('class.valid')];
            __esDecorate(this, null, _onSubmit_decorators, { kind: "method", name: "onSubmit", static: false, private: false, access: { has: obj => "onSubmit" in obj, get: obj => obj.onSubmit }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _get_valid_decorators, { kind: "getter", name: "valid", static: false, private: false, access: { has: obj => "valid" in obj, get: obj => obj.valid }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            FormGroupDirective = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        formGroup = (__runInitializers(this, _instanceExtraInitializers), input());
        onInit() {
            this.el.noValidate = true;
            console.log('el', this.el);
            console.log('formGroup', this.formGroup.get());
            const elements = this.el.elements;
            const length = elements.length;
            for (let i = 0; i < length; i++) {
                const element = elements.item(i);
                if (element.type === 'submit' || element.type === 'hidden' || !element.name) {
                    continue;
                }
                const value = this.formGroup.get().controls[element.name].value;
                if (value) {
                    element.value = value;
                }
            }
        }
        onSubmit(event) {
            console.log('directive host listener works');
            console.log('$event', event);
            event.preventDefault();
            const formData = new FormData(event.target);
            const collect = {};
            formData.forEach((value, key) => Reflect.set(collect, key, value));
            console.log('collect', collect);
        }
        get valid() {
            return true;
        }
    };
    return FormGroupDirective = _classThis;
})();
export { FormGroupDirective };
//# sourceMappingURL=form-group.js.map