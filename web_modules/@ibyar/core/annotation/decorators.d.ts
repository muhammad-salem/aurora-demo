import type { Type } from '../utils/typeof.js';
import { ComponentOptions, DirectiveOptions, PipeOptions, InjectableOptions, ModuleOptions } from './options.js';
export declare function HostListener<This, Value extends (this: This, ...args: any) => any>(eventName: string, args?: string | string[]): (value: Value, context: ClassMethodDecoratorContext<unknown, (this: unknown, ...args: any) => any>) => void;
type ValueGetter<T> = T | (() => T) | undefined;
export declare function HostBinding<This, Value>(hostPropertyName: string): (value: ValueGetter<Value>, context: ClassFieldDecoratorContext<This, Value> | ClassMethodDecoratorContext<This, any> | ClassGetterDecoratorContext<This, Value>) => void;
/**
 * register a new pipe
 */
export declare const Pipe: (param: PipeOptions) => (constructor: any, context: ClassDecoratorContext<new (...args: any) => any>) => any;
/**
 * register a new structure or attribute directive
 */
export declare const Directive: (param: DirectiveOptions) => (constructor: any, context: ClassDecoratorContext<new (...args: any) => any>) => any;
/**
 * register a new service
 */
export declare const Injectable: (param: InjectableOptions) => (constructor: any, context: ClassDecoratorContext<new (...args: any) => any>) => any;
/**
 * register a new service
 */
export declare const Service: (param: void) => (constructor: any, context: ClassDecoratorContext<new (...args: any) => any>) => any;
/**
 * define a new custom element model class
 */
export declare const Component: (param: ComponentOptions<Type<any>> | ComponentOptions<Type<any>>[]) => (constructor: any, context: ClassDecoratorContext<new (...args: any) => any>) => any;
export declare const customElement: (param: {
    selector: string;
} & ElementDefinitionOptions) => (constructor: any, context: ClassDecoratorContext<new (...args: any) => any>) => any;
export declare const Module: (param: ModuleOptions) => (constructor: any, context: ClassDecoratorContext<new (...args: any) => any>) => any;
export {};
//# sourceMappingURL=decorators.d.ts.map