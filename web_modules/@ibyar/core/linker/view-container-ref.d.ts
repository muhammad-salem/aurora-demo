import type { MetadataClass } from '@ibyar/decorators';
import type { Type } from '../utils/typeof.js';
import { TemplateRef } from './template-ref.js';
import { EmbeddedViewRef, ViewRef } from './view-ref.js';
import { HTMLComponent } from '../component/custom-element.js';
interface IndexOptions {
    /**
     * the index to insert the
     */
    index?: number;
}
export interface ViewContainerOptions<C> extends IndexOptions {
    context?: C;
}
export interface ViewContainerComponentOptions extends IndexOptions {
    selector?: string;
}
export interface HTMLElementOptions extends ElementCreationOptions, IndexOptions {
}
export type ElementRef<T> = {
    nativeElement: T;
    viewRef: EmbeddedViewRef<T>;
};
export type ComponentViewRef<T> = {
    instance: T;
    nativeElement: HTMLComponent<T>;
    viewRef: EmbeddedViewRef<T>;
};
export declare abstract class ViewContainerRef {
    /**
     * Anchor element that specifies the location of this container in the containing view.
     * Each view container can have only one anchor element, and each anchor element
     * can have only a single view container.
     *
     * Root elements of views attached to this container become siblings of the anchor element in
     * the rendered view.
     *
     * Access the `ViewContainerRef` of an element by placing a `Directive` injected
     * with `ViewContainerRef` on the element, or use a `ViewChild` query.
     *
     */
    abstract get anchorElement(): Element;
    /**
     * Destroys all views in this container.
     */
    abstract clear(): void;
    /**
     * Retrieves a view from this container.
     * @param index The 0-based index of the view to retrieve.
     * @returns The `ViewRef` instance, or null if the index is out of range.
     */
    abstract get<T>(index: number): EmbeddedViewRef<T> | undefined;
    /**
     * Performs the specified action for each element in an array.
     */
    abstract forEach<T>(callbackfn: (value: EmbeddedViewRef<T>, index: number) => void): void;
    /**
     * Reports how many views are currently attached to this container.
     * @returns The number of views.
     */
    abstract get length(): number;
    /**
     * Instantiates an embedded view and inserts it
     * into this container.
     * @param templateRef The HTML template that defines the view.
     * @param context The data-binding context of the embedded view, as declared
     * in the `<ng-template>` usage.
     * @param index The 0-based index at which to insert the new view into this container.
     * If not specified, appends the new view as the last entry.
     *
     * @returns The `ViewRef` instance for the newly created view.
     */
    abstract createEmbeddedView<C extends {}>(templateRef: TemplateRef, options?: ViewContainerOptions<C>): EmbeddedViewRef<C>;
    /**
     * create component by tag name `selector`.
     * @param selector the tag name for the aurora custom-element
     * @param options
     */
    abstract createComponent<C extends {}>(selector: string, options?: IndexOptions): ComponentViewRef<C>;
    /**
     * create component by the aurora custom-element `View` Class
     * @param viewClass the generated aurora view class
     * @param options
     */
    abstract createComponent<C extends {}>(viewClass: Type<HTMLComponent<C>>, options?: IndexOptions): ComponentViewRef<C>;
    /**
     * Instantiates a single component and inserts its host view into this container.
     *
     * @param componentType Component Type to use.
     * @param options An object that contains extra parameters:
     *  * index: the index at which to insert the new component's host view into this container.
     *     If not specified, appends the new view as the last entry.
     *  * selector: the tag name of the new create component that attached with this model class.
     * 		Any Model class can have many views with different selectors.
     *
     * @returns The new `HTMLComponent` which contains the component instance and the host view.
     */
    abstract createComponent<C extends {}>(componentType: Type<C>, options?: ViewContainerComponentOptions): ComponentViewRef<C>;
    /**
     * create an HTMLElement by tag name `selector`.
     * @param selector the tag name for the aurora custom-element
     * @param options
     */
    abstract createElement<K extends keyof HTMLElementTagNameMap>(selector: K, options?: HTMLElementOptions): ElementRef<HTMLElementTagNameMap[K]>;
    /**
     * create an HTMLElement by tag name `selector`.
     * @param selector the tag name for the aurora custom-element
     * @param options
     */
    abstract createElement<K extends keyof HTMLElementDeprecatedTagNameMap>(selector: K, options?: HTMLElementOptions): ElementRef<HTMLElementDeprecatedTagNameMap[K]>;
    /**
     * create HTMLElement by View Class reference
     * @param viewClass the generated aurora view class
     * @param options
     */
    abstract createElement<C extends HTMLElement>(htmlElementClass: Type<C>, options?: HTMLElementOptions): ElementRef<C>;
    /**
     * create a text node and insert to the view
     * @param data
     * @param options
     */
    abstract createTextNode(data: string, options?: IndexOptions): Text;
    /**
     * Inserts a view into this container.
     * @param viewRef The view to insert.
     * @param index The 0-based index at which to insert the view.
     * If not specified, appends the new view as the last entry.
     * @returns The inserted `ViewRef` instance.
     *
     */
    abstract insert(viewRef: ViewRef, index?: number): ViewRef;
    /**
     * move a view to a new location from another container
     * @param viewRef the view that needed to be inserted in this container.
     * @param newIndex new index in this container, or append
     */
    abstract adopt<T>(viewRef: EmbeddedViewRef<T>, newIndex?: number): void;
    /**
     * Moves a view to a new location in this container.
     * @param oldIndex The 0-based index of the old location.
     * @param newIndex The 0-based index of the new location.
     */
    abstract move(oldIndex: number, newIndex: number): void;
    /**
     * swap 2 view position
     * @param oldIndex
     * @param newIndex
     */
    abstract swap(index1: number, index2: number): void;
    /**
     * Returns the index of a view within the current container.
     * @param viewRef The view to query.
     * @returns The 0-based index of the view's position in this container,
     * or `-1` if this container doesn't contain the view.
     */
    abstract indexOf(viewRef: ViewRef): number;
    /**
     * Destroys a view attached to this container
     * @param index The 0-based index of the view to destroy.
     * If not specified, the last view in the container is removed.
     */
    abstract remove<T>(index?: number): EmbeddedViewRef<T> | undefined;
    /**
     * remove a view attached to this container with out destroying it.
     * the view will be still attached to the DOM.
     * useful in case of moving the view/component to anther container without realizing it again.
     * returns the view.
     * @param index
     * @param destroy
     * @returns the view in the index
     */
    abstract remove<T>(index: number, destroy: false): EmbeddedViewRef<T> | undefined;
    /**
     * Detaches a view from this container without destroying it.
     * Use along with `insert()` to move a view within the current container.
     * @param index The 0-based index of the view to detach.
     * If not specified, the last view in the container is detached.
     */
    abstract detach<T>(index?: number): EmbeddedViewRef<T> | undefined;
}
export declare class ViewContainerRefImpl extends ViewContainerRef {
    private _parent;
    private _firstComment;
    private _views;
    constructor(parent: Element, firstComment: Comment);
    get anchorElement(): Element;
    get length(): number;
    clear(): void;
    get<T>(index: number): EmbeddedViewRef<T> | undefined;
    detach<T>(index?: number): EmbeddedViewRef<T> | undefined;
    adopt<T>(viewRef: EmbeddedViewRef<T>, newIndex?: number): void;
    forEach<T>(callbackfn: (value: EmbeddedViewRef<T>, index: number) => void): void;
    indexOf<T>(viewRef: EmbeddedViewRef<T>): number;
    remove<T>(index?: number, destroy?: boolean): EmbeddedViewRef<T> | undefined;
    insert(viewRef: EmbeddedViewRef<any>, index?: number): ViewRef;
    move(oldIndex: number, newIndex: number): void;
    swap(index1: number, index2: number): void;
    createEmbeddedView<C extends {}>(templateRef: TemplateRef, options?: ViewContainerOptions<C>): EmbeddedViewRef<C>;
    createComponent<C extends {}>(selector: string, options?: IndexOptions): ComponentViewRef<C>;
    createComponent<C extends {}>(viewClass: MetadataClass<HTMLComponent<C>>, options?: IndexOptions): ComponentViewRef<C>;
    createComponent<C extends {}>(componentType: MetadataClass<C>, options?: ViewContainerComponentOptions): ComponentViewRef<C>;
    createElement<K extends keyof HTMLElementTagNameMap>(selector: K, options?: HTMLElementOptions): ElementRef<HTMLElementTagNameMap[K]>;
    createElement<K extends keyof HTMLElementDeprecatedTagNameMap>(selector: K, options?: HTMLElementOptions): ElementRef<HTMLElementDeprecatedTagNameMap[K]>;
    createTextNode(data: string, options?: IndexOptions): Text;
}
export {};
//# sourceMappingURL=view-container-ref.d.ts.map