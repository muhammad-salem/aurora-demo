import { __decorate, __metadata } from "../../../tslib/tslib.es6.js";
import { AttributeDirective, Directive, Input } from '../../core/index.js';
let ClassDirective = class ClassDirective extends AttributeDirective {
    set 'class'(className) {
        if (typeof className === 'string') {
            this.el.classList.add(...className.split(' '));
        }
        else if (Array.isArray(className)) {
            this.el.classList.add(...className);
        }
        else if (typeof className === 'object') {
            for (var name in className) {
                if (className[name]) {
                    this.el.classList.add(name);
                }
                else {
                    this.el.classList.remove(name);
                }
            }
        }
    }
    get 'class'() {
        return this.el.classList.value;
    }
};
__decorate([
    Input('class'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], ClassDirective.prototype, "class", null);
ClassDirective = __decorate([
    Directive({
        selector: 'class'
    })
], ClassDirective);
export { ClassDirective };
//# sourceMappingURL=class.js.map