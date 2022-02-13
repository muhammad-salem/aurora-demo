import { findByTagName, htmlParser, templateParser, canAttachShadow, directiveRegistry } from '../../elements/index.js';
import { ClassRegistryProvider } from '../providers/provider.js';
import { initCustomElementView } from '../view/view.js';
import { buildExpressionNodes } from '../html/expression.js';
export class PropertyRef {
    constructor(modelProperty, _viewName) {
        this.modelProperty = modelProperty;
        this._viewName = _viewName;
    }
    get viewAttribute() {
        return this._viewName || this.modelProperty;
    }
}
export class ChildRef {
    constructor(modelName, selector, childOptions) {
        this.modelName = modelName;
        this.selector = selector;
        this.childOptions = childOptions;
    }
}
export class ListenerRef {
    constructor(eventName, args, modelCallbackName) {
        this.eventName = eventName;
        this.args = args;
        this.modelCallbackName = modelCallbackName;
    }
}
export class HostBindingRef {
    constructor(viewProperty, hostPropertyName) {
        this.viewProperty = viewProperty;
        this.hostPropertyName = hostPropertyName;
    }
}
const AuroraBootstrap = Symbol.for('aurora:bootstrap');
const AuroraMetadata = Symbol.for('aurora:metadata');
export class Components {
    static getOrCreateBootstrap(target) {
        let bootstrap = Reflect.getMetadata(AuroraBootstrap, target);
        if (!bootstrap) {
            bootstrap = {};
            Reflect.defineMetadata(AuroraBootstrap, bootstrap, target);
        }
        return bootstrap;
    }
    static getBootstrap(target) {
        return Reflect.getMetadata(AuroraBootstrap, target);
    }
    static getComponentRef(target) {
        return Reflect.getMetadata(AuroraMetadata, target);
    }
    static setComponentRef(target, componentRef) {
        Reflect.defineMetadata(AuroraMetadata, componentRef, target);
    }
    static addOptional(modelProperty) {
    }
    static addInput(modelProperty, modelName, viewName) {
        const bootstrap = Components.getOrCreateBootstrap(modelProperty);
        bootstrap.inputs = bootstrap.inputs || [];
        bootstrap.inputs.push(new PropertyRef(modelName, viewName));
    }
    static addOutput(modelProperty, modelName, viewName) {
        const bootstrap = Components.getOrCreateBootstrap(modelProperty);
        bootstrap.outputs = bootstrap.outputs || [];
        bootstrap.outputs.push(new PropertyRef(modelName, viewName));
    }
    static setComponentView(modelProperty, modelName) {
        const bootstrap = Components.getOrCreateBootstrap(modelProperty);
        bootstrap.view = modelName;
    }
    static addViewChild(modelProperty, modelName, selector, childOptions) {
        const bootstrap = Components.getOrCreateBootstrap(modelProperty);
        bootstrap.viewChild = bootstrap.viewChild || [];
        bootstrap.viewChild.push(new ChildRef(modelName, selector, childOptions));
    }
    static addViewChildren(modelProperty, modelName, selector) {
        const bootstrap = Components.getOrCreateBootstrap(modelProperty);
        bootstrap.ViewChildren = bootstrap.ViewChildren || [];
        bootstrap.ViewChildren.push(new ChildRef(modelName, selector));
    }
    static addHostListener(modelProperty, propertyKey, eventName, args) {
        const bootstrap = Components.getOrCreateBootstrap(modelProperty);
        bootstrap.hostListeners = bootstrap.hostListeners || [];
        bootstrap.hostListeners.push(new ListenerRef(eventName, args, propertyKey));
    }
    static addHostBinding(modelProperty, propertyKey, hostPropertyName) {
        const bootstrap = Components.getOrCreateBootstrap(modelProperty);
        bootstrap.hostBinding = bootstrap.hostBinding || [];
        bootstrap.hostBinding.push(new HostBindingRef(propertyKey, hostPropertyName));
    }
    static defineDirective(modelClass, opts) {
        const bootstrap = Components.getOrCreateBootstrap(modelClass.prototype);
        for (const key in opts) {
            bootstrap[key] = Reflect.get(opts, key);
        }
        bootstrap.modelClass = modelClass;
        ClassRegistryProvider.registerDirective(modelClass);
        directiveRegistry.register(opts.selector, {
            inputs: bootstrap.inputs?.map(input => input.viewAttribute),
            outputs: bootstrap.outputs?.map(output => output.viewAttribute),
        });
    }
    static definePipe(modelClass, opts) {
        const bootstrap = Components.getOrCreateBootstrap(modelClass.prototype);
        for (const key in opts) {
            bootstrap[key] = Reflect.get(opts, key);
        }
        bootstrap.modelClass = modelClass;
        ClassRegistryProvider.registerPipe(modelClass);
    }
    static defineService(modelClass, opts) {
        const bootstrap = Components.getOrCreateBootstrap(modelClass.prototype);
        for (const key in opts) {
            bootstrap[key] = Reflect.get(opts, key);
        }
        bootstrap.modelClass = modelClass;
        bootstrap.name = modelClass.name;
        ClassRegistryProvider.registerService(modelClass);
    }
    static defineComponent(modelClass, opts) {
        const bootstrap = Components.getOrCreateBootstrap(modelClass.prototype);
        var componentRef = opts;
        for (const key in bootstrap) {
            Reflect.set(componentRef, key, bootstrap[key]);
        }
        componentRef.extend = findByTagName(opts.extend);
        if (typeof componentRef.template === 'string') {
            if (componentRef.styles) {
                const template = `<style>${componentRef.styles}</style>${componentRef.template}`;
                componentRef.template = htmlParser.toDomRootNode(template);
            }
            else {
                componentRef.template = htmlParser.toDomRootNode(componentRef.template);
            }
            buildExpressionNodes(componentRef.template);
        }
        if (!componentRef.template && /template/g.test(componentRef.encapsulation)) {
            const template = document.querySelector('#' + componentRef.selector);
            if (template && template instanceof HTMLTemplateElement) {
                componentRef.template = templateParser.parse(template);
                buildExpressionNodes(componentRef.template);
            }
            else {
            }
        }
        componentRef.inputs ||= [];
        componentRef.outputs ||= [];
        componentRef.viewChild ||= [];
        componentRef.ViewChildren ||= [];
        componentRef.hostBindings ||= [];
        componentRef.hostListeners ||= [];
        componentRef.encapsulation ||= 'custom';
        componentRef.isShadowDom = /shadow-dom/g.test(componentRef.encapsulation);
        componentRef.shadowDomMode ||= 'open';
        componentRef.shadowDomDelegatesFocus = componentRef.shadowDomDelegatesFocus === true || false;
        if (componentRef.isShadowDom && componentRef.extend.name) {
            componentRef.isShadowDom = canAttachShadow(componentRef.extend.name);
        }
        componentRef.modelClass = modelClass;
        componentRef.viewClass = initCustomElementView(modelClass, componentRef);
        Components.setComponentRef(componentRef.modelClass, componentRef);
        Components.setComponentRef(componentRef.viewClass, componentRef);
        ClassRegistryProvider.registerComponent(modelClass);
        ClassRegistryProvider.registerView(bootstrap.viewClass);
        const options = {};
        const parentTagName = componentRef.extend?.name;
        if (parentTagName) {
            if (parentTagName !== '!' && parentTagName.indexOf('-') === -1) {
                options.extends = parentTagName;
            }
        }
        customElements.define(componentRef.selector, componentRef.viewClass, options);
    }
}
//# component.js.map