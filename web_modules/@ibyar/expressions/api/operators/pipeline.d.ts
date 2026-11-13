import type { NodeDeserializer, ExpressionNode, ExpressionEventPath, VisitNodeType, SourceLocation } from '../expression.js';
import type { Stack } from '../../scope/stack.js';
import { AbstractExpressionNode } from '../abstract.js';
/**
 * pipeline ('|>') operator support syntax:
 *  param |> func
 *  param |> func:arg1:arg2:arg3
 *  param |> func:arg1:?:arg3
 *  param |> func:arg1:?:arg3:?:arg5
 *  param |> func:arg1:...?:arg3
 *
 *  param |> func(arg1, arg2, arg3)
 *  param |> func(arg1, ?, arg3)
 *  param |> func(arg1, ?, arg3, arg4, ?, arg6)
 */
export declare class PipelineExpression extends AbstractExpressionNode {
    private left;
    private right;
    static fromJSON(node: PipelineExpression, deserializer: NodeDeserializer): PipelineExpression;
    static visit(node: PipelineExpression, visitNode: VisitNodeType): void;
    private arguments;
    constructor(left: ExpressionNode, right: ExpressionNode, params?: (ExpressionNode | '?' | '...?')[], range?: [number, number], loc?: SourceLocation);
    getLeft(): ExpressionNode;
    getRight(): ExpressionNode;
    getArguments(): (ExpressionNode | "?" | "...?")[];
    set(stack: Stack, value: any): void;
    get(stack: Stack): any;
    dependency(computed?: true): ExpressionNode[];
    dependencyPath(computed?: true): ExpressionEventPath[];
    toString(): string;
    toJson(): object;
}
//# sourceMappingURL=pipeline.d.ts.map