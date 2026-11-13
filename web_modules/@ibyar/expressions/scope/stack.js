import { LanguageMode } from '../v8/language.js';
import { JavaScriptParser } from '../v8/parser.js';
import { finalizerRegister } from './finalizer.js';
import { ModuleScope, ReactiveScope, ReactiveControlScope, Scope, WebModuleScope } from './scope.js';
export class Stack {
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
    awaitPromise = [];
    forAwaitAsyncIterable;
    stack;
    moduleScope;
    moduleSource;
    resolver;
    onDestroyActions = [];
    constructor(globals, resolver, moduleSource) {
        if (Array.isArray(globals)) {
            this.stack = globals.slice();
        }
        else if (globals instanceof Stack) {
            this.stack = globals.stack.slice();
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
            // init module scope for import and export
            this.moduleScope = new ModuleScope(this.initModuleContext());
            this.pushScope(this.moduleScope);
            // for the rest of module body
            this.pushReactiveScope();
        }
        else if (this.stack.length === 0) {
            // not a module scope
            this.pushBlockScope();
        }
        finalizerRegister(this, this.onDestroyActions, this);
    }
    initModuleContext() {
        const importFunc = (path) => {
            const module = this.importModule(path);
            if (module instanceof WebModuleScope) {
                return module.resolveImport();
            }
            return Promise.resolve(module.getContext());
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
    pushBlockScope(propertyKeys) {
        const scope = Scope.blockScope(propertyKeys);
        this.stack.push(scope);
        return scope;
    }
    pushBlockScopeFor(context, propertyKeys) {
        const scope = Scope.for(context, propertyKeys);
        this.stack.push(scope);
        return scope;
    }
    pushReactiveScope(propertyKeys) {
        const scope = ReactiveScope.blockScope(propertyKeys);
        this.stack.push(scope);
        return scope;
    }
    pushReactiveScopeFor(context, propertyKeys) {
        const scope = ReactiveScope.for(context, propertyKeys);
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
    detectChanges() {
        this.getReactiveScope().forEach(scope => scope.detectChanges());
    }
    getReactiveScopeControls() {
        return this.stack.filter(scope => scope instanceof ReactiveControlScope);
    }
    getReactiveScope() {
        return this.stack.filter(scope => scope instanceof ReactiveScope);
    }
    importModule(source, importCallOptions) {
        if (!this.resolver || !this.moduleScope) {
            // should o the parse and import the module
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
    globalStack;
    provider;
    config;
    modules = [];
    constructor(globalStack, provider, config) {
        this.globalStack = globalStack;
        this.provider = provider;
        this.config = config;
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
        if (importCallOptions?.with?.type) {
            const type = importCallOptions.with.type;
            if (!source.endsWith(`.${type}`)) {
                throw new Error(`Can't find module scope`);
            }
        }
        const importedScope = this.modules.find(tuple => tuple[0] == source)?.[1];
        if (!importedScope) {
            // search in the file system provider
            const javascriptSource = this.provider[source];
            if (javascriptSource || javascriptSource == '') {
                // module exists
                const moduleProgram = JavaScriptParser.parse(javascriptSource, { mode: LanguageMode.Strict });
                const stack = new Stack(this.globalStack, this, source);
                // register with absoluteUrl
                this.register(source, stack.getModule());
                moduleProgram.get(stack);
                return stack.getModule();
            }
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
        const webScope = new WebModuleScope(source, importCallOptions);
        this.modules.push([source, webScope]);
        return webScope;
    }
    isValidHTTPUrl = (string) => {
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
//# sourceMappingURL=stack.js.map