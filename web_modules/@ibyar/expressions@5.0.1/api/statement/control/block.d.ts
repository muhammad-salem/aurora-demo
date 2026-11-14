import type { NodeDeserializer, ExpressionNode, ExpressionEventPath, VisitNodeType, SourceLocation } from '../../expression.js';
import type { Stack } from '../../../scope/stack.js';
import { AbstractExpressionNode } from '../../abstract.js';
/**
 * A block statement (or compound statement in other languages) is used to group zero or more statements.
 * The block is delimited by a pair of braces ("curly brackets") and may optionally be labelled:
 */
export declare class BlockStatement extends AbstractExpressionNode {
    protected body: ExpressionNode[];
    static fromJSON(node: BlockStatement, deserializer: NodeDeserializer): BlockStatement;
    static visit(node: BlockStatement, visitNode: VisitNodeType): void;
    constructor(body: ExpressionNode[], range?: [number, number], loc?: SourceLocation);
    getBody(): ExpressionNode[];
    set(stack: Stack, value: any): void;
    get(stack: Stack): any;
    dependency(computed?: true): ExpressionNode[];
    dependencyPath(computed?: true): ExpressionEventPath[];
    toString(): string;
    toJson(): object;
}
//# sourceMappingURL=block.d.ts.map