import type { ExpressionEventPath, ExpressionNode, NodeDeserializer, SourceLocation, VisitNodeType } from '../expression.js';
import { Stack } from '../../scope/stack.js';
import { AbstractExpressionNode } from '../abstract.js';
export declare class Decorator extends AbstractExpressionNode {
    private expression;
    static fromJSON(node: Decorator, deserializer: NodeDeserializer<any>): Decorator;
    static visit(node: Decorator, visitNode: VisitNodeType): void;
    constructor(expression: ExpressionNode, range?: [number, number], loc?: SourceLocation);
    getExpression(): ExpressionNode;
    set(stack: Stack, value: any): void;
    get(stack: Stack): any;
    dependency(computed?: true): ExpressionNode[];
    dependencyPath(computed?: true): ExpressionEventPath[];
    toString(): string;
    toJson(): {
        [key: string]: any;
    };
}
//# sourceMappingURL=decorator.d.ts.map