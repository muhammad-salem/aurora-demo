import { AttributeDirective } from '@ibyar/core';
type ClassInput = string | Array<string> | {
    [className: string]: boolean;
};
export declare class ClassDirective extends AttributeDirective {
    private proxy?;
    readonly 'class': import("@ibyar/core").InputWithTransform<DOMTokenList, ClassInput>;
    private setClass;
    private updateClassList;
}
export {};
//# sourceMappingURL=class.d.ts.map