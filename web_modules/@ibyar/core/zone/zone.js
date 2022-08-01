/// <reference types='zone.js' />
import { hasBindingHook } from '../../expressions/index.js';
import { EventEmitter } from '../component/events.js';
import { createZoneProxyHandler } from './proxy.js';
const NOOP = () => { };
const EMPTY_PAYLOAD = {};
let LastId = 0;
export class AbstractAuroraZone {
    constructor() {
        this.onTry = new EventEmitter();
        this.onCatch = new EventEmitter();
        this.onFinal = new EventEmitter();
        this.onEmpty = new EventEmitter();
        this.id = ++LastId;
    }
}
export class AuroraZone extends AbstractAuroraZone {
    static isInAuroraZone() {
        return typeof Zone !== 'undefined' && Zone.current.get('aurora-zone') === true;
    }
    static assertInAuroraZone() {
        if (!AuroraZone.isInAuroraZone()) {
            throw new Error('Expected to be in Aurora Zone, but it is not!');
        }
    }
    static assertNotInAuroraZone() {
        if (AuroraZone.isInAuroraZone()) {
            throw new Error('Expected to not be in Aurora Zone, but it is!');
        }
    }
    constructor(parent) {
        if (typeof Zone == 'undefined') {
            throw new Error(`In this configuration Zone.js is  required`);
        }
        Zone.assertZonePatched();
        super();
        const self = this;
        self._nesting = 0;
        self._outer = Zone.root;
        if (parent) {
            self._parent = parent;
            self._inner = parent._inner;
        }
        else {
            self._inner = Zone.current;
            if (Zone['TaskTrackingZoneSpec']) {
                self._inner = self._inner.fork(new Zone['TaskTrackingZoneSpec']);
            }
        }
        self._inner = self._inner.fork({
            name: 'aurora',
            properties: { 'aurora-zone': true, id: self.id },
            onInvoke: (parentZoneDelegate, currentZone, targetZone, delegate, applyThis, applyArgs, source) => {
                try {
                    before(self);
                    return parentZoneDelegate.invoke(targetZone, delegate, applyThis, applyArgs, source);
                }
                finally {
                    after(self);
                }
            },
            onInvokeTask: (parentZoneDelegate, currentZone, targetZone, task, applyThis, applyArgs) => {
                try {
                    before(self);
                    return parentZoneDelegate.invokeTask(targetZone, task, applyThis, applyArgs);
                }
                finally {
                    after(self);
                }
            },
            onHandleError: (parentZoneDelegate, currentZone, targetZone, error) => {
                parentZoneDelegate.handleError(targetZone, error);
                self.runOutsideAurora(() => self.onCatch.emit(error));
                return false;
            },
        });
    }
    fork() {
        return new AuroraZone(this);
    }
    run(callback, applyThis, applyArgs) {
        return this._inner.run(callback, applyThis, applyArgs);
    }
    runTask(callback, applyThis, applyArgs, name) {
        const zone = this._inner;
        const task = zone.scheduleEventTask('AuroraZoneEvent: ' + name ?? '', callback, EMPTY_PAYLOAD, NOOP, NOOP);
        try {
            return zone.runTask(task, applyThis, applyArgs);
        }
        finally {
            zone.cancelTask(task);
        }
    }
    runGuarded(callback, applyThis, applyArgs) {
        return this._inner.runGuarded(callback, applyThis, applyArgs);
    }
    runOutsideAurora(callback) {
        return this._outer.run(callback);
    }
}
function before(zone) {
    zone.onTry.emit();
    zone._nesting++;
}
function after(zone) {
    zone._nesting--;
    zone.onFinal.emit();
    if (zone._nesting === 0) {
        zone.onEmpty.emit();
    }
}
export class ManualAuroraZone extends AbstractAuroraZone {
    constructor(parent) {
        super();
        if (parent) {
            const self = this;
            self._nesting = 0;
            self._parent = parent;
        }
    }
    fork() {
        return new ManualAuroraZone(this);
    }
    runCallback(callback, applyThis, applyArgs) {
        try {
            before(this);
            return callback.apply(applyThis, applyArgs);
        }
        catch (error) {
            this.onCatch.emit();
            throw error;
        }
        finally {
            after(this);
        }
    }
    run(callback, applyThis, applyArgs) {
        return this.runCallback(callback, applyThis, applyArgs);
    }
    runTask(callback, applyThis, applyArgs, name) {
        return this.runCallback(callback, applyThis, applyArgs);
    }
    runGuarded(callback, applyThis, applyArgs) {
        return this.runCallback(callback, applyThis, applyArgs);
    }
    runOutsideAurora(callback) {
        return callback();
    }
}
const ReflectInterceptors = [Reflect.defineProperty, Reflect.deleteProperty, Reflect.get, Reflect.set];
export class ProxyAuroraZone extends AbstractAuroraZone {
    constructor(parent) {
        super();
        if (parent) {
            const self = this;
            self._nesting = 0;
            self._parent = parent;
        }
    }
    fork() {
        return new ProxyAuroraZone(this);
    }
    runCallback(callback, applyThis, applyArgs) {
        try {
            before(this);
            if (ReflectInterceptors.includes(callback) || hasBindingHook(applyThis)) {
                return callback.apply(void 0, applyArgs);
            }
            else if (applyThis) {
                const proxy = createZoneProxyHandler(applyThis, this);
                return callback.apply(proxy, applyArgs);
            }
            else {
                return callback.apply(applyThis, applyArgs);
            }
        }
        catch (error) {
            this.onCatch.emit();
            throw error;
        }
        finally {
            after(this);
        }
    }
    run(callback, applyThis, applyArgs) {
        return this.runCallback(callback, applyThis, applyArgs);
    }
    runTask(callback, applyThis, applyArgs, name) {
        return this.runCallback(callback, applyThis, applyArgs);
    }
    runGuarded(callback, applyThis, applyArgs) {
        return this.runCallback(callback, applyThis, applyArgs);
    }
    runOutsideAurora(callback) {
        return callback();
    }
}
//# sourceMappingURL=zone.js.map