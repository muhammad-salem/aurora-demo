import { OnDestroy, OnInit, StructuralDirective, TemplateRef, ViewContainerRef } from '@ibyar/core';
export declare class SwitchView {
    private _viewContainerRef;
    private _templateRef;
    private _created;
    constructor(_viewContainerRef: ViewContainerRef, _templateRef: TemplateRef);
    create(): void;
    destroy(): void;
    enforceState(created: boolean): void;
}
export declare class CaseOfSwitchDirective extends StructuralDirective implements OnInit, OnDestroy {
    private _view;
    host: SwitchDirective;
    private _caseValue;
    case: import("@ibyar/core").InputWithTransform<any, unknown>;
    onInit(): void;
    getCaseValue(): any;
    getView(): SwitchView;
    create(): void;
    onDestroy(): void;
}
export declare class DefaultCaseOfSwitchDirective extends StructuralDirective implements OnInit {
    default: import("@ibyar/core").InputWithoutTransform<unknown>;
    host: SwitchDirective;
    onInit(): void;
}
export declare class SwitchDirective extends StructuralDirective implements OnInit, OnDestroy {
    private _defaultViews;
    private _casesRef;
    private _switchValue;
    private _lastValue;
    private _lastViews;
    switch: import("@ibyar/core").InputWithTransform<any, unknown>;
    onInit(): void;
    onDestroy(): void;
    _addCase(_casesRef: CaseOfSwitchDirective): void;
    _addDefault(view: SwitchView): void;
    _updateView(): void;
}
//# sourceMappingURL=switch.d.ts.map