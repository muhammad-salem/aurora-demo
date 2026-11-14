if (!Symbol.metadata) {
    Object.defineProperty(Symbol, 'metadata', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: Symbol('Symbol.metadata'),
    });
}
class ContextService {
    contextMap;
    constructor(contextMap) {
        this.contextMap = contextMap;
    }
    has(key) {
        return this.contextMap.has(key);
    }
    get(key) {
        return this.contextMap.get(key);
    }
    getOrCreate(key) {
        if (this.contextMap.has(key)) {
            return this.contextMap.get(key);
        }
        const value = Object.create(null);
        const prototype = Object.getPrototypeOf(key);
        if (this.contextMap.has(prototype)) {
            const parent = this.contextMap.get(prototype);
            parent && this.clone(value, parent);
        }
        this.contextMap.set(key, value);
        return value;
    }
    clone(child, parent) {
        for (const property in parent) {
            const parentValue = parent[property];
            if (Array.isArray(parentValue)) {
                child[property] = [...parentValue];
            }
            else if (typeof parentValue === 'undefined' || parentValue === null) {
                child[property] = parentValue;
            }
            else if (typeof parentValue === 'object') {
                child[property] = Object.assign(Object.create(null), parentValue);
            }
            else {
                child[property] = parentValue;
            }
        }
    }
}
const contextMap = new WeakMap();
export const metadataHoler = new ContextService(contextMap);
export function makeClassDecorator(decorator) {
    return (param) => {
        return (constructor, context) => {
            const metadata = metadataHoler.getOrCreate(context.metadata);
            decorator?.(param, constructor, context, metadata);
            return constructor;
        };
    };
}
export const Metadata = makeClassDecorator();
export function makeClassMemberDecorator(decorator) {
    return (value, context) => {
        const metadata = metadataHoler.getOrCreate(context.metadata);
        decorator?.(value, context, metadata);
    };
}
//# sourceMappingURL=metadata.js.map