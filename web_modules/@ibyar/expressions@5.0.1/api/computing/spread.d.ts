import type { ExpressionEventPath, ExpressionNode, NodeDeserializer, SourceLocation, VisitNodeType } from '../expression.js';
import type { Stack } from '../../scope/stack.js';
import { AbstractExpressionNode } from '../abstract.js';
export declare class SpreadElement extends AbstractExpressionNode {
    private argument;
    static fromJSON(node: SpreadElement, deserializer: NodeDeserializer): SpreadElement;
    static visit(node: SpreadElement, visitNode: VisitNodeType): void;
    constructor(argument: ExpressionNode, range?: [number, number], loc?: SourceLocation);
    getArgument(): ExpressionNode;
    set(stack: Stack, value: any): void;
    get(stack: Stack): void;
    private spreadFromArray;
    private spreadFromIterator;
    dependency(computed?: true): ExpressionNode[];
    dependencyPath(computed?: true): ExpressionEventPath[];
    toString(): string;
    toJson(): object;
}
//# sourceMappingURL=spread.d.ts.map