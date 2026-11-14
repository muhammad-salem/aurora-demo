import { __esDecorate, __runInitializers } from "../../../../tslib@2.9.1/tslib.es6.js";
import { Directive, input, StructuralDirective } from '../../../aurora@5.0.1/index.js';
;
let RouterOutlet = (() => {
    let _classDecorators = [Directive({
            selector: '*router-outlet',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = StructuralDirective;
    var RouterOutlet = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            RouterOutlet = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        data = input.required({
            transform: (routeData) => {
                this.viewContainerRef.clear();
                routeData && this.viewContainerRef.createComponent(routeData.selector);
            },
        });
        onDestroy() {
            this.viewContainerRef.clear();
        }
    };
    return RouterOutlet = _classThis;
})();
export { RouterOutlet };
//# sourceMappingURL=router-outlet.js.map