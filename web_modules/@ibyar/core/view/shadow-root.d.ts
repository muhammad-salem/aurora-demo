import { type CustomElement } from '../component/custom-element.js';
export declare class ShadowRootService {
    private shadowRoots;
    has(elem: CustomElement): boolean;
    get(elem: CustomElement): ShadowRoot | undefined;
    set(elem: CustomElement, root: ShadowRoot): void;
}
//# sourceMappingURL=shadow-root.d.ts.map