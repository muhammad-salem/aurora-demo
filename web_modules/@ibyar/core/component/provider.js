import { createProxyForContext, ReactiveScopeControl } from '../../expressions/index.js';
export class ElementModelReactiveScope extends ReactiveScopeControl {
    constructor() {
        super(...arguments);
        this.contextProxy = createProxyForContext(this);
    }
    static for(context, type) {
        return new ElementModelReactiveScope(context, type);
    }
    static blockScopeFor(context) {
        return new ElementModelReactiveScope(context, 'block');
    }
    static functionScopeFor(context) {
        return new ElementModelReactiveScope(context, 'function');
    }
    static classScopeFor(context) {
        return new ElementModelReactiveScope(context, 'class');
    }
    static moduleScopeFor(context) {
        return new ElementModelReactiveScope(context, 'module');
    }
    static globalScopeFor(context) {
        return new ElementModelReactiveScope(context, 'global');
    }
    getContextProxy() {
        return this.contextProxy;
    }
}
//# provider.js.map