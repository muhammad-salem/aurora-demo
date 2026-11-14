import type { ExpressionNode } from '../api/expression.js';
import type { NodeFactory } from './node.js';
import { Class, ClassBody, ClassDeclaration, ClassExpression, MethodDefinition, PropertyDefinition, StaticBlock } from '../api/class/class.js';
import { Identifier, Literal } from '../api/definition/values.js';
import { ImportAttribute } from '../api/module/common.js';
import { ExportDefaultDeclaration, ExportSpecifier } from '../api/module/export.js';
import { ImportSpecifier } from '../api/module/import.js';
import { Program } from '../api/program.js';
import { ClassInfo, ClassLiteralPropertyKind, PropertyKindInfo, VariableDeclarationContext } from './enums.js';
import { InlineParserOptions, JavaScriptInlineParser, PositionMark } from './inline.js';
import { TokenStream } from './stream.js';
import { TokenExpression } from './token.js';
import { WithStatement } from '../api/statement/control/with.js';
import { LanguageMode } from './language.js';
export type ParserOptions = {
    mode?: LanguageMode;
    factory?: NodeFactory;
    addLocation?: boolean;
};
export declare class JavaScriptParser extends JavaScriptInlineParser {
    /**
     * parser js with
     * @param source
     * @returns
     */
    static parse(source: string | TokenExpression[] | TokenStream, { mode, factory, addLocation }?: ParserOptions): Program;
    /**
     * parse inline code like that used in html 2 or 1 way binding
     */
    static parseScript<T extends ExpressionNode>(source: string | TokenExpression[] | TokenStream, options?: InlineParserOptions): T;
    scan(): Program;
    protected parseNewTargetExpression(start?: PositionMark): ExpressionNode;
    protected parseClassExpression(): ClassExpression;
    protected parseClassDeclaration(names: string[] | undefined, defaultExport: boolean, start: PositionMark): ClassDeclaration;
    protected parseClassLiteral(name: ExpressionNode | undefined, nameIsStrictReserved: boolean): Class;
    protected declarePublicClassMethod(name: ExpressionNode | undefined, property: MethodDefinition, isConstructor: boolean, classInfo: ClassInfo): void;
    protected declarePublicClassField(property: PropertyDefinition, isStatic: boolean, isComputedName: boolean, classInfo: ClassInfo): void;
    protected declarePrivateClassMember(propertyName: string, property: MethodDefinition | PropertyDefinition, kind: ClassLiteralPropertyKind, isStatic: boolean, classInfo: ClassInfo): void;
    protected parseClassPropertyDefinition(classInfo: ClassInfo, propInfo: PropertyKindInfo, hasExtends: boolean): ExpressionNode | Literal<null> | MethodDefinition | PropertyDefinition;
    protected checkClassMethodName(propInfo: PropertyKindInfo, classInfo: ClassInfo): void;
    protected parseClassStaticBlock(classInfo: ClassInfo): StaticBlock;
    protected newClassLiteralProperty(nameExpression: ExpressionNode, initializer: ExpressionNode | undefined, kind: ClassLiteralPropertyKind, isStatic: boolean, isComputedName: boolean, isPrivate: boolean, start: PositionMark): MethodDefinition | PropertyDefinition;
    protected parseMemberInitializer(classInfo: ClassInfo, isStatic: boolean): ExpressionNode | undefined;
    protected setFunctionNameFromPropertyName(property: ExpressionNode, name: string, prefix?: string): void;
    protected parseSuperExpression(): ExpressionNode;
    protected rewriteClassLiteral(classInfo: ClassInfo, name?: ExpressionNode, range?: [number, number]): ClassBody;
    protected parseModuleItemList(): ExpressionNode[];
    protected parseModuleItem(): ExpressionNode | undefined;
    protected parseExportDeclaration(): ExpressionNode | undefined;
    protected parseImportDeclaration(): ExpressionNode | undefined;
    protected parseImportExpressions(): ExpressionNode;
    protected parseVariableStatement(varContext: VariableDeclarationContext, names: string[]): import("../index.js").VariableDeclarationNode;
    protected parseImportWithOrAssertClause(): ImportAttribute[] | undefined;
    protected parseModuleSpecifier(): Literal<string>;
    protected parseExportClause(): ExportSpecifier[];
    protected parseExportSpecifierName(): Identifier | Literal<string>;
    protected parseNamedImports(): ImportSpecifier[];
    protected parseExportDefault(start: PositionMark): ExportDefaultDeclaration;
    protected parseExportStar(start: PositionMark): ExpressionNode | undefined;
    protected parseWithStatement(): WithStatement;
}
//# sourceMappingURL=parser.d.ts.map