import { __esDecorate, __runInitializers } from "../../../tslib/tslib.es6.js";
import { Directive, input, StructuralDirective } from '../../core/index.js';
export class SwitchView {
    _viewContainerRef;
    _templateRef;
    _created = false;
    constructor(_viewContainerRef, _templateRef) {
        this._viewContainerRef = _viewContainerRef;
        this._templateRef = _templateRef;
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
let CaseOfSwitchDirective = (() => {
    let _classDecorators = [Directive({
            selector: '*case',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = StructuralDirective;
    var CaseOfSwitchDirective = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            CaseOfSwitchDirective = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        _view = new SwitchView(this.viewContainerRef, this.templateRef);
        _caseValue;
        case = input.required({
            transform: value => {
                this._caseValue = value;
                this.host._updateView();
                return this._caseValue;
            }
        });
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
    return CaseOfSwitchDirective = _classThis;
})();
export { CaseOfSwitchDirective };
let DefaultCaseOfSwitchDirective = (() => {
    let _classDecorators = [Directive({
            selector: '*default'
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = StructuralDirective;
    var DefaultCaseOfSwitchDirective = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            DefaultCaseOfSwitchDirective = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        default = input();
        onInit() {
            const defaultView = new SwitchView(this.viewContainerRef, this.templateRef);
            this.host._addDefault(defaultView);
        }
    };
    return DefaultCaseOfSwitchDirective = _classThis;
})();
export { DefaultCaseOfSwitchDirective };
let SwitchDirective = (() => {
    let _classDecorators = [Directive({
            selector: '*switch',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = StructuralDirective;
    var SwitchDirective = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            SwitchDirective = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        _defaultViews = [];
        _casesRef = [];
        _switchValue;
        _lastValue;
        _lastViews;
        switch = input.required({
            transform: value => {
                this._switchValue = value;
                this._updateView();
                return this._switchValue;
            }
        });
        onInit() {
            this.viewContainerRef.createEmbeddedView(this.templateRef);
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
    return SwitchDirective = _classThis;
})();
export { SwitchDirective };
//# sourceMappingURL=switch.js.map