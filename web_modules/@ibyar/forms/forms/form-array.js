import { __esDecorate, __runInitializers } from "../../../tslib/tslib.es6.js";
import { AttributeDirective, Directive } from '../../core/index.js';
import { AbstractControl } from './form-control.js';
export class AbstractFormArray extends AbstractControl {
    controls;
    constructor(controls) {
        super();
        this.controls = controls ?? [];
    }
}
export class FormArray extends AbstractFormArray {
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
    at(index) {
        return this.controls.at(index);
    }
    push(control) {
        return this.controls.push(control);
    }
    updateValue(value) {
        throw new Error('Method not implemented.');
    }
    updateValidity() {
        throw new Error('Method not implemented.');
    }
}
let FormArrayDirective = (() => {
    let _classDecorators = [Directive({
            selector: 'formArray'
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AttributeDirective;
    var FormArrayDirective = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            FormArrayDirective = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return FormArrayDirective = _classThis;
})();
export { FormArrayDirective };
let FormArrayNameDirective = (() => {
    let _classDecorators = [Directive({
            selector: 'formArrayName'
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AttributeDirective;
    var FormArrayNameDirective = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            FormArrayNameDirective = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return FormArrayNameDirective = _classThis;
})();
export { FormArrayNameDirective };
//# sourceMappingURL=form-array.js.map