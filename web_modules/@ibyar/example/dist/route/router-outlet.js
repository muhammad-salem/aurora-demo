import { __decorate, __metadata } from "../../../../tslib/tslib.es6.js";
import { Directive, Input, StructuralDirective } from '../../../aurora/index.js';
;
let RouterOutlet = class RouterOutlet extends StructuralDirective {
    set routeData(routeData) {
        this.viewContainerRef.clear();
        if (!routeData) {
            return;
        }
        this.viewContainerRef.createComponent(routeData.selector);
    }
    onDestroy() {
        this.viewContainerRef.clear();
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], RouterOutlet.prototype, "routeData", null);
RouterOutlet = __decorate([
    Directive({
        selector: '*router-outlet',
    })
], RouterOutlet);
export { RouterOutlet };
//# sourceMappingURL=router-outlet.js.map