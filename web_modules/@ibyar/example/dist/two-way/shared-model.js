import { __esDecorate, __runInitializers } from "../../../../tslib/tslib.es6.js";
import { Component, input } from '../../../aurora/index.js';
let NumberEditor = (() => {
    let _classDecorators = [Component({
            selector: 'number-editor',
            template: `<input type="number" [(value)]="number" />`
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NumberEditor = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            NumberEditor = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        number = input(0);
    };
    return NumberEditor = _classThis;
})();
export { NumberEditor };
let NumberViewer = (() => {
    let _classDecorators = [Component({
            selector: 'number-viewer',
            template: `{{number|>json}}`,
            extend: 'number-editor',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = NumberEditor;
    var NumberViewer = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            NumberViewer = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return NumberViewer = _classThis;
})();
export { NumberViewer };
let EditorApp = (() => {
    let _classDecorators = [Component({
            selector: 'app-edit',
            template: `
	<div>{{ model |> json }}</div>
	<number-viewer [(number)]="model.text"></number-viewer>
	<number-editor id="editor_0" [(number)]="model.text" ></number-editor>
	<number-editor id="editor_1" [(number)]="model.text" *if="+model.text > 30"></number-editor>
	`,
            imports: [NumberEditor, NumberViewer]
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var EditorApp = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            EditorApp = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        model = { text: '25' };
    };
    return EditorApp = _classThis;
})();
export { EditorApp };
//# sourceMappingURL=shared-model.js.map