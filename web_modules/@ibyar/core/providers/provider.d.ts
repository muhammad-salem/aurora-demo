import type { MetadataClass } from '@ibyar/decorators';
import type { ComponentRef, DirectiveRef, PipeRef } from '../component/component.js';
import { type PropertyRef } from '../component/reflect.js';
export type ProviderType = 'component' | 'service' | 'directive' | 'pipe' | 'self';
export declare class ClassRegistry {
    viewSet: Set<MetadataClass>;
    componentSet: Set<MetadataClass>;
    serviceSet: Set<MetadataClass>;
    directiveSet: Set<MetadataClass>;
    pipeSet: Set<MetadataClass>;
    registerView(classRef: MetadataClass): void;
    registerComponent(classRef: MetadataClass): void;
    registerService(classRef: MetadataClass): void;
    registerDirective(classRef: MetadataClass): void;
    registerPipe(classRef: MetadataClass): void;
    hasComponent<T>(selector: string): boolean;
    getComponentRef<T>(selector: string): ComponentRef<T> | undefined;
    getComponent<T>(selector: string): MetadataClass | undefined;
    getComponentView(selector: string): (MetadataClass<import("../index.js").HTMLComponent<unknown>> & CustomElementConstructor) | undefined;
    hasOutput<T>(model: Object, eventName: string): PropertyRef | false;
    hasInput<T>(model: Object, eventName: string): PropertyRef | false;
    hasDirective<T>(selector: string): boolean;
    hasService<T>(name: string): boolean;
    directiveHasInput<T>(input: string, directiveType?: 'attributes' | 'structural'): boolean;
    getDirectiveRef<T>(selector: string): DirectiveRef<T> | undefined;
    getPipe<T>(pipeName: string): PipeRef<T> | undefined;
    deleteComponent<T>(selector: string): void;
    deleteDirective<T>(selector: string): void;
    deleteService<T>(name: string): void;
    deletePipe<T>(name: string): void;
}
export declare const classRegistryProvider: ClassRegistry;
//# sourceMappingURL=provider.d.ts.map