import { ReactiveScope, ReactiveScopeControl } from '../../expressions/index.js';
import { isAfterContentChecked, isAfterContentInit, isAfterViewChecked, isAfterViewInit, isDoCheck, isOnChanges, isOnDestroy, isOnInit } from '../component/lifecycle.js';
import { ComponentRender } from './render.js';
import { getCurrentZone } from '../zone/bootstrap.js';
import { createModelChangeDetectorRef } from '../linker/change-detector-ref.js';
const FACTORY_CACHE = new WeakMap();
export function baseFactoryView(htmlElementType) {
    if (FACTORY_CACHE.has(htmlElementType)) {
        return FACTORY_CACHE.get(htmlElementType);
    }
    class CustomView extends htmlElementType {
        constructor(componentRef, modelClass) {
            super();
            this.subscriptions = [];
            this.onDestroyCalls = [];
            this.doBlockCallback = () => {
                if (isDoCheck(this._model)) {
                    this._zone.run(this._model.doCheck, this._model);
                }
            };
            this._componentRef = componentRef;
            if (componentRef.isShadowDom) {
                this._shadowRoot = this.attachShadow({
                    mode: componentRef.shadowDomMode,
                    delegatesFocus: componentRef.shadowDomDelegatesFocus
                });
            }
            const args = []; /* resolve dependency injection*/
            const detector = createModelChangeDetectorRef(() => this._modelScope);
            args.push(detector);
            this._zone = getCurrentZone(componentRef.zone).fork();
            args.push(this._zone);
            const model = new modelClass(...args);
            this._model = model;
            const modelScope = ReactiveScopeControl.for(model);
            modelScope.getContextProxy = () => model;
            this._modelScope = modelScope;
            this._viewScope = ReactiveScope.for({ 'this': this });
            const elementScope = this._viewScope.getInnerScope('this');
            componentRef.inputs.forEach(input => {
                elementScope.subscribe(input.viewAttribute, (newValue, oldValue) => {
                    if (newValue === oldValue) {
                        return;
                    }
                    this._modelScope.set(input.modelProperty, newValue);
                });
                this._modelScope.subscribe(input.modelProperty, (newValue, oldValue) => {
                    if (newValue === oldValue) {
                        return;
                    }
                    elementScope.emit(input.viewAttribute, newValue, oldValue);
                });
            });
            // if property of the model has view decorator
            if (this._componentRef.view) {
                Reflect.set(this._model, this._componentRef.view, this);
            }
            this._render = new ComponentRender(this, this.subscriptions);
        }
        getComponentRef() {
            return this._componentRef;
        }
        setParentComponent(parent) {
            this._parentComponent = parent;
        }
        getParentComponent() {
            return this._parentComponent;
        }
        hasParentComponent() {
            return this._parentComponent ? true : false;
        }
        hasInputStartWith(viewProp) {
            let dotIndex = viewProp.indexOf('.');
            if (dotIndex > 0) {
                viewProp = viewProp.substring(0, dotIndex);
            }
            return this.hasInput(viewProp);
        }
        getInputStartWith(viewProp) {
            let index = viewProp.indexOf('.');
            if (index > 0) {
                viewProp = viewProp.substring(0, index);
            }
            index = viewProp.indexOf('[');
            if (index > 0) {
                viewProp = viewProp.substring(0, index);
            }
            return this.getInput(viewProp);
        }
        hasInput(viewProp) {
            return this._componentRef.inputs.some(input => input.viewAttribute === viewProp);
        }
        getInput(viewProp) {
            return this._componentRef.inputs.find(input => input.viewAttribute === viewProp);
        }
        getInputValue(viewProp) {
            const inputRef = this.getInput(viewProp);
            if (inputRef) {
                return this._model[inputRef.modelProperty];
            }
        }
        setInputValue(viewProp, value) {
            const inputRef = this.getInput(viewProp);
            if (inputRef) {
                this._modelScope.set(inputRef.modelProperty, value);
            }
        }
        hasOutput(viewProp) {
            return this._componentRef.outputs.some(output => output.viewAttribute === viewProp);
        }
        getOutput(viewProp) {
            return this._componentRef.outputs.find(output => output.viewAttribute === viewProp);
        }
        getEventEmitter(viewProp) {
            const outputRef = this.getOutput(viewProp);
            if (outputRef) {
                return this._model[outputRef.modelProperty];
            }
            return;
        }
        hasProp(propName) {
            return Reflect.has(this._model, propName);
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
                this._zone.run(this._model.onChanges, this._model);
            }
            this.doBlockCallback();
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
            if (!this.hasParentComponent() && this.attributes.length > 0) {
                let attrs = Array.prototype.slice.call(this.attributes);
                attrs.forEach(attr => this.initOuterAttribute(attr));
            }
            if (isOnChanges(this._model)) {
                this._zone.run(this._model.onChanges, this._model);
            }
            if (isOnInit(this._model)) {
                this._zone.run(this._model.onInit, this._model);
            }
            if (isDoCheck(this._model)) {
                this._zone.run(this._model.doCheck, this._model);
            }
            if (isAfterContentInit(this._model)) {
                this._zone.run(this._model.afterContentInit, this._model);
            }
            if (isAfterContentChecked(this._model)) {
                this._zone.run(this._model.afterContentChecked, this._model);
            }
            // do once
            if (this.childNodes.length === 0) {
                // setup ui view
                this._render.initView();
                // init Host Listener events
                this._render.initHostListener();
            }
            if (isAfterViewInit(this._model)) {
                this._zone.run(this._model.afterViewInit, this._model);
            }
            if (isAfterViewChecked(this._model)) {
                this._zone.run(this._model.afterViewChecked, this._model);
            }
            this.doBlockCallback = () => {
                if (isDoCheck(this._model)) {
                    this._zone.run(this._model.doCheck, this._model);
                }
                if (isAfterContentChecked(this._model)) {
                    this._zone.run(this._model.afterContentChecked, this._model);
                }
                if (isAfterViewChecked(this._model)) {
                    this._zone.run(this._model.afterViewChecked, this._model);
                }
            };
        }
        initOuterAttribute(attr) {
            // [window, this] scop
            let elementAttr = attr.name;
            let modelProperty = attr.value;
            if (elementAttr.startsWith('[')) {
                elementAttr = elementAttr.substring(1, elementAttr.length - 1);
                if (Reflect.has(window, modelProperty)) {
                    this.setInputValue(elementAttr, Reflect.get(window, modelProperty));
                }
            }
            else if (elementAttr.startsWith('(')) {
                // (elementAttr)="modelProperty()"
                elementAttr = elementAttr.substring(1, elementAttr.length - 1);
                // this.handleEvent(element, elementAttr, viewProperty);
                modelProperty = modelProperty.endsWith('()') ?
                    modelProperty.substring(0, modelProperty.length - 2) : modelProperty;
                let callback = Reflect.get(window, modelProperty);
                this.addEventListener(elementAttr, event => {
                    callback(event);
                });
            }
            else if (elementAttr.startsWith('on')) {
                const modelEvent = this.getEventEmitter(elementAttr.substring(2));
                if (modelEvent) {
                    // modelEvent.subscribe(listener);
                    modelProperty = modelProperty.endsWith('()') ?
                        modelProperty.substring(0, modelProperty.length - 2) : modelProperty;
                    let listener = Reflect.get(window, modelProperty);
                    modelEvent.subscribe((data) => {
                        listener(data);
                    });
                }
            }
            else {
                this.setInputValue(attr.name, attr.value);
            }
        }
        onDestroy(callback) {
            this.onDestroyCalls.push(callback);
        }
        adoptedCallback() {
            // restart the process
            this.innerHTML = '';
            this.connectedCallback();
        }
        disconnectedCallback() {
            // notify first, then call model.onDestroy func
            if (isOnDestroy(this._model)) {
                this._zone.run(this._model.onDestroy, this._model);
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
        }
        // events api
        addEventListener(eventName, listener, options) {
            if ('on' + eventName in this) {
                super.addEventListener(eventName, (event) => {
                    listener(event);
                }, options);
                return;
            }
            const modelOutput = this.getEventEmitter(eventName);
            if (modelOutput) {
                modelOutput.subscribe((data) => {
                    listener(data);
                });
            }
        }
        triggerOutput(eventName, value) {
            const modelEvent = this.getEventEmitter(eventName);
            if (modelEvent) {
                modelEvent.emit(value);
                return;
            }
        }
    }
    ;
    FACTORY_CACHE.set(htmlElementType, CustomView);
    return CustomView;
}
//# sourceMappingURL=base-view.js.map