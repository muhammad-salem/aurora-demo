var VariableNode_1, VariableDeclarationNode_1;
import { __decorate, __metadata } from "../../../../../tslib/tslib.es6.js";
import { AbstractExpressionNode, AwaitPromise } from '../../abstract.js';
import { Deserializer } from '../../deserialize/deserialize.js';
let VariableNode = VariableNode_1 = class VariableNode extends AbstractExpressionNode {
    constructor(id, init) {
        super();
        this.id = id;
        this.init = init;
    }
    static fromJSON(node, deserializer) {
        return new VariableNode_1(deserializer(node.id), node.init ? deserializer(node.init) : void 0);
    }
    static visit(node, visitNode, visitNodeList) {
        visitNode(node.id);
        node.init && visitNode(node.init);
    }
    getId() {
        return this.id;
    }
    getInit() {
        return this.init;
    }
    shareVariables(scopeList) {
        this.init?.shareVariables(scopeList);
    }
    set(stack, value) {
        throw new Error(`VariableNode#set() has no implementation.`);
    }
    get(stack) {
        this.declareVariable(stack, 'block');
    }
    declareVariable(stack, scopeType, propertyValue) {
        if (propertyValue !== undefined) {
            this.id.declareVariable(stack, scopeType, propertyValue);
            return;
        }
        const value = this.init?.get(stack);
        if (value instanceof AwaitPromise) {
            value.node = this.id;
            value.declareVariable = true;
            value.scopeType = scopeType;
            value.node.declareVariable(stack, scopeType);
            stack.resolveAwait(value);
        }
        else {
            this.id.declareVariable(stack, scopeType, value);
        }
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
VariableNode = VariableNode_1 = __decorate([
    Deserializer('VariableDeclarator'),
    __metadata("design:paramtypes", [Object, Object])
], VariableNode);
export { VariableNode };
let VariableDeclarationNode = VariableDeclarationNode_1 = class VariableDeclarationNode extends AbstractExpressionNode {
    constructor(declarations, kind) {
        super();
        this.declarations = declarations;
        this.kind = kind;
    }
    static fromJSON(node, deserializer) {
        return new VariableDeclarationNode_1(node.declarations.map(deserializer), node.kind);
    }
    static visit(node, visitNode, visitNodeList) {
        visitNodeList(node.declarations);
    }
    getDeclarations() {
        return this.declarations;
    }
    getKind() {
        return this.kind;
    }
    shareVariables(scopeList) {
        this.declarations.forEach(declaration => declaration.shareVariables(scopeList));
    }
    set(stack, value) {
        if (Array.isArray(value)) {
            throw new Error(`VariableDeclarationNode#set() has no implementation.`);
        }
        this.declarations[0].id.set(stack, value);
    }
    get(stack) {
        for (const item of this.declarations) {
            item.declareVariable(stack, 'block');
        }
    }
    declareVariable(stack, scopeType, propertyValue) {
        this.declarations[0].declareVariable(stack, scopeType, propertyValue);
    }
    dependency(computed) {
        return this.declarations.flatMap(declareVariable => declareVariable.dependency(computed));
    }
    dependencyPath(computed) {
        return this.declarations.flatMap(declareVariable => declareVariable.dependencyPath(computed));
    }
    toString() {
        return `${this.kind} ${this.declarations.map(v => v.toString()).join(', ')}`;
    }
    toJson() {
        return {
            kind: this.kind,
            declarations: this.declarations.map(v => v.toJSON()),
        };
    }
};
VariableDeclarationNode = VariableDeclarationNode_1 = __decorate([
    Deserializer('VariableDeclaration'),
    __metadata("design:paramtypes", [Array, String])
], VariableDeclarationNode);
export { VariableDeclarationNode };
//# declares.js.map