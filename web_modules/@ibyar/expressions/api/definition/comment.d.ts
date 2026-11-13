import type { ExpressionEventPath, ExpressionNode, SourceLocation } from '../expression.js';
import type { Stack } from '../../scope/stack.js';
import { AbstractExpressionNode } from '../abstract.js';
export declare class CommentExpression extends AbstractExpressionNode {
    private comment;
    static fromJSON(node: CommentExpression): CommentExpression;
    constructor(comment: string, range?: [number, number], loc?: SourceLocation);
    getComment(): string;
    set(stack: Stack, ...values: any[]): void;
    get(stack: Stack): void;
    dependency(computed?: true): ExpressionNode[];
    dependencyPath(computed?: true): ExpressionEventPath[];
    toString(): string;
    toJson(): object;
}
//# sourceMappingURL=comment.d.ts.map