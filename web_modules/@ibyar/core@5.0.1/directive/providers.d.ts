import { ReactiveScope, TypeOf } from '@ibyar/expressions';
import { AttributeDirective } from './directive.js';
export type ElementContext = {
    this: HTMLElement;
} & {
    [key: string]: AttributeDirective | undefined;
};
export declare class ElementReactiveScope extends ReactiveScope<ElementContext> {
    private el;
    private directiveMap;
    constructor(el: HTMLElement);
    getElement(): HTMLElement;
    getDirectives(): Map<string, AttributeDirective>;
    get(propertyKey: PropertyKey): any;
    set(propertyKey: PropertyKey, value: any, receiver?: any): boolean;
    has(propertyKey: string): boolean;
    getClass(): TypeOf<ElementReactiveScope>;
}
//# sourceMappingURL=providers.d.ts.map