import { type MetadataClass, type MetadataContext } from '@ibyar/decorators';
import type { ChildOptions, OutputEventInit } from '../annotation/options.js';
export declare class PropertyRef {
    modelProperty: string;
    protected _viewName?: string | undefined;
    constructor(modelProperty: string, _viewName?: string | undefined);
    get viewAttribute(): string;
}
export declare class InputPropertyRef extends PropertyRef {
}
export declare class OutputPropertyRef extends PropertyRef {
    options?: OutputEventInit | undefined;
    constructor(modelProperty: string, viewName?: string, options?: OutputEventInit | undefined);
}
export declare class ChildRef {
    modelName: string;
    selector: string | {
        new (): HTMLElement;
        prototype: HTMLElement;
    } | CustomElementConstructor;
    childOptions?: ChildOptions | undefined;
    constructor(modelName: string, selector: string | {
        new (): HTMLElement;
        prototype: HTMLElement;
    } | CustomElementConstructor, childOptions?: ChildOptions | undefined);
}
export declare class ListenerRef {
    eventName: string;
    args: string[];
    modelCallbackName: string;
    constructor(eventName: string, args: string[], modelCallbackName: string);
}
export declare class HostBindingRef {
    modelPropertyName: string;
    hostPropertyName: string;
    constructor(modelPropertyName: string, hostPropertyName: string);
}
export interface BootstrapMetadata {
    [key: string]: any;
}
export declare class ReflectComponents {
    static getMetaDate(constructor: MetadataClass): Record<any, any> | undefined;
    static addInput(metadata: MetadataContext, modelName: string, viewName: string): void;
    static addOutput(metadata: MetadataContext, modelName: string, viewName: string, options: OutputEventInit): void;
    static setComponentView(metadata: MetadataContext, modelName: string): void;
    static addViewChild(metadata: MetadataContext, modelName: string, selector: string | typeof HTMLElement | CustomElementConstructor, childOptions?: ChildOptions): void;
    static addViewChildren(metadata: MetadataContext, modelName: string, selector: string | typeof HTMLElement | CustomElementConstructor): void;
    static addHostListener(metadata: MetadataContext, propertyKey: string, eventName: string, args: string[]): void;
    static addHostBinding(metadata: MetadataContext, propertyKey: string, hostPropertyName: string): void;
}
//# sourceMappingURL=reflect.d.ts.map