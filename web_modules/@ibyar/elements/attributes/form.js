export function isFormElement(tagName) {
    switch (tagName) {
        case 'button':
        case 'datalist':
        case 'fieldset':
        case 'input':
        case 'label':
        case 'legend':
        case 'meter':
        case 'optgroup':
        case 'option':
        case 'output':
        case 'progress':
        case 'select':
        case 'textarea':
            return true;
        default: return false;
    }
}
export function isSubmittableElement(tagName) {
    switch (tagName) {
        case 'button':
        case 'input':
        case 'object':
        case 'select':
        case 'textarea':
            return true;
        default: return false;
    }
}
export function isResettableElement(tagName) {
    switch (tagName) {
        case 'input':
        case 'output':
        case 'select':
        case 'textarea':
            return true;
        default: return false;
    }
}
export function isAutocapitalizeInheritingElement(tagName) {
    switch (tagName) {
        case 'button':
        case 'fieldset':
        case 'input':
        case 'output':
        case 'select':
        case 'textarea':
            return true;
        default: return false;
    }
}
export function isFormLabelableElement(tagName) {
    switch (tagName) {
        case 'button':
        case 'input':
        case 'meter':
        case 'output':
        case 'progress':
        case 'select':
        case 'textarea':
            return true;
        default: return false;
    }
}
//# form.js.map