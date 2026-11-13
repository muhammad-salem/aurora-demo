import { isChangeDetectionSkipped } from './cd.js';
export class Scope {
    _ctx;
    _keys;
    static for(ctx, propertyKeys) {
        return new Scope(ctx, propertyKeys);
    }
    static blockScope(propertyKeys) {
        return new Scope({}, propertyKeys);
    }
    _inners = new Map();
    constructor(_ctx, _keys) {
        this._ctx = _ctx;
        this._keys = _keys;
    }
    get(key) {
        return Reflect.get(this._ctx, key);
    }
    set(key, value, receiver) {
        return Reflect.set(this._ctx, key, value);
    }
    has(key) {
        return this._keys?.includes(key) ?? key in this._ctx;
    }
    delete(key) {
        return Reflect.deleteProperty(this._ctx, key);
    }
    getContext() {
        return this._ctx;
    }
    getInnerScope(key) {
        const ctx = this.get(key);
        let scope = this._inners.get(key);
        if (scope) {
            scope._ctx = ctx;
            return scope;
        }
        if (!(ctx && typeof ctx === 'object')) {
            return;
        }
        scope = new (this.getClass())(ctx, undefined, key, this);
        this._inners.set(key, scope);
        return scope;
    }
    setInnerScope(key, scope) {
        if (scope) {
            this._inners.set(key, scope);
            return scope;
        }
        const ctx = this.get(key);
        scope = new (this.getClass())(ctx, undefined, key, this);
        this._inners.set(key, scope);
        return scope;
    }
    getClass() {
        return Scope;
    }
}
export class ReadOnlyScope extends Scope {
    static for(ctx, propertyKeys) {
        return new ReadOnlyScope(ctx, propertyKeys);
    }
    static blockScope(propertyKeys) {
        return new ReadOnlyScope({}, propertyKeys);
    }
    set(propertyKey, value, receiver) {
        // do nothing
        return false;
    }
    delete(propertyKey) {
        // do nothing
        return false;
    }
    getClass() {
        return ReadOnlyScope;
    }
}
export class ScopeSubscription {
    propertyKey;
    observer;
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
    _subscribers = new Map();
    _lock = [];
    emit(propertyKey, newValue, oldValue) {
        if (this._lock.includes(propertyKey)) {
            return;
        }
        const subscribers = this._subscribers.get(propertyKey);
        if (!subscribers || subscribers.size == 0) {
            return;
        }
        this._lock.push(propertyKey);
        const currentSubscription = Array.from(subscribers.values());
        currentSubscription.forEach(subscriptionInfo => {
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
        if (this._lock.pop() !== propertyKey) {
            console.error('lock error');
        }
        ;
    }
    subscribe(propertyKey, callback) {
        const subscription = new ScopeSubscription(propertyKey, this);
        let propertySubscribers = this._subscribers.get(propertyKey);
        if (!propertySubscribers) {
            propertySubscribers = new Map();
            this._subscribers.set(propertyKey, propertySubscribers);
        }
        propertySubscribers.set(subscription, { callback, enable: true });
        return subscription;
    }
    unsubscribe(propertyKey, subscription) {
        if (subscription) {
            this._subscribers.get(propertyKey)?.delete(subscription);
        }
        else {
            this._subscribers.delete(propertyKey);
        }
    }
    pause(propertyKey, subscription) {
        const subscriptionInfo = this._subscribers.get(propertyKey)?.get(subscription);
        subscriptionInfo && (subscriptionInfo.enable = false);
    }
    resume(propertyKey, subscription) {
        const subscriptionInfo = this._subscribers.get(propertyKey)?.get(subscription);
        subscriptionInfo && (subscriptionInfo.enable = true);
    }
    hasSubscribers(propertyKey) {
        if (propertyKey) {
            return (this._subscribers.get(propertyKey)?.size ?? 0) > 0;
        }
        return this._subscribers.size > 0;
    }
    /**
     * clear subscription maps
     */
    destroy() {
        this._subscribers.clear();
    }
}
export class ReactiveScope extends Scope {
    _name;
    _parent;
    static for(context, propertyKeys) {
        return new ReactiveScope(context, propertyKeys);
    }
    static blockScope(propertyKeys) {
        return new ReactiveScope({}, propertyKeys);
    }
    static scopeForThis(ctx, propertyKeys) {
        const thisScope = ReactiveScope.for(ctx, propertyKeys);
        const thisCtx = {
            'this': ctx,
        };
        const rootScope = Scope.for(thisCtx, ['this']);
        rootScope.setInnerScope('this', thisScope);
        return rootScope;
    }
    static readOnlyScopeForThis(ctx, propertyKeys) {
        const thisScope = ReactiveScope.for(ctx, propertyKeys);
        const thisCtx = {
            'this': ctx,
        };
        const rootScope = ReadOnlyScope.for(thisCtx, ['this']);
        rootScope.setInnerScope('this', thisScope);
        return rootScope;
    }
    static readOnlyScopeForAliasThis(ctx, alias) {
        const thisScope = ReactiveScope.for(ctx);
        const thisCtx = {
            'this': ctx,
            [alias]: ctx,
        };
        const rootScope = ReadOnlyScope.for(thisCtx, ['this', alias]);
        rootScope.setInnerScope('this', thisScope);
        rootScope.setInnerScope(alias, thisScope);
        return rootScope;
    }
    _clone;
    _observer = new ValueChangeObserver();
    constructor(context, propertyKeys, _name, _parent) {
        super(context, propertyKeys);
        this._name = _name;
        this._parent = _parent;
        this._clone = Object.assign({}, context);
    }
    set(propertyKey, newValue, receiver) {
        const oldValue = Reflect.get(this._ctx, propertyKey);
        const result = Reflect.set(this._ctx, propertyKey, newValue);
        if (result) {
            this.emit(propertyKey, newValue, oldValue);
        }
        return result;
    }
    delete(propertyKey) {
        const oldValue = Reflect.get(this._ctx, propertyKey);
        const isDelete = Reflect.deleteProperty(this._ctx, propertyKey);
        if (isDelete && oldValue !== undefined) {
            this.emit(propertyKey, undefined, oldValue);
        }
        return isDelete;
    }
    emit(propertyKey, newValue, oldValue) {
        this._observer.emit(propertyKey, newValue, oldValue);
        this._parent?.emit(this._name, this._ctx);
    }
    subscribe(propertyKey, callback) {
        return this._observer.subscribe(propertyKey, callback);
    }
    unsubscribe(propertyKey, subscription) {
        if (subscription && propertyKey !== null && propertyKey !== undefined) {
            this._observer.unsubscribe(propertyKey, subscription);
        }
        else if (propertyKey !== null && propertyKey !== undefined) {
            this._observer.unsubscribe(propertyKey);
        }
        else {
            this._observer.destroy();
        }
    }
    detectChanges() {
        const previous = this._clone;
        const current = this._ctx;
        if ((!!!previous && !!current) || (!!previous && !!!current)) {
            this._parent?.emit(this._name, current);
            return;
        }
        const keys = this._keys ?? this.getPropertyKeys(previous, current);
        keys.forEach(key => {
            const pv = previous[key];
            const cv = current[key];
            const pt = typeof pv;
            const ct = typeof cv;
            if (pt === 'object') {
                if (ct === 'object' && pv == cv) {
                    this.getInnerScope(key)?.detectChanges();
                }
                else if (cv != pv) {
                    this.emit(key, cv, pv);
                }
            }
            else if (ct === 'object') {
                this.emit(key, cv, pv);
            }
            else if (pv != cv) {
                this.emit(key, cv, pv);
            }
        });
        this._clone = Object.assign({}, this._ctx);
    }
    getPropertyKeys(...objs) {
        let keys = [];
        objs.forEach(obj => {
            keys.push(...Object.keys(obj).filter(key => !isChangeDetectionSkipped(obj[key])));
            keys.push(...Object.getOwnPropertySymbols(obj));
        });
        keys = Array.from(new Set(keys));
        keys = keys.filter(key => {
            switch (typeof key) {
                case 'string':
                    return !key.startsWith('_');
                case 'symbol':
                    return !key.toString().startsWith('Symbol(_');
                default:
                    return false;
            }
        });
        return keys;
    }
    getClass() {
        return ReactiveScope;
    }
}
export class ReactiveControlScope extends ReactiveScope {
    static for(context, propertyKeys) {
        return new ReactiveControlScope(context, propertyKeys);
    }
    static blockScope(propertyKeys) {
        return new ReactiveControlScope({}, propertyKeys);
    }
    static scopeForThis(ctx, propertyKeys) {
        const thisScope = ReactiveControlScope.for(ctx, propertyKeys);
        const thisCtx = {
            'this': ctx,
        };
        const rootScope = Scope.for(thisCtx, ['this']);
        rootScope.setInnerScope('this', thisScope);
        return rootScope;
    }
    static readOnlyScopeForThis(ctx, propertyKeys) {
        const thisScope = ReactiveControlScope.for(ctx, propertyKeys);
        const thisCtx = {
            'this': ctx,
        };
        const rootScope = ReadOnlyScope.for(thisCtx, ['this']);
        rootScope.setInnerScope('this', thisScope);
        return rootScope;
    }
    static reactiveScopeForThis(ctx, propertyKeys) {
        const thisScope = ReactiveScope.for(ctx, propertyKeys);
        const thisCtx = {
            'this': ctx,
        };
        const rootScope = Scope.for(thisCtx, ['this']);
        rootScope.setInnerScope('this', thisScope);
        return rootScope;
    }
    _attached = true;
    _marked = {};
    emit(propertyKey, newValue, oldValue) {
        if (this._attached) {
            super.emit(propertyKey, newValue, oldValue);
        }
        else if (this._marked[propertyKey]) {
            if (newValue == this._marked[propertyKey][1]) {
                delete this._marked[propertyKey];
            }
            else {
                this._marked[propertyKey][0] = newValue;
            }
        }
        else {
            this._marked[propertyKey] = [newValue, oldValue];
        }
    }
    isAttached() {
        return this._attached;
    }
    detach() {
        this._attached = false;
    }
    reattach() {
        this._attached = true;
        this.emitChanges();
    }
    emitChanges(propertyKey, propertyValue) {
        if (propertyKey) {
            super.emit(propertyKey, propertyValue);
            Reflect.deleteProperty(this._marked, propertyKey);
            return;
        }
        const latestChanges = this._marked;
        this._marked = {};
        const keys = this._keys ?? this.getPropertyKeys(latestChanges);
        keys.forEach(propertyKey => {
            this._observer.emit(propertyKey, latestChanges[propertyKey][0], latestChanges[propertyKey][1]);
        });
        keys.length && this._parent?.emit(this._name, this._ctx);
    }
    detectChanges() {
        this.detach();
        super.detectChanges();
        this.reattach();
    }
    checkNoChanges() {
        this.detach();
        super.detectChanges();
        const keys = Object.keys(this._marked);
        if (keys.length > 0) {
            throw new Error(`Some Changes had been detected`);
        }
    }
    getClass() {
        return ReactiveControlScope;
    }
}
export class ModuleScope extends ReactiveScope {
    constructor(context, propertyKeys) {
        super(context, propertyKeys);
    }
    importModule(propertyKey, scope) {
        this._ctx[propertyKey] = scope._ctx;
        this._inners.set(propertyKey, scope);
        this.detectChanges();
    }
}
export class WebModuleScope extends ModuleScope {
    source;
    importCallOptions;
    // private loaded = false;
    import;
    constructor(source, importCallOptions) {
        super({});
        this.source = source;
        this.importCallOptions = importCallOptions;
        this.import = import(source
        /*, { with: importCallOptions?.with } */ // TODO: update in future, node16, ESNEXT,ES2022, ES2023, ES2024, ES2025
        ).then(module => (this.updateContext(module))).then(() => this._ctx, () => this._ctx);
    }
    updateContext(context) {
        this._ctx = context;
        this.detectChanges();
    }
    resolveImport() {
        return this.import;
    }
}
//# sourceMappingURL=scope.js.map