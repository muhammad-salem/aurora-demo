import type { NodeDeserializer, ExpressionNode, ExpressionEventPath, VisitNodeType, SourceLocation } from '../expression.js';
import type { Stack } from '../../scope/stack.js';
import { AbstractExpressionNode } from '../abstract.js';
export declare class SequenceExpression extends AbstractExpressionNode {
    private expressions;
    static fromJSON(node: SequenceExpression, deserializer: NodeDeserializer): SequenceExpression;
    static visit(node: SequenceExpression, visitNode: VisitNodeType): void;
    constructor(expressions: ExpressionNode[], range?: [number, number], loc?: SourceLocation);
    getExpressions(): ExpressionNode[];
    set(stack: Stack): void;
    get(stack: Stack): any;
    dependency(computed?: true): ExpressionNode[];
    dependencyPath(computed?: true): ExpressionEventPath[];
    toString(): string;
    toJson(): object;
}
//# sourceMappingURL=comma.d.ts.map