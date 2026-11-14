import { AttributeDirective } from '@ibyar/core';
type StyleType = string | Array<string> | {
    [propertyName: string]: string;
};
export declare class StyleDirective extends AttributeDirective {
    readonly style: import("@ibyar/core").InputWithTransform<void, StyleType>;
    private setStyle;
    private _setStyleFromLine;
    private _setStyle;
    private updateStyle;
}
export {};
//# sourceMappingURL=style.d.ts.map