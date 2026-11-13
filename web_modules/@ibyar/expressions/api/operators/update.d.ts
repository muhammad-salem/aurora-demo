import type { NodeDeserializer, ExpressionNode, ExpressionEventPath, VisitNodeType, SourceLocation } from '../expression.js';
import type { Stack } from '../../scope/stack.js';
import { AbstractExpressionNode } from '../abstract.js';
export type UpdateOperator = '++' | '--';
export declare class UpdateExpression extends AbstractExpressionNode {
    private operator;
    private argument;
    private prefix;
    static fromJSON(node: UpdateExpression, deserializer: NodeDeserializer): UpdateExpression;
    static visit(node: UpdateExpression, visitNode: VisitNodeType): void;
    static PostfixEvaluations: {
        [key: string]: (num: {
            value: number;
        }) => number;
    };
    static PrefixEvaluations: {
        [key: string]: (num: {
            value: number;
        }) => number;
    };
    constructor(operator: UpdateOperator, argument: ExpressionNode, prefix: boolean, range?: [number, number], loc?: SourceLocation);
    getOperator(): UpdateOperator;
    getArgument(): ExpressionNode;
    set(stack: Stack, value: any): void;
    get(stack: Stack): number;
    dependency(computed?: true): ExpressionNode[];
    dependencyPath(computed?: true): ExpressionEventPath[];
    toString(): string;
    toJson(): object;
}
//# sourceMappingURL=update.d.ts.map