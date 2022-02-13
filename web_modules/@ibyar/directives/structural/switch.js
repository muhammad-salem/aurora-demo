import { __decorate, __metadata } from "../../../tslib/tslib.es6.js";
import { Directive, Input, StructuralDirective } from '../../core/index.js';
export class SwitchView {
    constructor(_viewContainerRef, _templateRef) {
        this._viewContainerRef = _viewContainerRef;
        this._templateRef = _templateRef;
        this._created = false;
    }
    create() {
        this._created = true;
        this._viewContainerRef.createEmbeddedView(this._templateRef);
    }
    destroy() {
        this._created = false;
        this._viewContainerRef.clear();
    }
    enforceState(created) {
        if (created && !this._created) {
            this.create();
        }
        else if (!created && this._created) {
            this.destroy();
        }
    }
}
let CaseOfSwitchDirective = class CaseOfSwitchDirective extends StructuralDirective {
    constructor() {
        super(...arguments);
        this._view = new SwitchView(this.viewContainerRef, this.templateRef);
    }
    set caseValue(value) {
        this._caseValue = value;
        this.host._updateView();
    }
    onInit() {
        this.host._addCase(this);
    }
    getCaseValue() {
        return this._caseValue;
    }
    getView() {
        return this._view;
    }
    create() {
        this._view.create();
    }
    onDestroy() {
        this._view.destroy();
    }
};
__decorate([
    Input('case'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], CaseOfSwitchDirective.prototype, "caseValue", null);
CaseOfSwitchDirective = __decorate([
    Directive({
        selector: '*case',
    })
], CaseOfSwitchDirective);
export { CaseOfSwitchDirective };
let DefaultCaseOfSwitchDirective = class DefaultCaseOfSwitchDirective extends StructuralDirective {
    onInit() {
        const defaultView = new SwitchView(this.viewContainerRef, this.templateRef);
        this.host._addDefault(defaultView);
    }
};
__decorate([
    Input('default'),
    __metadata("design:type", Object)
], DefaultCaseOfSwitchDirective.prototype, "defaultCaseValue", void 0);
DefaultCaseOfSwitchDirective = __decorate([
    Directive({
        selector: '*default'
    })
], DefaultCaseOfSwitchDirective);
export { DefaultCaseOfSwitchDirective };
let SwitchDirective = class SwitchDirective extends StructuralDirective {
    constructor() {
        super(...arguments);
        this._defaultViews = [];
        this._casesRef = [];
    }
    onInit() {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
    set switchValue(value) {
        this._switchValue = value;
        this._updateView();
    }
    onDestroy() {
        this._lastViews?.forEach(view => view.destroy());
        this.viewContainerRef.clear();
    }
    _addCase(_casesRef) {
        this._casesRef.push(_casesRef);
        this._updateView();
    }
    _addDefault(view) {
        this._defaultViews.push(view);
        this._updateView();
    }
    _updateView() {
        if (this._lastValue !== this._switchValue) {
            this._lastValue = this._switchValue;
            let views = this._casesRef.filter(caseItem => this._switchValue == caseItem.getCaseValue())
                .map(caseItem => caseItem.getView());
            if (!views.length) {
                views = this._defaultViews;
            }
            if (views.length) {
                if (this._lastViews != views) {
                    this._lastViews?.forEach(view => view.destroy());
                    views.forEach(view => view.create());
                }
                this._lastViews = views;
            }
        }
    }
};
__decorate([
    Input('switch'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], SwitchDirective.prototype, "switchValue", null);
SwitchDirective = __decorate([
    Directive({
        selector: '*switch',
    })
], SwitchDirective);
export { SwitchDirective };
//# switch.js.map