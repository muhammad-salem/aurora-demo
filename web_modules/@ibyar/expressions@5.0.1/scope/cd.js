const SKIP_CHANGE_DETECTION = new WeakMap();
export function skipChangeDetection(obj) {
    if (obj !== null && typeof obj === 'object') {
        SKIP_CHANGE_DETECTION.set(obj, true);
    }
}
export function isChangeDetectionSkipped(obj) {
    return obj !== null && typeof obj === 'object' && SKIP_CHANGE_DETECTION.has(obj);
}
//# sourceMappingURL=cd.js.map