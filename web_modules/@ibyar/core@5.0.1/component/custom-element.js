export function isHTMLComponent(object) {
    return object instanceof HTMLElement && Reflect.has(object, '_model');
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
export function isValueControl(obj) {
    return obj
        && typeof obj === 'object'
        && typeof obj.writeValue === 'function'
        && typeof obj.registerOnChange === 'function';
}
//# sourceMappingURL=custom-element.js.map