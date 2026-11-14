import { Context, ReactiveScope, ReadOnlyScope, Scope, ScopeSubscription, ValueChangedCallback } from '@ibyar/expressions';
import { HTMLComponent } from '../component/custom-element.js';
import { InjectionToken } from '../di/provider.js';
import { TemplateRef } from '../linker/template-ref.js';
import { ViewContainerRef } from '../linker/view-container-ref.js';
import { AuroraZone } from '../zone/zone.js';
export declare const NATIVE_HOST_TOKEN: InjectionToken<HTMLElement>;
export declare const DIRECTIVE_HOST_TOKEN: InjectionToken<HTMLComponent<any> | StructuralDirective>;
export declare const SUCCESSORS_TOKEN: InjectionToken<Record<string, TemplateRef>>;
/**
 * A structural directive selector as '*if' '*for'
 */
export declare class StructuralDirective {
    protected zone: AuroraZone;
    protected templateRef: TemplateRef;
    protected host: HTMLComponent<any> | StructuralDirective;
    private successors;
    protected viewContainerRef: ViewContainerRef;
    getSuccessor(name: string): TemplateRef | undefined;
}
/**
 * An attributes directive selector as '[class] [style]'
 */
export declare class AttributeDirective {
    protected el: HTMLElement;
    protected zone: AuroraZone;
}
export declare class ReactiveSignalScope<T extends Context> extends ReactiveScope<T> {
    static for<T extends Context>(context: T, propertyKeys?: (keyof T)[]): ReactiveSignalScope<T>;
    static blockScope<T extends Context>(propertyKeys?: (keyof T)[]): ReactiveSignalScope<T>;
    static scopeForThis<T extends Context>(ctx: T, propertyKeys?: (keyof T)[]): Scope<{
        this: T;
    }>;
    static readOnlyScopeForThis<T extends Context>(ctx: T, propertyKeys?: (keyof T)[]): ReadOnlyScope<{
        this: T;
    }>;
    get(propertyKey: keyof T): any;
    set(propertyKey: keyof T, newValue: any, receiver?: any): boolean;
    subscribe(propertyKey: keyof T, callback: ValueChangedCallback): ScopeSubscription<T>;
    unsubscribe(propertyKey?: keyof T | undefined, subscription?: ScopeSubscription<T> | undefined): void;
}
//# sourceMappingURL=directive.d.ts.map