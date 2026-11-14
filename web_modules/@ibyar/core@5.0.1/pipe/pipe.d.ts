import { ReactiveControlScope, ReadOnlyScope, ScopeSubscription } from '@ibyar/expressions';
import { OnDestroy } from '../component/lifecycle.js';
import { Type } from '../utils/typeof.js';
/**
 * Pipes are used as singleton
 * it will be created if it needed, had no life cycle
 */
export interface PipeTransform<T, U> {
    transform(value: T, ...args: any[]): U;
}
export interface AsyncPipeTransform<T, U> extends PipeTransform<T, U>, OnDestroy {
    transform(value: T, ...args: any[]): U;
    onDestroy(): void;
}
export declare function isPipeTransform<T extends any, U extends any>(pipe: any): pipe is PipeTransform<T, U>;
export declare class PipeProvider extends ReadOnlyScope<{
    [pipeName: string]: Function;
}> {
    constructor();
    has(pipeName: string): boolean;
    get(pipeName: string): any;
    getClass(): Type<PipeProvider>;
}
export declare class AsyncPipeProvider extends ReadOnlyScope<object> {
    constructor();
    has(pipeName: string): boolean;
    get(pipeName: string): Type<AsyncPipeTransform<any, any>> | undefined;
    getClass(): Type<AsyncPipeProvider>;
}
export declare class AsyncPipeScope<T extends {
    [key: string]: AsyncPipeTransform<any, any>;
}> extends ReactiveControlScope<T> {
    static blockScope<P extends {
        [key: string]: AsyncPipeTransform<any, any>;
    }>(): AsyncPipeScope<P>;
    private wrapper;
    constructor();
    set(propertyKey: keyof T, pipeClass: Type<AsyncPipeTransform<any, any>>, receiver?: any): boolean;
    get(propertyKey: keyof T): any;
    unsubscribe(propertyKey: keyof T, subscription?: ScopeSubscription<T>): void;
    getClass(): Type<AsyncPipeScope<T>>;
}
//# sourceMappingURL=pipe.d.ts.map