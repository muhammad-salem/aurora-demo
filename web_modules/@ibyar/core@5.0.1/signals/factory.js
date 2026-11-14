import { ReactiveNode, SignalScope } from '../../expressions@5.0.1/index.js';
class SignalScopeFactory {
    scopes = [SignalScope.create()];
    effectState = [];
    push(scope) {
        this.scopes.push(scope);
    }
    pop(scop) {
        if (this.scopes.pop() !== scop) {
            throw new Error('expect scope is not matching');
        }
    }
    factory(creator) {
        this.assertValidContext();
        const scope = this.scopes.at(-1);
        return creator(scope, scope.getNextKey());
    }
    signal(initValue) {
        this.assertValidContext();
        const scope = this.scopes.at(-1);
        return this.scopes.at(-1).createSignal(initValue);
    }
    computed(computation) {
        this.assertValidContext();
        return this.scopes.at(-1).createComputed(computation);
    }
    lazy(computation) {
        this.assertValidContext();
        return this.scopes.at(-1).createLazy(computation);
    }
    effect(effectFn) {
        this.assertValidContext();
        const scope = this.scopes.at(-1);
        return scope.createEffect(this.wrapEffect(scope, effectFn));
    }
    untracked(nonReactiveReads) {
        const scope = this.effectState.at(-1);
        scope?.untrack();
        const value = nonReactiveReads instanceof ReactiveNode
            ? nonReactiveReads.get()
            : nonReactiveReads();
        scope?.track();
        return value;
    }
    assertValidContext() {
        if (this.scopes.length <= 0) {
            throw new Error('Create a Signal, Computed and Effect is only allowed in class constructor.');
        }
    }
    wrapEffect(scope, effectFn) {
        return (onCleanup) => {
            this.effectState.push(scope);
            effectFn(onCleanup);
            this.effectState.pop();
        };
    }
}
export const signalScopeFactory = new SignalScopeFactory();
//# sourceMappingURL=factory.js.map