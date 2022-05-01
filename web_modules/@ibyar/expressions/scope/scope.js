export class Scope {
    constructor(context, propertyKeys) {
        this.context = context;
        this.scopeMap = new Map();
        this.propertyKeys = propertyKeys;
        if (Array.isArray(this.propertyKeys)) {
            this.has = (propertyKey) => {
                return this.propertyKeys.includes(propertyKey);
            };
        }
    }
    static for(context, propertyKeys) {
        return new Scope(context, propertyKeys);
    }
    static blockScope(propertyKeys) {
        return new Scope({}, propertyKeys);
    }
    get(propertyKey) {
        return Reflect.get(this.context, propertyKey);
    }
    set(propertyKey, value, receiver) {
        return Reflect.set(this.context, propertyKey, value);
    }
    has(propertyKey) {
        return propertyKey in this.context;
    }
    delete(propertyKey) {
        return Reflect.deleteProperty(this.context, propertyKey);
    }
    getContext() {
        return this.context;
    }
    getScope(propertyKey) {
        const scopeContext = this.get(propertyKey);
        let scope = this.scopeMap.get(propertyKey);
        if (scope) {
            scope.context = scopeContext;
            return scope;
        }
        if (typeof scopeContext !== 'object') {
            return;
        }
        scope = new (this.getClass())(scopeContext);
        this.scopeMap.set(propertyKey, scope);
        return scope;
    }
    getScopeOrCreat(propertyKey) {
        const scopeContext = this.get(propertyKey);
        let scope = this.scopeMap.get(propertyKey);
        if (scope) {
            scope.context = scopeContext;
            return scope;
        }
        scope = new (this.getClass())(scopeContext);
        this.scopeMap.set(propertyKey, scope);
        return scope;
    }
    getClass() {
        return Scope;
    }
}
export class ReadOnlyScope extends Scope {
    static for(context, propertyKeys) {
        return new ReadOnlyScope(context, propertyKeys);
    }
    static blockScope(propertyKeys) {
        return new ReadOnlyScope({}, propertyKeys);
    }
    set(propertyKey, value, receiver) {
        return false;
    }
    delete(propertyKey) {
        return false;
    }
    getClass() {
        return ReadOnlyScope;
    }
}
export class ScopeSubscription {
    constructor(propertyKey, observer) {
        this.propertyKey = propertyKey;
        this.observer = observer;
    }
    pause() {
        this.observer.pause(this.propertyKey, this);
    }
    resume() {
        this.observer.resume(this.propertyKey, this);
    }
    unsubscribe() {
        this.observer.unsubscribe(this.propertyKey, this);
    }
}
export class ValueChangeObserver {
    constructor() {
        this.subscribers = new Map();
        this.propertiesLock = [];
    }
    emit(propertyKey, newValue, oldValue) {
        if (this.propertiesLock.includes(propertyKey)) {
            return;
        }
        const subscribers = this.subscribers.get(propertyKey);
        if (!subscribers || subscribers.size == 0) {
            return;
        }
        this.propertiesLock.push(propertyKey);
        subscribers?.forEach(subscriptionInfo => {
            if (!subscriptionInfo.enable) {
                return;
            }
            try {
                subscriptionInfo.callback(newValue, oldValue);
            }
            catch (e) {
                console.error(e);
            }
        });
        if (this.propertiesLock.pop() !== propertyKey) {
            console.error('lock error');
        }
        ;
    }
    subscribe(propertyKey, callback) {
        const subscription = new ScopeSubscription(propertyKey, this);
        let propertySubscribers = this.subscribers.get(propertyKey);
        if (!propertySubscribers) {
            propertySubscribers = new Map();
            this.subscribers.set(propertyKey, propertySubscribers);
        }
        propertySubscribers.set(subscription, { callback, enable: true });
        return subscription;
    }
    unsubscribe(propertyKey, subscription) {
        if (subscription) {
            this.subscribers.get(propertyKey)?.delete(subscription);
        }
        else {
            this.subscribers.delete(propertyKey);
        }
    }
    pause(propertyKey, subscription) {
        const subscriptionInfo = this.subscribers.get(propertyKey)?.get(subscription);
        subscriptionInfo && (subscriptionInfo.enable = false);
    }
    resume(propertyKey, subscription) {
        const subscriptionInfo = this.subscribers.get(propertyKey)?.get(subscription);
        subscriptionInfo && (subscriptionInfo.enable = true);
    }
    destroy() {
        this.subscribers.clear();
    }
}
export class ReactiveScope extends Scope {
    constructor(context, name, parent, propertyKeys) {
        super(context, Array.isArray(name) ? name : propertyKeys);
        this.parent = parent;
        this.observer = new ValueChangeObserver();
        if (typeof name == 'string') {
            this.name = name;
        }
        if (Array.isArray(name)) {
            this.propertyKeys = name;
        }
    }
    static for(context, propertyKeys) {
        return new ReactiveScope(context, propertyKeys);
    }
    static blockScope(propertyKeys) {
        return new ReactiveScope({}, propertyKeys);
    }
    set(propertyKey, newValue, receiver) {
        const oldValue = Reflect.get(this.context, propertyKey);
        const result = Reflect.set(this.context, propertyKey, newValue);
        if (result) {
            this.emit(propertyKey, newValue, oldValue);
        }
        return result;
    }
    delete(propertyKey) {
        const oldValue = Reflect.get(this.context, propertyKey);
        const isDelete = Reflect.deleteProperty(this.context, propertyKey);
        if (isDelete && oldValue !== undefined) {
            this.emit(propertyKey, undefined, oldValue);
        }
        return isDelete;
    }
    getScope(propertyKey) {
        const scopeContext = this.get(propertyKey);
        let scope = this.scopeMap.get(propertyKey);
        if (scope) {
            scope.context = scopeContext;
            return scope;
        }
        if (typeof scopeContext !== 'object') {
            return;
        }
        scope = new ReactiveScope(scopeContext, propertyKey, this);
        this.scopeMap.set(propertyKey, scope);
        return scope;
    }
    getScopeOrCreat(propertyKey) {
        const scopeContext = this.get(propertyKey);
        let scope = this.scopeMap.get(propertyKey);
        if (scope) {
            scope.context = scopeContext;
            return scope;
        }
        scope = new ReactiveScope(scopeContext, propertyKey, this);
        this.scopeMap.set(propertyKey, scope);
        return scope;
    }
    emit(propertyKey, newValue, oldValue) {
        this.observer.emit(propertyKey, newValue, oldValue);
        this.parent?.emit(this.name, this.context);
    }
    subscribe(propertyKey, callback) {
        return this.observer.subscribe(propertyKey, callback);
    }
    unsubscribe(propertyKey, subscription) {
        if (propertyKey && subscription) {
            this.observer.unsubscribe(propertyKey, subscription);
        }
        else if (propertyKey) {
            this.observer.unsubscribe(propertyKey);
        }
        else {
            this.observer.destroy();
        }
    }
    getClass() {
        return ReactiveScope;
    }
}
export class ReactiveScopeControl extends ReactiveScope {
    constructor() {
        super(...arguments);
        this.attached = true;
        this.marked = {};
    }
    static for(context, propertyKeys) {
        return new ReactiveScopeControl(context, propertyKeys);
    }
    static blockScope(propertyKeys) {
        return new ReactiveScopeControl({}, propertyKeys);
    }
    emit(propertyKey, newValue, oldValue) {
        if (this.attached) {
            super.emit(propertyKey, newValue, oldValue);
        }
        else {
            this.marked[propertyKey] = newValue;
        }
    }
    isAttached() {
        return this.attached;
    }
    detach() {
        this.attached = false;
    }
    reattach() {
        this.attached = true;
        this.emitChanges();
    }
    emitChanges(propertyKey, propertyValue) {
        if (propertyKey) {
            super.emit(propertyKey, propertyValue);
            Reflect.deleteProperty(this.marked, propertyKey);
            return;
        }
        const latestChanges = this.marked;
        this.marked = {};
        Object.keys(latestChanges).forEach(propertyKey => {
            super.emit(propertyKey, latestChanges[propertyKey]);
        });
    }
    getClass() {
        return ReactiveScopeControl;
    }
}
export class ModuleScope extends ReactiveScope {
    constructor(context, propertyKeys) {
        super(context, propertyKeys);
    }
    importModule(propertyKey, scope) {
        this.scopeMap.set(propertyKey, scope);
    }
}
export class WebModuleScope extends ModuleScope {
    constructor() {
        super({});
    }
    updateContext(context) {
        this.context = context;
    }
}
//# sourceMappingURL=scope.js.map