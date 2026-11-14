import type { NodeDeserializer, ExpressionNode, ExpressionEventPath, VisitNodeType, SourceLocation } from '../expression.js';
import type { Stack } from '../../scope/stack.js';
import { AbstractExpressionNode } from '../abstract.js';
export declare class ExpressionStatement extends AbstractExpressionNode {
    private body;
    static fromJSON(node: ExpressionStatement, deserializer: NodeDeserializer): ExpressionStatement;
    static visit(node: ExpressionStatement, visitNode: VisitNodeType): void;
    constructor(body: ExpressionNode[], range?: [number, number], loc?: SourceLocation);
    getBody(): ExpressionNode[];
    set(stack: Stack, value: any): void;
    get(stack: Stack): undefined;
    dependency(computed?: true): ExpressionNode[];
    dependencyPath(computed?: true): ExpressionEventPath[];
    toString(): string;
    toJson(): object;
}
//# sourceMappingURL=statement.d.ts.map