import { provide } from '../di/inject.js';
export class ShadowRootService {
    shadowRoots = new WeakMap();
    has(elem) {
        return this.shadowRoots.has(elem);
    }
    get(elem) {
        return this.shadowRoots.get(elem);
    }
    set(elem, root) {
        this.shadowRoots.set(elem, root);
    }
}
provide(ShadowRootService);
//# sourceMappingURL=shadow-root.js.map