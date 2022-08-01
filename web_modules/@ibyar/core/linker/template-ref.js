import { findReactiveScopeByEventMap, ReactiveScopeControl, Stack } from '../../expressions/index.js';
import { EmbeddedViewRefImpl } from './view-ref.js';
export class TemplateRef {
}
export class TemplateRefImpl extends TemplateRef {
    constructor(_render, _node, _stack, _templateExpressions) {
        super();
        this._render = _render;
        this._node = _node;
        this._stack = _stack;
        this._templateExpressions = _templateExpressions;
    }
    get astNode() {
        return this._node;
    }
    set host(host) {
        this._host = host;
    }
    createEmbeddedView(context = {}, parentNode) {
        const directiveStack = this._stack.copyStack();
        const templateScope = ReactiveScopeControl.blockScope();
        directiveStack.pushScope(templateScope);
        const sandBox = new Stack();
        const contextScope = ReactiveScopeControl.for(context);
        sandBox.pushScope(contextScope);
        sandBox.pushScope(templateScope);
        const elements = [];
        const subscriptions = [];
        const embeddedViewRef = new EmbeddedViewRefImpl(contextScope, elements, subscriptions);
        const scopeSubscriptions = this.executeTemplateExpressions(sandBox);
        scopeSubscriptions && subscriptions.push(...scopeSubscriptions);
        const fragment = document.createDocumentFragment();
        this._render.appendChildToParent(fragment, this._node, directiveStack, parentNode, subscriptions, this._host);
        fragment.childNodes.forEach(item => elements.push(item));
        // const updateSubscriptions = this.render.view._zone.onFinal.subscribe(() => contextScope.detectChanges());
        // embeddedViewRef.onDestroy(() => updateSubscriptions.unsubscribe());
        return embeddedViewRef;
    }
    executeTemplateExpressions(sandBox) {
        if (!this._templateExpressions?.length) {
            return;
        }
        // init value
        this._templateExpressions.forEach(expression => {
            expression.get(sandBox);
        });
        // subscribe to changes
        const scopeSubscriptions = [];
        this._templateExpressions.forEach(expression => {
            const events = expression.events();
            const scopeTuples = findReactiveScopeByEventMap(events, sandBox);
            scopeTuples.forEach(tuple => {
                const subscription = tuple[1].subscribe(tuple[0], () => expression.get(sandBox));
                scopeSubscriptions.push(subscription);
            });
        });
        return scopeSubscriptions;
    }
}
//# sourceMappingURL=template-ref.js.map