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
import { __esDecorate, __runInitializers } from "../../../../tslib@2.9.1/tslib.es6.js";
import { ReactiveScope } from '../../scope/scope.js';
import { AbstractExpressionNode } from '../abstract.js';
import { Deserializer } from '../deserialize/deserialize.js';
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
let ExportSpecifier = (() => {
    let _classDecorators = [Deserializer('ExportSpecifier')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = ModuleSpecifier;
    var ExportSpecifier = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ExportSpecifier = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        exported;
        static fromJSON(node, deserializer) {
            return new ExportSpecifier(deserializer(node.local), deserializer(node.exported), node.range, node.loc);
        }
        static visit(node, visitNode) {
            visitNode(node.local);
            visitNode(node.exported);
        }
        constructor(local, exported, range, loc) {
            super(local, range, loc);
            this.exported = exported;
        }
        getExported() {
            return this.exported;
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
    return ExportSpecifier = _classThis;
})();
export { ExportSpecifier };
/**
 * An export named declaration, e.g.,
 * `export {foo, bar};`,
 * `export {foo} from "mod";`
 * or `export var foo = 1;`.
 *
 * Note: Having `declaration` populated with non-empty `specifiers` or non-null `source` results in an invalid state.
 */
let ExportNamedDeclaration = (() => {
    let _classDecorators = [Deserializer('ExportNamedDeclaration')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AbstractExpressionNode;
    var ExportNamedDeclaration = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ExportNamedDeclaration = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        specifiers;
        declaration;
        source;
        attributes;
        static fromJSON(node, deserializer) {
            return new ExportNamedDeclaration(node.specifiers.map(deserializer), node.declaration ? deserializer(node.declaration) : void 0, node.source ? deserializer(node.source) : void 0, node.attributes ? node.attributes.map(deserializer) : void 0, node.range, node.loc);
        }
        static visit(node, visitNode) {
            node.specifiers.map(visitNode);
            node.source && visitNode(node.source);
            node.declaration && visitNode(node.declaration);
            node.attributes?.forEach(visitNode);
        }
        constructor(specifiers, declaration, source, attributes, range, loc) {
            super(range, loc);
            this.specifiers = specifiers;
            this.declaration = declaration;
            this.source = source;
            this.attributes = attributes;
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
        getAttributes() {
            return this.attributes;
        }
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
            this.declaration.get(stack);
            const declaredName = this.declaration.getDeclarationName?.();
            if (!declaredName) {
                throw new Error(`Name is not defined for ${this.declaration.toString()}`);
            }
            const value = stack.get(declaredName);
            stack.getModule().set(declaredName, value);
        }
        exportFromSource(stack) {
            if (!this.source) {
                return;
            }
            let importCallOptions;
            if (this.attributes) {
                const importAttributes = this.attributes
                    .map(attribute => attribute.get(stack))
                    .reduce((p, c) => Object.assign(p, c), {});
                if (importAttributes) {
                    importCallOptions = { with: importAttributes };
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
            return `${exportStr} from ${source}${this.attributes ? ` with { ${this.attributes.map(attribute => attribute.toString()).join(', ')} }` : ''};`;
        }
        toJson() {
            return {
                specifiers: this.specifiers.map(specifier => specifier.toJSON()),
                source: this.source?.toJSON(),
                declaration: this.declaration?.toJSON(),
                attributes: this.attributes?.map(attribute => attribute.toJSON()),
            };
        }
    };
    return ExportNamedDeclaration = _classThis;
})();
export { ExportNamedDeclaration };
/**
 * An export default declaration, e.g.,
 * `export default function () {};`
 * or `export default 1;`.
 */
let ExportDefaultDeclaration = (() => {
    let _classDecorators = [Deserializer('ExportDefaultDeclaration')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AbstractExpressionNode;
    var ExportDefaultDeclaration = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ExportDefaultDeclaration = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        declaration;
        static fromJSON(node, deserializer) {
            return new ExportDefaultDeclaration(deserializer(node.declaration), node.range, node.loc);
        }
        static visit(node, visitNode) {
            visitNode(node.declaration);
        }
        constructor(declaration, range, loc) {
            super(range, loc);
            this.declaration = declaration;
        }
        getDeclaration() {
            return this.declaration;
        }
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
    return ExportDefaultDeclaration = _classThis;
})();
export { ExportDefaultDeclaration };
/**
 * An export batch declaration, e.g., `export * from "mod";`.
 */
let ExportAllDeclaration = (() => {
    let _classDecorators = [Deserializer('ExportAllDeclaration')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AbstractExpressionNode;
    var ExportAllDeclaration = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ExportAllDeclaration = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        source;
        exported;
        attributes;
        static fromJSON(node, deserializer) {
            return new ExportAllDeclaration(deserializer(node.source), node.exported ? deserializer(node.exported) : void 0, node.attributes?.map(deserializer), node.range, node.loc);
        }
        static visit(node, visitNode) {
            visitNode(node.source);
            node.exported && visitNode(node.exported);
            node.attributes?.forEach(visitNode);
        }
        constructor(source, exported, attributes, range, loc) {
            super(range, loc);
            this.source = source;
            this.exported = exported;
            this.attributes = attributes;
        }
        getSource() {
            return this.source;
        }
        getExported() {
            return this.exported;
        }
        getAttributes() {
            return this.attributes;
        }
        set(stack) {
            throw new Error(`ExportDefaultDeclaration.#set() has no implementation.`);
        }
        get(stack) {
            let importCallOptions;
            if (this.attributes) {
                const importAttributes = this.attributes
                    .map(attribute => attribute.get(stack))
                    .reduce((p, c) => Object.assign(p, c), {});
                if (importAttributes) {
                    importCallOptions = { with: importAttributes };
                }
            }
            let localModule = stack.getModule();
            const sourceModule = stack.importModule(this.source.get(), importCallOptions);
            if (this.exported) {
                const exportedName = this.exported.get(stack);
                localModule.set(exportedName, {});
                localModule = localModule.getInnerScope(exportedName);
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
            return `export *${this.exported ? ` as ${this.exported.toString()}` : ''} from ${this.source.toString()}${this.attributes ? ` with { ${this.attributes.map(attribute => attribute.toString()).join(', ')} }` : ''};`;
        }
        toJson() {
            return {
                source: this.source.toJSON(),
                exported: this.exported?.toJSON(),
                attributes: this.attributes?.map(attribute => attribute.toJSON()),
            };
        }
    };
    return ExportAllDeclaration = _classThis;
})();
export { ExportAllDeclaration };
//# sourceMappingURL=export.js.map