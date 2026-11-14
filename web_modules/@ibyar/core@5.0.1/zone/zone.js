/// <reference types='zone.js' />
import { EventEmitter } from '../component/events.js';
const NOOP = () => { };
const EMPTY_PAYLOAD = {};
let LastId = 0;
export class AbstractAuroraZone {
    onTry = new EventEmitter();
    onCatch = new EventEmitter();
    onFinal = new EventEmitter();
    onEmpty = new EventEmitter();
    id;
    constructor() {
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
    fork(type) {
        if (type === 'manual') {
            return new ManualAuroraZone(this);
        }
        else if (type === 'proxy') {
            return new ProxyAuroraZone(this);
        }
        return new AuroraZone(this);
    }
    run(callback, applyThis, applyArgs) {
        return this._inner.run(callback, applyThis, applyArgs);
    }
    runTask(callback, applyThis, applyArgs, name) {
        const zone = this._inner;
        const task = zone.scheduleEventTask(`AuroraZoneEvent: ${name ?? ''}`, callback, EMPTY_PAYLOAD, NOOP, NOOP);
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
    fork(type) {
        if (type === 'proxy') {
            return new ProxyAuroraZone(this);
        }
        else if (type === 'aurora') {
            return new AuroraZone(this);
        }
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
export class ProxyAuroraZone extends AbstractAuroraZone {
    _cdPromise;
    constructor(parent) {
        super();
        if (parent) {
            const self = this;
            self._nesting = 0;
            self._parent = parent;
        }
    }
    fork(type) {
        if (type === 'manual') {
            return new ManualAuroraZone(this);
        }
        else if (type === 'aurora') {
            return new AuroraZone(this);
        }
        return new ProxyAuroraZone(this);
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
    scheduleChangesDetection() {
        this._cdPromise ??= Promise
            .resolve()
            .then(() => {
            this.runCallback(NOOP);
            this._cdPromise = undefined;
        });
    }
}
//# sourceMappingURL=zone.js.map