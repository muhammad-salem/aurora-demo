import type { NodeDeserializer, ExpressionNode, DeclarationExpression, ExpressionEventPath, VisitNodeType, SourceLocation } from '../expression.js';
import type { Stack } from '../../scope/stack.js';
import { AbstractExpressionNode } from '../abstract.js';
import { SpreadElement } from '../computing/spread.js';
export declare class ArrayExpression extends AbstractExpressionNode {
    private elements;
    static fromJSON(node: ArrayExpression, deserializer: NodeDeserializer): ArrayExpression;
    static visit(node: ArrayExpression, visitNode: VisitNodeType): void;
    constructor(elements: (ExpressionNode | SpreadElement | null)[], range?: [number, number], loc?: SourceLocation);
    getElements(): (ExpressionNode | SpreadElement | null)[];
    set(stack: Stack): void;
    get(stack: Stack): any[];
    dependency(computed?: true): ExpressionNode[];
    dependencyPath(computed?: true): ExpressionEventPath[];
    toString(): string;
    toJson(): object;
}
export declare class ArrayPattern extends AbstractExpressionNode implements DeclarationExpression {
    private elements;
    static fromJSON(node: ArrayPattern, deserializer: NodeDeserializer): ArrayPattern;
    static visit(node: ArrayPattern, visitNode: VisitNodeType): void;
    constructor(elements: (DeclarationExpression | null)[], range?: [number, number], loc?: SourceLocation);
    getElements(): (DeclarationExpression | null)[];
    set(stack: Stack, values: any): void;
    get(scopeProvider: Stack): void;
    declareVariable(stack: Stack, values: any): void;
    declareVariableFromArray(stack: Stack, values: any[]): void;
    declareVariableFromIterator(stack: Stack, iterator: Iterator<any>): void;
    dependency(computed?: true): ExpressionNode[];
    dependencyPath(computed?: true): ExpressionEventPath[];
    toString(): string;
    toJson(): object;
}
//# sourceMappingURL=array.d.ts.map