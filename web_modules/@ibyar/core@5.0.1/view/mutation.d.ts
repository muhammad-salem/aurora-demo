interface AttributeChangeCallback {
    (value: any, oldValue?: any): void;
}
interface NodeRemoveCallback {
    (): void;
}
export declare class MutationObservable {
    private attributes;
    private remove;
    private insert;
    emit(attributeName: string, value: any, oldValue?: any): void;
    emitNodeRemove(node: Node): void;
    emitNodeInsert(node: Node): void;
    private emitNode;
    subscribe(attributeName: string, callback: AttributeChangeCallback): MutationSubscription;
    subscribeOnRemoveNode(node: Node, callback: NodeRemoveCallback): MutationSubscription;
    subscribeOnInsertNode(node: Node, callback: NodeRemoveCallback): MutationSubscription;
    private subscribeNodeAction;
    unsubscribe(eventName: string, callback: AttributeChangeCallback): void;
    unsubscribeOnRemoveNode(node: Node, callback: NodeRemoveCallback): void;
    unsubscribeOnInsertNode(node: Node, callback: NodeRemoveCallback): void;
    private unsubscribeNodeAction;
    destroy(): void;
}
export declare class MutationSubscription {
    private observable;
    private key;
    private callback;
    private type;
    constructor(observable: MutationObservable, node: WeakRef<Node>, callback: NodeRemoveCallback);
    constructor(observable: MutationObservable, attributeName: string, callback: AttributeChangeCallback);
    unsubscribe(): void;
}
export declare class ElementMutation {
    private static Mutation_OPTIONS;
    private observables;
    private mutationCallback;
    private mutationObserver;
    subscribe(target: Node, attributeName: string, callback: AttributeChangeCallback): MutationSubscription;
    subscribeOnRemoveNode(target: Node, node: Node, callback: NodeRemoveCallback): MutationSubscription;
    subscribeOnInsertNode(target: Node, node: Node, callback: NodeRemoveCallback): MutationSubscription;
    disconnect(): void;
}
export {};
//# sourceMappingURL=mutation.d.ts.map