import { __esDecorate, __runInitializers } from "../../../../tslib/tslib.es6.js";
import { Component, formValue, HostListener, input } from '../../../aurora/index.js';
let SimpleCustomTextareaComponent = (() => {
    let _classDecorators = [Component({
            selector: 'simple-custom-textarea',
            extend: 'textarea',
            formAssociated: true,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var SimpleCustomTextareaComponent = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            SimpleCustomTextareaComponent = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        text = '';
        _onChange = () => { };
        onInit() {
            setTimeout(() => this.updateTextarea('test textarea'), 2000);
            console.log(this);
        }
        updateTextarea(text) {
            this.text = text;
            this._onChange(text);
        }
        writeValue(opt) {
            this.text = opt.mode !== 'reset' ? opt.value : '';
        }
        registerOnChange(fn) {
            this._onChange = fn;
        }
        onChanges() {
            console.log(JSON.parse(JSON.stringify(this)));
        }
    };
    return SimpleCustomTextareaComponent = _classThis;
})();
export { SimpleCustomTextareaComponent };
let SimpleCustomMessage = (() => {
    let _classDecorators = [Component({
            selector: 'simple-custom-message',
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
    var SimpleCustomMessage = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            SimpleCustomMessage = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        message = formValue('');
        updateMessage() {
            this.message.set('test message');
        }
        onMessageChange(text) {
            console.log('onMessageChange', text);
        }
    };
    return SimpleCustomMessage = _classThis;
})();
export { SimpleCustomMessage };
let SimpleCustomInputElement = (() => {
    let _classDecorators = [Component({
            selector: 'simple-custom-input',
            template: `<input type="number" class="form-control" name="custom-input" [id]="elId" [(value)]="numberValue">`,
            formAssociated: true,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var SimpleCustomInputElement = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            SimpleCustomInputElement = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        elId = input(undefined, { alias: 'id' });
        numberValue = formValue(99);
        onInit() {
            setTimeout(() => this.numberValue.set(666), 3000);
        }
    };
    return SimpleCustomInputElement = _classThis;
})();
export { SimpleCustomInputElement };
let SimpleForm = (() => {
    let _classDecorators = [Component({
            selector: 'simple-custom-form',
            extend: 'form',
            template: `
			<div class="mb-3">
				<label for="test" class="form-label">test</label>
				<input id="test" name="test" type="text" [(value)]="model.test" />
			</div>
			<div class="mb-3">
				<label for="custom-input" class="form-label">Index</label>
				<simple-custom-input id="custom-input" name="index" [(value)]="model.index"></simple-custom-input>
			</div>
			<div class="mb-3">
				<simple-custom-message name="message" [(value)]="model.message"></simple-custom-message>
			</div>
			<div class="mb-3">
				<label for="custom-textarea" class="form-label">Textarea</label>
				<simple-custom-textarea id="custom-textarea" class="form-control" name="textArea" [(value)]="model.textArea"></simple-custom-textarea>
			</div>
			<div class="mb-3">
				<button type="submit" class="btn btn-outline-success m-3">Submit</button>
			</div>
			<div class="mb-3">
				{{data |> json}}
			</div>
	  	`,
            imports: [
                SimpleCustomTextareaComponent,
                SimpleCustomMessage,
                SimpleCustomInputElement
            ]
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _onSubmit_decorators;
    let _onFormData_decorators;
    var SimpleForm = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _onSubmit_decorators = [HostListener('submit', ['$event'])];
            _onFormData_decorators = [HostListener('formdata', ['$event'])];
            __esDecorate(this, null, _onSubmit_decorators, { kind: "method", name: "onSubmit", static: false, private: false, access: { has: obj => "onSubmit" in obj, get: obj => obj.onSubmit }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _onFormData_decorators, { kind: "method", name: "onFormData", static: false, private: false, access: { has: obj => "onFormData" in obj, get: obj => obj.onFormData }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            SimpleForm = _classThis = _classDescriptor.value;
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
    return SimpleForm = _classThis;
})();
export { SimpleForm };
//# sourceMappingURL=simple-form.js.map