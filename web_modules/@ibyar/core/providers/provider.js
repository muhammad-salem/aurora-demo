import { ReflectComponents } from '../component/reflect.js';
export class ClassRegistry {
    viewSet = new Set();
    componentSet = new Set();
    serviceSet = new Set();
    directiveSet = new Set();
    pipeSet = new Set();
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
            const componentRef = ReflectComponents.getMetaDate(modelClass);
            if (componentRef.selector === selector) {
                return true;
            }
        }
        return false;
    }
    getComponentRef(selector) {
        for (const modelClass of this.componentSet) {
            const componentRef = ReflectComponents.getMetaDate(modelClass);
            if (componentRef.selector === selector) {
                return componentRef;
            }
        }
        return;
    }
    getComponent(selector) {
        for (const modelClass of this.componentSet) {
            const componentRef = ReflectComponents.getMetaDate(modelClass);
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
            const directiveRef = ReflectComponents.getMetaDate(directiveClass);
            if (directiveRef.selector === selector) {
                return true;
            }
        }
        return false;
    }
    hasService(name) {
        for (const modelClass of this.serviceSet) {
            const componentRef = ReflectComponents.getMetaDate(modelClass);
            if (componentRef.name === name) {
                return true;
            }
        }
        return false;
    }
    directiveHasInput(input, directiveType = 'attributes') {
        for (const directiveClass of this.directiveSet) {
            const directiveRef = ReflectComponents.getMetaDate(directiveClass);
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
            const directiveRef = ReflectComponents.getMetaDate(directiveClass);
            if (directiveRef?.selector === selector) {
                return directiveRef;
            }
        }
        return undefined;
    }
    getPipe(pipeName) {
        for (const pipeClass of this.pipeSet) {
            const pipeRef = ReflectComponents.getMetaDate(pipeClass);
            if (pipeRef.name === pipeName) {
                return pipeRef;
            }
        }
        return undefined;
    }
    deleteComponent(selector) {
        for (const modelClass of this.componentSet) {
            const componentRef = ReflectComponents.getMetaDate(modelClass);
            if (componentRef?.selector === selector) {
                this.componentSet.delete(modelClass);
                break;
            }
        }
    }
    deleteDirective(selector) {
        for (const modelClass of this.directiveSet) {
            const directiveRef = ReflectComponents.getMetaDate(modelClass);
            if (directiveRef?.selector === selector) {
                this.directiveSet.delete(modelClass);
                break;
            }
        }
    }
    deleteService(name) {
        for (const modelClass of this.serviceSet) {
            const componentRef = ReflectComponents.getMetaDate(modelClass);
            if (componentRef.name === name) {
                this.serviceSet.delete(modelClass);
                break;
            }
        }
    }
    deletePipe(name) {
        for (const modelClass of this.pipeSet) {
            const pipeRef = ReflectComponents.getMetaDate(modelClass);
            if (pipeRef.name === name) {
                this.pipeSet.delete(modelClass);
                break;
            }
        }
    }
}
export const classRegistryProvider = new ClassRegistry();
//# sourceMappingURL=provider.js.map