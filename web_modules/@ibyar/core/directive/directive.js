/**
 * A structural directive selector as '*if' '*for'
 */
export class StructuralDirective {
    constructor(templateRef, viewContainerRef, host) {
        this.templateRef = templateRef;
        this.viewContainerRef = viewContainerRef;
        this.host = host;
    }
}
/**
 * An attributes directive selector as '[class] [style]'
 */
export class AttributeDirective {
    constructor(el) {
        this.el = el;
    }
}
/**
 * An attributes directive on structural directive
 */
export class AttributeOnStructuralDirective {
    constructor(directive) {
        this.directive = directive;
    }
}
//# sourceMappingURL=directive.js.map