import { JavaScriptParser, Stack } from '../../expressions/index.js';
/**
 * ```ts
 * class View {
 *
 *	@HostListener('window:load', ['$event.target', '"load"'])
 * 	@HostListener('click', ['$event.target', '"click"'])
 * 	public onClick(target: any, type: string){
 * 		console.log(target, type);
 * 	}
 * }
 * ```
 *
 * window.addEventListener('load', $event => listener($event.target, 'load'));
 *
 * view.addEventListener('click', $event => listener($event.target, 'click'));
 *
 */
export class HostListenerHandler {
    constructor(listenerRef, element, elementScope) {
        this.listenerRef = listenerRef;
        this.element = element;
        this.elementScope = elementScope;
        this.listener = (event) => {
            const callback = this.element._model[this.listenerRef.modelCallbackName];
            if (typeof callback === 'function') {
                const eventScope = this.stack.pushBlockScopeFor({ $event: event });
                const params = this.argumentsExpression.get(this.stack);
                this.stack.clearTo(eventScope);
                this.element._zone.run(callback, this.element._model, params);
                typeof event.preventDefault === 'function' && event.preventDefault();
            }
        };
        this.stack = new Stack(elementScope);
    }
    onInit() {
        const args = this.listenerRef.args ?? [];
        const array = `[${args.join(', ')}]`;
        this.argumentsExpression = JavaScriptParser.parseScript(array);
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