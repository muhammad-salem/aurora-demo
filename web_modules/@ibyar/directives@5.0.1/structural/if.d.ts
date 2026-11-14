import { OnDestroy, StructuralDirective, TemplateRef } from '@ibyar/core';
export declare class IfThenElseDirective extends StructuralDirective implements OnDestroy {
    _condition: boolean;
    private _thenTemplateRef;
    private _elseTemplateRef?;
    private _lastCondition;
    if: import("@ibyar/core").InputWithTransform<boolean, boolean>;
    then: import("@ibyar/core").InputWithTransform<TemplateRef, TemplateRef>;
    else: import("@ibyar/core").InputWithTransform<TemplateRef, TemplateRef>;
    protected _updateUI(): void;
    onDestroy(): void;
}
//# sourceMappingURL=if.d.ts.map