import type { DeclarationExpression, ExpressionEventPath, ExpressionNode, NodeDeserializer, SourceLocation, VisitNodeType } from '../expression.js';
import { Stack } from '../../scope/stack.js';
import { AbstractExpressionNode } from '../abstract.js';
import { Identifier } from '../definition/values.js';
import { FunctionExpression } from '../definition/function.js';
import { BlockStatement } from '../statement/control/block.js';
import { Decorator } from './decorator.js';
declare const PRIVATE_SYMBOL: unique symbol;
interface ClassConstructor {
    /**
     * A reference to the prototype.
     */
    readonly prototype: ClassInstance;
    /**
     * private static properties and methods
     */
    [PRIVATE_SYMBOL]: Record<PropertyKey, any>;
    /**
     * public static class properties
     */
    [key: PropertyKey]: any;
}
declare var ClassInstance: ClassConstructor;
interface ClassInstance {
    /**
     * private instance properties and methods
     */
    [PRIVATE_SYMBOL]: Record<PropertyKey, any>;
    /**
     * public instance properties
     */
    [key: PropertyKey]: any;
}
type PropertyInitializer = () => {
    key: PropertyKey;
    value: any;
    isPrivate: boolean;
};
declare class ClassInitializer {
    /**
     * register class public static properties and methods
     */
    private staticInitializer;
    /**
     * register class private static properties and methods
     */
    private staticPrivateInitializer;
    /**
     * register static initialization block
     */
    private staticInitializerBlock;
    /**
     * register class constructor function
     */
    private instanceConstructor?;
    /**
     * register super parameter resolver
     */
    private superParameterResolver;
    /**
     * register in class property
     */
    private instanceMethod;
    /**
     * register method in instance private space
     */
    private privateInstanceMethod;
    /**
     * register property in instance itself
     */
    private instanceInitializer;
    addStaticInitializer(key: PropertyKey, attributes: PropertyDescriptor & ThisType<any>): void;
    addStaticPrivateInitializer(key: PropertyKey, attributes: PropertyDescriptor & ThisType<any>): void;
    addStaticInitializerBlock(block: () => void): void;
    setConstructor(cstr: Function): void;
    setParameterResolver(resolver: (params: any[]) => any[]): void;
    addInstanceMethod(key: PropertyKey, attributes: PropertyDescriptor & ThisType<any>): void;
    addPrivateInstanceMethod(key: PropertyKey, attributes: PropertyDescriptor & ThisType<any>): void;
    addInstanceInitializer(initializer: PropertyInitializer): void;
    initClass(classConstructor: ClassConstructor): void;
    getSuperArguments(args: any[]): any[];
    initInstance(instance: ClassInstance): void;
}
/**
 * A `super` pseudo-expression.
 */
export declare class Super extends AbstractExpressionNode {
    static fromJSON(node: Super): Super;
    constructor(range?: [number, number], loc?: SourceLocation);
    set(stack: Stack, value: any): void;
    get(stack: Stack, thisContext?: any): any;
    dependency(computed?: true): ExpressionNode[];
    dependencyPath(computed?: true): ExpressionEventPath[];
    toString(): string;
    toJson(): {
        [key: string]: any;
    };
}
/**
 * MetaProperty node represents
 * - `new.target` meta property in ES2015.
 * - `import.meta` meta property in ES2030.
 *
 * In the future, it will represent other meta properties as well.
 */
export declare class MetaProperty extends AbstractExpressionNode {
    private meta;
    private property;
    static fromJSON(node: MetaProperty, deserializer: NodeDeserializer<any>): MetaProperty;
    static visit(node: MetaProperty, visitNode: VisitNodeType): void;
    constructor(meta: Identifier, property: Identifier, range?: [number, number], loc?: SourceLocation);
    getMeta(): Identifier;
    getProperty(): Identifier;
    get(stack: Stack): any;
    set(stack: Stack, value: any): void;
    dependency(computed?: true | undefined): ExpressionNode[];
    dependencyPath(computed?: true | undefined): ExpressionEventPath[];
    toString(): string;
    toJson(): {
        [key: string]: any;
    };
}
/**
 * A private identifier refers to private class elements. For a private name `#a`, its name is `a`.
 */
export declare class PrivateIdentifier extends Identifier {
    static fromJSON(node: PrivateIdentifier): PrivateIdentifier;
    get(stack: Stack, thisContext: ClassInstance): any;
    set(stack: Stack, value: any): any;
    toString(): string;
}
/**
 * A static block static { } is a block statement serving as an additional static initializer.
 */
export declare class StaticBlock extends BlockStatement {
    static fromJSON(node: StaticBlock, deserializer: NodeDeserializer<any>): StaticBlock;
    get(stack: Stack, classInitializer?: ClassInitializer): void;
    toString(): string;
    toJson(): object;
}
export declare abstract class AbstractDefinition extends AbstractExpressionNode {
    protected key: ExpressionNode | PrivateIdentifier;
    protected decorators: Decorator[];
    protected computed: boolean;
    protected value?: ExpressionNode | undefined;
    protected 'static': boolean;
    constructor(key: ExpressionNode | PrivateIdentifier, decorators: Decorator[], computed: boolean, isStatic: boolean, value?: ExpressionNode | undefined, range?: [number, number], loc?: SourceLocation);
    getKey(): ExpressionNode | PrivateIdentifier;
    getValue(): ExpressionNode | undefined;
    isComputed(): boolean;
    isStatic(): boolean;
    isPrivate(): boolean;
    getDecorators(): Decorator[];
    set(stack: Stack, value: any): void;
    dependency(computed?: true): ExpressionNode[];
    dependencyPath(computed?: true): ExpressionEventPath[];
    getKeyName(stack: Stack): any;
    abstract get(stack: Stack, initializer?: ClassInitializer): void;
    abstract toString(): string;
    abstract toJson(): {
        [key: string]: any;
    };
}
export type MethodDefinitionKind = 'constructor' | 'method' | 'set' | 'get';
/**
 * - When key is a PrivateIdentifier, computed must be false and kind can not be "constructor".
 */
export declare class MethodDefinition extends AbstractDefinition {
    private kind;
    static fromJSON(node: MethodDefinition, deserializer: NodeDeserializer<any>): MethodDefinition;
    static visit(node: MethodDefinition, visitNode: VisitNodeType): void;
    protected 'static': boolean;
    value: FunctionExpression;
    afterInstanceConstruct: any;
    constructor(kind: MethodDefinitionKind, key: ExpressionNode | PrivateIdentifier, value: FunctionExpression, decorators: Decorator[], computed: boolean, isStatic: boolean, range?: [number, number], loc?: SourceLocation);
    getKind(): MethodDefinitionKind;
    getValue(): FunctionExpression;
    get(stack: Stack, initializer: ClassInitializer): void;
    private getPropertyAttributes;
    private initConstructor;
    toString(): string;
    toJson(): {
        [key: string]: any;
    };
}
/**
 * - When key is a PrivateIdentifier, computed must be false.
 */
export declare class PropertyDefinition extends AbstractDefinition {
    static fromJSON(node: PropertyDefinition, deserializer: NodeDeserializer<any>): PropertyDefinition;
    static visit(node: PropertyDefinition, visitNode: VisitNodeType): void;
    constructor(key: ExpressionNode | PrivateIdentifier, decorators: Decorator[], computed: boolean, isStatic: boolean, value?: ExpressionNode, range?: [number, number], loc?: SourceLocation);
    get(stack: Stack, initializer: ClassInitializer): void;
    toString(): string;
    toJson(): {
        [key: string]: any;
    };
}
export declare class AccessorProperty extends AbstractDefinition {
    static fromJSON(node: AccessorProperty, deserializer: NodeDeserializer): AccessorProperty;
    static visit(node: AccessorProperty, visitNode: VisitNodeType): void;
    constructor(key: ExpressionNode, decorators: Decorator[], computed: boolean, isStatic: boolean, value?: ExpressionNode, range?: [number, number], loc?: SourceLocation);
    get(stack: Stack, initializer: ClassInitializer): void;
    toString(): string;
    toJson(): {
        [key: string]: any;
    };
}
export declare class ClassBody extends AbstractExpressionNode {
    private body;
    static fromJSON(node: ClassBody, deserializer: NodeDeserializer<any>): ClassBody;
    static visit(node: ClassBody, visitNode: VisitNodeType): void;
    constructor(body: (MethodDefinition | PropertyDefinition | AccessorProperty | StaticBlock)[], range?: [number, number], loc?: SourceLocation);
    getBody(): (StaticBlock | MethodDefinition | PropertyDefinition | AccessorProperty)[];
    set(stack: Stack, value: any): void;
    get(stack: Stack, initializer: ClassInitializer): void;
    dependency(computed?: true): ExpressionNode[];
    dependencyPath(computed?: true): ExpressionEventPath[];
    toString(): string;
    toJson(): {
        [key: string]: any;
    };
}
export declare class Class extends AbstractExpressionNode {
    protected body: ClassBody;
    protected decorators: Decorator[];
    protected id?: Identifier | undefined;
    protected superClass?: ExpressionNode | undefined;
    constructor(body: ClassBody, decorators: Decorator[], id?: Identifier | undefined, superClass?: ExpressionNode | undefined, range?: [number, number], loc?: SourceLocation);
    getBody(): ClassBody;
    getDecorators(): Decorator[];
    getId(): Identifier | undefined;
    getSuperClass(): ExpressionNode | undefined;
    set(stack: Stack): void;
    get(stack: Stack): ClassConstructor;
    private createClass;
    dependency(computed?: true): ExpressionNode[];
    dependencyPath(computed?: true): ExpressionEventPath[];
    toString(): string;
    toJson(): object;
}
export declare class ClassDeclaration extends Class implements DeclarationExpression {
    static fromJSON(node: ClassDeclaration, deserializer: NodeDeserializer<any>): ClassDeclaration;
    static visit(node: ClassDeclaration, visitNode: VisitNodeType): void;
    protected id: Identifier;
    constructor(body: ClassBody, decorators: Decorator[], id: Identifier, superClass?: ExpressionNode, range?: [number, number], loc?: SourceLocation);
    declareVariable(stack: Stack, propertyValue?: any): void;
    getDeclarationName(): string;
    get(stack: Stack): ClassConstructor;
}
export declare class ClassExpression extends Class {
    static fromJSON(node: ClassExpression, deserializer: NodeDeserializer<any>): ClassExpression;
    static visit(node: ClassExpression, visitNode: VisitNodeType): void;
    constructor(body: ClassBody, decorators: Decorator[], id?: Identifier, superClass?: ExpressionNode, range?: [number, number], loc?: SourceLocation);
}
export {};
//# sourceMappingURL=class.d.ts.map