import { ReactiveControlScope, ReadOnlyScope } from '../../expressions/index.js';
import { isOnInit } from '../component/lifecycle.js';
import { ChangeDetectorRef, createChangeDetectorRef } from '../linker/change-detector-ref.js';
import { classRegistryProvider } from '../providers/provider.js';
import { addProvider, forkProvider, removeProvider } from '../di/inject.js';
import { AbstractAuroraZone } from '../zone/zone.js';
export function isPipeTransform(pipe) {
    return Reflect.has(Object.getPrototypeOf(pipe), 'transform');
}
export class PipeProvider extends ReadOnlyScope {
    constructor() {
        super({});
    }
    has(pipeName) {
        if (pipeName in this._ctx) {
            return true;
        }
        const pipeRef = classRegistryProvider.getPipe(pipeName);
        return pipeRef !== undefined && !pipeRef.asynchronous;
    }
    get(pipeName) {
        let transformFunc;
        if (transformFunc = this._ctx[pipeName]) {
            return transformFunc;
        }
        const pipeRef = classRegistryProvider.getPipe(pipeName);
        if (pipeRef !== undefined && !pipeRef.asynchronous) {
            const provider = forkProvider();
            addProvider(provider);
            const pipe = new pipeRef.modelClass();
            removeProvider(provider);
            if (isOnInit(pipe)) {
                if (provider.hasType(AbstractAuroraZone)) {
                    const zone = provider.inject(AbstractAuroraZone);
                    zone?.run(pipe.onInit, this.getContextProxy());
                }
                else {
                    try {
                        pipe.onInit();
                    }
                    catch (e) {
                        console.error(e);
                    }
                }
            }
            transformFunc = (value, ...args) => pipe.transform(value, ...args);
            this._ctx[pipeRef.name] = transformFunc;
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
        const pipeRef = classRegistryProvider.getPipe(pipeName);
        return pipeRef?.asynchronous ? true : false;
    }
    get(pipeName) {
        const pipeRef = classRegistryProvider.getPipe(pipeName);
        if (pipeRef?.asynchronous) {
            return pipeRef.modelClass;
        }
        return;
    }
    getClass() {
        return AsyncPipeProvider;
    }
}
export class AsyncPipeScope extends ReactiveControlScope {
    static blockScope() {
        return new AsyncPipeScope();
    }
    wrapper = {};
    constructor() {
        super({});
    }
    set(propertyKey, pipeClass, receiver) {
        const detector = createChangeDetectorRef(this, propertyKey);
        const provider = forkProvider();
        provider.setType(ChangeDetectorRef, detector);
        addProvider(provider);
        const pipe = new pipeClass(detector);
        removeProvider(provider);
        if (isOnInit(pipe)) {
            if (provider.hasType(AbstractAuroraZone)) {
                const zone = provider.inject(AbstractAuroraZone);
                zone?.run(pipe.onInit, this.getContextProxy());
            }
            else {
                try {
                    pipe.onInit();
                }
                catch (e) {
                    console.error(e);
                }
            }
        }
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
        const pipe = this._ctx[propertyKey];
        pipe.onDestroy();
    }
    getClass() {
        return AsyncPipeScope;
    }
}
//# sourceMappingURL=pipe.js.map