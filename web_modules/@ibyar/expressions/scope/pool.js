import { ReactiveScope, ReactiveControlScope, ReadOnlyScope, Scope } from './scope.js';
const pool = new WeakMap();
export function getScopeFor(ctx, type, propertyKeys) {
    if (pool.has(ctx)) {
        return pool.get(ctx);
    }
    if (!type) {
        return;
    }
    let scope;
    switch (type) {
        case 'read-only':
            scope = ReadOnlyScope.for(ctx, propertyKeys);
            break;
        case 'reactive':
            scope = ReactiveScope.for(ctx, propertyKeys);
            break;
        case 'reactive-control':
            scope = ReactiveControlScope.for(ctx, propertyKeys);
            break;
        default:
        case 'scope':
            scope = Scope.for(ctx, propertyKeys);
            break;
    }
    pool.set(ctx, scope);
    return scope;
}
//# sourceMappingURL=pool.js.map