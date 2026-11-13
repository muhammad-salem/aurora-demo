import { __esDecorate, __runInitializers } from "../../../../tslib/tslib.es6.js";
import { Component, HostBinding, HostListener } from '../../../aurora/index.js';
let HostColorPickerComponent = (() => {
    let _classDecorators = [Component({
            selector: 'host-color',
            extend: 'div',
            disabledFeatures: ['internals', 'shadow'],
            template: `
	<div>Click on color name, to change host: background color</div>
	<div *for="let color of colors" data-color="{{color}}">
		{{color}}
	</div>
	<div>Current Color: {{ selectedColor || 'nothing'}}.</div>`
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _selectedColor_decorators;
    let _selectedColor_initializers = [];
    let _selectedColor_extraInitializers = [];
    let _onHostClick_decorators;
    var HostColorPickerComponent = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _selectedColor_decorators = [HostBinding('style.background-color')];
            _onHostClick_decorators = [HostListener('click', '$event')];
            __esDecorate(this, null, _onHostClick_decorators, { kind: "method", name: "onHostClick", static: false, private: false, access: { has: obj => "onHostClick" in obj, get: obj => obj.onHostClick }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, null, _selectedColor_decorators, { kind: "field", name: "selectedColor", static: false, private: false, access: { has: obj => "selectedColor" in obj, get: obj => obj.selectedColor, set: (obj, value) => { obj.selectedColor = value; } }, metadata: _metadata }, _selectedColor_initializers, _selectedColor_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            HostColorPickerComponent = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        colors = (__runInitializers(this, _instanceExtraInitializers), [
            'red',
            'blue',
            'green',
            'yellow',
            'purple',
            'fuchsia',
            'lime',
            'teal',
            'aqua',
            'gray',
            'silver',
            'black',
            'white'
        ]);
        selectedColor = __runInitializers(this, _selectedColor_initializers, '');
        onHostClick(event) {
            const element = event.target;
            this.selectedColor = element.dataset.color || '';
        }
        constructor() {
            __runInitializers(this, _selectedColor_extraInitializers);
        }
    };
    return HostColorPickerComponent = _classThis;
})();
export { HostColorPickerComponent };
//# sourceMappingURL=host-color.component.js.map