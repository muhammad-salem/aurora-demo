import { type MetadataClass, type MetadataContext } from '@ibyar/decorators';
import type { Type } from '../utils/typeof.js';
import type { ZoneType } from '../zone/bootstrap.js';
import { Tag, DomNode, DomRenderNode, DomElementNode } from '@ibyar/elements';
import { HTMLComponent, ValueControl } from './custom-element.js';
import { AttributeDirective, StructuralDirective } from '../directive/directive.js';
import { ComponentOptions, PipeOptions, InjectableOptions, DirectiveOptions } from '../annotation/options.js';
import { ChildRef, HostBindingRef, InputPropertyRef, ListenerRef, OutputPropertyRef, PropertyRef } from './reflect.js';
import { SignalRuntimeMetadata } from '../signals/runtime.js';
export interface InjectableRef<T> {
    provideIn: Type<CustomElementConstructor> | 'root' | 'platform' | 'any';
    modelClass: Type<T>;
    name: string;
}
export interface PipeRef<T> {
    name: string;
    asynchronous?: boolean;
    modelClass: Type<T>;
}
export interface DirectiveRef<T> {
    selector: string;
    exportAs?: string;
    zone?: ZoneType;
    modelClass: Type<StructuralDirective> | Type<AttributeDirective>;
    inputs: PropertyRef[];
    outputs: PropertyRef[];
    view: string;
    viewChild: ChildRef[];
    ViewChildren: ChildRef[];
    hostListeners: ListenerRef[];
    hostBindings: HostBindingRef[];
    viewBindings?: DomElementNode;
    signals: SignalRuntimeMetadata[];
}
export interface ComponentRef<T> {
    selector: string;
    template: DomNode | DomRenderNode<T>;
    compiledTemplate?: DomNode;
    styles: string;
    extend: Tag;
    extendCustomElement: boolean;
    viewClass: MetadataClass<HTMLComponent<T>> & CustomElementConstructor;
    modelClass: Type<T>;
    inputs: InputPropertyRef[];
    outputs: OutputPropertyRef[];
    view: string;
    viewChild: ChildRef[];
    ViewChildren: ChildRef[];
    hostBindings: HostBindingRef[];
    hostListeners: ListenerRef[];
    viewBindings?: DomElementNode;
    windowBindings?: DomElementNode;
    encapsulation: 'custom' | 'shadow-dom' | 'template' | 'shadow-dom-template' | 'shadow-slot';
    isShadowDom: boolean;
    shadowRootInit: ShadowRootInit;
    disabledFeatures?: ('internals' | 'shadow')[];
    formAssociated: boolean | Type<ValueControl<any>>;
    zone?: ZoneType;
    signals: SignalRuntimeMetadata[];
}
export declare class Components {
    private static EMPTY_LIST;
    private static emptyList;
    private static patchTemplate;
    static defineDirective(modelClass: MetadataClass, opts: DirectiveOptions, metadata: MetadataContext): void;
    static definePipe<T extends Type<any>>(modelClass: MetadataClass<T>, opts: PipeOptions, metadata: MetadataContext): void;
    static defineService<T extends Type<any>>(modelClass: MetadataClass<T>, opts: InjectableOptions, metadata: MetadataContext): void;
    static defineComponent<T extends Type<any>>(modelClass: MetadataClass<T>, opts: ComponentOptions<T>, metadata: MetadataContext): void;
    static defineView<T extends HTMLElement>(viewClass: MetadataClass<T>, opt: {
        selector: string;
    } & ElementDefinitionOptions): void;
    private static scanRuntimeSignals;
}
//# sourceMappingURL=component.d.ts.map