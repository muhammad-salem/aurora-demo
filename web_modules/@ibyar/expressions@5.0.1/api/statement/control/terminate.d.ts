import type { ExpressionEventPath, ExpressionNode, NodeDeserializer, SourceLocation, VisitNodeType } from '../../expression.js';
import type { Stack } from '../../../scope/stack.js';
import { AbstractExpressionNode } from '../../abstract.js';
import { Identifier } from '../../definition/values.js';
export type TerminateType = 'break' | 'continue';
export declare class TerminateReturnType {
    type: TerminateType;
    label?: string | undefined;
    constructor(type: TerminateType, label?: string | undefined);
}
/**
 * The break statement terminates the current loop, switch, or label statement
 * and transfers program control to the statement following the terminated statement.
 *
 * The continue statement terminates execution of the statements in the current iteration of the current or labeled loop,
 * and continues execution of the loop with the next iteration.
 *
 */
declare abstract class TerminateStatement extends AbstractExpressionNode {
    protected label?: Identifier | undefined;
    constructor(label?: Identifier | undefined, range?: [number, number], loc?: SourceLocation);
    getLabel(): void;
    set(stack: Stack, value: any): void;
    get(stack: Stack): TerminateReturnType;
    dependency(computed?: true): ExpressionNode[];
    dependencyPath(computed?: true): ExpressionEventPath[];
    toString(): string;
    toJson(): object;
    abstract getType(): TerminateType;
}
export declare class BreakStatement extends TerminateStatement {
    static fromJSON(node: BreakStatement, deserializer: NodeDeserializer): BreakStatement;
    static visit(node: BreakStatement, visitNode: VisitNodeType): void;
    getType(): 'break';
}
export declare class ContinueStatement extends TerminateStatement {
    static fromJSON(node: ContinueStatement, deserializer: NodeDeserializer): ContinueStatement;
    static visit(node: ContinueStatement, visitNode: VisitNodeType): void;
    getType(): 'continue';
}
export declare class LabeledStatement extends AbstractExpressionNode {
    private label;
    private body;
    static fromJSON(node: LabeledStatement, deserializer: NodeDeserializer): LabeledStatement;
    static visit(node: LabeledStatement, visitNode: VisitNodeType): void;
    constructor(label: Identifier, body: ExpressionNode, range?: [number, number], loc?: SourceLocation);
    getLabel(): Identifier;
    getBody(): ExpressionNode;
    set(stack: Stack, value: any): void;
    get(stack: Stack): any;
    dependency(computed?: true | undefined): ExpressionNode[];
    dependencyPath(computed?: true | undefined): ExpressionEventPath[];
    toString(): string;
    toJson(): {
        label: import("../../expression.js").NodeJsonType;
        body: import("../../expression.js").NodeJsonType;
    };
}
export {};
//# sourceMappingURL=terminate.d.ts.map