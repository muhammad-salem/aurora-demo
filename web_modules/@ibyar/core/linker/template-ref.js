import { createProxyForContext, findReactiveScopeByEventMap, Stack } from '../../expressions/index.js';
import { EmbeddedViewRefImpl } from './view-ref.js';
export class TemplateRef {
}
export class TemplateRefImpl extends TemplateRef {
    constructor(render, node, stack, templateExpressions) {
        super();
        this.render = render;
        this.node = node;
        this.stack = stack;
        this.templateExpressions = templateExpressions;
    }
    get astNode() {
        return this.node;
    }
    set host(host) {
        this._host = host;
    }
    createEmbeddedView(context, parentNode) {
        const directiveStack = this.stack.copyStack();
        const templateScope = directiveStack.pushReactiveScope();
        const sandBox = new Stack();
        const contextScope = sandBox.pushReactiveScopeFor(context ?? {});
        sandBox.pushScope(templateScope);
        const elements = [];
        const contextProxy = createProxyForContext(contextScope);
        const subscriptions = [];
        const embeddedViewRef = new EmbeddedViewRefImpl(contextProxy, elements, subscriptions);
        const scopeSubscriptions = this.executeTemplateExpressions(sandBox);
        scopeSubscriptions && subscriptions.push(...scopeSubscriptions);
        const fragment = document.createDocumentFragment();
        this.render.appendChildToParent(fragment, this.node, directiveStack, parentNode, subscriptions, this._host);
        fragment.childNodes.forEach(item => elements.push(item));
        return embeddedViewRef;
    }
    executeTemplateExpressions(sandBox) {
        if (!this.templateExpressions?.length) {
            return;
        }
        this.templateExpressions.forEach(expression => {
            expression.get(sandBox);
        });
        const scopeSubscriptions = [];
        this.templateExpressions.forEach(expression => {
            const events = expression.events();
            const scopeTuples = findReactiveScopeByEventMap(events, sandBox);
            scopeTuples.forEach(tuple => {
                const subscription = tuple[1].subscribe(tuple[0], () => {
                    expression.get(sandBox);
                });
                scopeSubscriptions.push(subscription);
            });
        });
        return scopeSubscriptions;
    }
}
//# sourceMappingURL=template-ref.js.map