export class ViewRef {
}
export class EmbeddedViewRef extends ViewRef {
}
export class EmbeddedViewRefImpl extends EmbeddedViewRef {
    constructor(_context, _rootNodes, _subscriptions) {
        super();
        this._context = _context;
        this._rootNodes = _rootNodes;
        this._subscriptions = _subscriptions;
        this._destroyed = false;
        this.onDestroySubscribes = [];
    }
    get context() {
        return this._context;
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
            this.onDestroySubscribes.forEach(callback => {
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
    }
    onDestroy(callback) {
        this.onDestroySubscribes.push(callback);
        return {
            unsubscribe: () => {
                const index = this.onDestroySubscribes.indexOf(callback);
                if (index > -1) {
                    this.onDestroySubscribes.splice(index, 1);
                }
            }
        };
    }
}
//# view-ref.js.map