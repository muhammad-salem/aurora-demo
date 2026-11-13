import type { NodeDeserializer, ExpressionNode, ExpressionEventPath, VisitNodeType, SourceLocation } from '../expression.js';
import type { Stack } from '../../scope/stack.js';
import { AbstractExpressionNode, AwaitPromise } from '../abstract.js';
export declare class AwaitExpression extends AbstractExpressionNode {
    private argument;
    static fromJSON(node: AwaitExpression, deserializer: NodeDeserializer): AwaitExpression;
    static visit(node: AwaitExpression, visitNode: VisitNodeType): void;
    constructor(argument: ExpressionNode, range?: [number, number], loc?: SourceLocation);
    getArgument(): ExpressionNode;
    set(stack: Stack, value: any): void;
    get(stack: Stack, thisContext?: any): AwaitPromise;
    dependency(computed?: true): ExpressionNode[];
    dependencyPath(computed?: true): ExpressionEventPath[];
    toString(): string;
    toJson(): object;
}
//# sourceMappingURL=await.d.ts.map