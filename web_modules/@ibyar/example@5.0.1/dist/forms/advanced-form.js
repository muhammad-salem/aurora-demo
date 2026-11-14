import { __esDecorate, __runInitializers } from "../../../../tslib@2.9.1/tslib.es6.js";
import { Component, formValue, HostListener, input } from '../../../aurora@5.0.1/index.js';
let CustomTextareaComponent = (() => {
    let _classDecorators = [Component({
            selector: 'custom-textarea',
            extend: 'textarea',
            formAssociated: true,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var CustomTextareaComponent = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            CustomTextareaComponent = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        text = '';
        disabled = false;
        _onChange = () => { };
        onInit() {
            setTimeout(() => this.updateTextarea('test textarea'), 2000);
        }
        writeValue({ value, mode }) {
            this.text = mode !== 'reset' ? value : '';
            console.log('textarea write value', value, 'and mode', mode);
        }
        registerOnChange(fn) {
            this._onChange = fn;
        }
        setDisabledState(isDisabled) {
            this.disabled = isDisabled;
            console.log('textarea disable change', isDisabled);
        }
        onTextareaChange(text) {
            this._onChange(text);
            console.log('textarea value change', text);
        }
        updateTextarea(text) {
            this.text = text;
            this.onTextareaChange(text);
        }
    };
    return CustomTextareaComponent = _classThis;
})();
export { CustomTextareaComponent };
let CustomMessage = (() => {
    let _classDecorators = [Component({
            selector: 'custom-message',
            template: `
			<label for="message" class="form-label">Message</label>
			<textarea class="form-control"
				id="message"
				name="message-textarea"
				rows="3"
				[(value)]="message" 
				[disabled]="disabled" 
				(change)="onMessageChange($event.target.value)">
			</textarea>
			<button type="button" class="btn btn-outline-primary m-3" (click)="updateMessage()">Update Message</button>
	  	`,
            formAssociated: true,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var CustomMessage = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            CustomMessage = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        message = formValue('');
        disabled = false;
        _onChange = () => { };
        writeValue({ value, mode }) {
            this.message.set(mode !== 'reset' ? value : '');
            console.log('message write value', value, 'and mode', mode);
        }
        registerOnChange(fn) {
            this._onChange = fn;
        }
        setDisabledState(isDisabled) {
            this.disabled = isDisabled;
            console.log('message disable change', isDisabled);
        }
        onMessageChange(message) {
            this._onChange(message);
            console.log('message value change', message);
        }
        updateMessage() {
            this.message.set('test message');
            this.onMessageChange(this.message.get());
        }
    };
    return CustomMessage = _classThis;
})();
export { CustomMessage };
export class CustomInputValueControl {
    _value = null;
    _disabled = false;
    _onChange = () => { };
    constructor() {
        setTimeout(() => {
            this._value = 666;
            this._onChange(this._value);
        }, 3000);
    }
    writeValue({ value, mode }) {
        this._value = mode !== 'reset' ? value : null;
        console.log('control write value', value, 'and mode', mode);
    }
    registerOnChange(fn) {
        this._onChange = fn;
    }
    setDisabledState(isDisabled) {
        this._disabled = isDisabled;
        console.log('control disabled state', isDisabled);
    }
}
let CustomInputElement = (() => {
    let _classDecorators = [Component({
            selector: 'custom-input',
            template: `<input type="number" class="form-control" name="custom-input" [id]="elId" [(value)]="numberValue">`,
            formAssociated: CustomInputValueControl,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var CustomInputElement = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            CustomInputElement = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        elId = input(undefined, { alias: 'id' });
        numberValue = formValue(99);
    };
    return CustomInputElement = _classThis;
})();
export { CustomInputElement };
let AdvancedForm = (() => {
    let _classDecorators = [Component({
            selector: 'custom-form',
            extend: 'form',
            template: `
			<div class="mb-3">
				<label for="test" class="form-label">test</label>
				<input id="test" name="test" type="text" [(value)]="model.test" />
			</div>
			<div class="mb-3">
				<label for="custom-input" class="form-label">Index</label>
				<custom-input id="custom-input" name="index" [(value)]="model.index"></custom-input>
			</div>
			<div class="mb-3">
				<custom-message name="message" [(value)]="model.message"></custom-message>
			</div>
			<div class="mb-3">
				<label for="custom-textarea" class="form-label">Textarea</label>
				<custom-textarea id="custom-textarea" class="form-control" name="textArea" [(value)]="model.textArea"></custom-textarea>
			</div>
			<div class="mb-3">
				<button type="submit" class="btn btn-outline-success m-3">Submit</button>
			</div>
			<div class="mb-3">
				{{data |> json}}
			</div>
	  	`,
            imports: [
                CustomTextareaComponent,
                CustomMessage,
                CustomInputElement
            ]
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _onSubmit_decorators;
    let _onFormData_decorators;
    var AdvancedForm = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _onSubmit_decorators = [HostListener('submit', ['$event'])];
            _onFormData_decorators = [HostListener('formdata', ['$event'])];
            __esDecorate(this, null, _onSubmit_decorators, { kind: "method", name: "onSubmit", static: false, private: false, access: { has: obj => "onSubmit" in obj, get: obj => obj.onSubmit }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _onFormData_decorators, { kind: "method", name: "onFormData", static: false, private: false, access: { has: obj => "onFormData" in obj, get: obj => obj.onFormData }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AdvancedForm = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        model = (__runInitializers(this, _instanceExtraInitializers), {
            test: 'test',
            index: 5,
            message: 'default message',
            textArea: 'default textarea',
        });
        data = {};
        onSubmit(event) {
            event.preventDefault();
            console.log('$event', event);
            const formData = new FormData(event.target);
            const collect = {};
            formData.forEach((value, key) => Reflect.set(collect, key, value));
            this.data = collect;
            console.log('data', this.data);
        }
        onFormData(event) {
            console.log('formData', event.formData);
            event.formData.forEach((value, key) => console.log('key', key, 'value', value));
        }
    };
    return AdvancedForm = _classThis;
})();
export { AdvancedForm };
//# sourceMappingURL=advanced-form.js.map