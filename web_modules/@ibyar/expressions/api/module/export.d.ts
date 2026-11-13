/**
 *  There are two types of exports:
 * 1- Named Exports (Zero or more exports per module)
 * 2- Default Exports (One per module)
 *
 * // Exporting individual features
 * export let name1, name2, …, nameN; // also var, const
 * export let name1 = …, name2 = …, …, nameN; // also var, const
 * export function functionName(){...}
 * export class ClassName {...}
 *
 * // Export list
 * export { name1, name2, …, nameN };
 *
 * // Renaming exports
 * export { variable1 as name1, variable2 as name2, …, nameN };
 *
 * // Exporting destructed assignments with renaming
 * export const { name1, name2: bar } = o;
 *
 * // Default exports
 * export default expression;
 * export default function (…) { … } // also class, function*
 * export default function name1(…) { … } // also class, function*
 * export { name1 as default, … };
 *
 * // Aggregating modules
 * export * from …; // does not set the default export
 * export * as name1 from …; // Draft ECMAScript® 2O21
 * export { name1, name2, …, nameN } from …;
 * export { import1 as name1, import2 as name2, …, nameN } from …;
 * export { default, … } from …;
 */
import type { NodeDeserializer, ExpressionNode, ExpressionEventPath, VisitNodeType, DeclarationExpression, SourceLocation } from '../expression.js';
import { Stack } from '../../scope/stack.js';
import { AbstractExpressionNode } from '../abstract.js';
import { Identifier, Literal } from '../definition/values.js';
import { ImportAttribute, ModuleSpecifier } from './common.js';
import { FunctionDeclaration } from '../definition/function.js';
import { ClassDeclaration } from '../class/class.js';
/**
 * An exported variable binding, e.g., `{foo}` in `export {foo}` or `{bar as foo}` in `export {bar as foo}`.
 *
 * The `exported` field refers to the name exported in the module.
 *
 * The `local` field refers to the binding into the local module scope.
 *
 * If it is a basic named export, such as in `export {foo}`, both `exported` and `local` are equivalent `Identifier` nodes;
 * in this case an Identifier node representing `foo`.
 *
 * If it is an aliased export,
 * such as in `export {bar as foo}`, the `exported` field is an `Identifier` node representing `foo`,
 * and the `local` field is an `Identifier` node representing `bar`.
 */
export declare class ExportSpecifier extends ModuleSpecifier {
    private exported;
    static fromJSON(node: ExportSpecifier, deserializer: NodeDeserializer): ExportSpecifier;
    static visit(node: ExportSpecifier, visitNode: VisitNodeType): void;
    constructor(local: Identifier, exported: Identifier, range?: [number, number], loc?: SourceLocation);
    getExported(): Identifier;
    set(stack: Stack, value: any): void;
    get(stack: Stack, thisContext?: any): void;
    dependency(computed?: true): ExpressionNode[];
    dependencyPath(computed?: true): ExpressionEventPath[];
    toString(): string;
    toJson(): object;
}
/**
 * An export named declaration, e.g.,
 * `export {foo, bar};`,
 * `export {foo} from "mod";`
 * or `export var foo = 1;`.
 *
 * Note: Having `declaration` populated with non-empty `specifiers` or non-null `source` results in an invalid state.
 */
export declare class ExportNamedDeclaration extends AbstractExpressionNode {
    private specifiers;
    private declaration?;
    private source?;
    private attributes?;
    static fromJSON(node: ExportNamedDeclaration, deserializer: NodeDeserializer): ExportNamedDeclaration;
    static visit(node: ExportNamedDeclaration, visitNode: VisitNodeType): void;
    constructor(specifiers: ExportSpecifier[], declaration?: DeclarationExpression | undefined, source?: Literal<string> | undefined, attributes?: ImportAttribute[] | undefined, range?: [number, number], loc?: SourceLocation);
    getSource(): Literal<string> | undefined;
    getSpecifiers(): ExportSpecifier[];
    getDeclaration(): DeclarationExpression | undefined;
    getAttributes(): ImportAttribute[] | undefined;
    set(stack: Stack): void;
    get(stack: Stack): void;
    private exportDeclaration;
    private exportFromSource;
    private exportLocal;
    dependency(computed?: true): ExpressionNode[];
    dependencyPath(computed?: true): ExpressionEventPath[];
    toString(): string;
    toJson(): object;
}
/**
 * An export default declaration, e.g.,
 * `export default function () {};`
 * or `export default 1;`.
 */
export declare class ExportDefaultDeclaration extends AbstractExpressionNode {
    private declaration;
    static fromJSON(node: ExportDefaultDeclaration, deserializer: NodeDeserializer): ExportDefaultDeclaration;
    static visit(node: ExportDefaultDeclaration, visitNode: VisitNodeType): void;
    constructor(declaration: FunctionDeclaration | ClassDeclaration | ExpressionNode, range?: [number, number], loc?: SourceLocation);
    getDeclaration(): ExpressionNode | FunctionDeclaration | ClassDeclaration;
    set(stack: Stack): void;
    get(stack: Stack): void;
    dependency(computed?: true): ExpressionNode[];
    dependencyPath(computed?: true): ExpressionEventPath[];
    toString(): string;
    toJson(): object;
}
/**
 * An export batch declaration, e.g., `export * from "mod";`.
 */
export declare class ExportAllDeclaration extends AbstractExpressionNode {
    private source;
    private exported?;
    private attributes?;
    static fromJSON(node: ExportAllDeclaration, deserializer: NodeDeserializer): ExportAllDeclaration;
    static visit(node: ExportAllDeclaration, visitNode: VisitNodeType): void;
    constructor(source: Literal<string>, exported?: Identifier | undefined, attributes?: ImportAttribute[] | undefined, range?: [number, number], loc?: SourceLocation);
    getSource(): Literal<string>;
    getExported(): Identifier | undefined;
    getAttributes(): ImportAttribute[] | undefined;
    set(stack: Stack): void;
    get(stack: Stack): void;
    dependency(computed?: true): ExpressionNode[];
    dependencyPath(computed?: true): ExpressionEventPath[];
    toString(): string;
    toJson(): object;
}
//# sourceMappingURL=export.d.ts.map