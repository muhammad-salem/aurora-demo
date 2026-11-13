import type { NodeDeserializer, ExpressionNode, ExpressionEventPath, VisitNodeType, SourceLocation } from '../../expression.js';
import type { Stack } from '../../../scope/stack.js';
import { AbstractExpressionNode } from '../../abstract.js';
/**
 * The with statement extends the scope chain for a statement.
 */
export declare class WithStatement extends AbstractExpressionNode {
    protected object: ExpressionNode;
    protected body: ExpressionNode;
    static fromJSON(node: WithStatement, deserializer: NodeDeserializer): WithStatement;
    static visit(node: WithStatement, visitNode: VisitNodeType): void;
    constructor(object: ExpressionNode, body: ExpressionNode, range?: [number, number], loc?: SourceLocation);
    getObject(): ExpressionNode;
    getBody(): ExpressionNode;
    set(stack: Stack, value: any): void;
    get(stack: Stack): any;
    dependency(computed?: true): ExpressionNode[];
    dependencyPath(computed?: true): ExpressionEventPath[];
    toString(): string;
    toJson(): object;
}
//# sourceMappingURL=with.d.ts.map