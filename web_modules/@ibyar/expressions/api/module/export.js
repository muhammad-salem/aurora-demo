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
var ExportSpecifier_1, ExportNamedDeclaration_1, ExportDefaultDeclaration_1, ExportAllDeclaration_1;
import { __decorate, __metadata } from "../../../../tslib/tslib.es6.js";
import { ReactiveScope } from '../../scope/scope.js';
import { AbstractExpressionNode } from '../abstract.js';
import { Deserializer } from '../deserialize/deserialize.js';
import { Identifier, Literal } from '../definition/values.js';
import { ModuleSpecifier } from './common.js';
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
let ExportSpecifier = ExportSpecifier_1 = class ExportSpecifier extends ModuleSpecifier {
    constructor(local, exported) {
        super(local);
        this.exported = exported;
    }
    static fromJSON(node, deserializer) {
        return new ExportSpecifier_1(deserializer(node.local), deserializer(node.exported));
    }
    static visit(node, visitNode) {
        visitNode(node.local);
        visitNode(node.exported);
    }
    getExported() {
        return this.exported;
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
        const exported = this.exported.toString();
        if (local == exported) {
            return local;
        }
        return `${local} as ${exported}`;
    }
    toJson() {
        return {
            local: this.local.toJSON(),
            exported: this.exported.toJSON()
        };
    }
};
ExportSpecifier = ExportSpecifier_1 = __decorate([
    Deserializer('ExportSpecifier'),
    __metadata("design:paramtypes", [Identifier, Identifier])
], ExportSpecifier);
export { ExportSpecifier };
/**
 * An export named declaration, e.g.,
 * `export {foo, bar};`,
 * `export {foo} from "mod";`
 * or `export var foo = 1;`.
 *
 * Note: Having `declaration` populated with non-empty `specifiers` or non-null `source` results in an invalid state.
 */
let ExportNamedDeclaration = ExportNamedDeclaration_1 = class ExportNamedDeclaration extends AbstractExpressionNode {
    constructor(specifiers, declaration, source, assertions) {
        super();
        this.specifiers = specifiers;
        this.declaration = declaration;
        this.source = source;
        this.assertions = assertions;
    }
    static fromJSON(node, deserializer) {
        return new ExportNamedDeclaration_1(node.specifiers.map(deserializer), node.declaration ? deserializer(node.declaration) : void 0, node.source ? deserializer(node.source) : void 0, node.assertions ? node.assertions.map(deserializer) : void 0);
    }
    static visit(node, visitNode) {
        node.specifiers.map(visitNode);
        node.source && visitNode(node.source);
        node.declaration && visitNode(node.declaration);
        node.assertions?.forEach(visitNode);
    }
    getSource() {
        return this.source;
    }
    getSpecifiers() {
        return this.specifiers;
    }
    getDeclaration() {
        return this.declaration;
    }
    getAssertions() {
        return this.assertions;
    }
    shareVariables(scopeList) { }
    set(stack) {
        throw new Error(`ExportNamedDeclaration.#set() has no implementation.`);
    }
    get(stack) {
        if (this.declaration) {
            this.exportDeclaration(stack);
        }
        else if (this.source) {
            this.exportFromSource(stack);
        }
        else {
            this.exportLocal(stack);
        }
    }
    exportDeclaration(stack) {
        if (!this.declaration) {
            return;
        }
        const declaration = this.declaration.get(stack);
        const declaredName = this.declaration.getDeclarationName();
        if (!declaredName) {
            throw new Error(`Name is not defined for ${declaration.toString()}`);
        }
        stack.getModule().set(declaredName, declaration);
    }
    exportFromSource(stack) {
        if (!this.source) {
            return;
        }
        let importCallOptions;
        if (this.assertions) {
            const importAssertions = this.assertions
                .map(assertion => assertion.get(stack))
                .reduce((p, c) => Object.assign(p, c), {});
            if (importAssertions) {
                importCallOptions = { assert: importAssertions };
            }
        }
        const sourceModule = stack.importModule(this.source.get(), importCallOptions);
        const localModule = stack.getModule();
        this.specifiers.forEach(specifier => {
            const localName = specifier.getLocal().get(stack);
            const exportedName = specifier.getExported().get(stack);
            const localValue = sourceModule.get(localName);
            localModule.set(exportedName, localValue);
            const scopeSubscription = sourceModule.subscribe(localName, (newLocalValue, oldLocalValue) => {
                if (newLocalValue !== oldLocalValue) {
                    localModule.set(exportedName, newLocalValue);
                }
            });
            stack.onDestroy(() => scopeSubscription.unsubscribe());
        });
    }
    exportLocal(stack, importCallOptions) {
        const localModule = stack.getModule();
        this.specifiers.forEach(specifier => {
            const localName = specifier.getLocal().get(stack);
            const exportedName = specifier.getExported().get(stack);
            const localValue = stack.get(localName);
            localModule.set(exportedName, localValue);
            const scope = stack.findScope(localName);
            if (scope instanceof ReactiveScope) {
                const scopeSubscription = scope.subscribe(localName, (newLocalValue, oldLocalValue) => {
                    if (newLocalValue !== oldLocalValue) {
                        localModule.set(exportedName, newLocalValue);
                    }
                });
                stack.onDestroy(() => scopeSubscription.unsubscribe());
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
        if (this.declaration) {
            const declaration = this.declaration.toString();
            return `export ${declaration}`;
        }
        const specifiers = this.specifiers.map(specifier => specifier.toString()).join(',');
        let exportStr = `export {${specifiers}}`;
        if (!this.source) {
            return `${exportStr};`;
        }
        const source = this.source.toString();
        return `${exportStr} from ${source}${this.assertions ? ` assert { ${this.assertions.map(assertion => assertion.toString()).join(', ')} }` : ''};`;
    }
    toJson() {
        return {
            specifiers: this.specifiers.map(specifier => specifier.toJSON()),
            source: this.source?.toJSON(),
            declaration: this.declaration?.toJSON(),
            assertions: this.assertions?.map(assertion => assertion.toJSON()),
        };
    }
};
ExportNamedDeclaration = ExportNamedDeclaration_1 = __decorate([
    Deserializer('ExportNamedDeclaration'),
    __metadata("design:paramtypes", [Array, Object, Literal, Array])
], ExportNamedDeclaration);
export { ExportNamedDeclaration };
/**
 * An export default declaration, e.g.,
 * `export default function () {};`
 * or `export default 1;`.
 */
let ExportDefaultDeclaration = ExportDefaultDeclaration_1 = class ExportDefaultDeclaration extends AbstractExpressionNode {
    constructor(declaration) {
        super();
        this.declaration = declaration;
    }
    static fromJSON(node, deserializer) {
        return new ExportDefaultDeclaration_1(deserializer(node.declaration));
    }
    static visit(node, visitNode) {
        visitNode(node.declaration);
    }
    getDeclaration() {
        return this.declaration;
    }
    shareVariables(scopeList) { }
    set(stack) {
        throw new Error(`ExportDefaultDeclaration.#set() has no implementation.`);
    }
    get(stack) {
        const declaration = this.declaration.get(stack);
        stack.getModule().set('default', declaration);
    }
    dependency(computed) {
        return [];
    }
    dependencyPath(computed) {
        return [];
    }
    toString() {
        const declaration = this.declaration.toString();
        return `export default ${declaration}`;
    }
    toJson() {
        return {
            declaration: this.declaration.toJSON(),
        };
    }
};
ExportDefaultDeclaration = ExportDefaultDeclaration_1 = __decorate([
    Deserializer('ExportDefaultDeclaration'),
    __metadata("design:paramtypes", [Object])
], ExportDefaultDeclaration);
export { ExportDefaultDeclaration };
/**
 * An export batch declaration, e.g., `export * from "mod";`.
 */
let ExportAllDeclaration = ExportAllDeclaration_1 = class ExportAllDeclaration extends AbstractExpressionNode {
    constructor(source, exported, assertions) {
        super();
        this.source = source;
        this.exported = exported;
        this.assertions = assertions;
    }
    static fromJSON(node, deserializer) {
        return new ExportAllDeclaration_1(deserializer(node.source), node.exported ? deserializer(node.exported) : void 0, node.assertions?.map(deserializer));
    }
    static visit(node, visitNode) {
        visitNode(node.source);
        node.exported && visitNode(node.exported);
        node.assertions?.forEach(visitNode);
    }
    getSource() {
        return this.source;
    }
    getExported() {
        return this.exported;
    }
    getAssertions() {
        return this.assertions;
    }
    shareVariables(scopeList) { }
    set(stack) {
        throw new Error(`ExportDefaultDeclaration.#set() has no implementation.`);
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
        let localModule = stack.getModule();
        const sourceModule = stack.importModule(this.source.get(), importCallOptions);
        if (this.exported) {
            const exportedName = this.exported.get(stack);
            localModule.set(exportedName, {});
            localModule = localModule.getScope(exportedName);
        }
        const properties = Object.keys(sourceModule.getContext());
        properties.forEach(property => {
            const localValue = sourceModule.get(property);
            localModule.set(property, localValue);
            const scopeSubscription = sourceModule.subscribe(property, (newLocalValue, oldLocalValue) => {
                if (newLocalValue !== oldLocalValue) {
                    localModule.set(property, newLocalValue);
                }
            });
            stack.onDestroy(() => scopeSubscription.unsubscribe());
        });
    }
    dependency(computed) {
        return [];
    }
    dependencyPath(computed) {
        return [];
    }
    toString() {
        return `export *${this.exported ? ` as ${this.exported.toString()}` : ''} from ${this.source.toString()}${this.assertions ? ` assert { ${this.assertions.map(assertion => assertion.toString()).join(', ')} }` : ''};`;
    }
    toJson() {
        return {
            source: this.source.toJSON(),
            exported: this.exported?.toJSON(),
            assertions: this.assertions?.map(assertion => assertion.toJSON()),
        };
    }
};
ExportAllDeclaration = ExportAllDeclaration_1 = __decorate([
    Deserializer('ExportAllDeclaration'),
    __metadata("design:paramtypes", [Literal,
        Identifier, Array])
], ExportAllDeclaration);
export { ExportAllDeclaration };
//# sourceMappingURL=export.js.map