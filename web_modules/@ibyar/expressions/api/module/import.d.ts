import type { NodeDeserializer, ExpressionNode, ExpressionEventPath, VisitNodeType, SourceLocation } from '../expression.js';
import type { ModuleScope } from '../../scope/scope.js';
import type { Stack } from '../../scope/stack.js';
import { AbstractExpressionNode } from '../abstract.js';
import { Identifier, Literal } from '../definition/values.js';
import { ImportAttribute, ModuleSpecifier } from './common.js';
/**
 * An imported variable binding,
 *
 * e.g., {foo} in import {foo} from "mod"
 * or {foo as bar} in import {foo as bar} from "mod".
 *
 * The imported field refers to the name of the export imported from the module.
 *
 * The local field refers to the binding imported into the local module scope.
 *
 * If it is a basic named import, such as in import {foo} from "mod",
 * both imported and local are equivalent Identifier nodes; in this case an Identifier node representing foo.
 *
 * If it is an aliased import, such as in import {foo as bar} from "mod",
 * the imported field is an Identifier node representing foo,
 * and the local field is an Identifier node representing bar.
 */
export declare class ImportSpecifier extends ModuleSpecifier {
    private imported;
    static fromJSON(node: ImportSpecifier, deserializer: NodeDeserializer): ImportSpecifier;
    static visit(node: ImportSpecifier, visitNode: VisitNodeType): void;
    constructor(local: Identifier, imported: Identifier, range?: [number, number], loc?: SourceLocation);
    getImported(): Identifier;
    getImportedName(): string | number;
    set(stack: Stack, value: any): void;
    get(stack: Stack, thisContext?: any): void;
    dependency(computed?: true): ExpressionNode[];
    dependencyPath(computed?: true): ExpressionEventPath[];
    toString(): string;
    toJson(): object;
}
/**
 * A default import specifier, e.g., `foo` in `import foo from "mod.js";`.
 */
export declare class ImportDefaultSpecifier extends ModuleSpecifier {
    static fromJSON(node: ImportDefaultSpecifier, deserializer: NodeDeserializer): ImportDefaultSpecifier;
    static visit(node: ImportDefaultSpecifier, visitNode: VisitNodeType): void;
    set(stack: Stack, value: any): void;
    get(stack: Stack, thisContext?: any): void;
    dependency(computed?: true): ExpressionNode[];
    dependencyPath(computed?: true): ExpressionEventPath[];
    toString(): string;
}
/**
 * A namespace import specifier, e.g., `* as foo` in `import * as foo from "mod.js";`.
 */
export declare class ImportNamespaceSpecifier extends ModuleSpecifier {
    static fromJSON(node: ImportNamespaceSpecifier, deserializer: NodeDeserializer): ImportNamespaceSpecifier;
    static visit(node: ImportNamespaceSpecifier, visitNode: VisitNodeType): void;
    set(stack: Stack, value: any): void;
    get(stack: Stack, thisContext?: any): void;
    dependency(computed?: true): ExpressionNode[];
    dependencyPath(computed?: true): ExpressionEventPath[];
    toString(): string;
}
/**
 * An import declaration, e.g., import foo from "mod";.
 *
 * import defaultExport from "module-name";
 *
 * import * as name from "module-name";
 *
 * import { export1 } from "module-name";
 *
 * import { export1 as alias1 } from "module-name";
 *
 * import { export1 , export2 } from "module-name";
 *
 * import { foo , bar } from "module-name/path/to/specific/un-exported/file";
 *
 * import { export1 , export2 as alias2 , [...] } from "module-name";
 *
 * import defaultExport, { export1 [ , [...] ] } from "module-name";
 *
 * import defaultExport, * as name from "module-name";
 *
 * import "module-name";
 *
 */
export declare class ImportDeclaration extends AbstractExpressionNode {
    private source;
    private specifiers?;
    private attributes?;
    static fromJSON(node: ImportDeclaration, deserializer: NodeDeserializer): ImportDeclaration;
    static visit(node: ImportDeclaration, visitNode: VisitNodeType): void;
    constructor(source: Literal<string>, specifiers?: (ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier)[] | undefined, attributes?: ImportAttribute[] | undefined, range?: [number, number], loc?: SourceLocation);
    getSource(): Literal<string>;
    getSpecifiers(): (ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier)[] | undefined;
    getAttributes(): ImportAttribute[] | undefined;
    set(stack: Stack): void;
    get(stack: Stack): void;
    dependency(computed?: true): ExpressionNode[];
    dependencyPath(computed?: true): ExpressionEventPath[];
    toString(): string;
    toJson(): object;
}
/**
 * `ImportExpression` node represents Dynamic Imports such as `import(source)`.
 * The `source` property is the importing source as similar to ImportDeclaration node,
 * but it can be an arbitrary expression node.
 * var promise = import("module-name");
 */
export declare class ImportExpression extends AbstractExpressionNode {
    private source;
    private attributes?;
    static fromJSON(node: ImportExpression, deserializer: NodeDeserializer): ImportExpression;
    static visit(node: ImportExpression, visitNode: VisitNodeType): void;
    constructor(source: Literal<string>, attributes?: ExpressionNode | undefined, range?: [number, number], loc?: SourceLocation);
    getSource(): Literal<string>;
    set(stack: Stack): void;
    get(stack: Stack): Promise<ModuleScope>;
    dependency(computed?: true): ExpressionNode[];
    dependencyPath(computed?: true): ExpressionEventPath[];
    toString(): string;
    toJson(): object;
}
//# sourceMappingURL=import.d.ts.map