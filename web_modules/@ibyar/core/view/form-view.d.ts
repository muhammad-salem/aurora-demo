import type { Type } from '../utils/typeof.js';
import { FormAssociatedComponent } from '../component/custom-element.js';
export declare const NOOP_CONTROL_CHANGE: () => void;
export interface NativeElementInternals extends ElementInternals {
}
export declare class NativeElementInternals implements ElementInternals {
    private el;
    constructor(input: FormAssociatedComponent<any, any>);
    get form(): globalThis.HTMLFormElement | null;
    get labels(): NodeListOf<HTMLLabelElement>;
    get shadowRoot(): ShadowRoot | null;
    get willValidate(): boolean;
    setFormValue(value: any | null, state?: File | string | FormData | null): void;
}
export declare function baseFormFactoryView<T extends Object>(htmlElementType: Type<HTMLElement>): Type<FormAssociatedComponent<T, any>>;
//# sourceMappingURL=form-view.d.ts.map