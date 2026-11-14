import { __esDecorate, __runInitializers } from "../../../../tslib@2.9.1/tslib.es6.js";
import { Component, Directive, input, StructuralDirective } from '../../../aurora@5.0.1/index.js';
let NoteComponent = (() => {
    let _classDecorators = [Component({
            selector: 'note-component',
            template: `<div class="alert alert-success" role="alert">structural directive name: '{{directiveName}}'</div>`
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NoteComponent = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            NoteComponent = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        directiveName = input();
    };
    return NoteComponent = _classThis;
})();
export { NoteComponent };
let AddNoteDirective = (() => {
    let _classDecorators = [Directive({
            selector: '*add-note',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = StructuralDirective;
    var AddNoteDirective = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AddNoteDirective = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        onInit() {
            this.viewContainerRef.createEmbeddedView(this.templateRef);
            const node = this.viewContainerRef.createComponent(NoteComponent).instance;
            node.directiveName.set('*add-note');
        }
        onDestroy() {
            this.viewContainerRef.clear();
        }
    };
    return AddNoteDirective = _classThis;
})();
export { AddNoteDirective };
//# sourceMappingURL=add-note.directive.js.map