import { hasNativeAttr } from '../../elements/index.js';
export function hasAttrCustomElement(element, attr) {
    if (Reflect.has(element.constructor, 'allAttributes')) {
        return Reflect.get(element.constructor, 'allAttributes').some((prop) => prop === attr);
    }
    else if (Reflect.has(element.constructor, 'observedAttributes')) {
        return Reflect.get(element.constructor, 'observedAttributes').some((prop) => prop === attr);
    }
    return false;
}
export function isDataAttributes(attr) {
    return attr.startsWith('data-');
}
export function hasAttr(element, attr) {
    return hasNativeAttr(element, attr)
        || hasAttrCustomElement(element, attr)
        || isDataAttributes(attr);
}
//# sourceMappingURL=elements-util.js.map