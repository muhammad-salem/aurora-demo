import { getAllAttributes, isFormElement } from '../../elements/index.js';
import { ToCamelCase } from '../utils/utils.js';
import { baseFactoryView } from './base-view.js';
import { baseFormFactoryView } from './form-view.js';
export function initCustomElementView(modelClass, componentRef) {
    const htmlParent = componentRef.extend.classRef;
    let viewClass;
    const viewClassName = buildViewClassNameFromSelector(componentRef.selector);
    const htmlViewClassName = `HTML${viewClassName}Element`;
    const parentClass = componentRef.extend.name
        ? (isFormElement(componentRef.extend.name)
            ? baseFormFactoryView(htmlParent)
            : baseFactoryView(htmlParent))
        : baseFactoryView(HTMLElement);
    viewClass = ({
        [htmlViewClassName]: class extends parentClass {
            constructor() { super(componentRef, modelClass); }
        }
    })[htmlViewClassName];
    componentRef.inputs.forEach((input) => {
        Object.defineProperty(viewClass.prototype, input.viewAttribute, {
            get() {
                return this._modelScope.get(input.modelProperty);
            },
            set(value) {
                this._modelScope.set(input.modelProperty, value);
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
        Object.defineProperty(viewClass.prototype, 'on' + ToCamelCase(output.viewAttribute), {
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
        .forEach(modelName => modelClass.prototype[modelName] = undefined);
    const defaultAttributes = getAllAttributes(componentRef.extend.name);
    const observedAttributes = componentRef.inputs.map(input => input.viewAttribute);
    Reflect.set(viewClass, 'observedAttributes', observedAttributes);
    Reflect.set(viewClass, 'allAttributes', defaultAttributes.concat(observedAttributes));
    if (false) {
        Object.defineProperty(viewClass, 'formAssociated', {
            get() {
                return true;
            }
        });
    }
    addViewToModelClass(modelClass, componentRef.selector, viewClass, htmlViewClassName);
    if (!Reflect.has(window, htmlViewClassName)) {
        Reflect.set(window, htmlViewClassName, viewClass);
    }
    return viewClass;
}
export function isComponentModelClass(target) {
    return Reflect.has(target, 'component');
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
export function getComponentView(modelClass, selector) {
    if (isComponentModelClass(modelClass)) {
        let viewClassName;
        if (selector) {
            viewClassName = modelClass.component[selector];
            if (!viewClassName) {
                throw new Error(`${modelClass.name} doesn't have ${selector} as view`);
            }
        }
        else {
            viewClassName = Object.keys(modelClass.component)[0];
        }
        return Reflect.get(modelClass, viewClassName);
    }
    return;
}
//# sourceMappingURL=view.js.map