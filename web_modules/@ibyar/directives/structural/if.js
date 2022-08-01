import { __decorate, __metadata } from "../../../tslib/tslib.es6.js";
import { Directive, Input, StructuralDirective, TemplateRef } from '../../core/index.js';
let IfThenElseDirective = class IfThenElseDirective extends StructuralDirective {
    constructor() {
        super(...arguments);
        this._thenTemplateRef = this.templateRef;
        this._lastCondition = null;
    }
    set ifCondition(condition) {
        this._condition = condition;
        this._updateUI();
    }
    get ifCondition() {
        return this._condition;
    }
    set thenTemplateRef(template) {
        this._thenTemplateRef = template;
        if (this._condition) {
            // need to force rendering the new template in case of false condition
            this._lastCondition = null;
        }
        this._updateUI();
    }
    get thenTemplateRef() {
        return this._thenTemplateRef;
    }
    set elseTemplateRef(template) {
        this._elseTemplateRef = template;
        if (!this._condition) {
            // need to force rendering the new template in case of false condition
            this._lastCondition = null;
        }
        this._updateUI();
    }
    _updateUI() {
        if (this._condition !== this._lastCondition) {
            this._lastCondition = this._condition;
            this.viewContainerRef.clear();
            if (this._condition) {
                this.viewContainerRef.createEmbeddedView(this._thenTemplateRef);
            }
            else if (this._elseTemplateRef) {
                this.viewContainerRef.createEmbeddedView(this._elseTemplateRef);
            }
        }
    }
    onDestroy() {
        this.viewContainerRef.clear();
    }
};
__decorate([
    Input('if'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], IfThenElseDirective.prototype, "ifCondition", null);
__decorate([
    Input('then'),
    __metadata("design:type", TemplateRef),
    __metadata("design:paramtypes", [TemplateRef])
], IfThenElseDirective.prototype, "thenTemplateRef", null);
__decorate([
    Input('else'),
    __metadata("design:type", TemplateRef),
    __metadata("design:paramtypes", [TemplateRef])
], IfThenElseDirective.prototype, "elseTemplateRef", null);
IfThenElseDirective = __decorate([
    Directive({
        selector: '*if',
    })
], IfThenElseDirective);
export { IfThenElseDirective };
//# sourceMappingURL=if.js.map