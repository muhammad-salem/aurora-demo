import { finalizerRegister } from './finalizer.js';
import { ModuleScope, ReactiveScope, ReactiveScopeControl, Scope, WebModuleScope } from './scope.js';
export class Stack {
    constructor(globals, resolver, moduleSource) {
        this.onDestroyActions = [];
        if (Array.isArray(globals)) {
            this.stack = globals;
        }
        else if (typeof globals == 'object') {
            this.stack = [globals];
        }
        else {
            this.stack = [];
        }
        if (resolver && moduleSource) {
            this.resolver = resolver;
            this.moduleSource = moduleSource;
            this.moduleScope = new ModuleScope(this.initModuleContext());
            this.pushScope(this.moduleScope);
            this.pushReactiveScope();
        }
        else {
            this.pushBlockScope();
        }
        finalizerRegister(this, this.onDestroyActions, this);
    }
    static for(...contexts) {
        if (contexts.length === 0) {
            return new Stack();
        }
        return new Stack(contexts.map(context => new Scope(context)));
    }
    static forScopes(...scopes) {
        if (scopes.length === 0) {
            scopes.push(Scope.blockScope());
        }
        return new Stack(scopes);
    }
    static moduleScope(resolver, moduleSource, ...globalScopes) {
        return new Stack(globalScopes, resolver, moduleSource);
    }
    initModuleContext() {
        const importFunc = (path) => {
            return this.importModule(path);
        };
        importFunc.meta = {
            url: createRootURL(this.moduleSource),
            resolve: (specified, parent) => {
                return Promise.resolve(this.resolver.resolveURL(specified, parent ?? importFunc.meta.url));
            }
        };
        const im = importFunc;
        return { import: im };
    }
    has(propertyKey) {
        return this.stack.find(context => context.has(propertyKey)) ? true : false;
    }
    get(propertyKey) {
        return this.findScope(propertyKey).get(propertyKey);
    }
    set(propertyKey, value, receiver) {
        return this.findScope(propertyKey).set(propertyKey, value, receiver);
    }
    declareVariable(propertyKey, propertyValue) {
        return this.lastScope().set(propertyKey, propertyValue);
    }
    findScope(propertyKey) {
        let lastIndex = this.stack.length;
        while (lastIndex--) {
            const scope = this.stack[lastIndex];
            if (scope.has(propertyKey)) {
                return scope;
            }
        }
        return this.lastScope();
    }
    resolveAwait(value) {
        this.awaitPromise.push(value);
    }
    popScope() {
        return this.stack.pop();
    }
    removeScope(scope) {
        const index = this.stack.lastIndexOf(scope);
        this.stack.splice(index, 1);
    }
    pushScope(scope) {
        this.stack.push(scope);
    }
    pushBlockScope() {
        const scope = Scope.blockScope();
        this.stack.push(scope);
        return scope;
    }
    pushBlockScopeFor(context) {
        const scope = Scope.for(context);
        this.stack.push(scope);
        return scope;
    }
    pushReactiveScope() {
        const scope = ReactiveScope.blockScope();
        this.stack.push(scope);
        return scope;
    }
    pushReactiveScopeFor(context) {
        const scope = ReactiveScope.for(context);
        this.stack.push(scope);
        return scope;
    }
    lastScope() {
        return this.stack[this.stack.length - 1];
    }
    clearTo(scope) {
        const index = this.stack.lastIndexOf(scope);
        if (index === -1) {
            return false;
        }
        this.stack.splice(index);
        return true;
    }
    clearTill(scope) {
        const index = this.stack.lastIndexOf(scope);
        if (index === -1) {
            return false;
        }
        this.stack.splice(index + 1);
        return true;
    }
    copyStack() {
        return new Stack(this.stack.slice(), this.resolver, this.moduleSource);
    }
    detach() {
        this.getReactiveScopeControls().forEach(scope => scope.detach());
    }
    reattach() {
        this.getReactiveScopeControls().forEach(scope => scope.reattach());
    }
    getReactiveScopeControls() {
        return this.stack.filter(scope => scope instanceof ReactiveScopeControl);
    }
    importModule(source, importCallOptions) {
        if (!this.resolver || !this.moduleScope) {
            throw new Error('Module Resolver is undefined');
        }
        return this.resolver.resolve(source, this.moduleScope, importCallOptions);
    }
    getModule() {
        return this.moduleScope;
    }
    onDestroy(action) {
        this.onDestroyActions.push(action);
    }
}
const ROOT_URL = 'https://root';
export function createRootURL(source) {
    return new URL(source, ROOT_URL);
}
;
export class ModuleScopeResolver {
    constructor(config) {
        this.config = config;
        this.modules = [];
        this.isValidHTTPUrl = (string) => {
            let url;
            try {
                url = new URL(string);
            }
            catch (e) {
                return false;
            }
            return url.protocol === 'http:' || url.protocol === 'https:';
        };
    }
    register(source, moduleScope) {
        const stackInfo = this.modules.find(tuple => tuple[0] == source && tuple[1] == moduleScope);
        if (stackInfo) {
            stackInfo[1] = moduleScope;
        }
        else {
            this.modules.push([source, moduleScope]);
        }
    }
    resolve(source, moduleScope, importCallOptions) {
        if (this.isValidHTTPUrl(source)) {
            return this.resolveExternalModule(source, importCallOptions);
        }
        if (source.startsWith('/')) {
            return this.findScopeBySource(source, importCallOptions);
        }
        const currentSource = this.findSourceByScope(moduleScope);
        const absoluteUrl = this.resolveURL(source, currentSource);
        return this.findScopeBySource(absoluteUrl, importCallOptions);
    }
    resolveURL(specified, parent) {
        const currentUrl = parent instanceof URL ? parent.href : createRootURL(parent).href;
        const importedUrl = new URL(specified, currentUrl).href;
        const absoluteUrl = importedUrl.replace(ROOT_URL, '');
        return absoluteUrl;
    }
    findScopeBySource(source, importCallOptions) {
        if (importCallOptions?.assert?.type) {
            const type = importCallOptions.assert.type;
            if (!source.endsWith(`.${type}`)) {
                throw new Error(`Can't find module scope`);
            }
        }
        const importedScope = this.modules.find(tuple => tuple[0] == source)?.[1];
        if (!importedScope) {
            throw new Error(`Can't find module scope`);
        }
        return importedScope;
    }
    findSourceByScope(moduleScope) {
        const importedSource = this.modules.find(tuple => tuple[1] == moduleScope)?.[0];
        if (!importedSource) {
            throw new Error(`Can't resolve scope source`);
        }
        return importedSource;
    }
    resolveExternalModule(source, importCallOptions) {
        if (!this.config?.allowImportExternal) {
            throw new Error(`Error: Import External Module is not allowed.`);
        }
        const webScope = new WebModuleScope();
        this.modules.push([source, webScope]);
        import(source).then(module => {
            webScope.updateContext(module);
        });
        return webScope;
    }
}
//# sourceMappingURL=stack.js.map