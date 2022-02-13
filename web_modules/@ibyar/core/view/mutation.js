export class MutationObservable {
    constructor() {
        this.attributes = new Map();
        this.remove = new WeakMap();
        this.insert = new WeakMap();
    }
    emit(attributeName, value, oldValue) {
        const calls = this.attributes.get(attributeName);
        calls?.forEach(callback => {
            try {
                callback(value, oldValue);
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    emitNodeRemove(node) {
        this.emitNode(this.remove, node);
    }
    emitNodeInsert(node) {
        this.emitNode(this.insert, node);
    }
    emitNode(actionMap, node) {
        const calls = actionMap.get(node);
        calls?.forEach(callback => {
            try {
                callback();
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    subscribe(attributeName, callback) {
        let calls = this.attributes.get(attributeName);
        if (!calls) {
            calls = [];
            this.attributes.set(attributeName, calls);
        }
        calls.push(callback);
        return new MutationSubscription(this, attributeName, callback);
    }
    subscribeOnRemoveNode(node, callback) {
        return this.subscribeNodeAction(this.remove, node, callback);
    }
    subscribeOnInsertNode(node, callback) {
        return this.subscribeNodeAction(this.insert, node, callback);
    }
    subscribeNodeAction(actionMap, node, callback) {
        let calls = actionMap.get(node);
        if (!calls) {
            calls = [];
            actionMap.set(node, calls);
        }
        calls.push(callback);
        return new MutationSubscription(this, new WeakRef(node), callback);
    }
    unsubscribe(eventName, callback) {
        const calls = this.attributes.get(eventName);
        if (calls) {
            const index = calls.indexOf(callback);
            if (index !== -1) {
                calls.splice(index, 1);
            }
        }
    }
    unsubscribeOnRemoveNode(node, callback) {
        this.unsubscribeNodeAction(this.remove, node, callback);
    }
    unsubscribeOnInsertNode(node, callback) {
        this.unsubscribeNodeAction(this.insert, node, callback);
    }
    unsubscribeNodeAction(actionMap, node, callback) {
        const calls = actionMap.get(node);
        if (calls) {
            const index = calls.indexOf(callback);
            if (index !== -1) {
                calls.splice(index, 1);
            }
        }
    }
    destroy() {
        this.attributes.clear();
    }
}
export class MutationSubscription {
    constructor(observable, key, callback) {
        this.observable = observable;
        this.key = key;
        this.callback = callback;
        this.type = typeof key === 'string' ? 'attribute' : 'remove';
    }
    unsubscribe() {
        if (this.type === 'attribute') {
            this.observable.unsubscribe(this.key, this.callback);
        }
        else {
            const ref = this.key.deref();
            if (ref) {
                this.observable.unsubscribeOnRemoveNode(ref, this.callback);
            }
        }
    }
}
export class ElementMutation {
    constructor() {
        this.observables = new WeakMap();
        this.mutationCallback = (mutations, observer) => {
            mutations.forEach((mut) => {
                switch (mut.type) {
                    case 'childList':
                        {
                            if (mut.removedNodes.length > 0 && this.observables.has(mut.target)) {
                                const observable = this.observables.get(mut.target);
                                mut.removedNodes.forEach(node => observable.emitNodeRemove(node));
                            }
                        }
                        break;
                    case 'attributes':
                    default:
                        {
                            const observable = this.observables.get(mut.target);
                            observable && observable.emit(mut.attributeName, mut.target.nodeValue, mut.oldValue);
                        }
                        break;
                }
            });
        };
        this.mutationObserver = new MutationObserver(this.mutationCallback);
    }
    subscribe(target, attributeName, callback) {
        let observable = this.observables.get(target);
        if (!observable) {
            observable = new MutationObservable();
            this.observables.set(target, observable);
            this.mutationObserver.observe(target, ElementMutation.Mutation_OPTIONS);
        }
        return observable.subscribe(attributeName, callback);
    }
    subscribeOnRemoveNode(target, node, callback) {
        let observable = this.observables.get(target);
        if (!observable) {
            observable = new MutationObservable();
            this.observables.set(target, observable);
            this.mutationObserver.observe(target, ElementMutation.Mutation_OPTIONS);
        }
        return observable.subscribeOnRemoveNode(node, callback);
    }
    subscribeOnInsertNode(target, node, callback) {
        let observable = this.observables.get(target);
        if (!observable) {
            observable = new MutationObservable();
            this.observables.set(target, observable);
            this.mutationObserver.observe(target, ElementMutation.Mutation_OPTIONS);
        }
        return observable.subscribeOnInsertNode(node, callback);
    }
    disconnect() {
        const records = this.mutationObserver.takeRecords();
        this.mutationObserver.disconnect();
        this.mutationCallback(records, this.mutationObserver);
    }
}
ElementMutation.Mutation_OPTIONS = {
    attributes: true,
    childList: true,
    subtree: true,
    attributeOldValue: true,
};
//# mutation.js.map