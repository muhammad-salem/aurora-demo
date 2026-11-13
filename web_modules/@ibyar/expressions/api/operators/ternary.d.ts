import type { NodeDeserializer, ExpressionNode, ExpressionEventPath, VisitNodeType, SourceLocation } from '../expression.js';
import type { Stack } from '../../scope/stack.js';
import { AbstractExpressionNode } from '../abstract.js';
export declare class ConditionalExpression extends AbstractExpressionNode {
    private test;
    private alternate;
    private consequent;
    static fromJSON(node: ConditionalExpression, deserializer: NodeDeserializer): ConditionalExpression;
    static visit(node: ConditionalExpression, visitNode: VisitNodeType): void;
    constructor(test: ExpressionNode, alternate: ExpressionNode, consequent: ExpressionNode, range?: [number, number], loc?: SourceLocation);
    getTest(): ExpressionNode;
    getAlternate(): ExpressionNode;
    getConsequent(): ExpressionNode;
    set(stack: Stack, value: any): void;
    get(stack: Stack): any;
    dependency(computed?: true): ExpressionNode[];
    dependencyPath(computed?: true): ExpressionEventPath[];
    toString(): string;
    toJson(): object;
}
//# sourceMappingURL=ternary.d.ts.map