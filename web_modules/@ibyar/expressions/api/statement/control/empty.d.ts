import type { ExpressionEventPath, ExpressionNode, SourceLocation } from '../../expression.js';
import type { Stack } from '../../../scope/stack.js';
import { AbstractExpressionNode } from '../../abstract.js';
/**
 * The empty statement is a semicolon (;) indicating that no statement will be executed,
 * even if JavaScript syntax requires one.
 * The opposite behavior, where you want multiple statements,
 * but JavaScript only allows a single one, is possible using a block statement,
 * which combines several statements into a single one.
 */
export declare class EmptyStatement extends AbstractExpressionNode {
    static fromJSON(node: EmptyStatement): EmptyStatement;
    constructor(range?: [number, number], loc?: SourceLocation);
    set(stack: Stack, value: any): void;
    get(stack: Stack): undefined;
    dependency(computed?: true): ExpressionNode[];
    dependencyPath(computed?: true): ExpressionEventPath[];
    toString(): string;
    toJson(): object;
}
//# sourceMappingURL=empty.d.ts.map