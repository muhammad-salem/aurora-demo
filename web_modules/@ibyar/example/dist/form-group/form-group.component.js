import { __esDecorate, __runInitializers } from "../../../../tslib/tslib.es6.js";
import { Component, inject } from '../../../aurora/index.js';
import { FormBuilder, Validators } from '../../../forms/index.js';
let FormGroupComponent = (() => {
    let _classDecorators = [Component({
            selector: 'form-group-component',
            template: `<form [formGroup]="group">
		<label for="name" class="form-label">User name:</label>
		<input id="name" name="name" type="text" class="form-control" autocomplete="off"/>

		<label for="age" class="form-label">User age:</label>
		<input id="age" name="age" type="number" class="form-control"/>


		<button id="submit" class="btn btn-outline-secondary mt-2" type="submit">Submit</button>
	</form>`,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var FormGroupComponent = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            FormGroupComponent = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        _fb = inject(FormBuilder);
        group;
        onInit() {
            this.group = this._fb.group({
                name: this._fb.control('user name', { validators: [Validators.required()] }),
                age: this._fb.control(15),
                parent: this._fb.group({
                    name: this._fb.control('parent name', { validators: [Validators.required()] }),
                    age: this._fb.control(35),
                }),
                friends: this._fb.array([
                    this._fb.group({
                        name: this._fb.control('friend name', { validators: [Validators.required()] }),
                        age: this._fb.control(15),
                    })
                ]),
            });
            console.log('group', this.group);
        }
    };
    return FormGroupComponent = _classThis;
})();
export { FormGroupComponent };
//# sourceMappingURL=form-group.component.js.map