import type { NodeDeserializer, ExpressionNode, CanFindScope, ExpressionEventPath, VisitNodeType, SourceLocation } from '../expression.js';
import type { Scope } from '../../scope/scope.js';
import type { Stack } from '../../scope/stack.js';
import { AbstractExpressionNode } from '../abstract.js';
export declare class ChainExpression extends AbstractExpressionNode implements CanFindScope {
    private expression;
    static fromJSON(node: ChainExpression, deserializer: NodeDeserializer): ChainExpression;
    static visit(node: ChainExpression, visitNode: VisitNodeType): void;
    constructor(expression: ExpressionNode, range?: [number, number], loc?: SourceLocation);
    getExpression(): ExpressionNode;
    set(stack: Stack, value: any): void;
    get(stack: Stack, thisContext?: any): any;
    findScope<T extends object>(stack: Stack): Scope<T>;
    findScope<T extends object>(stack: Stack, scope: Scope<any>): Scope<T>;
    dependency(computed?: true): ExpressionNode[];
    dependencyPath(computed?: true): ExpressionEventPath[];
    toString(): string;
    toJson(): object;
}
//# sourceMappingURL=chaining.d.ts.map