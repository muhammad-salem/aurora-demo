import { isValueControl, } from '../component/custom-element.js';
import { baseFactoryView } from './base-view.js';
import { ARIAMixinAttributes, isFormElement } from '../../elements@5.0.1/index.js';
export const NOOP_CONTROL_CHANGE = () => { };
export class NativeElementInternals {
    el;
    constructor(input) {
        this.el = input;
    }
    get form() {
        return this.el.form;
    }
    get labels() {
        return this.el.labels;
    }
    get shadowRoot() {
        return this.el.shadowRoot;
    }
    get willValidate() {
        return this.el.willValidate;
    }
    setFormValue(value, state) {
        this.el.value = value;
    }
}
ARIAMixinAttributes.forEach(ariaName => {
    Object.defineProperty(NativeElementInternals.prototype, ariaName, {
        enumerable: true,
        configurable: true,
        get: function name() {
            return this.el[ariaName];
        },
        set: function name(value) {
            return this.el[ariaName] = value;
        },
    });
});
export function baseFormFactoryView(htmlElementType) {
    const baseViewClass = baseFactoryView(htmlElementType);
    return class BaseFormView extends baseViewClass {
        /**
         * Identify the element as a form-associated custom element
         */
        static formAssociated = true;
        value;
        _internals;
        _form;
        _valueControl;
        constructor(componentRef, modelClass) {
            super(componentRef, modelClass);
            if ((componentRef.extend.name && isFormElement(componentRef.extend.name))
                || componentRef.disabledFeatures?.includes('internals')) {
                this._internals = new NativeElementInternals(this);
            }
            else {
                this._internals = this.attachInternals();
            }
            let valueControl;
            if (typeof componentRef.formAssociated === 'function') {
                if (this._model instanceof componentRef.formAssociated) {
                    valueControl = this._model;
                }
                else {
                    const args = [this]; /* resolve dependency injection*/
                    ;
                    valueControl = new componentRef.formAssociated(args);
                }
            }
            else if (componentRef.formAssociated === true && isValueControl(this._model)) {
                valueControl = this._model;
            }
            valueControl && this.registerValueControl(valueControl);
            const valueInput = componentRef.inputs.filter(input => input.viewAttribute === 'value').at(0);
            if (valueInput) {
                this._modelScope.subscribe(valueInput.modelProperty, (newValue, oldValue) => {
                    if (newValue === oldValue) {
                        return;
                    }
                    this.onValueControlChange(newValue);
                });
            }
        }
        get internals() {
            return this._internals;
        }
        get form() {
            return this._form;
        }
        get valueControl() {
            return this._valueControl;
        }
        registerValueControl(valueControl) {
            if (this.valueControl) {
                this.valueControl.registerOnChange(NOOP_CONTROL_CHANGE);
            }
            this._valueControl = valueControl;
            this._valueControl?.registerOnChange((value) => this.onValueControlChange(value));
        }
        onValueControlChange(value) {
            this._internals.setFormValue(value);
            this.value = value;
            this.dispatchEvent(new Event('change', { bubbles: true, cancelable: true, composed: true }));
        }
        formAssociatedCallback(form) {
            this._form = form;
        }
        formDisabledCallback(disabled) {
            this._valueControl?.setDisabledState?.(disabled);
        }
        formResetCallback() {
            this._valueControl?.writeValue({ mode: 'reset' });
        }
        formStateRestoreCallback(value, mode) {
            this._valueControl?.writeValue({ value, mode });
        }
    };
}
//# sourceMappingURL=form-view.js.map