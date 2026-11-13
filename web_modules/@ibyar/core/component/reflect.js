import { metadataHoler } from '../../decorators/index.js';
export class PropertyRef {
    modelProperty;
    _viewName;
    constructor(modelProperty, _viewName) {
        this.modelProperty = modelProperty;
        this._viewName = _viewName;
    }
    get viewAttribute() {
        return this._viewName || this.modelProperty;
    }
}
export class InputPropertyRef extends PropertyRef {
}
export class OutputPropertyRef extends PropertyRef {
    options;
    constructor(modelProperty, viewName, options) {
        super(modelProperty, viewName);
        this.options = options;
    }
}
export class ChildRef {
    modelName;
    selector;
    childOptions;
    constructor(modelName, selector, childOptions) {
        this.modelName = modelName;
        this.selector = selector;
        this.childOptions = childOptions;
    }
}
export class ListenerRef {
    eventName;
    args;
    modelCallbackName;
    constructor(eventName, args, modelCallbackName) {
        this.eventName = eventName;
        this.args = args;
        this.modelCallbackName = modelCallbackName;
    }
}
export class HostBindingRef {
    modelPropertyName;
    hostPropertyName;
    constructor(modelPropertyName, hostPropertyName) {
        this.modelPropertyName = modelPropertyName;
        this.hostPropertyName = hostPropertyName;
    }
}
export class ReflectComponents {
    static getMetaDate(constructor) {
        return metadataHoler.get(constructor[Symbol.metadata]);
    }
    static addInput(metadata, modelName, viewName) {
        let inputs = (metadata.inputs ?? []);
        inputs = inputs.filter(i => i.modelProperty !== modelName);
        inputs.push(new InputPropertyRef(modelName, viewName));
        metadata.inputs = inputs;
    }
    static addOutput(metadata, modelName, viewName, options) {
        let outputs = (metadata.outputs ?? []);
        outputs = outputs.filter(i => i.modelProperty !== modelName);
        outputs.push(new OutputPropertyRef(modelName, viewName, options));
        metadata.outputs = outputs;
    }
    static setComponentView(metadata, modelName) {
        metadata.view = modelName;
    }
    static addViewChild(metadata, modelName, selector, childOptions) {
        (metadata.viewChild ??= []).push(new ChildRef(modelName, selector, childOptions));
    }
    static addViewChildren(metadata, modelName, selector) {
        (metadata.ViewChildren ??= []).push(new ChildRef(modelName, selector));
    }
    static addHostListener(metadata, propertyKey, eventName, args) {
        (metadata.hostListeners ??= []).push(new ListenerRef(eventName, args, propertyKey));
    }
    static addHostBinding(metadata, propertyKey, hostPropertyName) {
        (metadata.hostBindings ??= []).push(new HostBindingRef(propertyKey, hostPropertyName));
    }
}
//# sourceMappingURL=reflect.js.map