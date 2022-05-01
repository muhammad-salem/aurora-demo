import { baseFactoryView } from './base-view.js';
export function baseFormFactoryView(htmlElementType) {
    const baseViewClass = baseFactoryView(htmlElementType);
    class BaseFormView extends baseViewClass {
        constructor(componentRef, modelClass) {
            super(componentRef, modelClass);
        }
        formAssociatedCallback(form) {
            throw new Error('Method not implemented.');
        }
        formDisabledCallback(disabled) {
            throw new Error('Method not implemented.');
        }
        formResetCallback() {
            throw new Error('Method not implemented.');
        }
        formStateRestoreCallback(value, mode) {
            throw new Error('Method not implemented.');
        }
        set disabled(disabled) {
            this._disabled = disabled;
            this.toggleAttribute('disabled', disabled);
        }
        get disabled() {
            return this._disabled;
        }
        set required(required) {
            this._required = required;
            this.toggleAttribute('required', required);
        }
        get required() {
            return this._required;
        }
        set value(value) {
            this._value = value;
        }
        get value() {
            return this._value;
        }
    }
    BaseFormView.formAssociated = true;
    return BaseFormView;
}
//# sourceMappingURL=form-view.js.map