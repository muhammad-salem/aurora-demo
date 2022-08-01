import { ChangeDetectorRef } from './change-detector-ref.js';
export class ViewRef extends ChangeDetectorRef {
}
export class EmbeddedViewRef extends ViewRef {
}
export class EmbeddedViewRefImpl extends EmbeddedViewRef {
    constructor(_scope, _rootNodes, _subscriptions) {
        super();
        this._scope = _scope;
        this._rootNodes = _rootNodes;
        this._subscriptions = _subscriptions;
        this._destroyed = false;
        this._onDestroySubscribes = [];
    }
    get context() {
        return this._scope.getContext();
    }
    get rootNodes() {
        return this._rootNodes;
    }
    get first() {
        return this._rootNodes[0];
    }
    get last() {
        return this._rootNodes[this._rootNodes.length - 1];
    }
    get destroyed() {
        return this._destroyed;
    }
    destroy() {
        if (!this._destroyed) {
            this._subscriptions?.forEach(sub => sub.unsubscribe());
            this._subscriptions?.splice(0, this._subscriptions.length);
            for (const node of this._rootNodes) {
                node.remove();
            }
            this._onDestroySubscribes.forEach(callback => {
                try {
                    callback();
                }
                catch (error) {
                    console.error(error);
                }
            });
            this._destroyed = true;
        }
    }
    getAsANode() {
        if (this._rootNodes.length == 1) {
            return this._rootNodes[0];
        }
        const fragment = document.createDocumentFragment();
        this._rootNodes.forEach(node => fragment.append(node));
        return fragment;
    }
    after(node) {
        node.after(this.getAsANode());
    }
    before(node) {
        node.before(this.getAsANode());
    }
    detach() {
        for (const node of this._rootNodes) {
            node.remove();
        }
        this._scope.detach();
    }
    reattach() {
        this._scope.emitChanges();
    }
    markForCheck() {
        this._scope.emitChanges();
    }
    detectChanges() {
        this._scope.detectChanges();
    }
    checkNoChanges() {
        this._scope.checkNoChanges();
    }
    onDestroy(callback) {
        this._onDestroySubscribes.push(callback);
        return {
            unsubscribe: () => {
                const index = this._onDestroySubscribes.indexOf(callback);
                if (index > -1) {
                    this._onDestroySubscribes.splice(index, 1);
                }
            }
        };
    }
}
//# sourceMappingURL=view-ref.js.map