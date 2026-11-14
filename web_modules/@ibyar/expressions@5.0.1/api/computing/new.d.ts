import type { NodeDeserializer, ExpressionNode, ExpressionEventPath, VisitNodeType, SourceLocation } from '../expression.js';
import type { Stack } from '../../scope/stack.js';
import { AbstractExpressionNode } from '../abstract.js';
export declare class NewExpression extends AbstractExpressionNode {
    private className;
    static fromJSON(node: NewExpression, deserializer: NodeDeserializer): NewExpression;
    static visit(node: NewExpression, visitNode: VisitNodeType): void;
    private arguments?;
    constructor(className: ExpressionNode, parameters?: ExpressionNode[], range?: [number, number], loc?: SourceLocation);
    getClassName(): ExpressionNode;
    getArguments(): ExpressionNode[] | undefined;
    set(stack: Stack, value: any): void;
    get(stack: Stack): any;
    dependency(computed?: true): ExpressionNode[];
    dependencyPath(computed?: true): ExpressionEventPath[];
    toString(): string;
    toJson(): object;
}
//# sourceMappingURL=new.d.ts.map