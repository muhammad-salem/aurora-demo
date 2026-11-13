import type { NodeDeserializer, ExpressionNode, ExpressionEventPath, VisitNodeType, SourceLocation } from '../../expression.js';
import type { Stack } from '../../../scope/stack.js';
import { AbstractExpressionNode, ReturnValue } from '../../abstract.js';
/**
 * The while statement creates a loop that executes a specified
 * statement as long as the test condition evaluates to true.
 * The condition is evaluated before executing the statement.
 *
 */
export declare class WhileNode extends AbstractExpressionNode {
    private test;
    private body;
    static fromJSON(node: WhileNode, deserializer: NodeDeserializer): WhileNode;
    static visit(node: WhileNode, visitNode: VisitNodeType): void;
    constructor(test: ExpressionNode, body: ExpressionNode, range?: [number, number], loc?: SourceLocation);
    getTest(): ExpressionNode;
    getBody(): ExpressionNode;
    set(stack: Stack, value: any): void;
    get(stack: Stack): ReturnValue | undefined;
    dependency(computed?: true): ExpressionNode[];
    dependencyPath(computed?: true): ExpressionEventPath[];
    toString(): string;
    toJson(): object;
}
export declare class DoWhileNode extends AbstractExpressionNode {
    private test;
    private body;
    static fromJSON(node: DoWhileNode, deserializer: NodeDeserializer): DoWhileNode;
    static visit(node: DoWhileNode, visitNode: VisitNodeType): void;
    constructor(test: ExpressionNode, body: ExpressionNode, range?: [number, number], loc?: SourceLocation);
    getTest(): ExpressionNode;
    getBody(): ExpressionNode;
    set(stack: Stack, value: any): void;
    get(stack: Stack): ReturnValue | undefined;
    dependency(computed?: true): ExpressionNode[];
    dependencyPath(computed?: true): ExpressionEventPath[];
    toString(): string;
    toJson(): object;
}
//# sourceMappingURL=while.d.ts.map