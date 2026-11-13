import type { NodeDeserializer, ExpressionNode, ExpressionEventPath, VisitNodeType, SourceLocation } from '../../expression.js';
import type { Stack } from '../../../scope/stack.js';
import { AbstractExpressionNode } from '../../abstract.js';
/**
 * The if statement executes a statement if a specified condition is truthy.
 * If the condition is falsy, another statement can be executed.
 *
 */
export declare class IfStatement extends AbstractExpressionNode {
    private test;
    private consequent;
    private alternate?;
    static fromJSON(node: IfStatement, deserializer: NodeDeserializer): IfStatement;
    static visit(node: IfStatement, visitNode: VisitNodeType): void;
    constructor(test: ExpressionNode, consequent: ExpressionNode, alternate?: ExpressionNode | undefined, range?: [number, number], loc?: SourceLocation);
    getTest(): ExpressionNode;
    getConsequent(): ExpressionNode;
    getAlternate(): ExpressionNode | undefined;
    set(stack: Stack, value: any): void;
    get(stack: Stack): any;
    dependency(computed?: true): ExpressionNode[];
    dependencyPath(computed?: true): ExpressionEventPath[];
    toString(): string;
    toJson(): object;
}
//# sourceMappingURL=if.d.ts.map