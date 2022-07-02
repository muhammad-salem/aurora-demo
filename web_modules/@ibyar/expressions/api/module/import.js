var ImportSpecifier_1, ImportDefaultSpecifier_1, ImportNamespaceSpecifier_1, ImportDeclaration_1, ImportExpression_1;
import { __decorate, __metadata } from "../../../../tslib/tslib.es6.js";
import { AbstractExpressionNode } from '../abstract.js';
import { Deserializer } from '../deserialize/deserialize.js';
import { Identifier, Literal } from '../definition/values.js';
import { ModuleSpecifier } from './common.js';
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
let ImportSpecifier = ImportSpecifier_1 = class ImportSpecifier extends ModuleSpecifier {
    constructor(local, imported) {
        super(local);
        this.imported = imported;
    }
    static fromJSON(node, deserializer) {
        return new ImportSpecifier_1(deserializer(node.local), deserializer(node.imported));
    }
    static visit(node, visitNode) {
        visitNode(node.local);
        visitNode(node.imported);
    }
    getImported() {
        return this.imported;
    }
    shareVariables(scopeList) {
    }
    set(stack, value) {
        throw new Error('Method not implemented.');
    }
    get(stack, thisContext) {
        throw new Error('Method not implemented.');
    }
    dependency(computed) {
        return [];
    }
    dependencyPath(computed) {
        return [];
    }
    toString() {
        const local = this.local.toString();
        const imported = this.imported.toString();
        if (local == imported) {
            return local;
        }
        return `${imported} as ${local}`;
    }
    toJson() {
        return {
            local: this.local.toJSON(),
            imported: this.imported.toJSON()
        };
    }
};
ImportSpecifier = ImportSpecifier_1 = __decorate([
    Deserializer('ImportSpecifier'),
    __metadata("design:paramtypes", [Identifier, Identifier])
], ImportSpecifier);
export { ImportSpecifier };
/**
 * A default import specifier, e.g., `foo` in `import foo from "mod.js";`.
 */
let ImportDefaultSpecifier = ImportDefaultSpecifier_1 = class ImportDefaultSpecifier extends ModuleSpecifier {
    static fromJSON(node, deserializer) {
        return new ImportDefaultSpecifier_1(deserializer(node.local));
    }
    static visit(node, visitNode) {
        visitNode(node.local);
    }
    shareVariables(scopeList) {
    }
    set(stack, value) {
        throw new Error('Method not implemented.');
    }
    get(stack, thisContext) {
        throw new Error('Method not implemented.');
    }
    dependency(computed) {
        return [];
    }
    dependencyPath(computed) {
        return [];
    }
    toString() {
        return this.local.toString();
    }
};
ImportDefaultSpecifier = ImportDefaultSpecifier_1 = __decorate([
    Deserializer('ImportDefaultSpecifier')
], ImportDefaultSpecifier);
export { ImportDefaultSpecifier };
/**
 * A namespace import specifier, e.g., `* as foo` in `import * as foo from "mod.js";`.
 */
let ImportNamespaceSpecifier = ImportNamespaceSpecifier_1 = class ImportNamespaceSpecifier extends ModuleSpecifier {
    static fromJSON(node, deserializer) {
        return new ImportNamespaceSpecifier_1(deserializer(node.local));
    }
    static visit(node, visitNode) {
        visitNode(node.local);
    }
    shareVariables(scopeList) {
    }
    set(stack, value) {
        throw new Error('Method not implemented.');
    }
    get(stack, thisContext) {
        throw new Error('Method not implemented.');
    }
    dependency(computed) {
        return [];
    }
    dependencyPath(computed) {
        return [];
    }
    toString() {
        return `* as ${this.local.toString()}`;
    }
};
ImportNamespaceSpecifier = ImportNamespaceSpecifier_1 = __decorate([
    Deserializer('ImportNamespaceSpecifier')
], ImportNamespaceSpecifier);
export { ImportNamespaceSpecifier };
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
let ImportDeclaration = ImportDeclaration_1 = class ImportDeclaration extends AbstractExpressionNode {
    constructor(source, specifiers, assertions) {
        super();
        this.source = source;
        this.specifiers = specifiers;
        this.assertions = assertions;
    }
    static fromJSON(node, deserializer) {
        return new ImportDeclaration_1(deserializer(node.source), node.specifiers?.map(deserializer), node.assertions?.map(deserializer));
    }
    static visit(node, visitNode) {
        visitNode(node.source);
        node.specifiers?.forEach(visitNode);
        node.assertions?.forEach(visitNode);
    }
    getSource() {
        return this.source;
    }
    getSpecifiers() {
        return this.specifiers;
    }
    getAssertions() {
        return this.assertions;
    }
    shareVariables(scopeList) { }
    set(stack) {
        throw new Error(`ImportDeclaration.#set() has no implementation.`);
    }
    get(stack) {
        let importCallOptions;
        if (this.assertions) {
            const importAssertions = this.assertions
                .map(assertion => assertion.get(stack))
                .reduce((p, c) => Object.assign(p, c), {});
            if (importAssertions) {
                importCallOptions = { assert: importAssertions };
            }
        }
        const module = stack.importModule(this.source.get(), importCallOptions);
        if (!this.specifiers) {
            return;
        }
        this.specifiers.forEach(specifier => {
            const local = specifier.getLocal().get(stack);
            if (specifier instanceof ImportSpecifier) {
                const imported = specifier.getImported().get(stack);
                const importedValue = module.get(imported);
                stack.getModule()?.set(local, importedValue);
                const scopeSubscription = module.subscribe(local, (newValue, oldValue) => {
                    if (newValue !== oldValue) {
                        stack.getModule()?.set(local, newValue);
                    }
                });
                stack.onDestroy(() => scopeSubscription.unsubscribe());
            }
            else if (specifier instanceof ImportDefaultSpecifier) {
                const defaultValue = module.get('default');
                stack.getModule()?.set(local, defaultValue);
                const scopeSubscription = module.subscribe('default', (newValue, oldValue) => {
                    if (newValue !== oldValue) {
                        stack.getModule()?.set(local, newValue);
                    }
                });
                stack.onDestroy(() => scopeSubscription.unsubscribe());
            }
            else if (specifier instanceof ImportNamespaceSpecifier) {
                stack.getModule()?.importModule(local, module);
            }
        });
    }
    dependency(computed) {
        return [];
    }
    dependencyPath(computed) {
        return [];
    }
    toString() {
        if (!this.specifiers) {
            return `import '${this.source.toString()}'`;
        }
        const parts = [];
        const importDefaultSpecifiers = this.specifiers.filter(specifier => specifier instanceof ImportDefaultSpecifier);
        if (importDefaultSpecifiers?.length) {
            parts.push(importDefaultSpecifiers[0].toString());
        }
        const importNamespaceSpecifiers = this.specifiers.filter(specifier => specifier instanceof ImportNamespaceSpecifier);
        if (importNamespaceSpecifiers?.length) {
            parts.push(importNamespaceSpecifiers[0].toString());
        }
        const importSpecifiers = this.specifiers.filter(specifier => specifier instanceof ImportSpecifier);
        if (importSpecifiers?.length) {
            const importSpecifiersString = importSpecifiers.map(importSpecifier => importSpecifier.toString()).join(',');
            parts.push(`{ ${importSpecifiersString} }`);
        }
        return `import ${parts.join(', ')} from ${this.source.toString()}${this.assertions ? ` assert { ${this.assertions.map(assertion => assertion.toString()).join(', ')} }` : ''};`;
    }
    toJson() {
        return {
            source: this.source.toJSON(),
            specifiers: this.specifiers?.map(specifier => specifier.toJSON()),
            assertions: this.assertions?.map(assertion => assertion.toJSON()),
        };
    }
};
ImportDeclaration = ImportDeclaration_1 = __decorate([
    Deserializer('ImportDeclaration'),
    __metadata("design:paramtypes", [Literal, Array, Array])
], ImportDeclaration);
export { ImportDeclaration };
/**
 * `ImportExpression` node represents Dynamic Imports such as `import(source)`.
 * The `source` property is the importing source as similar to ImportDeclaration node,
 * but it can be an arbitrary expression node.
 * var promise = import("module-name");
 */
let ImportExpression = ImportExpression_1 = class ImportExpression extends AbstractExpressionNode {
    constructor(source, attributes) {
        super();
        this.source = source;
        this.attributes = attributes;
    }
    static fromJSON(node, deserializer) {
        return new ImportExpression_1(deserializer(node.source), (node.attributes && deserializer(node.attributes)) || undefined);
    }
    static visit(node, visitNode) {
        visitNode(node.source);
        node.attributes && visitNode(node.attributes);
    }
    getSource() {
        return this.source;
    }
    shareVariables(scopeList) { }
    set(stack) {
        throw new Error(`ImportDeclaration.#set() has no implementation.`);
    }
    get(stack) {
        let importCallOptions;
        if (this.attributes) {
            importCallOptions = this.attributes.get(stack);
        }
        const module = stack.importModule(this.source.get(), importCallOptions);
        return Promise.resolve(module);
    }
    dependency(computed) {
        return [];
    }
    dependencyPath(computed) {
        return [];
    }
    toString() {
        return `import(${this.source.toString()}${this.attributes ? `, ${this.attributes.toString()}` : ''})`;
    }
    toJson() {
        return {
            source: this.source.toJSON(),
        };
    }
};
ImportExpression = ImportExpression_1 = __decorate([
    Deserializer('ImportExpression'),
    __metadata("design:paramtypes", [Literal, Object])
], ImportExpression);
export { ImportExpression };
//# sourceMappingURL=import.js.map