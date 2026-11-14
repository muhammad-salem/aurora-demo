import { isReactive, isSignal, ReactiveScope, ReadOnlyScope, Scope } from '../../expressions@5.0.1/index.js';
import { inject } from '../di/inject.js';
import { InjectionToken } from '../di/provider.js';
import { TemplateRef } from '../linker/template-ref.js';
import { ViewContainerRef } from '../linker/view-container-ref.js';
import { AuroraZone } from '../zone/zone.js';
export const NATIVE_HOST_TOKEN = new InjectionToken('NATIVE_HOST');
export const DIRECTIVE_HOST_TOKEN = new InjectionToken('DIRECTIVE_HOST');
export const SUCCESSORS_TOKEN = new InjectionToken('SUCCESSORS_TOKEN');
/**
 * A structural directive selector as '*if' '*for'
 */
export class StructuralDirective {
    zone = inject(AuroraZone);
    templateRef = inject(TemplateRef);
    host = inject(DIRECTIVE_HOST_TOKEN);
    successors = inject(SUCCESSORS_TOKEN);
    viewContainerRef = inject(ViewContainerRef);
    getSuccessor(name) {
        return this.successors[name];
    }
}
/**
 * An attributes directive selector as '[class] [style]'
 */
export class AttributeDirective {
    el = inject(NATIVE_HOST_TOKEN);
    zone = inject(AuroraZone);
}
export class ReactiveSignalScope extends ReactiveScope {
    static for(context, propertyKeys) {
        return new ReactiveSignalScope(context, propertyKeys);
    }
    static blockScope(propertyKeys) {
        return new ReactiveSignalScope({}, propertyKeys);
    }
    static scopeForThis(ctx, propertyKeys) {
        const thisScope = ReactiveSignalScope.for(ctx, propertyKeys);
        const thisCtx = {
            'this': ctx,
        };
        const rootScope = Scope.for(thisCtx, ['this']);
        rootScope.setInnerScope('this', thisScope);
        return rootScope;
    }
    static readOnlyScopeForThis(ctx, propertyKeys) {
        const thisScope = ReactiveSignalScope.for(ctx, propertyKeys);
        const thisCtx = {
            'this': ctx,
        };
        const rootScope = ReadOnlyScope.for(thisCtx, ['this']);
        rootScope.setInnerScope('this', thisScope);
        return rootScope;
    }
    get(propertyKey) {
        const value = super.get(propertyKey);
        if (isReactive(value)) {
            return value.get();
        }
        return value;
    }
    set(propertyKey, newValue, receiver) {
        const value = Reflect.get(this._ctx, propertyKey);
        if (isSignal(value)) {
            value.set(newValue);
            return true;
        }
        else {
            return super.set(propertyKey, newValue, receiver);
        }
    }
    subscribe(propertyKey, callback) {
        const value = Reflect.get(this._ctx, propertyKey);
        if (isReactive(value)) {
            return value.subscribe(callback);
        }
        else {
            return super.subscribe(propertyKey, callback);
        }
    }
    unsubscribe(propertyKey, subscription) {
        if (propertyKey) {
            const value = Reflect.get(this._ctx, propertyKey);
            if (isReactive(value)) {
                value.getScope().unsubscribe(value.getIndex(), subscription);
                return;
            }
        }
        super.unsubscribe(propertyKey, subscription);
    }
}
//# sourceMappingURL=directive.js.map