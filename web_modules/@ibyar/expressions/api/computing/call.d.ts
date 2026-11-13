import type { NodeDeserializer, ExpressionNode, ExpressionEventPath, VisitNodeType, SourceLocation } from '../expression.js';
import type { Stack } from '../../scope/stack.js';
import { AbstractExpressionNode } from '../abstract.js';
export declare class CallExpression extends AbstractExpressionNode {
    private callee;
    private optional;
    static fromJSON(node: CallExpression, deserializer: NodeDeserializer): CallExpression;
    static visit(node: CallExpression, visitNode: VisitNodeType): void;
    private arguments;
    constructor(callee: ExpressionNode, params: ExpressionNode[], optional?: boolean, range?: [number, number], loc?: SourceLocation);
    getCallee(): ExpressionNode;
    getArguments(): ExpressionNode[];
    set(stack: Stack, value: any): void;
    get(stack: Stack, thisContext?: any): any;
    getCallParameters(stack: Stack): any[];
    dependency(computed?: true): ExpressionNode[];
    dependencyPath(computed?: true): ExpressionEventPath[];
    toString(): string;
    toJson(): object;
}
//# sourceMappingURL=call.d.ts.map