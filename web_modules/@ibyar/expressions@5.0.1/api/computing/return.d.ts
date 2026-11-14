import type { NodeDeserializer, ExpressionNode, ExpressionEventPath, VisitNodeType, SourceLocation } from '../expression.js';
import type { Stack } from '../../scope/stack.js';
import { AbstractExpressionNode, ReturnValue } from '../abstract.js';
/**
 * The expression whose value is to be returned.
 * If omitted, undefined is returned instead.
 */
export declare class ReturnStatement extends AbstractExpressionNode {
    private argument?;
    static fromJSON(node: ReturnStatement, deserializer: NodeDeserializer): ReturnStatement;
    static visit(node: ReturnStatement, visitNode: VisitNodeType): void;
    constructor(argument?: ExpressionNode | undefined, range?: [number, number], loc?: SourceLocation);
    getArgument(): ExpressionNode | undefined;
    set(stack: Stack, value: any): void;
    get(stack: Stack): ReturnValue;
    dependency(computed?: true): ExpressionNode[];
    dependencyPath(computed?: true): ExpressionEventPath[];
    toString(): string;
    toJson(): object;
}
//# sourceMappingURL=return.d.ts.map