import { __esDecorate, __runInitializers } from "tslib";
import { Directive, input, StructuralDirective } from '@ibyar/core';
let ComponentOutlet = (() => {
    let _classDecorators = [Directive({
            selector: '*component-outlet',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = StructuralDirective;
    var ComponentOutlet = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ComponentOutlet = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        component = input.required({
            transform: (componentType) => {
                this.viewContainerRef.clear();
                componentType && this.viewContainerRef.createComponent(componentType);
            }
        });
        onDestroy() {
            this.viewContainerRef.clear();
        }
    };
    return ComponentOutlet = _classThis;
})();
export { ComponentOutlet };
//# sourceMappingURL=component-outlet%20copy.js.map