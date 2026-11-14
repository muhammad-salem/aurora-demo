import { ReactiveControlScope, Context, ScopeSubscription } from '@ibyar/expressions';
import { ChangeDetectorRef } from './change-detector-ref.js';
export declare abstract class ViewRef extends ChangeDetectorRef {
    /**
     * Destroys this view and all of the data structures associated with it.
     */
    abstract destroy(): void;
    /**
     * Reports whether this view has been destroyed.
     * @returns True after the `destroy()` method has been called, false otherwise.
     */
    abstract get destroyed(): boolean;
    /**
     * A lifecycle hook that provides additional developer-defined cleanup
     * functionality for views.
     * @param callback A handler function that cleans up developer-defined data
     * associated with a view. Called when the `destroy()` method is invoked.
     */
    abstract onDestroy(callback: Function): {
        unsubscribe(): void;
    };
}
export declare abstract class EmbeddedViewRef<C> extends ViewRef {
    /**
     * The context for this view, inherited from the anchor element.
     */
    abstract get context(): C;
    /**
     * The root nodes for this embedded view.
     */
    abstract get rootNodes(): Node[];
    /**
     * the first node for this embedded view.
     */
    abstract get first(): ChildNode;
    /**
     * the last node for this embedded view.
     */
    abstract get last(): ChildNode;
    /**
     * insert view after the node.
     * @param node
     */
    abstract after(node: ChildNode): void;
    /**
     * insert view before the node.
     * @param node
     */
    abstract before(node: ChildNode): void;
    /**
     * move/resort/reorder after node
     * @param node
     */
    abstract moveAfter(node: ChildNode): void;
    /**
     * move/resort/reorder before node
     * @param node
     */
    abstract moveBefore(node: ChildNode): void;
    /**
     * remove the root nodes from the view, but keep reference to them.
     *
     * Detaches a view from this container without destroying it.
     * Use along with after()/before() to move a view within the current container.
     */
    abstract detach(): void;
}
export declare class EmbeddedViewRefImpl<C> extends EmbeddedViewRef<C> {
    private _scope;
    private _rootNodes;
    private _subscriptions?;
    private _destroyed;
    private _onDestroySubscribes;
    constructor(_scope: ReactiveControlScope<C & Context>, _rootNodes: Node[], _subscriptions?: ScopeSubscription<Context>[] | undefined);
    get context(): C;
    get rootNodes(): Node[];
    get first(): Element;
    get last(): Element;
    get destroyed(): boolean;
    destroy(): void;
    private getAsANode;
    after(node: ChildNode): void;
    before(node: ChildNode): void;
    moveAfter(node: ChildNode): void;
    moveBefore(node: ChildNode): void;
    detach(): void;
    reattach(): void;
    markForCheck(): void;
    detectChanges(): void;
    checkNoChanges(): void;
    onDestroy(callback: () => void): {
        unsubscribe(): void;
    };
}
//# sourceMappingURL=view-ref.d.ts.map