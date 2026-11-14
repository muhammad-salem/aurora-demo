import type { NodeDeserializer, ExpressionNode, ExpressionEventPath, VisitNodeType, SourceLocation } from '../expression.js';
import type { Stack } from '../../scope/stack.js';
import { AbstractExpressionNode, YieldDelegateValue, YieldValue } from '../abstract.js';
export declare class YieldExpression extends AbstractExpressionNode {
    private delegate;
    private argument?;
    static fromJSON(node: YieldExpression, deserializer: NodeDeserializer): YieldExpression;
    static visit(node: YieldExpression, visitNode: VisitNodeType): void;
    constructor(delegate: boolean, argument?: ExpressionNode | undefined, range?: [number, number], loc?: SourceLocation);
    getArgument(): ExpressionNode | undefined;
    set(stack: Stack, value: any): void;
    get(stack: Stack): YieldValue | YieldDelegateValue;
    dependency(computed?: true): ExpressionNode[];
    dependencyPath(computed?: true): ExpressionEventPath[];
    toString(): string;
    toJson(): object;
}
//# sourceMappingURL=yield.d.ts.map