import type { NodeDeserializer, ExpressionNode, ExpressionEventPath, VisitNodeType, SourceLocation } from '../expression.js';
import type { Stack } from '../../scope/stack.js';
import { AbstractExpressionNode } from '../abstract.js';
export type UnaryOperator = '-' | '+' | '~' | '!' | 'void' | 'delete' | 'typeof';
export declare class UnaryExpression extends AbstractExpressionNode {
    private operator;
    private argument;
    static fromJSON(node: UnaryExpression, deserializer: NodeDeserializer): UnaryExpression;
    static visit(node: UnaryExpression, visitNode: VisitNodeType): void;
    static Evaluations: {
        [key: string]: (value: any) => any;
    };
    constructor(operator: UnaryOperator, argument: ExpressionNode, range?: [number, number], loc?: SourceLocation);
    getOperator(): UnaryOperator;
    getArgument(): ExpressionNode;
    set(stack: Stack, value: any): any;
    get(stack: Stack, thisContext?: any): any;
    private executeDelete;
    dependency(computed?: true): ExpressionNode[];
    dependencyPath(computed?: true): ExpressionEventPath[];
    toString(): string;
    toJson(): object;
}
//# sourceMappingURL=unary.d.ts.map