import { baseFactoryView } from './base-view.js';
export function baseFormFactoryView(htmlElementType) {
    const baseViewClass = baseFactoryView(htmlElementType);
    class BaseFormView extends baseViewClass {
        // private internals_: ElementInternals;
        constructor(componentRef, modelClass) {
            super(componentRef, modelClass);
            // this.internals_ = this.attachInternals();
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
        // get form() { return this.internals_.form; }
        // get name() { return this.getAttribute('name'); }
        // get type() { return this.localName; }
        // get validity() { return this.internals_.validity; }
        // get validationMessage() { return this.internals_.validationMessage; }
        // get willValidate() { return this.internals_.willValidate; }
        // checkValidity() { return this.internals_.checkValidity(); }
        // reportValidity() { return this.internals_.reportValidity(); }
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
            // if (!this.value) {
            //     this.internals.setValidity({
            //         valueMissing: true
            //     }, 'This field is required');
            // } else {
            //     this.internals.setValidity({
            //         valueMissing: false
            //     });
            // }
        }
        get required() {
            return this._required;
        }
        set value(value) {
            this._value = value;
            // this.internals.setFormValue(value);
        }
        get value() {
            return this._value;
        }
    }
    // Identify the element as a form-associated custom element
    BaseFormView.formAssociated = true;
    return BaseFormView;
}
//# sourceMappingURL=form-view.js.map