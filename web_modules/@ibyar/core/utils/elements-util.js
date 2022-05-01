import { hasNativeAttr } from '../../elements/index.js';
import { isHTMLComponent } from '../component/custom-element.js';
export function hasComponentAttr(element, attr) {
    if (isHTMLComponent(element)) {
        var componentRef = element.getComponentRef();
        return componentRef.inputs.some(input => input.viewAttribute === attr);
    }
    return false;
}
export function hasAttrCustomElement(element, attr) {
    if (Reflect.has(element.constructor, 'allAttributes')) {
        return Reflect.get(element.constructor, 'allAttributes').some((prop) => prop === attr);
    }
    else if (Reflect.has(element.constructor, 'observedAttributes')) {
        return Reflect.get(element.constructor, 'observedAttributes').some((prop) => prop === attr);
    }
    return false;
}
export function hasAttr(element, attr) {
    return hasNativeAttr(element, attr) || hasAttrCustomElement(element, attr) || hasComponentAttr(element, attr);
}
//# sourceMappingURL=elements-util.js.map