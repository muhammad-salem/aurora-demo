import type { AbstractType, Type } from '../utils/typeof.js';
export declare class InjectionToken<T> {
    token: string;
    constructor(token: string);
    withType<V>(): InjectionToken<V>;
}
export type Provider<T> = Type<T> | AbstractType<T> | InjectionToken<T>;
export declare class InjectionProvider {
    private parent?;
    private readonly types;
    private readonly tokens;
    constructor(parent?: InjectionProvider | undefined);
    fork(): InjectionProvider;
    hasToken<T>(token: InjectionToken<T>): InjectionProvider | false;
    hasType<T>(type: Type<any> | AbstractType<any>): InjectionProvider | false;
    getToken<T>(token: InjectionToken<T>): T | undefined;
    getInstance<T>(type: Type<any> | AbstractType<any>): T;
    setType<T>(type: Type<any> | AbstractType<any>, value?: T): void;
    setToken<T>(token: InjectionToken<T>, value: T): void;
    provide<T>(typeOrToken: Provider<T>, value?: T): void;
    inject<T>(typeOrToken: Provider<T>): T | undefined;
    clear<T>(typeOrToken: Provider<T>): void;
}
//# sourceMappingURL=provider.d.ts.map