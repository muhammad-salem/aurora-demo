import { AbstractType, Type } from '../utils/typeof.js';
import { InjectionProvider, InjectionToken } from './provider.js';
export declare function forkProvider(): InjectionProvider;
export declare function addProvider(modelProvider: InjectionProvider): void;
export declare function removeProvider(modelProvider: InjectionProvider): void;
export declare function provide<T>(type: Type<T>): void;
export declare function provide<T>(type: AbstractType<T>): void;
export declare function provide<T>(type: Type<T>, value: T): void;
export declare function provide<T>(type: AbstractType<T>, value: T): void;
export declare function provide<T>(token: InjectionToken<T>, value: T): void;
export declare function inject<T>(type: Type<T>): T;
export declare function inject<T>(type: AbstractType<T>): T;
export declare function inject<T>(token: InjectionToken<T>): T | undefined;
//# sourceMappingURL=inject.d.ts.map