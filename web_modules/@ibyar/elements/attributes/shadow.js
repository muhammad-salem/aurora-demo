import { isValidCustomElementName } from './tags.js';
export const ShadowElements = [
    'article',
    'aside',
    'blockquote',
    'body',
    'div',
    'footer',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'header',
    'main',
    'nav',
    'p',
    'section',
    'span',
];
export function canAttachShadow(tagName) {
    if (isValidCustomElementName(tagName)) {
        return true;
    }
    return ShadowElements.includes(tagName);
}
//# sourceMappingURL=shadow.js.map