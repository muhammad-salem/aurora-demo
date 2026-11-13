import type { NodeDeserializer, ExpressionNode, ExpressionEventPath, VisitNodeType, SourceLocation } from '../../expression.js';
import type { Stack } from '../../../scope/stack.js';
import { AbstractExpressionNode, ReturnValue } from '../../abstract.js';
import { VariableDeclarationNode } from '../declarations/declares.js';
import { ArrayPattern } from '../../definition/array.js';
import { ObjectPattern } from '../../definition/object.js';
/**
 * The if statement executes a statement if a specified condition is truthy.
 * If the condition is falsy, another statement can be executed.
 *
 */
export declare class ForNode extends AbstractExpressionNode {
    private body;
    private init?;
    private test?;
    private update?;
    static fromJSON(node: ForNode, deserializer: NodeDeserializer): ForNode;
    static visit(node: ForNode, visitNode: VisitNodeType): void;
    constructor(body: ExpressionNode, init?: ExpressionNode | undefined, test?: ExpressionNode | undefined, update?: ExpressionNode | undefined, range?: [number, number], loc?: SourceLocation);
    getBody(): ExpressionNode;
    getInit(): ExpressionNode | undefined;
    getTest(): ExpressionNode | undefined;
    getUpdate(): ExpressionNode | undefined;
    set(stack: Stack, value: any): void;
    get(stack: Stack): ReturnValue | undefined;
    dependency(computed?: true): ExpressionNode[];
    dependencyPath(computed?: true): ExpressionEventPath[];
    toString(): string;
    toJson(): object;
}
export type ForDeclaration = VariableDeclarationNode | ObjectPattern | ArrayPattern;
export declare class ForOfNode extends AbstractExpressionNode {
    private left;
    private right;
    private body;
    static fromJSON(node: ForOfNode, deserializer: NodeDeserializer): ForOfNode;
    static visit(node: ForOfNode, visitNode: VisitNodeType): void;
    constructor(left: ForDeclaration, right: ExpressionNode, body: ExpressionNode, range?: [number, number], loc?: SourceLocation);
    getLeft(): ForDeclaration;
    getRight(): ExpressionNode;
    getBody(): ExpressionNode;
    set(stack: Stack, value: any): void;
    get(stack: Stack): ReturnValue | undefined;
    dependency(computed?: true): ExpressionNode[];
    dependencyPath(computed?: true): ExpressionEventPath[];
    toString(): string;
    toJson(): object;
}
export declare class ForInNode extends AbstractExpressionNode {
    private left;
    private right;
    private body;
    static fromJSON(node: ForInNode, deserializer: NodeDeserializer): ForInNode;
    static visit(node: ForInNode, visitNode: VisitNodeType): void;
    constructor(left: VariableDeclarationNode | ObjectPattern | ArrayPattern, right: ExpressionNode, body: ExpressionNode, range?: [number, number], loc?: SourceLocation);
    getLeft(): ArrayPattern | ObjectPattern | VariableDeclarationNode;
    getRight(): ExpressionNode;
    getBody(): ExpressionNode;
    set(stack: Stack, value: any): void;
    get(stack: Stack): ReturnValue | undefined;
    dependency(computed?: true): ExpressionNode[];
    dependencyPath(computed?: true): ExpressionEventPath[];
    toString(): string;
    toJson(): object;
}
export declare class ForAwaitOfNode extends AbstractExpressionNode {
    private left;
    private right;
    private body;
    static fromJSON(node: ForAwaitOfNode, deserializer: NodeDeserializer): ForAwaitOfNode;
    static visit(node: ForAwaitOfNode, visitNode: VisitNodeType): void;
    constructor(left: ForDeclaration, right: ExpressionNode, body: ExpressionNode, range?: [number, number], loc?: SourceLocation);
    getLeft(): ForDeclaration;
    getRight(): ExpressionNode;
    getBody(): ExpressionNode;
    set(stack: Stack, value: any): void;
    get(stack: Stack): void;
    dependency(computed?: true): ExpressionNode[];
    dependencyPath(computed?: true): ExpressionEventPath[];
    toString(): string;
    toJson(): object;
}
//# sourceMappingURL=for.d.ts.map