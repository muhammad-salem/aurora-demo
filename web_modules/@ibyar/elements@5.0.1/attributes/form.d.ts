/**
 * https://html.spec.whatwg.org/multipage/forms.html
 */
/**
 * check the formAssociated property on the associated constructor.
 * @param tagName tag name of the defined custom element
 * @returns boolean
 */
export declare function isFormAssociatedCustomElementByTag(tagName: string): boolean;
/**
 * check the formAssociated property on the associated constructor.
 * @param constructor the associated constructor
 * @returns boolean
 */
export declare function isFormAssociatedCustomElementByConstructor(constructor: CustomElementConstructor): boolean;
/**
 * check the formAssociated property on the associated constructor on already created element.
 * @param el the element
 * @returns boolean
 */
export declare function isFormAssociatedCustomElementByElement(el: HTMLElement): boolean;
export declare function isFormAssociatedCustomElement(item: string | CustomElementConstructor | HTMLElement): boolean;
/**
 *  form-associated elements
 * A number of the elements are form-associated elements, which means they can have a form owner.
 * @param tagName
 */
export declare function isFormElement(tagName: string): boolean;
/**
 * Denotes elements that are listed in the form.elements and fieldset.elements APIs.
 * These elements also have a form content attribute, and a matching form IDL attribute,
 * that allow authors to specify an explicit form owner.
 * @param tagName
 */
export declare function isListedFormElement(tagName: string): boolean;
/**
 * submittable elements
 * Denotes elements that can be used for constructing the entry list when a form element is submitted.
 * @param tagName
 */
export declare function isSubmittableElement(tagName: string): boolean;
/**
 * Resettable elements
 * Denotes elements that can be affected when a form element is reset.
 * @param tagName
 * @returns
 */
export declare function isResettableElement(tagName: string): boolean;
/**
 * Autocapitalize-inheriting elements
 * Denotes elements that inherit the autocapitalize attribute from their form owner.
 * @param tagName
 */
export declare function isAutocapitalizeInheritingElement(tagName: string): boolean;
/**
 * Label-able Elements
 * Some elements, not all of them form-associated, are categorized as label-able elements.
 * These are elements that can be associated with a label element.
 *
 * this function ignore the 'type' attribute of 'input' tag as '<input type="hidden" />' is considered as not labeled element
 * @param tagName the tested tag name
 */
export declare function isFormLabelableElement(tagName: string): boolean;
/**
 * get the event name for html form elements by tag name
 * @param tagName
 * @returns
 */
export declare function getChangeEventNameFoTag(tagName: string): 'input' | 'change' | undefined;
/**
 * read value form html input element.
 * {@link https://html.spec.whatwg.org/multipage/input.html#concept-input-apply}
 * @param input
 * @returns
 */
export declare function readInputValue(input: HTMLInputElement, hint?: 'value'): string | number | boolean | FileList | Date | null;
/**
 * get event name for html input element by type.
 * {@link https://html.spec.whatwg.org/multipage/input.html#concept-input-apply}
 * @param input
 * @returns
 */
export declare function getInputChangeEventName(type: string): "value" | "checked" | "files";
//# sourceMappingURL=form.d.ts.map