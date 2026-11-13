export interface AttrRef {
    readonly [attr: string]: string[];
}
/**
 * @see https://html.spec.whatwg.org/multipage/indices.html#elements-3
 */
export declare const GlobalAttributes: string[];
export declare const Attrs: AttrRef;
export declare function hasNativeAttr(element: string | HTMLElement, attr: string): boolean;
export declare function getTagsForAttr(attr: string): string[];
export declare function getAllAttributes(tag?: string): string[];
//# sourceMappingURL=attributes.d.ts.map