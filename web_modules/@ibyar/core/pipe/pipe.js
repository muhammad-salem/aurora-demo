import { ReactiveScopeControl, ReadOnlyScope } from '../../expressions/index.js';
import { createChangeDetectorRef } from '../linker/change-detector-ref.js';
import { ClassRegistryProvider } from '../providers/provider.js';
export class AsyncPipeTransform {
    constructor(changeDetectorRef) {
        this.changeDetectorRef = changeDetectorRef;
    }
}
export function isPipeTransform(pipe) {
    return Reflect.has(Object.getPrototypeOf(pipe), 'transform');
}
export class PipeProvider extends ReadOnlyScope {
    constructor() {
        super({});
    }
    has(pipeName) {
        if (pipeName in this.context) {
            return true;
        }
        const pipeRef = ClassRegistryProvider.getPipe(pipeName);
        return pipeRef !== undefined && !pipeRef.asynchronous;
    }
    get(pipeName) {
        let transformFunc;
        if (transformFunc = this.context[pipeName]) {
            return transformFunc;
        }
        const pipeRef = ClassRegistryProvider.getPipe(pipeName);
        if (pipeRef !== undefined && !pipeRef.asynchronous) {
            const pipe = new pipeRef.modelClass();
            transformFunc = (value, ...args) => pipe.transform(value, ...args);
            this.context[pipeRef.name] = transformFunc;
            return transformFunc;
        }
        return void 0;
    }
    getClass() {
        return PipeProvider;
    }
}
export class AsyncPipeProvider extends ReadOnlyScope {
    constructor() {
        super({});
    }
    has(pipeName) {
        const pipeRef = ClassRegistryProvider.getPipe(pipeName);
        return pipeRef?.asynchronous ? true : false;
    }
    get(pipeName) {
        const pipeRef = ClassRegistryProvider.getPipe(pipeName);
        if (pipeRef?.asynchronous) {
            return pipeRef.modelClass;
        }
        return;
    }
    getClass() {
        return AsyncPipeProvider;
    }
}
export class AsyncPipeScope extends ReactiveScopeControl {
    constructor() {
        super({});
        this.wrapper = {};
    }
    static blockScope() {
        return new AsyncPipeScope();
    }
    set(propertyKey, pipeClass, receiver) {
        const detector = createChangeDetectorRef(this, propertyKey);
        const pipe = new pipeClass(detector);
        const result = super.set(propertyKey, pipe, receiver);
        if (result) {
            this.wrapper[propertyKey] = (value, ...args) => {
                return pipe.transform(value, ...args);
            };
        }
        return result;
    }
    get(propertyKey) {
        return Reflect.get(this.wrapper, propertyKey);
    }
    unsubscribe(propertyKey, subscription) {
        super.unsubscribe(propertyKey, subscription);
        const pipe = this.context[propertyKey];
        pipe.onDestroy();
    }
    getClass() {
        return AsyncPipeScope;
    }
}
//# sourceMappingURL=pipe.js.map