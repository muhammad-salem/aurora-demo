export class Scope {
    constructor(context, type) {
        this.context = context;
        this.type = type;
        this.scopeMap = new Map();
    }
    static for(context, type) {
        return new Scope(context, type);
    }
    static blockScopeFor(context) {
        return new Scope(context, 'block');
    }
    static functionScopeFor(context) {
        return new Scope(context, 'function');
    }
    static classScopeFor(context) {
        return new Scope(context, 'class');
    }
    static moduleScopeFor(context) {
        return new Scope(context, 'module');
    }
    static globalScopeFor(context) {
        return new Scope(context, 'global');
    }
    static blockScope() {
        return new Scope({}, 'block');
    }
    static functionScope() {
        return new Scope({}, 'function');
    }
    static classScope() {
        return new Scope({}, 'class');
    }
    static moduleScope() {
        return new Scope({}, 'module');
    }
    static globalScope() {
        return new Scope({}, 'global');
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
        scope = new Scope(scopeContext, 'block');
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
        scope = new Scope(scopeContext, 'block');
        this.scopeMap.set(propertyKey, scope);
        return scope;
    }
}
export class ReadOnlyScope extends Scope {
    static for(context, type) {
        return new ReadOnlyScope(context, type);
    }
    static blockScopeFor(context) {
        return new ReadOnlyScope(context, 'block');
    }
    static functionScopeFor(context) {
        return new ReadOnlyScope(context, 'function');
    }
    static classScopeFor(context) {
        return new ReadOnlyScope(context, 'class');
    }
    static moduleScopeFor(context) {
        return new ReadOnlyScope(context, 'module');
    }
    static globalScopeFor(context) {
        return new ReadOnlyScope(context, 'global');
    }
    static blockScope() {
        return new ReadOnlyScope({}, 'block');
    }
    static functionScope() {
        return new ReadOnlyScope({}, 'function');
    }
    static classScope() {
        return new ReadOnlyScope({}, 'class');
    }
    static moduleScope() {
        return new ReadOnlyScope({}, 'module');
    }
    static globalScope() {
        return new ReadOnlyScope({}, 'global');
    }
    set(propertyKey, value, receiver) {
        return false;
    }
    delete(propertyKey) {
        return false;
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
    constructor(context, type, name, parent) {
        super(context, type);
        this.name = name;
        this.parent = parent;
        this.observer = new ValueChangeObserver();
    }
    static for(context, type) {
        return new ReactiveScope(context, type);
    }
    static blockScopeFor(context) {
        return new ReactiveScope(context, 'block');
    }
    static functionScopeFor(context) {
        return new ReactiveScope(context, 'function');
    }
    static classScopeFor(context) {
        return new ReactiveScope(context, 'class');
    }
    static moduleScopeFor(context) {
        return new ReactiveScope(context, 'module');
    }
    static globalScopeFor(context) {
        return new ReactiveScope(context, 'global');
    }
    static blockScope() {
        return new ReactiveScope({}, 'block');
    }
    static functionScope() {
        return new ReactiveScope({}, 'function');
    }
    static classScope() {
        return new ReactiveScope({}, 'class');
    }
    static moduleScope() {
        return new ReactiveScope({}, 'module');
    }
    static globalScope() {
        return new ReactiveScope({}, 'global');
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
        scope = new ReactiveScope(scopeContext, 'block', propertyKey, this);
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
        scope = new ReactiveScope(scopeContext, 'block', propertyKey, this);
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
}
export class ReactiveScopeControl extends ReactiveScope {
    constructor() {
        super(...arguments);
        this.attached = true;
        this.marked = {};
    }
    static for(context, type) {
        return new ReactiveScopeControl(context, type);
    }
    static blockScopeFor(context) {
        return new ReactiveScopeControl(context, 'block');
    }
    static functionScopeFor(context) {
        return new ReactiveScopeControl(context, 'function');
    }
    static classScopeFor(context) {
        return new ReactiveScopeControl(context, 'class');
    }
    static moduleScopeFor(context) {
        return new ReactiveScopeControl(context, 'module');
    }
    static globalScopeFor(context) {
        return new ReactiveScopeControl(context, 'global');
    }
    static blockScope() {
        return new ReactiveScopeControl({}, 'block');
    }
    static functionScope() {
        return new ReactiveScopeControl({}, 'function');
    }
    static classScope() {
        return new ReactiveScopeControl({}, 'class');
    }
    static moduleScope() {
        return new ReactiveScopeControl({}, 'module');
    }
    static globalScope() {
        return new ReactiveScopeControl({}, 'global');
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
}
//# scope.js.map