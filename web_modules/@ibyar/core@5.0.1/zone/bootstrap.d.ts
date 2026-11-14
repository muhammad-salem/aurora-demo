import { AuroraZone } from './zone.js';
export type ZoneType = 
/**
 * used when zone.js is disabled, no change detection will applied
 */
'manual'
/***
 * used when zone.js is disabled, try to detection changes using ES6 proxy handler.
 */
 | 'proxy'
/***
 * use when zone.js is active and loaded throw a polyfills file.
 *
 * active  change detection
 */
 | 'aurora';
/**
 * call once to init the aurora zone, for the platform
 */
export declare function bootstrapZone(type?: ZoneType): void;
export declare function getRootZone(): AuroraZone;
//# sourceMappingURL=bootstrap.d.ts.map