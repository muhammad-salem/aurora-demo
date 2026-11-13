import type { NodeDeserializer, ExpressionNode, DeclarationExpression, ExpressionEventPath, VisitNodeType, SourceLocation } from '../../expression.js';
import type { Stack } from '../../../scope/stack.js';
import { AbstractExpressionNode } from '../../abstract.js';
export declare class VariableDeclarator extends AbstractExpressionNode implements DeclarationExpression {
    id: DeclarationExpression;
    init?: ExpressionNode | undefined;
    static fromJSON(node: VariableDeclarator, deserializer: NodeDeserializer): VariableDeclarator;
    static visit(node: VariableDeclarator, visitNode: VisitNodeType): void;
    constructor(id: DeclarationExpression, init?: ExpressionNode | undefined, range?: [number, number], loc?: SourceLocation);
    getId(): DeclarationExpression;
    getInit(): ExpressionNode | undefined;
    set(stack: Stack, value: any): void;
    get(stack: Stack): void;
    declareVariable(stack: Stack, propertyValue?: any): void;
    getDeclarationName(): string;
    dependency(computed?: true): ExpressionNode[];
    dependencyPath(computed?: true): ExpressionEventPath[];
    toString(): string;
    toJson(): {
        id: import("../../expression.js").NodeJsonType;
        init: import("../../expression.js").NodeJsonType | undefined;
    };
}
export declare class VariableDeclarationNode extends AbstractExpressionNode implements DeclarationExpression {
    protected declarations: VariableDeclarator[];
    protected kind: 'var' | 'let' | 'const' | 'using' | 'await using';
    static fromJSON(node: VariableDeclarationNode, deserializer: NodeDeserializer): VariableDeclarationNode;
    static visit(node: VariableDeclarationNode, visitNode: VisitNodeType): void;
    constructor(declarations: VariableDeclarator[], kind: 'var' | 'let' | 'const' | 'using' | 'await using', range?: [number, number], loc?: SourceLocation);
    getDeclarations(): VariableDeclarator[];
    getKind(): "var" | "let" | "const" | "using" | "await using";
    set(stack: Stack, value: any): void;
    get(stack: Stack): void;
    getDeclarationName(): string;
    declareVariable(stack: Stack, propertyValue: any): any;
    dependency(computed?: true): ExpressionNode[];
    dependencyPath(computed?: true): ExpressionEventPath[];
    toString(): string;
    toJson(): object;
}
//# sourceMappingURL=declares.d.ts.map