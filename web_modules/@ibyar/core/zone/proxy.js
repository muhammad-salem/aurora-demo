import { hasBindingHook } from '../../expressions/index.js';
/**
 * crete new proxy handler for object
 */
export class ZoneProxyHandler {
    constructor(_zone) {
        this._zone = _zone;
    }
    defineProperty(target, p, attributes) {
        return this._zone.run(Reflect.defineProperty, target, [target, p, attributes]);
    }
    deleteProperty(target, p) {
        return this._zone.run(Reflect.deleteProperty, target, [target, p]);
    }
    get(target, p, receiver) {
        const value = Reflect.get(target, p, receiver);
        if (!(value && typeof value === 'object') || hasBindingHook(value)) {
            return value;
        }
        return createZoneProxyHandler(value, this._zone);
    }
    set(target, p, value, receiver) {
        return this._zone.run(Reflect.set, target, [target, p, value, receiver]);
    }
}
export function createRevocableZoneProxyHandler(model, zone) {
    return Proxy.revocable(model, new ZoneProxyHandler(zone));
}
export function createZoneProxyHandler(model, zone) {
    return new Proxy(model, new ZoneProxyHandler(zone));
}
//# sourceMappingURL=proxy.js.map