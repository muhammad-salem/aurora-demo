import { __esDecorate, __propKey, __runInitializers, __setFunctionName } from "../../../tslib/tslib.es6.js";
import { Metadata } from '../../decorators/index.js';
import { getAllAttributes } from '../../elements/index.js';
import { ToCamelCase } from '../utils/utils.js';
import { baseFactoryView } from './base-view.js';
import { baseFormFactoryView } from './form-view.js';
import { isComponentModelClass } from './utils.js';
const FACTORY_CACHE = new WeakMap();
/**
 *
 * @param modelClass
 * @param componentRef
 */
export function initCustomElementView(modelClass, componentRef) {
    var _a;
    const htmlParent = componentRef.extend.classRef;
    const viewClassName = buildViewClassNameFromSelector(componentRef.selector);
    const htmlViewClassName = `HTML${viewClassName}Element`;
    let parentClass;
    if (componentRef.extendCustomElement) {
        parentClass = componentRef.extend.classRef;
    }
    else {
        if (FACTORY_CACHE.has(htmlParent)) {
            parentClass = FACTORY_CACHE.get(htmlParent);
        }
        else {
            parentClass = componentRef.formAssociated ? baseFormFactoryView(htmlParent) : baseFactoryView(htmlParent);
            FACTORY_CACHE.set(htmlParent, parentClass);
        }
    }
    const viewClass = ({
        [_a = __propKey(htmlViewClassName)]: (() => {
            let _classDecorators = [Metadata()];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _classSuper = parentClass;
            var class_1 = class extends _classSuper {
                static { _classThis = this; }
                static { __setFunctionName(_classThis, _a); }
                static {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    class_1 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                }
                static allAttributes = [];
                static disabledFeatures = [];
                static observedAttributes = [];
                constructor(optionalComponentRef, modelConstructor) {
                    super(optionalComponentRef ?? componentRef, modelConstructor ?? modelClass);
                }
                static {
                    __runInitializers(_classThis, _classExtraInitializers);
                }
            };
            return class_1 = _classThis;
        })()
    })[htmlViewClassName];
    componentRef.inputs.forEach((input) => {
        Object.defineProperty(viewClass.prototype, input.viewAttribute, {
            get() {
                return this._render.modelStack.get(input.modelProperty);
            },
            set(value) {
                return this._render.modelStack.set(input.modelProperty, value);
            },
            enumerable: true,
        });
    });
    componentRef.outputs.forEach(output => {
        Object.defineProperty(viewClass.prototype, output.viewAttribute, {
            get() {
                return this._model[output.modelProperty];
            },
            enumerable: true
        });
        let eventListener;
        let subscription;
        Object.defineProperty(viewClass.prototype, `on${ToCamelCase(output.viewAttribute)}`, {
            get() {
                return eventListener;
            },
            set(event) {
                if (!event) {
                    if (subscription) {
                        subscription.unsubscribe();
                        eventListener = undefined;
                    }
                }
                if (typeof event === 'string') {
                    if (event.endsWith('()')) {
                        event = event.substring(0, event.length - 2);
                    }
                    event = Reflect.get(window, event);
                }
                eventListener = event;
                subscription = this._model[output.modelProperty].subscribe(event);
            },
            enumerable: true
        });
    });
    componentRef.inputs.map(input => input.modelProperty)
        .concat(componentRef.outputs.map(output => output.modelProperty))
        .concat(componentRef.hostBindings.map(host => host.hostPropertyName))
        .concat(componentRef.viewChild.map(child => child.modelName))
        .filter(modelName => !(modelName in modelClass.prototype))
        .forEach(modelName => modelClass.prototype[modelName] = undefined);
    const defaultAttributes = getAllAttributes(componentRef.extend.name);
    const observedAttributes = componentRef.inputs.map(input => input.viewAttribute)
        .concat(componentRef.outputs.map(output => 'on' + ToCamelCase(output.viewAttribute)));
    if (componentRef.formAssociated && !observedAttributes.includes('value')) {
        observedAttributes.push('value');
    }
    viewClass.allAttributes.push(...defaultAttributes.concat(observedAttributes));
    viewClass.observedAttributes.push(...observedAttributes);
    if (Array.isArray(componentRef.disabledFeatures)) {
        viewClass.disabledFeatures.push(...componentRef.disabledFeatures);
    }
    addViewToModelClass(modelClass, componentRef.selector, viewClass, htmlViewClassName);
    if (!Reflect.has(window, htmlViewClassName)) {
        Reflect.set(window, htmlViewClassName, viewClass);
    }
    return viewClass;
}
export function addViewToModelClass(modelClass, selector, viewClass, htmlViewClassName) {
    Object.defineProperty(modelClass, htmlViewClassName, { value: viewClass });
    if (!isComponentModelClass(modelClass)) {
        Reflect.set(modelClass, 'component', {});
    }
    if (isComponentModelClass(modelClass)) {
        modelClass.component[selector] = htmlViewClassName;
    }
}
export function buildViewClassNameFromSelector(selector) {
    return selector
        .split('-')
        .map(name => name.replace(/^\w/, char => char.toUpperCase()))
        .join('');
}
//# sourceMappingURL=view.js.map