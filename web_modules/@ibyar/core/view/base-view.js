import { ReactiveScope, ReactiveControlScope, isReactive } from '../../expressions/index.js';
import { isAfterContentChecked, isAfterContentInit, isAfterViewChecked, isAfterViewInit, isDoCheck, isOnChanges, isOnDestroy, isOnInit, isOnViewMove, isOnViewAdopted } from '../component/lifecycle.js';
import { EventEmitter } from '../component/events.js';
import { ComponentRender } from './render.js';
import { getRootZone } from '../zone/bootstrap.js';
import { AbstractAuroraZone, ProxyAuroraZone } from '../zone/zone.js';
import { ChangeDetectorRef, createModelChangeDetectorRef } from '../linker/change-detector-ref.js';
import { createProxyZone } from '../zone/proxy.js';
import { clearSignalScope, pushNewSignalScope } from '../signals/signals.js';
import { forkProvider, addProvider, removeProvider, inject } from '../di/inject.js';
import { isOutputSignal, VIEW_TOKEN } from '../component/initializer.js';
import { ShadowRootService } from './shadow-root.js';
export function baseFactoryView(htmlElementType) {
    return class CustomView extends htmlElementType {
        _model;
        _signalScope;
        _render;
        _componentRef;
        _modelScope;
        _viewScope;
        _zone;
        _provider;
        _detector;
        subscriptions = [];
        onDestroyCalls = [];
        needRendering = true;
        constructor(componentRef, modelClass) {
            super();
            this._componentRef = componentRef;
            if (componentRef.isShadowDom && !componentRef.disabledFeatures?.includes('shadow')) {
                const shadowRoot = this.attachShadow(componentRef.shadowRootInit);
                inject(ShadowRootService).set(this, shadowRoot);
            }
            this._signalScope = pushNewSignalScope();
            this._provider = forkProvider();
            /* resolve dependency injection*/
            this._detector = createModelChangeDetectorRef(() => this._modelScope);
            this._zone = getRootZone().fork(componentRef.zone);
            this._provider.setType(AbstractAuroraZone, this._zone);
            this._provider.setType(ChangeDetectorRef, this._detector);
            this._provider.setToken(VIEW_TOKEN, this);
            addProvider(this._provider);
            const model = new modelClass();
            removeProvider(this._provider);
            this._model = model;
            clearSignalScope(this._signalScope);
            const modelScope = ReactiveControlScope.for(model);
            const modelProxyRef = this._zone instanceof ProxyAuroraZone
                ? createProxyZone(model, this._zone)
                : model;
            modelScope.getContextProxy = () => modelProxyRef;
            this._modelScope = modelScope;
            Object.keys(this._model).forEach(key => {
                const node = this._model[key];
                if (isReactive(node)) {
                    node.subscribe((value, old) => this._modelScope.emit(key, value, old));
                }
            });
            this._viewScope = ReactiveScope.for({ 'this': this });
            const elementScope = this._viewScope.getInnerScope('this');
            componentRef.inputs.forEach(input => {
                elementScope.subscribe(input.viewAttribute, (newValue, oldValue) => {
                    if (newValue === oldValue) {
                        return;
                    }
                    this._render.modelStack.set(input.modelProperty, newValue);
                });
                this._modelScope.subscribe(input.modelProperty, (newValue, oldValue) => {
                    if (newValue === oldValue) {
                        return;
                    }
                    elementScope.emit(input.viewAttribute, newValue, oldValue);
                });
            });
            componentRef.outputs.forEach(output => {
                const event = model[output.modelProperty];
                if (event instanceof EventEmitter || isOutputSignal(event)) {
                    const options = isOutputSignal(event) ? event.options : output.options;
                    event.subscribe((value) => {
                        const event = new CustomEvent(output.viewAttribute, {
                            detail: value,
                            cancelable: false,
                            bubbles: options?.bubbles,
                            composed: options?.bubbles,
                        });
                        this.dispatchEvent(event);
                    });
                }
            });
            // if property of the model has view decorator
            if (this._componentRef.view) {
                Reflect.set(this._model, this._componentRef.view, this);
            }
            this._render = new ComponentRender(this, this.subscriptions);
            if (this.attributes.length > 0) {
                let attrs = Array.prototype.slice.call(this.attributes);
                attrs.forEach(attr => this.initOuterAttribute(attr));
            }
            if (this._componentRef.encapsulation === 'shadow-slot') {
                // render view before inserting any slot element as child
                this.initView();
            }
        }
        doBlockCallback = () => {
            if (isDoCheck(this._model)) {
                this._zone.run(this._model.doCheck, this._modelScope.getContextProxy());
            }
        };
        getComponentRef() {
            return this._componentRef;
        }
        getInput(viewProp) {
            return this._componentRef.inputs.find(input => input.viewAttribute === viewProp);
        }
        getInputValue(viewProp) {
            const inputRef = this.getInput(viewProp);
            if (inputRef) {
                return this._render.modelStack.get(inputRef.modelProperty);
            }
        }
        setInputValue(viewProp, value) {
            const inputRef = this.getInput(viewProp);
            if (inputRef) {
                this._render.modelStack.set(inputRef.modelProperty, value);
            }
        }
        setAttributeHelper(attrViewName, value) {
            if (value === null || value === undefined) {
                this.removeAttribute(attrViewName);
            }
            else if (typeof value === 'boolean') {
                if (value) {
                    super.setAttribute(attrViewName, '');
                }
                else {
                    this.removeAttribute(attrViewName);
                }
            }
            else {
                super.setAttribute(attrViewName, value);
            }
        }
        setAttribute(attrViewName, value) {
            this.setInputValue(attrViewName, value);
            this.setAttributeHelper(attrViewName, value);
        }
        getAttribute(attrViewName) {
            return this.getInputValue(attrViewName) ?? super.getAttribute(attrViewName);
        }
        attributeChangedCallback(name, oldValue, newValue) {
            if (newValue === oldValue) {
                return;
            }
            if (isOnChanges(this._model)) {
                this._zone.run(this._model.onChanges, this._modelScope.getContextProxy());
            }
            this.doBlockCallback();
        }
        initView() {
            // setup ui view
            this._render.initView();
            // init view binding
            this._render.initViewBinding();
            this.needRendering = false;
        }
        connectedCallback() {
            if (this.subscriptions.length) {
                this.subscriptions.forEach(sub => sub.unsubscribe());
            }
            this.subscriptions.splice(0, this.subscriptions.length);
            const cds = this._zone.onEmpty.subscribe(() => this._modelScope.detectChanges());
            this.onDestroy(() => cds.unsubscribe());
            this._componentRef.inputs.forEach(input => {
                const inputDefaultValue = this._model[input.modelProperty];
                if (inputDefaultValue !== null && inputDefaultValue !== undefined) {
                    this.setAttributeHelper(input.viewAttribute, inputDefaultValue);
                }
            });
            if (isOnChanges(this._model)) {
                this._zone.run(this._model.onChanges, this._modelScope.getContextProxy());
            }
            if (isOnInit(this._model)) {
                this._zone.run(this._model.onInit, this._modelScope.getContextProxy());
            }
            if (isDoCheck(this._model)) {
                this._zone.run(this._model.doCheck, this._modelScope.getContextProxy());
            }
            if (isAfterContentInit(this._model)) {
                this._zone.run(this._model.afterContentInit, this._modelScope.getContextProxy());
            }
            if (isAfterContentChecked(this._model)) {
                this._zone.run(this._model.afterContentChecked, this._modelScope.getContextProxy());
            }
            // do once
            if (this.needRendering) {
                this.initView();
                if (isAfterViewInit(this._model)) {
                    this._zone.run(this._model.afterViewInit, this._modelScope.getContextProxy());
                }
            }
            if (isAfterViewChecked(this._model)) {
                this._zone.run(this._model.afterViewChecked, this._modelScope.getContextProxy());
            }
            this.doBlockCallback = () => {
                if (isDoCheck(this._model)) {
                    this._zone.run(this._model.doCheck, this._modelScope.getContextProxy());
                }
                if (isAfterContentChecked(this._model)) {
                    this._zone.run(this._model.afterContentChecked, this._modelScope.getContextProxy());
                }
                if (isAfterViewChecked(this._model)) {
                    this._zone.run(this._model.afterViewChecked, this._modelScope.getContextProxy());
                }
            };
            const event = new CustomEvent('connected', { cancelable: true, bubbles: false, composed: false });
            this.dispatchEvent(event);
        }
        initOuterAttribute(attr) {
            // [window, this] scope
            let elementAttr = attr.name;
            let modelProperty = attr.value;
            if (elementAttr.startsWith('[')) {
                elementAttr = elementAttr.substring(1, elementAttr.length - 1);
                if (Reflect.has(window, modelProperty)) {
                    this.setInputValue(elementAttr, Reflect.get(window, modelProperty));
                }
            }
            else if ((elementAttr.startsWith('(') && elementAttr.endsWith(')')) || elementAttr.startsWith('@') || elementAttr.startsWith('on')) {
                // (elementAttr)="modelProperty()"
                // @elementAttr="modelProperty()"
                // onElementAttr="modelProperty()"
                // lower-case-event-name = "modelProperty()"
                let start = 0, end = undefined;
                if (elementAttr.startsWith('(') || elementAttr.startsWith('@')) {
                    start = 1;
                }
                else if (elementAttr.startsWith('on')) {
                    start = 2;
                }
                if (elementAttr.endsWith(')')) {
                    end = elementAttr.length - 1;
                }
                const eventName = elementAttr.substring(start, end)?.replaceAll('-', '').toLowerCase();
                if (modelProperty.endsWith('()')) {
                    modelProperty = modelProperty.substring(0, modelProperty.length - 2);
                }
                const callback = Reflect.get(window, modelProperty);
                const customEvent = this._componentRef.outputs.find(output => output.viewAttribute.toLowerCase() === eventName);
                if (customEvent) {
                    this._modelScope.subscribe(customEvent.modelProperty, (data) => callback?.(data));
                }
                else {
                    this.addEventListener(elementAttr, event => callback?.(event));
                }
            }
            else {
                const inputRef = this.getInput(attr.name);
                if (inputRef) {
                    this._render.modelStack.set(inputRef.modelProperty, attr.value);
                }
            }
        }
        onDestroy(callback) {
            this.onDestroyCalls.push(callback);
        }
        adoptedCallback() {
            (inject(ShadowRootService).get(this) ?? this).innerHTML = '';
            this.needRendering = true;
            if (isOnViewAdopted(this._model)) {
                this._zone.run(this._model.onViewAdopted, this._modelScope.getContextProxy());
            }
            this.connectedCallback();
        }
        connectedMoveCallback() {
            if (isOnViewMove(this._model)) {
                this._zone.run(this._model.onViewMove, this._modelScope.getContextProxy());
            }
        }
        disconnectedCallback() {
            // notify first, then call model.onDestroy func
            if (isOnDestroy(this._model)) {
                this._zone.run(this._model.onDestroy, this._modelScope.getContextProxy());
            }
            this.subscriptions.forEach(sub => sub.unsubscribe());
            this.subscriptions.splice(0, this.subscriptions.length);
            this.onDestroyCalls.forEach(callback => {
                try {
                    callback();
                }
                catch (error) {
                    console.error(error);
                }
            });
            this.onDestroyCalls.splice(0, this.onDestroyCalls.length);
            const event = new CustomEvent('disconnected', { cancelable: true, bubbles: false, composed: false });
            this.dispatchEvent(event);
            (inject(ShadowRootService).get(this) ?? this).innerHTML = '';
            this.needRendering = true;
        }
    };
}
//# sourceMappingURL=base-view.js.map