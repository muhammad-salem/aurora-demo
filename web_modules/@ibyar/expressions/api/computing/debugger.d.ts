import type { ExpressionNode, ExpressionEventPath } from '../expression.js';
import type { Stack } from '../../scope/stack.js';
import { AbstractExpressionNode } from '../abstract.js';
export declare class DebuggerStatement extends AbstractExpressionNode {
    static fromJSON(node: DebuggerStatement): DebuggerStatement;
    set(stack: Stack, value: any): void;
    get(stack: Stack): void;
    dependency(computed?: true): ExpressionNode[];
    dependencyPath(computed?: true): ExpressionEventPath[];
    toString(): string;
    toJson(): object;
}
//# sourceMappingURL=debugger.d.ts.map