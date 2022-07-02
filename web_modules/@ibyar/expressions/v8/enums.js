import { Token } from './token.js';
export function isInRange(num, start, end) {
    return num >= start && num <= end;
}
export var ParsingArrowHeadFlag;
(function (ParsingArrowHeadFlag) {
    ParsingArrowHeadFlag[ParsingArrowHeadFlag["CertainlyNotArrowHead"] = 0] = "CertainlyNotArrowHead";
    ParsingArrowHeadFlag[ParsingArrowHeadFlag["MaybeArrowHead"] = 1] = "MaybeArrowHead";
    ParsingArrowHeadFlag[ParsingArrowHeadFlag["AsyncArrowFunction"] = 2] = "AsyncArrowFunction";
})(ParsingArrowHeadFlag || (ParsingArrowHeadFlag = {}));
export var PropertyKind;
(function (PropertyKind) {
    PropertyKind[PropertyKind["Value"] = 0] = "Value";
    PropertyKind[PropertyKind["Shorthand"] = 1] = "Shorthand";
    PropertyKind[PropertyKind["ShorthandOrClassField"] = 2] = "ShorthandOrClassField";
    PropertyKind[PropertyKind["Assign"] = 3] = "Assign";
    PropertyKind[PropertyKind["Method"] = 4] = "Method";
    PropertyKind[PropertyKind["ClassField"] = 5] = "ClassField";
    PropertyKind[PropertyKind["AccessorGetter"] = 6] = "AccessorGetter";
    PropertyKind[PropertyKind["AccessorSetter"] = 7] = "AccessorSetter";
    PropertyKind[PropertyKind["Spread"] = 8] = "Spread";
    PropertyKind[PropertyKind["NotSet"] = 9] = "NotSet";
})(PropertyKind || (PropertyKind = {}));
export function isAccessor(kind) {
    return kind === PropertyKind.AccessorGetter || kind === PropertyKind.AccessorSetter;
}
export var PropertyPosition;
(function (PropertyPosition) {
    PropertyPosition[PropertyPosition["ObjectLiteral"] = 0] = "ObjectLiteral";
    PropertyPosition[PropertyPosition["ClassLiteral"] = 1] = "ClassLiteral";
})(PropertyPosition || (PropertyPosition = {}));
export class PropertyKindInfo {
    constructor() {
        this.position = PropertyPosition.ClassLiteral;
        this.funcFlag = ParseFunctionFlag.IsNormal;
        this.kind = PropertyKind.NotSet;
        this.isComputedName = false;
        this.isPrivate = false;
        this.isStatic = false;
        this.isRest = false;
    }
    parsePropertyKindFromToken(token) {
        // This returns true, setting the property kind, iff the given token is
        // one which must occur after a property name, indicating that the
        // previous token was in fact a name and not a modifier (like the "get" in
        // "get x").
        switch (token) {
            case Token.COLON:
                this.kind = PropertyKind.Value;
                return true;
            case Token.COMMA:
                this.kind = PropertyKind.Shorthand;
                return true;
            case Token.RBRACE:
                this.kind = PropertyKind.ShorthandOrClassField;
                return true;
            case Token.ASSIGN:
                this.kind = PropertyKind.Assign;
                return true;
            case Token.LPAREN:
                this.kind = PropertyKind.Method;
                return true;
            case Token.MUL:
            case Token.SEMICOLON:
                this.kind = PropertyKind.ClassField;
                return true;
            default:
                break;
        }
        return false;
    }
}
export var PreParserIdentifierType;
(function (PreParserIdentifierType) {
    PreParserIdentifierType[PreParserIdentifierType["NullIdentifier"] = 0] = "NullIdentifier";
    PreParserIdentifierType[PreParserIdentifierType["UnknownIdentifier"] = 1] = "UnknownIdentifier";
    PreParserIdentifierType[PreParserIdentifierType["EvalIdentifier"] = 2] = "EvalIdentifier";
    PreParserIdentifierType[PreParserIdentifierType["ArgumentsIdentifier"] = 3] = "ArgumentsIdentifier";
    PreParserIdentifierType[PreParserIdentifierType["ConstructorIdentifier"] = 4] = "ConstructorIdentifier";
    PreParserIdentifierType[PreParserIdentifierType["AwaitIdentifier"] = 5] = "AwaitIdentifier";
    PreParserIdentifierType[PreParserIdentifierType["AsyncIdentifier"] = 6] = "AsyncIdentifier";
    PreParserIdentifierType[PreParserIdentifierType["NameIdentifier"] = 7] = "NameIdentifier";
    PreParserIdentifierType[PreParserIdentifierType["PrivateNameIdentifier"] = 8] = "PrivateNameIdentifier";
})(PreParserIdentifierType || (PreParserIdentifierType = {}));
export var FunctionBodyType;
(function (FunctionBodyType) {
    FunctionBodyType[FunctionBodyType["EXPRESSION"] = 0] = "EXPRESSION";
    FunctionBodyType[FunctionBodyType["BLOCK"] = 1] = "BLOCK";
})(FunctionBodyType || (FunctionBodyType = {}));
export var ParseFunctionFlag;
(function (ParseFunctionFlag) {
    ParseFunctionFlag[ParseFunctionFlag["IsNormal"] = 0] = "IsNormal";
    ParseFunctionFlag[ParseFunctionFlag["IsGenerator"] = 1] = "IsGenerator";
    ParseFunctionFlag[ParseFunctionFlag["IsAsync"] = 2] = "IsAsync";
})(ParseFunctionFlag || (ParseFunctionFlag = {}));
export var FunctionKind;
(function (FunctionKind) {
    // BEGIN constructable functions
    FunctionKind[FunctionKind["NormalFunction"] = 0] = "NormalFunction";
    FunctionKind[FunctionKind["Module"] = 1] = "Module";
    FunctionKind[FunctionKind["AsyncModule"] = 2] = "AsyncModule";
    // BEGIN class constructors
    // BEGIN base constructors
    FunctionKind[FunctionKind["BaseConstructor"] = 3] = "BaseConstructor";
    // BEGIN default constructors
    FunctionKind[FunctionKind["DefaultBaseConstructor"] = 4] = "DefaultBaseConstructor";
    // END base constructors
    // BEGIN derived constructors
    FunctionKind[FunctionKind["DefaultDerivedConstructor"] = 5] = "DefaultDerivedConstructor";
    // END default constructors
    FunctionKind[FunctionKind["DerivedConstructor"] = 6] = "DerivedConstructor";
    // END derived constructors
    // END class constructors
    // END constructable functions.
    // BEGIN accessors
    FunctionKind[FunctionKind["GetterFunction"] = 7] = "GetterFunction";
    FunctionKind[FunctionKind["StaticGetterFunction"] = 8] = "StaticGetterFunction";
    FunctionKind[FunctionKind["SetterFunction"] = 9] = "SetterFunction";
    FunctionKind[FunctionKind["StaticSetterFunction"] = 10] = "StaticSetterFunction";
    // END accessors
    // BEGIN arrow functions
    FunctionKind[FunctionKind["ArrowFunction"] = 11] = "ArrowFunction";
    // BEGIN async functions
    FunctionKind[FunctionKind["AsyncArrowFunction"] = 12] = "AsyncArrowFunction";
    // END arrow functions
    FunctionKind[FunctionKind["AsyncFunction"] = 13] = "AsyncFunction";
    // BEGIN concise methods 1
    FunctionKind[FunctionKind["AsyncConciseMethod"] = 14] = "AsyncConciseMethod";
    FunctionKind[FunctionKind["StaticAsyncConciseMethod"] = 15] = "StaticAsyncConciseMethod";
    // BEGIN generators
    FunctionKind[FunctionKind["AsyncConciseGeneratorMethod"] = 16] = "AsyncConciseGeneratorMethod";
    FunctionKind[FunctionKind["StaticAsyncConciseGeneratorMethod"] = 17] = "StaticAsyncConciseGeneratorMethod";
    // END concise methods 1
    FunctionKind[FunctionKind["AsyncGeneratorFunction"] = 18] = "AsyncGeneratorFunction";
    // END async functions
    FunctionKind[FunctionKind["GeneratorFunction"] = 19] = "GeneratorFunction";
    // BEGIN concise methods 2
    FunctionKind[FunctionKind["ConciseGeneratorMethod"] = 20] = "ConciseGeneratorMethod";
    FunctionKind[FunctionKind["StaticConciseGeneratorMethod"] = 21] = "StaticConciseGeneratorMethod";
    // END generators
    FunctionKind[FunctionKind["ConciseMethod"] = 22] = "ConciseMethod";
    FunctionKind[FunctionKind["StaticConciseMethod"] = 23] = "StaticConciseMethod";
    FunctionKind[FunctionKind["ClassMembersInitializerFunction"] = 24] = "ClassMembersInitializerFunction";
    FunctionKind[FunctionKind["ClassStaticInitializerFunction"] = 25] = "ClassStaticInitializerFunction";
    // END concise methods 2
    FunctionKind[FunctionKind["Invalid"] = 26] = "Invalid";
    FunctionKind[FunctionKind["LastFunctionKind"] = 25] = "LastFunctionKind";
})(FunctionKind || (FunctionKind = {}));
const FUNCTIONS_TYPES = [
    [
        // SubFunctionKind::kNormalFunction
        [
            FunctionKind.NormalFunction,
            FunctionKind.AsyncFunction
        ],
        [
            FunctionKind.GeneratorFunction,
            FunctionKind.AsyncGeneratorFunction
        ],
    ],
    [
        // SubFunctionKind::kNonStaticMethod
        [
            FunctionKind.ConciseMethod,
            FunctionKind.AsyncConciseMethod
        ],
        [
            FunctionKind.ConciseGeneratorMethod,
            FunctionKind.AsyncConciseGeneratorMethod
        ],
    ],
    [
        // SubFunctionKind::kStaticMethod
        [
            FunctionKind.StaticConciseMethod,
            FunctionKind.StaticAsyncConciseMethod
        ],
        [
            FunctionKind.StaticConciseGeneratorMethod,
            FunctionKind.StaticAsyncConciseGeneratorMethod
        ],
    ]
];
export var SubFunctionKind;
(function (SubFunctionKind) {
    SubFunctionKind[SubFunctionKind["NormalFunction"] = 0] = "NormalFunction";
    SubFunctionKind[SubFunctionKind["NonStaticMethod"] = 1] = "NonStaticMethod";
    SubFunctionKind[SubFunctionKind["StaticMethod"] = 2] = "StaticMethod";
})(SubFunctionKind || (SubFunctionKind = {}));
export var StaticFlag;
(function (StaticFlag) {
    StaticFlag[StaticFlag["NotStatic"] = 0] = "NotStatic";
    StaticFlag[StaticFlag["Static"] = 1] = "Static";
})(StaticFlag || (StaticFlag = {}));
;
export function functionKindForImpl(subFunctionKind, flags) {
    return FUNCTIONS_TYPES[subFunctionKind][(flags & ParseFunctionFlag.IsGenerator) != 0 ? 1 : 0][(flags & ParseFunctionFlag.IsAsync) != 0 ? 1 : 0];
}
export function functionKindFor(isGenerator, isAsync) {
    return FUNCTIONS_TYPES[SubFunctionKind.NormalFunction][isGenerator ? 1 : 0][isAsync ? 1 : 0];
}
export function methodKindFor(isStatic, isGenerator, isAsync) {
    return FUNCTIONS_TYPES[isStatic ? SubFunctionKind.StaticMethod : SubFunctionKind.NonStaticMethod][isGenerator ? 1 : 0][isAsync ? 1 : 0];
}
export var FunctionSyntaxKind;
(function (FunctionSyntaxKind) {
    FunctionSyntaxKind[FunctionSyntaxKind["AnonymousExpression"] = 0] = "AnonymousExpression";
    FunctionSyntaxKind[FunctionSyntaxKind["NamedExpression"] = 1] = "NamedExpression";
    FunctionSyntaxKind[FunctionSyntaxKind["Declaration"] = 2] = "Declaration";
    FunctionSyntaxKind[FunctionSyntaxKind["AccessorOrMethod"] = 3] = "AccessorOrMethod";
    FunctionSyntaxKind[FunctionSyntaxKind["Wrapped"] = 4] = "Wrapped";
    FunctionSyntaxKind[FunctionSyntaxKind["LastFunctionSyntaxKind"] = 4] = "LastFunctionSyntaxKind";
})(FunctionSyntaxKind || (FunctionSyntaxKind = {}));
;
export function isArrowFunction(kind) {
    return isInRange(kind, FunctionKind.ArrowFunction, FunctionKind.AsyncArrowFunction);
}
export function isModule(kind) {
    return isInRange(kind, FunctionKind.Module, FunctionKind.AsyncModule);
}
export function isAsyncModule(kind) {
    return kind == FunctionKind.AsyncModule;
}
export function isAsyncGeneratorFunction(kind) {
    return isInRange(kind, FunctionKind.AsyncConciseGeneratorMethod, FunctionKind.AsyncGeneratorFunction);
}
export function isGeneratorFunction(kind) {
    return isInRange(kind, FunctionKind.AsyncConciseGeneratorMethod, FunctionKind.StaticConciseGeneratorMethod);
}
export function isAsyncFunction(kind) {
    return isInRange(kind, FunctionKind.AsyncArrowFunction, FunctionKind.AsyncGeneratorFunction);
}
export function isResumableFunction(kind) {
    return isGeneratorFunction(kind) || isAsyncFunction(kind) || isModule(kind);
}
export function isConciseMethod(kind) {
    return isInRange(kind, FunctionKind.AsyncConciseMethod, FunctionKind.StaticAsyncConciseGeneratorMethod)
        || isInRange(kind, FunctionKind.ConciseGeneratorMethod, FunctionKind.ClassStaticInitializerFunction);
}
export function isStrictFunctionWithoutPrototype(kind) {
    return isInRange(kind, FunctionKind.GetterFunction, FunctionKind.AsyncArrowFunction)
        || isInRange(kind, FunctionKind.AsyncConciseMethod, FunctionKind.StaticAsyncConciseGeneratorMethod)
        || isInRange(kind, FunctionKind.ConciseGeneratorMethod, FunctionKind.ClassStaticInitializerFunction);
}
export function isGetterFunction(kind) {
    return isInRange(kind, FunctionKind.GetterFunction, FunctionKind.StaticGetterFunction);
}
export function isSetterFunction(kind) {
    return isInRange(kind, FunctionKind.SetterFunction, FunctionKind.StaticSetterFunction);
}
export function isAccessorFunction(kind) {
    return isInRange(kind, FunctionKind.GetterFunction, FunctionKind.StaticSetterFunction);
}
export function isDefaultConstructor(kind) {
    return isInRange(kind, FunctionKind.DefaultBaseConstructor, FunctionKind.DefaultDerivedConstructor);
}
export function isBaseConstructor(kind) {
    return isInRange(kind, FunctionKind.BaseConstructor, FunctionKind.DefaultBaseConstructor);
}
export function isDerivedConstructor(kind) {
    return isInRange(kind, FunctionKind.DefaultDerivedConstructor, FunctionKind.DerivedConstructor);
}
export function isClassConstructor(kind) {
    return isInRange(kind, FunctionKind.BaseConstructor, FunctionKind.DerivedConstructor);
}
export function isClassMembersInitializerFunction(kind) {
    return isInRange(kind, FunctionKind.ClassMembersInitializerFunction, FunctionKind.ClassStaticInitializerFunction);
}
export function isConstructable(kind) {
    return isInRange(kind, FunctionKind.NormalFunction, FunctionKind.DerivedConstructor);
}
export function isStatic(kind) {
    switch (kind) {
        case FunctionKind.StaticGetterFunction:
        case FunctionKind.StaticSetterFunction:
        case FunctionKind.StaticConciseMethod:
        case FunctionKind.StaticConciseGeneratorMethod:
        case FunctionKind.StaticAsyncConciseMethod:
        case FunctionKind.StaticAsyncConciseGeneratorMethod:
        case FunctionKind.ClassStaticInitializerFunction:
            return true;
        default:
            return false;
    }
}
export function bindsSuper(kind) {
    return isConciseMethod(kind) || isAccessorFunction(kind) || isClassConstructor(kind);
}
export function isAwaitAsIdentifierDisallowed(kind) {
    // 'await' is always disallowed as an identifier in module contexts. Callers
    // should short-circuit the module case instead of calling this.
    return !isModule(kind) && (isAsyncFunction(kind) || kind == FunctionKind.ClassStaticInitializerFunction);
}
export function functionKind2String(kind) {
    return FunctionKind[kind];
}
export function createClassInfo() {
    return {
        publicMembers: [],
        privateMembers: [],
        staticElements: [],
        instanceFields: [],
        'constructor': undefined,
        hasSeenConstructor: false,
        hasStaticComputedNames: false,
        hasStaticElements: false,
        hasStaticPrivateMethods: false,
        hasStaticBlocks: false,
        hasInstanceMembers: false,
        requiresBrand: false,
        isAnonymous: false,
        hasPrivateMethods: false,
        computedFieldCount: 0,
    };
}
export var FunctionNameValidity;
(function (FunctionNameValidity) {
    FunctionNameValidity["FunctionNameIsStrictReserved"] = "FunctionNameIsStrictReserved";
    FunctionNameValidity["SkipFunctionNameCheck"] = "SkipFunctionNameCheck";
    FunctionNameValidity["FunctionNameValidityUnknown"] = "FunctionNameValidityUnknown";
})(FunctionNameValidity || (FunctionNameValidity = {}));
;
export var ObjectLiteralPropertyKind;
(function (ObjectLiteralPropertyKind) {
    ObjectLiteralPropertyKind["CONSTANT"] = "CONSTANT";
    ObjectLiteralPropertyKind["COMPUTED"] = "COMPUTED";
    ObjectLiteralPropertyKind["MATERIALIZED_LITERAL"] = "MATERIALIZED_LITERAL";
    ObjectLiteralPropertyKind["GETTER"] = "GETTER";
    ObjectLiteralPropertyKind["SETTER"] = "SETTER";
    ObjectLiteralPropertyKind["PROTOTYPE"] = "PROTOTYPE";
    ObjectLiteralPropertyKind["SPREAD"] = "SPREAD";
})(ObjectLiteralPropertyKind || (ObjectLiteralPropertyKind = {}));
export class ObjectLiteralProperty {
}
ObjectLiteralProperty.Kind = ObjectLiteralPropertyKind;
export var ClassLiteralPropertyKind;
(function (ClassLiteralPropertyKind) {
    ClassLiteralPropertyKind["METHOD"] = "METHOD";
    ClassLiteralPropertyKind["GETTER"] = "GETTER";
    ClassLiteralPropertyKind["SETTER"] = "SETTER";
    ClassLiteralPropertyKind["FIELD"] = "FIELD";
})(ClassLiteralPropertyKind || (ClassLiteralPropertyKind = {}));
export class ClassLiteralProperty {
}
ClassLiteralProperty.Kind = ClassLiteralPropertyKind;
export function classPropertyKindFor(kind) {
    switch (kind) {
        case PropertyKind.AccessorGetter:
            return ClassLiteralPropertyKind.GETTER;
        case PropertyKind.AccessorSetter:
            return ClassLiteralPropertyKind.SETTER;
        case PropertyKind.Method:
            return ClassLiteralPropertyKind.METHOD;
        case PropertyKind.ClassField:
            return ClassLiteralPropertyKind.FIELD;
    }
    throw new Error(`unexpected property kind: ${kind}`);
}
export var VariableMode;
(function (VariableMode) {
    VariableMode["Const"] = "Const";
    VariableMode["PrivateMethod"] = "PrivateMethod";
    VariableMode["PrivateGetterOnly"] = "PrivateGetterOnly";
    VariableMode["PrivateSetterOnly"] = "PrivateSetterOnly";
})(VariableMode || (VariableMode = {}));
export function getVariableMode(kind) {
    switch (kind) {
        case ClassLiteralPropertyKind.FIELD:
            return VariableMode.Const;
        case ClassLiteralPropertyKind.METHOD:
            return VariableMode.PrivateMethod;
        case ClassLiteralPropertyKind.GETTER:
            return VariableMode.PrivateGetterOnly;
        case ClassLiteralPropertyKind.SETTER:
            return VariableMode.PrivateSetterOnly;
    }
}
export var LanguageMode;
(function (LanguageMode) {
    LanguageMode[LanguageMode["Sloppy"] = 0] = "Sloppy";
    LanguageMode[LanguageMode["Strict"] = 1] = "Strict";
})(LanguageMode || (LanguageMode = {}));
;
export function isSloppy(mode) {
    return LanguageMode.Sloppy === mode;
}
export function isStrict(mode) {
    return LanguageMode.Strict === mode;
}
export function getLanguageMode(isModule) {
    return !!isModule ? LanguageMode.Strict : LanguageMode.Sloppy;
}
export var VariableDeclarationContext;
(function (VariableDeclarationContext) {
    VariableDeclarationContext[VariableDeclarationContext["StatementListItem"] = 0] = "StatementListItem";
    VariableDeclarationContext[VariableDeclarationContext["Statement"] = 1] = "Statement";
    VariableDeclarationContext[VariableDeclarationContext["ForStatement"] = 2] = "ForStatement";
})(VariableDeclarationContext || (VariableDeclarationContext = {}));
;
export var AllowLabelledFunctionStatement;
(function (AllowLabelledFunctionStatement) {
    AllowLabelledFunctionStatement[AllowLabelledFunctionStatement["AllowLabelledFunctionStatement"] = 0] = "AllowLabelledFunctionStatement";
    AllowLabelledFunctionStatement[AllowLabelledFunctionStatement["DisallowLabelledFunctionStatement"] = 1] = "DisallowLabelledFunctionStatement";
})(AllowLabelledFunctionStatement || (AllowLabelledFunctionStatement = {}));
;
//# sourceMappingURL=enums.js.map