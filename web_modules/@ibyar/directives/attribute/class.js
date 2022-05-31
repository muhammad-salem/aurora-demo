import { __decorate, __metadata } from "../../../tslib/tslib.es6.js";
import { AttributeDirective, Directive, Input } from '../../core/index.js';
let ClassDirective = class ClassDirective extends AttributeDirective {
    constructor() {
        super(...arguments);
        this.updater = this.updateClassList;
    }
    onInit() {
        this.updater = typeof requestAnimationFrame == 'function'
            ? this.requestClassAnimationFrame
            : this.updateClassList;
    }
    set 'class'(className) {
        if (typeof className === 'string') {
            const add = className.split(/[ ]{1,}/);
            this.updater(add);
        }
        else if (Array.isArray(className)) {
            this.updater(className);
        }
        else if (typeof className === 'object') {
            const keys = Object.keys(className);
            const add = keys.filter(key => className[key]);
            const remove = keys.filter(key => !className[key]);
            this.updater(add, remove);
        }
    }
    get 'class'() {
        return this.el.classList.value;
    }
    updateClassList(add, remove) {
        remove && this.el.classList.remove(...remove);
        add && this.el.classList.add(...add);
    }
    requestClassAnimationFrame(add, remove) {
        requestAnimationFrame(() => this.updateClassList(add, remove));
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