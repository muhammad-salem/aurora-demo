export class StructuralDirective {
    constructor(templateRef, viewContainerRef, host) {
        this.templateRef = templateRef;
        this.viewContainerRef = viewContainerRef;
        this.host = host;
    }
}
export class AttributeDirective {
    constructor(el) {
        this.el = el;
    }
}
export class AttributeOnStructuralDirective {
    constructor(directive) {
        this.directive = directive;
    }
}
//# directive.js.map