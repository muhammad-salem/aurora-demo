import { __esDecorate, __runInitializers } from "../../../tslib/tslib.es6.js";
import { Component, Directive, input, StructuralDirective, viewChild } from '../../core/index.js';
let LazyHiddenViewComponent = (() => {
    let _classDecorators = [Component({
            selector: 'lazy-hidden-view',
            template: `<div #hidden style="display: none"><div></div></div>`
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var LazyHiddenViewComponent = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            LazyHiddenViewComponent = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        hidden = viewChild('hidden');
        hide(nativeElement) {
            const div = this.hidden.get();
            if (div.moveBefore && div.lastChild) {
                div.moveBefore(nativeElement, div.lastChild);
            }
            else if (div.lastChild) {
                div.lastChild.before(nativeElement);
            }
        }
    };
    return LazyHiddenViewComponent = _classThis;
})();
export { LazyHiddenViewComponent };
let LazyOutletComponent = (() => {
    let _classDecorators = [Directive({
            selector: '*lazy-outlet',
            imports: [LazyHiddenViewComponent]
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = StructuralDirective;
    var LazyOutletComponent = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            LazyOutletComponent = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        viewRef = new Map();
        hiddenView = this.viewContainerRef.createComponent(LazyHiddenViewComponent);
        currentType;
        component = input.required({
            transform: (componentType) => {
                if (componentType === this.currentType) {
                    return;
                }
                const ref = this.viewRef.get(this.currentType);
                if (ref) {
                    const index = this.viewContainerRef.indexOf(ref.viewRef);
                    this.viewContainerRef.remove(index, false);
                    this.hiddenView.instance.hide(ref.nativeElement);
                }
                if (this.viewRef.has(componentType) && componentType) {
                    const oldView = this.viewRef.get(componentType);
                    this.viewContainerRef.adopt(oldView.viewRef);
                    this.currentType = componentType;
                }
                else if (componentType) {
                    const newRef = this.viewContainerRef.createComponent(componentType);
                    this.viewRef.set(componentType, newRef);
                    this.currentType = componentType;
                }
                else {
                    this.currentType = undefined;
                }
            }
        });
        onDestroy() {
            this.viewContainerRef.clear();
        }
    };
    return LazyOutletComponent = _classThis;
})();
export { LazyOutletComponent };
//# sourceMappingURL=lazy-outlet.js.map