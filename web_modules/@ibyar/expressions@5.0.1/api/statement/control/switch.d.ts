import type { NodeDeserializer, ExpressionNode, ExpressionEventPath, VisitNodeType, SourceLocation } from '../../expression.js';
import type { Stack } from '../../../scope/stack.js';
import { AbstractExpressionNode } from '../../abstract.js';
export declare class SwitchCase extends AbstractExpressionNode {
    protected test: ExpressionNode;
    protected consequent: ExpressionNode;
    static fromJSON(node: SwitchCase, deserializer: NodeDeserializer): SwitchCase;
    static visit(node: SwitchCase, visitNode: VisitNodeType): void;
    constructor(test: ExpressionNode, consequent: ExpressionNode, range?: [number, number], loc?: SourceLocation);
    getTest(): ExpressionNode;
    getConsequent(): ExpressionNode;
    set(stack: Stack, value: any): void;
    get(stack: Stack): any;
    dependency(computed?: true): ExpressionNode[];
    dependencyPath(computed?: true): ExpressionEventPath[];
    toString(): string;
    toJson(): object;
}
export declare class DefaultExpression extends SwitchCase {
    static fromJSON(node: DefaultExpression, deserializer: NodeDeserializer): DefaultExpression;
    static visit(node: DefaultExpression, visitNode: VisitNodeType): void;
    constructor(block: ExpressionNode, range?: [number, number], loc?: SourceLocation);
    dependency(computed?: true): ExpressionNode[];
    dependencyPath(computed?: true): ExpressionEventPath[];
    toString(): string;
    toJson(): object;
}
/**
 * The switch statement evaluates an expression, matching the expression's value to a case clause,
 * and executes statements associated with that case,
 * as well as statements in cases that follow the matching case.
 *
 */
export declare class SwitchStatement extends AbstractExpressionNode {
    private discriminant;
    private cases;
    static fromJSON(node: SwitchStatement, deserializer: NodeDeserializer): SwitchStatement;
    static visit(node: SwitchStatement, visitNode: VisitNodeType): void;
    constructor(discriminant: ExpressionNode, cases: SwitchCase[], range?: [number, number], loc?: SourceLocation);
    getDiscriminant(): ExpressionNode;
    getCases(): SwitchCase[];
    set(stack: Stack, value: any): void;
    get(stack: Stack): undefined;
    dependency(computed?: true): ExpressionNode[];
    dependencyPath(computed?: true): ExpressionEventPath[];
    toString(): string;
    toJson(): object;
}
//# sourceMappingURL=switch.d.ts.map