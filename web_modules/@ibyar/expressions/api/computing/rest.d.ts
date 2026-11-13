import type { DeclarationExpression, ExpressionEventPath, ExpressionNode, NodeDeserializer, SourceLocation, VisitNodeType } from '../expression.js';
import type { Stack } from '../../scope/stack.js';
import { AbstractExpressionNode } from '../abstract.js';
export declare class RestElement extends AbstractExpressionNode implements DeclarationExpression {
    private argument;
    static fromJSON(node: RestElement, deserializer: NodeDeserializer): RestElement;
    static visit(node: RestElement, visitNode: VisitNodeType): void;
    constructor(argument: DeclarationExpression, range?: [number, number], loc?: SourceLocation);
    getArgument(): DeclarationExpression;
    set(stack: Stack, value: any): void;
    get(stack: Stack): void;
    declareVariable(stack: Stack, propertyValue?: any): any;
    dependency(computed?: true): ExpressionNode[];
    dependencyPath(computed?: true): ExpressionEventPath[];
    toString(): string;
    toJson(): object;
}
//# sourceMappingURL=rest.d.ts.map