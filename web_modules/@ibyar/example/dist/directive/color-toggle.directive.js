import { __esDecorate, __runInitializers } from "../../../../tslib/tslib.es6.js";
import { Directive, HostListener, AttributeDirective } from '../../../aurora/index.js';
let ColorTogglerDirective = (() => {
    let _classDecorators = [Directive({
            selector: 'color-toggle',
            exportAs: 'colorToggle'
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AttributeDirective;
    let _instanceExtraInitializers = [];
    let _onMouseOver_decorators;
    let _onMouseLeave_decorators;
    var ColorTogglerDirective = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _onMouseOver_decorators = [HostListener('mouseover')];
            _onMouseLeave_decorators = [HostListener('mouseleave')];
            __esDecorate(this, null, _onMouseOver_decorators, { kind: "method", name: "onMouseOver", static: false, private: false, access: { has: obj => "onMouseOver" in obj, get: obj => obj.onMouseOver }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _onMouseLeave_decorators, { kind: "method", name: "onMouseLeave", static: false, private: false, access: { has: obj => "onMouseLeave" in obj, get: obj => obj.onMouseLeave }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ColorTogglerDirective = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        onMouseOver() {
            this.toggleColor();
        }
        onMouseLeave() {
            this.toggleColor();
        }
        toggleColor() {
            let color = this.el.style.color;
            let colorToSet = (color == 'red') ? 'black' : 'red';
            this.el.style.color = colorToSet;
        }
        constructor() {
            super(...arguments);
            __runInitializers(this, _instanceExtraInitializers);
        }
    };
    return ColorTogglerDirective = _classThis;
})();
export { ColorTogglerDirective };
//# sourceMappingURL=color-toggle.directive.js.map