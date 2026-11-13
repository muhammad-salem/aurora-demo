import { hasBindingHook } from '../../expressions/index.js';
const ProxyCache = new WeakMap();
/**
 * crete new proxy handler for object
 */
export class ZoneProxyHandler {
    _zone;
    static of(zone) {
        return new ZoneProxyHandler(zone);
    }
    constructor(_zone) {
        this._zone = _zone;
    }
    defineProperty(target, p, attributes) {
        this._zone.scheduleChangesDetection();
        return Reflect.defineProperty(target, p, attributes);
    }
    deleteProperty(target, p) {
        this._zone.scheduleChangesDetection();
        return Reflect.deleteProperty(target, p);
    }
    get(target, p, receiver) {
        const value = Reflect.get(target, p, receiver);
        if (ProxyCache.has(value)) {
            return ProxyCache.get(value);
        }
        if (!(value && typeof value === 'object') || hasBindingHook(value)) {
            return value;
        }
        const proxy = createProxyZone(value, this._zone);
        ProxyCache.set(value, proxy);
        return proxy;
    }
    set(target, p, value, receiver) {
        this._zone.scheduleChangesDetection();
        return Reflect.set(target, p, value, receiver);
    }
}
export function createRevocableProxyZone(model, zone) {
    return Proxy.revocable(model, new ZoneProxyHandler(zone));
}
export function createProxyZone(model, zone) {
    return new Proxy(model, new ZoneProxyHandler(zone));
}
//# sourceMappingURL=proxy.js.map