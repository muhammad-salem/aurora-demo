import { __decorate, __metadata } from "../../../../tslib/tslib.es6.js";
import { Directive, Input, StructuralDirective } from '../../../aurora/index.js';
let ComponentOutlet = class ComponentOutlet extends StructuralDirective {
    set component(componentType) {
        this.viewContainerRef.clear();
        if (!componentType) {
            return;
        }
        this.viewContainerRef.createComponent(componentType);
    }
    onDestroy() {
        this.viewContainerRef.clear();
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], ComponentOutlet.prototype, "component", null);
ComponentOutlet = __decorate([
    Directive({
        selector: '*component-outlet',
    })
], ComponentOutlet);
export { ComponentOutlet };
//# sourceMappingURL=component-outlet.js.map