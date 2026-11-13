export declare const EmptyElements: readonly string[];
export declare function isEmptyElement(tagName: string): boolean;
export declare const VoidElements: readonly string[];
export declare const isVoidElement: typeof isEmptyElement;
/**
 * see https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name
 * see https://github.com/mathiasbynens/mothereff.in/blob/master/custom-element-name/vendor/is-potential-custom-element-name.js
 * @param tagName
 */
export declare const CustomElementRegex: RegExp;
export declare function isValidCustomElementName(tagName: string): boolean;
//# sourceMappingURL=common.d.ts.map