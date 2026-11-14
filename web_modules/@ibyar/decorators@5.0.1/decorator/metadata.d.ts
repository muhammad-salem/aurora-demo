export type MetadataClass<T = any> = {
    new (...args: any): T;
    [Symbol.metadata]: Record<PropertyKey, any>;
};
export interface MetadataContext extends Record<PropertyKey, any> {
}
declare global {
    interface SymbolConstructor {
        /**
         * metadata symbol
         */
        readonly metadata: unique symbol;
    }
}
declare class ContextService {
    private contextMap;
    constructor(contextMap: WeakMap<Record<any, any>, Record<any, any>>);
    has(key: Record<any, any>): boolean;
    get(key: Record<any, any>): Record<any, any> | undefined;
    getOrCreate(key: Record<any, any>): any;
    private clone;
}
export declare const metadataHoler: ContextService;
export declare function makeClassDecorator<V, Type = any>(decorator?: (param: V, constructor: Type, context: ClassDecoratorContext<new (...args: any) => any>, metadata: MetadataContext) => void): (param: V) => (constructor: any, context: ClassDecoratorContext<new (...args: any) => any>) => any;
export declare const Metadata: (param: void) => (constructor: any, context: ClassDecoratorContext<new (...args: any) => any>) => any;
export declare function makeClassMemberDecorator<Value, Context extends ClassMemberDecoratorContext = ClassMemberDecoratorContext>(decorator?: (value: Value | undefined, context: Context, metadata: MetadataContext) => void): (value: Value, context: Context) => void;
export {};
//# sourceMappingURL=metadata.d.ts.map