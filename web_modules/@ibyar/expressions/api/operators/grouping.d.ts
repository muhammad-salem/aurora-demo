import type { NodeDeserializer, ExpressionNode, ExpressionEventPath, VisitNodeType, SourceLocation } from '../expression.js';
import type { Stack } from '../../scope/stack.js';
import { AbstractExpressionNode } from '../abstract.js';
/**
 * The grouping operator consists of a pair of parentheses around
 * an expression or sub-expression to override the normal operator
 * precedence so that expressions with lower precedence can be evaluated
 * before an expression with higher priority.
 * As it sounds, it groups what's inside of the parentheses.
 */
export declare class GroupingExpression extends AbstractExpressionNode {
    private node;
    static fromJSON(node: GroupingExpression, deserializer: NodeDeserializer): GroupingExpression;
    static visit(node: GroupingExpression, visitNode: VisitNodeType): void;
    constructor(node: ExpressionNode, range?: [number, number], loc?: SourceLocation);
    getNode(): ExpressionNode;
    set(stack: Stack, value: any): void;
    get(stack: Stack): any;
    dependency(computed?: true): ExpressionNode[];
    dependencyPath(computed?: true): ExpressionEventPath[];
    toString(): string;
    toJson(): object;
}
//# sourceMappingURL=grouping.d.ts.map