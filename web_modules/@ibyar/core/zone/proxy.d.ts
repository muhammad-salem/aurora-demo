import { RevocableProxy } from '@ibyar/expressions';
import { ProxyAuroraZone } from './zone.js';
/**
 * crete new proxy handler for object
 */
export declare class ZoneProxyHandler<T extends object> implements ProxyHandler<T> {
    private _zone;
    static of<M extends object>(zone: ProxyAuroraZone): ZoneProxyHandler<M>;
    constructor(_zone: ProxyAuroraZone);
    defineProperty(target: T, p: string | symbol, attributes: PropertyDescriptor): boolean;
    deleteProperty(target: T, p: string | symbol): boolean;
    get(target: T, p: string | symbol, receiver: any): any;
    set(target: T, p: string | symbol, value: any, receiver: any): boolean;
}
export declare function createRevocableProxyZone<T extends object>(model: T, zone: ProxyAuroraZone): RevocableProxy<T>;
export declare function createProxyZone<T extends object>(model: T, zone: ProxyAuroraZone): T;
//# sourceMappingURL=proxy.d.ts.map