import { __esDecorate, __runInitializers } from "../../../../../tslib@2.9.1/tslib.es6.js";
import { AbstractExpressionNode, AwaitPromise } from '../../abstract.js';
import { Deserializer } from '../../deserialize/deserialize.js';
let VariableDeclarator = (() => {
    let _classDecorators = [Deserializer('VariableDeclarator')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AbstractExpressionNode;
    var VariableDeclarator = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            VariableDeclarator = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        id;
        init;
        static fromJSON(node, deserializer) {
            return new VariableDeclarator(deserializer(node.id), node.init ? deserializer(node.init) : void 0, node.range, node.loc);
        }
        static visit(node, visitNode) {
            visitNode(node.id);
            node.init && visitNode(node.init);
        }
        constructor(id, init, range, loc) {
            super(range, loc);
            this.id = id;
            this.init = init;
        }
        getId() {
            return this.id;
        }
        getInit() {
            return this.init;
        }
        set(stack, value) {
            throw new Error(`VariableNode#set() has no implementation.`);
        }
        get(stack) {
            this.declareVariable(stack);
        }
        declareVariable(stack, propertyValue) {
            if (propertyValue !== undefined) {
                this.id.declareVariable(stack, propertyValue);
                return;
            }
            const value = this.init?.get(stack);
            if (value instanceof AwaitPromise) {
                value.node = this.id;
                value.declareVariable = true;
                value.node.declareVariable(stack);
                stack.resolveAwait(value);
            }
            else {
                this.id.declareVariable(stack, value);
            }
        }
        getDeclarationName() {
            return this.id.getDeclarationName();
        }
        dependency(computed) {
            return this.init?.dependency() || [];
        }
        dependencyPath(computed) {
            return this.init?.dependencyPath(computed) || [];
        }
        toString() {
            return `${this.id.toString()}${this.init ? ` = ${this.init.toString()}` : ''}`;
        }
        toJson() {
            return {
                id: this.id.toJSON(),
                init: this.init?.toJSON()
            };
        }
    };
    return VariableDeclarator = _classThis;
})();
export { VariableDeclarator };
let VariableDeclarationNode = (() => {
    let _classDecorators = [Deserializer('VariableDeclaration')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AbstractExpressionNode;
    var VariableDeclarationNode = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            VariableDeclarationNode = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        declarations;
        kind;
        static fromJSON(node, deserializer) {
            return new VariableDeclarationNode(node.declarations.map(deserializer), node.kind, node.range, node.loc);
        }
        static visit(node, visitNode) {
            node.declarations.forEach(visitNode);
        }
        constructor(declarations, kind, range, loc) {
            super(range, loc);
            this.declarations = declarations;
            this.kind = kind;
        }
        getDeclarations() {
            return this.declarations;
        }
        getKind() {
            return this.kind;
        }
        set(stack, value) {
            if (Array.isArray(value)) {
                throw new Error(`VariableDeclarationNode#set() has no implementation.`);
            }
            this.declarations[0].id.set(stack, value);
        }
        get(stack) {
            for (const item of this.declarations) {
                item.declareVariable(stack);
            }
        }
        getDeclarationName() {
            return this.declarations[0].getDeclarationName();
        }
        declareVariable(stack, propertyValue) {
            this.declarations[0].declareVariable(stack, propertyValue);
        }
        dependency(computed) {
            return this.declarations.flatMap(declareVariable => declareVariable.dependency(computed));
        }
        dependencyPath(computed) {
            return this.declarations.flatMap(declareVariable => declareVariable.dependencyPath(computed));
        }
        toString() {
            return `${this.kind} ${this.declarations.map(v => v.toString()).join(', ')};`;
        }
        toJson() {
            return {
                kind: this.kind,
                declarations: this.declarations.map(v => v.toJSON()),
            };
        }
    };
    return VariableDeclarationNode = _classThis;
})();
export { VariableDeclarationNode };
//# sourceMappingURL=declares.js.map