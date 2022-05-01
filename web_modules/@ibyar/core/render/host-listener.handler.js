import { JavaScriptParser, Stack } from '../../expressions/index.js';
export class HostListenerHandler {
    constructor(listenerRef, element, elementScope) {
        this.listenerRef = listenerRef;
        this.element = element;
        this.elementScope = elementScope;
        this.listener = (event) => {
            const method = this.element._proxyModel[this.listenerRef.modelCallbackName];
            if (typeof method === 'function') {
                const eventScope = this.stack.pushBlockScopeFor({ $event: event });
                const params = this.argumentsExpression.get(this.stack);
                this.stack.clearTo(eventScope);
                method.apply(this.element._proxyModel, params);
                typeof event.preventDefault === 'function' && event.preventDefault();
            }
        };
        this.stack = new Stack(elementScope);
    }
    onInit() {
        const args = this.listenerRef.args ?? [];
        const array = `[${args.join(', ')}]`;
        this.argumentsExpression = JavaScriptParser.parse(array);
        if (this.listenerRef.eventName.includes(':')) {
            const [eventSource, eventName] = this.listenerRef.eventName.split(':', 2);
            this.eventName = eventName;
            if ('window' === eventSource.toLowerCase()) {
                this.source = window;
            }
            else {
                let source = this.elementScope.get(eventSource);
                this.scopeSubscription = this.elementScope.subscribe(eventSource, (newValue) => {
                    if (source !== newValue) {
                        if (source) {
                            this.removeEventListener();
                        }
                    }
                    else if (!newValue) {
                        this.removeEventListener();
                    }
                    source = newValue;
                    this.addEventListener();
                });
                this.source = source;
            }
        }
        else {
            this.eventName = this.listenerRef.eventName;
            this.source = this.element;
        }
        this.addEventListener();
    }
    addEventListener() {
        this.source?.addEventListener(this.eventName, this.listener);
    }
    removeEventListener() {
        this.source?.removeEventListener(this.eventName, this.listener);
    }
    onConnect() {
        this.scopeSubscription?.resume();
    }
    onDisconnect() {
        this.scopeSubscription?.pause();
    }
    onDestroy() {
        this.scopeSubscription?.unsubscribe();
        this.removeEventListener();
    }
}
//# sourceMappingURL=host-listener.handler.js.map