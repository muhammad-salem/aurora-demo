import { AuroraZone, ManualAuroraZone, ProxyAuroraZone } from './zone.js';
const manualAuroraZone = new ManualAuroraZone();
let proxyAuroraZone;
let auroraZone;
/**
 * call once to init the aurora zone, for the platform
 */
export function bootstrapZone(type) {
    if (auroraZone) {
        return;
    }
    if ('aurora' === type?.toLowerCase()) {
        auroraZone = new AuroraZone();
    }
    else if ('proxy' === type?.toLowerCase()) {
        auroraZone = proxyAuroraZone = new ProxyAuroraZone();
    }
    else {
        auroraZone = manualAuroraZone;
    }
}
export function getCurrentZone(type) {
    if (type) {
        switch (type.toLowerCase()) {
            case 'aurora':
                return auroraZone ?? (auroraZone = new AuroraZone());
            case 'proxy':
                return proxyAuroraZone ?? (proxyAuroraZone = new ProxyAuroraZone());
            default:
            case 'manual': return manualAuroraZone;
        }
    }
    return auroraZone ?? manualAuroraZone;
}
//# sourceMappingURL=bootstrap.js.map