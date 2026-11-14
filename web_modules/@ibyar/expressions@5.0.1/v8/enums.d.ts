import { AccessorProperty, MethodDefinition, PropertyDefinition, StaticBlock } from '../api/class/class.js';
import { ExpressionNode } from '../api/expression.js';
import { VariableDeclarator } from '../api/statement/declarations/declares.js';
import { PositionMark } from './inline.js';
import { Token } from './token.js';
export declare function isInRange(num: number, start: number, end: number): boolean;
export declare enum ParsingArrowHeadFlag {
    CertainlyNotArrowHead = 0,
    MaybeArrowHead = 1,
    AsyncArrowFunction = 2
}
export declare enum PropertyKind {
    Value = 0,
    Shorthand = 1,
    ShorthandOrClassField = 2,
    Assign = 3,
    Method = 4,
    ClassField = 5,
    AccessorGetter = 6,
    AccessorSetter = 7,
    Spread = 8,
    NotSet = 9
}
export declare function isAccessor(kind: PropertyKind): kind is PropertyKind.AccessorGetter | PropertyKind.AccessorSetter;
export declare enum PropertyPosition {
    ObjectLiteral = 0,
    ClassLiteral = 1
}
export declare class PropertyKindInfo {
    name: string;
    position: PropertyPosition;
    funcFlag: ParseFunctionFlag;
    kind: PropertyKind;
    isComputedName: boolean;
    isPrivate: boolean;
    isStatic: boolean;
    isRest: boolean;
    rangeStart: PositionMark;
    parsePropertyKindFromToken(token: Token): boolean;
}
export type FunctionInfo = {
    rest?: boolean;
};
export declare enum PreParserIdentifierType {
    NullIdentifier = 0,
    UnknownIdentifier = 1,
    EvalIdentifier = 2,
    ArgumentsIdentifier = 3,
    ConstructorIdentifier = 4,
    AwaitIdentifier = 5,
    AsyncIdentifier = 6,
    NameIdentifier = 7,
    PrivateNameIdentifier = 8
}
export declare enum FunctionBodyType {
    EXPRESSION = 0,
    BLOCK = 1
}
export declare enum ParseFunctionFlag {
    IsNormal = 0,
    IsGenerator = 1,
    IsAsync = 2
}
export declare enum FunctionKind {
    NormalFunction = 0,
    Module = 1,
    AsyncModule = 2,
    BaseConstructor = 3,
    DefaultBaseConstructor = 4,
    DefaultDerivedConstructor = 5,
    DerivedConstructor = 6,
    GetterFunction = 7,
    StaticGetterFunction = 8,
    SetterFunction = 9,
    StaticSetterFunction = 10,
    ArrowFunction = 11,
    AsyncArrowFunction = 12,
    AsyncFunction = 13,
    AsyncConciseMethod = 14,
    StaticAsyncConciseMethod = 15,
    AsyncConciseGeneratorMethod = 16,
    StaticAsyncConciseGeneratorMethod = 17,
    AsyncGeneratorFunction = 18,
    GeneratorFunction = 19,
    ConciseGeneratorMethod = 20,
    StaticConciseGeneratorMethod = 21,
    ConciseMethod = 22,
    StaticConciseMethod = 23,
    ClassMembersInitializerFunction = 24,
    ClassStaticInitializerFunction = 25,
    Invalid = 26,
    LastFunctionKind = 25
}
export declare enum SubFunctionKind {
    NormalFunction = 0,
    NonStaticMethod = 1,
    StaticMethod = 2
}
export declare enum StaticFlag {
    NotStatic = 0,
    Static = 1
}
export declare function functionKindForImpl(subFunctionKind: SubFunctionKind, flags: ParseFunctionFlag): FunctionKind;
export declare function functionKindFor(isGenerator: boolean, isAsync: boolean): FunctionKind;
export declare function methodKindFor(isStatic: boolean, isGenerator: boolean, isAsync: boolean): FunctionKind;
export declare enum FunctionSyntaxKind {
    AnonymousExpression = 0,
    NamedExpression = 1,
    Declaration = 2,
    AccessorOrMethod = 3,
    Wrapped = 4,
    LastFunctionSyntaxKind = 4
}
export declare function isArrowFunction(kind: FunctionKind): boolean;
export declare function isModule(kind: FunctionKind): boolean;
export declare function isAsyncModule(kind: FunctionKind): kind is FunctionKind.AsyncModule;
export declare function isAsyncGeneratorFunction(kind: FunctionKind): boolean;
export declare function isGeneratorFunction(kind: FunctionKind): boolean;
export declare function isAsyncFunction(kind: FunctionKind): boolean;
export declare function isResumableFunction(kind: FunctionKind): boolean;
export declare function isConciseMethod(kind: FunctionKind): boolean;
export declare function isStrictFunctionWithoutPrototype(kind: FunctionKind): boolean;
export declare function isGetterFunction(kind: FunctionKind): boolean;
export declare function isSetterFunction(kind: FunctionKind): boolean;
export declare function isAccessorFunction(kind: FunctionKind): boolean;
export declare function isDefaultConstructor(kind: FunctionKind): boolean;
export declare function isBaseConstructor(kind: FunctionKind): boolean;
export declare function isDerivedConstructor(kind: FunctionKind): boolean;
export declare function isClassConstructor(kind: FunctionKind): boolean;
export declare function isClassMembersInitializerFunction(kind: FunctionKind): boolean;
export declare function isConstructable(kind: FunctionKind): boolean;
export declare function isStatic(kind: FunctionKind): boolean;
export declare function bindsSuper(kind: FunctionKind): boolean;
export declare function isAwaitAsIdentifierDisallowed(kind: FunctionKind): boolean;
export declare function functionKind2String(kind: FunctionKind): string;
export type ClassInfo = {
    extends?: ExpressionNode;
    publicMembers: (MethodDefinition | PropertyDefinition)[];
    privateMembers: (MethodDefinition | PropertyDefinition)[];
    staticElements: (MethodDefinition | PropertyDefinition | AccessorProperty | StaticBlock)[];
    instanceFields: (MethodDefinition | PropertyDefinition | AccessorProperty)[];
    constructor: MethodDefinition | undefined;
    hasSeenConstructor: boolean;
    hasStaticComputedNames: boolean;
    hasStaticElements: boolean;
    hasStaticPrivateMethods: boolean;
    hasStaticBlocks: boolean;
    hasInstanceMembers: boolean;
    requiresBrand: boolean;
    isAnonymous: boolean;
    hasPrivateMethods: boolean;
    computedFieldCount: number;
    homeObjectVariable?: VariableDeclarator;
    staticHomeObjectVariable?: VariableDeclarator;
};
export declare function createClassInfo(): ClassInfo;
export declare enum FunctionNameValidity {
    FunctionNameIsStrictReserved = "FunctionNameIsStrictReserved",
    SkipFunctionNameCheck = "SkipFunctionNameCheck",
    FunctionNameValidityUnknown = "FunctionNameValidityUnknown"
}
export declare enum ObjectLiteralPropertyKind {
    CONSTANT = "CONSTANT",// Property with constant value (compile time).
    COMPUTED = "COMPUTED",// Property with computed value (execution time).
    MATERIALIZED_LITERAL = "MATERIALIZED_LITERAL",// Property value is a materialized literal.
    GETTER = "GETTER",
    SETTER = "SETTER",// Property is an accessor function.
    PROTOTYPE = "PROTOTYPE",// Property is __proto__.
    SPREAD = "SPREAD"
}
export declare class ObjectLiteralProperty {
    static Kind: typeof ObjectLiteralPropertyKind;
}
export declare enum ClassLiteralPropertyKind {
    METHOD = "METHOD",
    GETTER = "GETTER",
    SETTER = "SETTER",
    FIELD = "FIELD"
}
export declare class ClassLiteralProperty {
    static Kind: typeof ClassLiteralPropertyKind;
}
export declare function classPropertyKindFor(kind: PropertyKind): ClassLiteralPropertyKind;
export declare enum VariableMode {
    Const = "Const",
    PrivateMethod = "PrivateMethod",
    PrivateGetterOnly = "PrivateGetterOnly",
    PrivateSetterOnly = "PrivateSetterOnly"
}
export declare function getVariableMode(kind: ClassLiteralPropertyKind): VariableMode;
export declare enum VariableDeclarationContext {
    StatementListItem = 0,
    Statement = 1,
    ForStatement = 2
}
export declare enum AllowLabelledFunctionStatement {
    AllowLabelledFunctionStatement = 0,
    DisallowLabelledFunctionStatement = 1
}
//# sourceMappingURL=enums.d.ts.map