import { ReactiveScope, ReactiveScopeControl, Scope } from './scope.js';
export class Stack {
    constructor(stack) {
        this.stack = stack ?? [Scope.functionScope()];
    }
    static for(...contexts) {
        if (contexts.length === 0) {
            return new Stack();
        }
        return new Stack(contexts.map(context => new Scope(context, 'global')));
    }
    static forScopes(...scopes) {
        if (scopes.length === 0) {
            scopes.push(Scope.functionScope());
        }
        return new Stack(scopes);
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
    declareVariable(scopeType, propertyKey, propertyValue) {
        if (scopeType === 'block') {
            return this.lastScope().set(propertyKey, propertyValue);
        }
        let lastIndex = this.stack.length;
        while (lastIndex--) {
            const scope = this.stack[lastIndex];
            if (scope.type === scopeType) {
                scope.set(propertyKey, propertyValue);
                break;
            }
        }
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
    pushFunctionScope() {
        const scope = Scope.functionScope();
        this.stack.push(scope);
        return scope;
    }
    pushClassScope() {
        const scope = Scope.classScope();
        this.stack.push(scope);
        return scope;
    }
    pushModuleScope() {
        const scope = Scope.moduleScope();
        this.stack.push(scope);
        return scope;
    }
    pushGlobalScope() {
        const scope = Scope.globalScope();
        this.stack.push(scope);
        return scope;
    }
    pushBlockScopeFor(context) {
        const scope = Scope.blockScopeFor(context);
        this.stack.push(scope);
        return scope;
    }
    pushFunctionScopeFor(context) {
        const scope = Scope.functionScopeFor(context);
        this.stack.push(scope);
        return scope;
    }
    pushClassScopeFor(context) {
        const scope = Scope.classScopeFor(context);
        this.stack.push(scope);
        return scope;
    }
    pushModuleScopeFor(context) {
        const scope = Scope.moduleScopeFor(context);
        this.stack.push(scope);
        return scope;
    }
    pushGlobalScopeFor(context) {
        const scope = Scope.globalScopeFor(context);
        this.stack.push(scope);
        return scope;
    }
    pushBlockReactiveScope() {
        const scope = ReactiveScope.blockScope();
        this.stack.push(scope);
        return scope;
    }
    pushFunctionReactiveScope() {
        const scope = ReactiveScope.functionScope();
        this.stack.push(scope);
        return scope;
    }
    pushClassReactiveScope() {
        const scope = ReactiveScope.classScope();
        this.stack.push(scope);
        return scope;
    }
    pushModuleReactiveScope() {
        const scope = ReactiveScope.moduleScope();
        this.stack.push(scope);
        return scope;
    }
    pushGlobalReactiveScope() {
        const scope = ReactiveScope.globalScope();
        this.stack.push(scope);
        return scope;
    }
    pushBlockReactiveScopeFor(context) {
        const scope = ReactiveScope.blockScopeFor(context);
        this.stack.push(scope);
        return scope;
    }
    pushFunctionReactiveScopeFor(context) {
        const scope = ReactiveScope.functionScopeFor(context);
        this.stack.push(scope);
        return scope;
    }
    pushClassReactiveScopeFor(context) {
        const scope = ReactiveScope.classScopeFor(context);
        this.stack.push(scope);
        return scope;
    }
    pushModuleReactiveScopeFor(context) {
        const scope = ReactiveScope.moduleScopeFor(context);
        this.stack.push(scope);
        return scope;
    }
    pushGlobalReactiveScopeFor(context) {
        const scope = ReactiveScope.globalScopeFor(context);
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
        return new Stack(this.stack.slice());
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
}
//# stack.js.map