export class InjectionToken {
    token;
    constructor(token) {
        this.token = token;
    }
    withType() {
        return this;
    }
}
const REQUIRE_INIT = Symbol('REQUIRE_INIT');
export class InjectionProvider {
    parent;
    types = new Map();
    tokens = new Map();
    constructor(parent) {
        this.parent = parent;
    }
    fork() {
        return new InjectionProvider(this);
    }
    hasToken(token) {
        return this.tokens.has(token) ? this : false;
    }
    hasType(type) {
        return this.types.has(type) ? this : false;
    }
    getToken(token) {
        let value = this.tokens.get(token);
        if (value === undefined && this.parent) {
            value = this.parent.getToken(token);
        }
        return value;
    }
    getInstance(type) {
        let instance = this.types.get(type);
        if (instance === undefined) {
            for (const providerType of this.types.keys()) {
                if (type.prototype instanceof providerType) {
                    instance = this.types.get(providerType);
                    break;
                }
            }
        }
        if (instance === REQUIRE_INIT) {
            instance = new type();
            this.types.set(type, instance);
        }
        else if (instance === undefined && this.parent) {
            instance = this.parent.getInstance(type);
        }
        return instance;
    }
    setType(type, value) {
        this.types.set(type, value ?? REQUIRE_INIT);
    }
    setToken(token, value) {
        this.tokens.set(token, value);
    }
    provide(typeOrToken, value) {
        if (typeOrToken instanceof InjectionToken) {
            this.setToken(typeOrToken, value);
        }
        else {
            this.setType(typeOrToken, value ?? REQUIRE_INIT);
        }
    }
    inject(typeOrToken) {
        if (typeOrToken instanceof InjectionToken) {
            return this.getToken(typeOrToken);
        }
        return this.getInstance(typeOrToken);
    }
    clear(typeOrToken) {
        if (typeOrToken instanceof InjectionToken) {
            const provider = this.parent?.hasToken(typeOrToken) || this;
            provider.tokens.delete(typeOrToken);
        }
        else {
            const provider = this.parent?.hasType(typeOrToken) || this;
            provider.types.delete(typeOrToken);
        }
    }
}
//# sourceMappingURL=provider.js.map