import { Components } from '../component/component.js';
export class ClassRegistry {
    constructor() {
        this.viewSet = new Set();
        this.componentSet = new Set();
        this.serviceSet = new Set();
        this.directiveSet = new Set();
        this.pipeSet = new Set();
    }
    registerView(classRef) {
        this.viewSet.add(classRef);
    }
    registerComponent(classRef) {
        this.componentSet.add(classRef);
    }
    registerService(classRef) {
        this.serviceSet.add(classRef);
    }
    registerDirective(classRef) {
        this.directiveSet.add(classRef);
    }
    registerPipe(classRef) {
        this.pipeSet.add(classRef);
    }
    hasComponent(selector) {
        for (const modelClass of this.componentSet) {
            const componentRef = Components.getComponentRef(modelClass);
            if (componentRef.selector === selector) {
                return true;
            }
        }
        return false;
    }
    getComponentRef(selector) {
        for (const modelClass of this.componentSet) {
            const componentRef = Components.getComponentRef(modelClass);
            if (componentRef.selector === selector) {
                return componentRef;
            }
        }
        return;
    }
    getComponent(selector) {
        for (const modelClass of this.componentSet) {
            const componentRef = Components.getComponentRef(modelClass);
            if (componentRef.selector === selector) {
                return modelClass;
            }
        }
        return;
    }
    getComponentView(selector) {
        return this.getComponentRef(selector)?.viewClass;
    }
    hasOutput(model, eventName) {
        if (Reflect.has(model, 'bootstrap')) {
            const componentRef = Reflect.get(model, 'bootstrap');
            if (componentRef.outputs) {
                for (const out of componentRef.outputs) {
                    if (out.viewAttribute === eventName) {
                        return out;
                    }
                }
            }
        }
        return false;
    }
    hasInput(model, eventName) {
        if (Reflect.has(model, 'bootstrap')) {
            const componentRef = Reflect.get(model, 'bootstrap');
            if (componentRef.inputs) {
                for (const input of componentRef.inputs) {
                    if (input.viewAttribute === eventName) {
                        return input;
                    }
                }
            }
        }
        return false;
    }
    hasDirective(selector) {
        for (const directiveClass of this.directiveSet) {
            const directiveRef = Components.getBootstrap(directiveClass.prototype);
            if (directiveRef.selector === selector) {
                return true;
            }
        }
        return false;
    }
    directiveHasInput(input, directiveType = 'attributes') {
        for (const directiveClass of this.directiveSet) {
            const directiveRef = Components.getBootstrap(directiveClass.prototype);
            if ((directiveType === 'attributes' && !directiveRef.selector.startsWith('*'))
                || (directiveType === 'structural' && directiveRef.selector.startsWith('*'))) {
                if (directiveRef.inputs?.filter(ref => ref.viewAttribute === input).length > 0) {
                    return true;
                }
            }
        }
        return false;
    }
    getDirectiveRef(selector) {
        for (const directiveClass of this.directiveSet) {
            const directiveRef = Components.getBootstrap(directiveClass.prototype);
            if (directiveRef.selector === selector) {
                return directiveRef;
            }
        }
        return undefined;
    }
    getPipe(pipeName) {
        for (const pipeClass of this.pipeSet) {
            const pipeRef = Components.getBootstrap(pipeClass.prototype);
            if (pipeRef.name === pipeName) {
                return pipeRef;
            }
        }
        return undefined;
    }
    getService(serviceName) {
        for (const serviceClass of this.serviceSet) {
            const serviceRef = Components.getBootstrap(serviceClass.prototype);
            if (serviceRef.name === serviceName) {
                return serviceRef;
            }
        }
        return undefined;
    }
}
export const ClassRegistryProvider = new ClassRegistry();
//# sourceMappingURL=provider.js.map