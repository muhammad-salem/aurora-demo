import { __esDecorate, __runInitializers } from "../../../../tslib/tslib.es6.js";
import { AbstractExpressionNode } from '../abstract.js';
import { Deserializer } from '../deserialize/deserialize.js';
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
let ImportSpecifier = (() => {
    let _classDecorators = [Deserializer('ImportSpecifier')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = ModuleSpecifier;
    var ImportSpecifier = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ImportSpecifier = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        imported;
        static fromJSON(node, deserializer) {
            return new ImportSpecifier(deserializer(node.local), deserializer(node.imported), node.range, node.loc);
        }
        static visit(node, visitNode) {
            visitNode(node.local);
            visitNode(node.imported);
        }
        constructor(local, imported, range, loc) {
            super(local, range, loc);
            this.imported = imported;
        }
        getImported() {
            return this.imported;
        }
        getImportedName() {
            return this.imported.getName();
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
    return ImportSpecifier = _classThis;
})();
export { ImportSpecifier };
/**
 * A default import specifier, e.g., `foo` in `import foo from "mod.js";`.
 */
let ImportDefaultSpecifier = (() => {
    let _classDecorators = [Deserializer('ImportDefaultSpecifier')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = ModuleSpecifier;
    var ImportDefaultSpecifier = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ImportDefaultSpecifier = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        static fromJSON(node, deserializer) {
            return new ImportDefaultSpecifier(deserializer(node.local), node.range, node.loc);
        }
        static visit(node, visitNode) {
            visitNode(node.local);
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
    return ImportDefaultSpecifier = _classThis;
})();
export { ImportDefaultSpecifier };
/**
 * A namespace import specifier, e.g., `* as foo` in `import * as foo from "mod.js";`.
 */
let ImportNamespaceSpecifier = (() => {
    let _classDecorators = [Deserializer('ImportNamespaceSpecifier')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = ModuleSpecifier;
    var ImportNamespaceSpecifier = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ImportNamespaceSpecifier = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        static fromJSON(node, deserializer) {
            return new ImportNamespaceSpecifier(deserializer(node.local), node.range, node.loc);
        }
        static visit(node, visitNode) {
            visitNode(node.local);
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
    return ImportNamespaceSpecifier = _classThis;
})();
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
let ImportDeclaration = (() => {
    let _classDecorators = [Deserializer('ImportDeclaration')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AbstractExpressionNode;
    var ImportDeclaration = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ImportDeclaration = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        source;
        specifiers;
        attributes;
        static fromJSON(node, deserializer) {
            return new ImportDeclaration(deserializer(node.source), node.specifiers?.map(deserializer), node.attributes?.map(deserializer), node.range, node.loc);
        }
        static visit(node, visitNode) {
            visitNode(node.source);
            node.specifiers?.forEach(visitNode);
            node.attributes?.forEach(visitNode);
        }
        constructor(source, specifiers, attributes, range, loc) {
            super(range, loc);
            this.source = source;
            this.specifiers = specifiers;
            this.attributes = attributes;
        }
        getSource() {
            return this.source;
        }
        getSpecifiers() {
            return this.specifiers;
        }
        getAttributes() {
            return this.attributes;
        }
        set(stack) {
            throw new Error(`ImportDeclaration.#set() has no implementation.`);
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
            const module = stack.importModule(this.source.get(), importCallOptions);
            if (!this.specifiers) {
                return;
            }
            this.specifiers.forEach(specifier => {
                const local = specifier.getLocalName();
                if (specifier instanceof ImportSpecifier) {
                    const imported = specifier.getImportedName();
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
            return `import ${parts.join(', ')} from ${this.source.toString()}${this.attributes ? ` with { ${this.attributes.map(attribute => attribute.toString()).join(', ')} }` : ''};`;
        }
        toJson() {
            return {
                source: this.source.toJSON(),
                specifiers: this.specifiers?.map(specifier => specifier.toJSON()),
                attributes: this.attributes?.map(attribute => attribute.toJSON()),
            };
        }
    };
    return ImportDeclaration = _classThis;
})();
export { ImportDeclaration };
/**
 * `ImportExpression` node represents Dynamic Imports such as `import(source)`.
 * The `source` property is the importing source as similar to ImportDeclaration node,
 * but it can be an arbitrary expression node.
 * var promise = import("module-name");
 */
let ImportExpression = (() => {
    let _classDecorators = [Deserializer('ImportExpression')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AbstractExpressionNode;
    var ImportExpression = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ImportExpression = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        source;
        attributes;
        static fromJSON(node, deserializer) {
            return new ImportExpression(deserializer(node.source), (node.attributes && deserializer(node.attributes)) || undefined, node.range, node.loc);
        }
        static visit(node, visitNode) {
            visitNode(node.source);
            node.attributes && visitNode(node.attributes);
        }
        constructor(source, attributes, range, loc) {
            super(range, loc);
            this.source = source;
            this.attributes = attributes;
        }
        getSource() {
            return this.source;
        }
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
    return ImportExpression = _classThis;
})();
export { ImportExpression };
//# sourceMappingURL=import.js.map