import { ReactiveScope } from '../../expressions/index.js';
import { CommentNode, DomStructuralDirectiveNode, DomElementNode, DomFragmentNode, isLiveTextContent, isTagNameNative, isValidCustomElementName, TextContent } from '../../elements/index.js';
import { isHTMLComponent } from '../component/custom-element.js';
import { documentStack } from '../context/stack.js';
import { ClassRegistryProvider } from '../providers/provider.js';
import { isOnDestroy, isOnInit } from '../component/lifecycle.js';
import { hasAttr } from '../utils/elements-util.js';
import { AttributeDirective, AttributeOnStructuralDirective } from '../directive/directive.js';
import { TemplateRefImpl } from '../linker/template-ref.js';
import { ViewContainerRefImpl } from '../linker/view-container-ref.js';
import { createSubscriptionDestroyer } from '../context/subscription.js';
import { HostListenerHandler } from '../render/host-listener.handler.js';
function getInputEventName(element) {
    switch (true) {
        case element instanceof HTMLInputElement:
            return 'input';
        case element instanceof HTMLTextAreaElement:
        case element instanceof HTMLSelectElement:
            return 'change';
        default:
            return undefined;
    }
}
export class ComponentRender {
    constructor(view, subscriptions) {
        this.view = view;
        this.subscriptions = subscriptions;
        this.viewScope = new ReactiveScope({});
        this.componentRef = this.view.getComponentRef();
        this.contextStack = documentStack.copyStack();
        this.contextStack.pushScope(this.view._modelScope);
        this.templateNameScope = this.contextStack.pushReactiveScope();
    }
    initView() {
        if (this.componentRef.template) {
            if (typeof this.componentRef.template === 'function') {
                this.template = this.componentRef.template(this.view._model);
            }
            else {
                this.template = this.componentRef.template;
            }
            let rootRef;
            if (this.componentRef.isShadowDom) {
                if (this.view.shadowRoot) {
                    rootRef = this.view.shadowRoot;
                }
                else {
                    rootRef = Reflect.get(this.view, '_shadowRoot');
                    Reflect.deleteProperty(this.view, '_shadowRoot');
                }
            }
            else {
                rootRef = this.view;
            }
            this.initTemplateRefMap(this.template);
            let rootFragment;
            if (this.template instanceof DomFragmentNode) {
                rootFragment = this.createDocumentFragment(this.template, this.contextStack, rootRef, this.subscriptions, this.view);
            }
            else {
                rootFragment = document.createDocumentFragment();
                this.appendChildToParent(rootFragment, this.template, this.contextStack, rootRef, this.subscriptions, this.view);
            }
            rootRef.append(rootFragment);
        }
    }
    isTemplateRefName(template) {
        if (template instanceof DomElementNode) {
            if (template.tagName === 'template' && template.templateRefName) {
                return true;
            }
        }
        return false;
    }
    initTemplateRefMap(domNode) {
        if (domNode instanceof DomElementNode || domNode instanceof DomFragmentNode) {
            if (domNode.children) {
                for (let index = 0; index < domNode.children.length; index++) {
                    const child = domNode.children[index];
                    if (this.isTemplateRefName(child)) {
                        this.templateNameScope.set(child.templateRefName.name, undefined);
                    }
                    else {
                        this.initTemplateRefMap(child);
                    }
                }
            }
        }
    }
    initHostListener() {
        const handlers = this.componentRef.hostListeners.map(listenerRef => new HostListenerHandler(listenerRef, this.view, this.viewScope));
        handlers.forEach(handler => handler.onInit());
        handlers.forEach(handler => this.subscriptions.push(createSubscriptionDestroyer(() => handler.onDestroy(), () => handler.onDisconnect(), () => handler.onConnect())));
    }
    addNativeEventListener(source, eventName, funcCallback) {
        source.addEventListener(eventName, (event) => {
            funcCallback.call(this.view._proxyModel, event);
        });
    }
    getElementByName(name) {
        return Reflect.get(this.view, name);
    }
    createStructuralDirective(directive, comment, directiveStack, subscriptions, parentNode, host) {
        const directiveRef = ClassRegistryProvider.getDirectiveRef(directive.name);
        if (directiveRef) {
            const stack = directiveStack.copyStack();
            const templateRef = new TemplateRefImpl(this, directive.node, stack, directive.templateExpressions ?? []);
            const viewContainerRef = new ViewContainerRefImpl(parentNode, comment);
            const StructuralDirectiveClass = directiveRef.modelClass;
            const structural = new StructuralDirectiveClass(templateRef, viewContainerRef, host);
            templateRef.host = structural;
            stack.pushReactiveScopeFor({ 'this': structural });
            const dSubs = this.initStructuralDirective(structural, directive, stack);
            subscriptions.push(...dSubs);
            if (isOnInit(structural)) {
                structural.onInit();
            }
            if (directive.attributeDirectives?.length) {
                this.initAttributeDirectives(directive.attributeDirectives, structural, stack, subscriptions);
            }
            if (isOnDestroy(structural)) {
                subscriptions.push(createSubscriptionDestroyer(() => structural.onDestroy()));
            }
        }
        else {
        }
    }
    createComment(node) {
        return document.createComment(`${node.comment}`);
    }
    createText(node) {
        return new Text(node.value);
    }
    createLiveText(textNode, contextStack, parentNode, subscriptions) {
        const liveText = new Text('');
        contextStack = contextStack.copyStack();
        contextStack.pushBlockScopeFor({ this: liveText });
        const textSubscriptions = textNode.expression.subscribe(contextStack, textNode.pipelineNames);
        subscriptions.push(...textSubscriptions);
        contextStack.detach();
        textNode.expression.get(contextStack);
        contextStack.reattach();
        return liveText;
    }
    createDocumentFragment(node, contextStack, parentNode, subscriptions, host) {
        const fragment = document.createDocumentFragment();
        node.children?.forEach(child => this.appendChildToParent(fragment, child, contextStack, parentNode, subscriptions, host));
        return fragment;
    }
    appendChildToParent(fragmentParent, child, contextStack, parentNode, subscriptions, host) {
        if (child instanceof DomElementNode) {
            if (this.isTemplateRefName(child)) {
                const templateRefName = child.templateRefName;
                const templateRef = new TemplateRefImpl(this, new DomFragmentNode(child.children), contextStack.copyStack(), []);
                this.templateNameScope.set(templateRefName.name, templateRef);
                return;
            }
            fragmentParent.append(this.createElement(child, contextStack, subscriptions, parentNode, host));
        }
        else if (child instanceof DomStructuralDirectiveNode) {
            const commentText = child.name + (typeof child.value == 'string' ? (' = ' + child.value) : '');
            const comment = document.createComment(`start ${commentText}`);
            fragmentParent.append(comment);
            const lastComment = document.createComment(`end ${commentText}`);
            comment.after(lastComment);
            this.createStructuralDirective(child, comment, contextStack, subscriptions, parentNode, host);
        }
        else if (isLiveTextContent(child)) {
            fragmentParent.append(this.createLiveText(child, contextStack, parentNode, subscriptions));
        }
        else if (child instanceof TextContent) {
            fragmentParent.append(this.createText(child));
        }
        else if (child instanceof CommentNode) {
            fragmentParent.append(this.createComment(child));
        }
        else if (child instanceof DomFragmentNode) {
            fragmentParent.append(this.createDocumentFragment(child, contextStack, parentNode, subscriptions, host));
        }
    }
    createElementByTagName(node) {
        let element;
        if (isValidCustomElementName(node.tagName)) {
            const ViewClass = customElements.get(node.tagName);
            if (ViewClass) {
                element = new ViewClass();
            }
            else {
                element = document.createElement(node.tagName);
                if (element.constructor.name === 'HTMLElement') {
                    customElements.whenDefined(node.tagName).then(() => customElements.upgrade(element));
                }
            }
        }
        else if (isTagNameNative(node.tagName)) {
            element = document.createElement(node.tagName, node.is ? { is: node.is } : undefined);
        }
        else {
            element = document.createElement(node.tagName);
        }
        if (isHTMLComponent(element)) {
            element.setParentComponent(this.view);
        }
        return element;
    }
    createElement(node, contextStack, subscriptions, parentNode, host) {
        const element = this.createElementByTagName(node);
        const elementStack = contextStack.copyStack();
        const elementScope = isHTMLComponent(element) ? element._viewScope : elementStack.pushReactiveScopeFor({ 'this': element });
        elementStack.pushScope(elementScope);
        const attributesSubscriptions = this.initAttribute(element, node, elementStack);
        subscriptions.push(...attributesSubscriptions);
        const eventName = getInputEventName(element);
        let listener;
        if (eventName) {
            const inputScope = elementScope.getScopeOrCreat('this');
            listener = (event) => inputScope.emit('value', element.value);
            element.addEventListener(eventName, listener);
        }
        const templateRefName = node.templateRefName;
        if (templateRefName) {
            Reflect.set(this.view, templateRefName.name, element);
            this.viewScope.set(templateRefName.name, element);
            const view = this.componentRef.viewChild.find(child => child.selector === templateRefName.name);
            if (view) {
                Reflect.set(this.view._model, view.modelName, element);
            }
        }
        if (node.children) {
            for (const child of node.children) {
                this.appendChildToParent(element, child, elementStack, element, subscriptions, host);
            }
        }
        if (node.attributeDirectives?.length) {
            this.initAttributeDirectives(node.attributeDirectives, element, contextStack, subscriptions);
        }
        return element;
    }
    initAttributeDirectives(attributeDirectives, element, contextStack, subscriptions) {
        attributeDirectives?.forEach(directiveNode => {
            const directiveRef = ClassRegistryProvider.getDirectiveRef(directiveNode.name);
            if (directiveRef &&
                (directiveRef.modelClass.prototype instanceof AttributeDirective
                    || directiveRef.modelClass.prototype instanceof AttributeOnStructuralDirective)) {
                const directive = new directiveRef.modelClass(element);
                const stack = contextStack.copyStack();
                stack.pushReactiveScopeFor({ 'this': directive });
                const directiveSubscriptions = this.initStructuralDirective(directive, directiveNode, stack);
                subscriptions.push(...directiveSubscriptions);
                if (isOnInit(directive)) {
                    directive.onInit();
                }
                if (isOnDestroy(directive)) {
                    subscriptions.push(createSubscriptionDestroyer(() => directive.onDestroy()));
                }
            }
        });
    }
    initAttribute(element, node, contextStack) {
        const subscriptions = [];
        if (node.attributes?.length) {
            node.attributes.forEach(attr => {
                const isAttr = hasAttr(element, attr.name);
                if (isAttr) {
                    if (attr.value === false) {
                        element.removeAttribute(attr.name);
                    }
                    else if (attr.value === true) {
                        element.setAttribute(attr.name, '');
                    }
                    else {
                        element.setAttribute(attr.name, attr.value);
                    }
                }
                else {
                    Reflect.set(element, attr.name, attr.value);
                }
            });
        }
        if (node.twoWayBinding?.length) {
            node.twoWayBinding.forEach(attr => {
                const sub = attr.expression.subscribe(contextStack);
                subscriptions.push(...sub);
                contextStack.detach();
                attr.expression.get(contextStack);
                contextStack.reattach();
            });
        }
        if (node.inputs?.length) {
            node.inputs.forEach(attr => {
                const sub = attr.expression.subscribe(contextStack, attr.pipelineNames);
                subscriptions.push(...sub);
                contextStack.detach();
                attr.expression.get(contextStack);
                contextStack.reattach();
            });
        }
        if (node.outputs?.length) {
            node.outputs.forEach(event => {
                let listener;
                if (typeof event.value === 'string') {
                    listener = ($event) => {
                        const stack = contextStack.copyStack();
                        stack.pushBlockScopeFor({ $event });
                        stack.detach();
                        event.expression.get(stack);
                        stack.reattach();
                    };
                }
                else {
                    listener = event.value;
                }
                element.addEventListener(event.name, listener);
            });
        }
        if (node.templateAttrs?.length) {
            node.templateAttrs.forEach(attr => {
                const sub = attr.expression.subscribe(contextStack);
                subscriptions.push(...sub);
                contextStack.detach();
                attr.expression.get(contextStack);
                contextStack.reattach();
            });
        }
        return subscriptions;
    }
    initStructuralDirective(directive, node, contextStack) {
        const subscriptions = [];
        if (node.attributes?.length) {
            node.attributes.forEach(attr => Reflect.set(directive, attr.name, attr.value));
        }
        if (node.twoWayBinding?.length) {
            node.twoWayBinding.forEach(attr => {
                const sub = attr.expression.subscribe(contextStack);
                subscriptions.push(...sub);
                contextStack.detach();
                attr.expression.get(contextStack);
                contextStack.reattach();
            });
        }
        if (node.inputs?.length) {
            node.inputs.forEach(attr => {
                const sub = attr.expression.subscribe(contextStack, attr.pipelineNames);
                subscriptions.push(...sub);
                contextStack.detach();
                attr.expression.get(contextStack);
                contextStack.reattach();
            });
        }
        if (node.outputs?.length) {
            node.outputs.forEach(event => {
                const listener = ($event) => {
                    const stack = contextStack.copyStack();
                    stack.pushBlockScopeFor({ $event });
                    stack.detach();
                    event.expression.get(stack);
                    stack.reattach();
                };
                directive[event.name].subscribe(listener);
            });
        }
        if (node.templateAttrs?.length) {
            node.templateAttrs.forEach(attr => {
                const sub = attr.expression.subscribe(contextStack);
                subscriptions.push(...sub);
                contextStack.detach();
                attr.expression.get(contextStack);
                contextStack.reattach();
            });
        }
        return subscriptions;
    }
}
//# sourceMappingURL=render.js.map