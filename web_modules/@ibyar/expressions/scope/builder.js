import { ReactiveScope, ReactiveControlScope, ReadOnlyScope, Scope } from './scope.js';
export class ScopeBuilder {
    static for(ctx, propertyKeys) {
        return new Scope(ctx, propertyKeys);
    }
    static blockScope(propertyKeys) {
        return new Scope({}, propertyKeys);
    }
    static readOnlyScopeFor(ctx, propertyKeys) {
        return new ReadOnlyScope(ctx, propertyKeys);
    }
    static blockReadOnlyScope(propertyKeys) {
        return new ReadOnlyScope({}, propertyKeys);
    }
    static reactiveScopeFor(context, propertyKeys) {
        return new ReactiveScope(context, propertyKeys);
    }
    static blockReactiveScope(propertyKeys) {
        return new ReactiveScope({}, propertyKeys);
    }
    static reactiveScopeForThis(ctx, propertyKeys) {
        const thisScope = ReactiveScope.for(ctx, propertyKeys);
        const thisCtx = {
            'this': ctx,
        };
        const rootScope = Scope.for(thisCtx, ['this']);
        rootScope.setInnerScope('this', thisScope);
        return rootScope;
    }
    static readOnlyScopeAndReactiveScopeForThis(ctx, propertyKeys) {
        const thisScope = ReactiveScope.for(ctx, propertyKeys);
        const thisCtx = {
            'this': ctx,
        };
        const rootScope = ReadOnlyScope.for(thisCtx, ['this']);
        rootScope.setInnerScope('this', thisScope);
        return rootScope;
    }
    static reactiveScopeAndScopeForThis(ctx, propertyKeys) {
        const thisScope = ReactiveScope.for(ctx, propertyKeys);
        const thisCtx = {
            'this': ctx,
        };
        const rootScope = Scope.for(thisCtx, ['this']);
        rootScope.setInnerScope('this', thisScope);
        return rootScope;
    }
    static reactiveScopeControlFor(context, propertyKeys) {
        return new ReactiveControlScope(context, propertyKeys);
    }
    static blockReactiveScopeControl(propertyKeys) {
        return new ReactiveControlScope({}, propertyKeys);
    }
    static reactiveScopeControlForThis(ctx, propertyKeys) {
        const thisScope = ReactiveControlScope.for(ctx, propertyKeys);
        const thisCtx = {
            'this': ctx,
        };
        const rootScope = Scope.for(thisCtx, ['this']);
        rootScope.setInnerScope('this', thisScope);
        return rootScope;
    }
    static readOnlyScopeAndReactiveScopeControlForThis(ctx, propertyKeys) {
        const thisScope = ReactiveControlScope.for(ctx, propertyKeys);
        const thisCtx = {
            'this': ctx,
        };
        const rootScope = ReadOnlyScope.for(thisCtx, ['this']);
        rootScope.setInnerScope('this', thisScope);
        return rootScope;
    }
}
//# sourceMappingURL=builder.js.map