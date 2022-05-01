export function isHTMLComponent(object) {
    return Reflect.has(object, '_model')
        && object instanceof HTMLElement;
}
export function isHTMLComponentOfType(object, typeClass) {
    return isHTMLComponent(object)
        && Reflect.get(object, '_model') instanceof typeClass;
}
export function isHTMLElement(element) {
    return element && element instanceof HTMLElement && !element.tagName?.includes('-');
}
export function isHTMLUnknownElement(element) {
    return element && element instanceof HTMLUnknownElement && !element.tagName?.includes('-');
}
//# sourceMappingURL=custom-element.js.map