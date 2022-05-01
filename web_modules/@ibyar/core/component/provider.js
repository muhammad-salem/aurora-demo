import { createProxyForContext, ReactiveScopeControl } from '../../expressions/index.js';
export class ElementModelReactiveScope extends ReactiveScopeControl {
    constructor() {
        super(...arguments);
        this.contextProxy = createProxyForContext(this);
    }
    static for(context, propertyKeys) {
        return new ElementModelReactiveScope(context, propertyKeys);
    }
    getContextProxy() {
        return this.contextProxy;
    }
    getClass() {
        return ElementModelReactiveScope;
    }
}
//# sourceMappingURL=provider.js.map