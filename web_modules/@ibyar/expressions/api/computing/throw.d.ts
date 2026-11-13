import type { NodeDeserializer, ExpressionNode, ExpressionEventPath, VisitNodeType, SourceLocation } from '../expression.js';
import type { Stack } from '../../scope/stack.js';
import { AbstractExpressionNode } from '../abstract.js';
/**
 * The expression whose value is to be returned.
 * If omitted, undefined is returned instead.
 */
export declare class ThrowStatement extends AbstractExpressionNode {
    private argument;
    static fromJSON(node: ThrowStatement, deserializer: NodeDeserializer): ThrowStatement;
    static visit(node: ThrowStatement, visitNode: VisitNodeType): void;
    constructor(argument: ExpressionNode, range?: [number, number], loc?: SourceLocation);
    getArgument(): ExpressionNode;
    set(stack: Stack, value: any): void;
    get(stack: Stack): void;
    dependency(computed?: true): ExpressionNode[];
    dependencyPath(computed?: true): ExpressionEventPath[];
    toString(): string;
    toJson(): object;
}
export declare class CatchClauseNode extends AbstractExpressionNode {
    private body;
    private param?;
    static fromJSON(node: CatchClauseNode, deserializer: NodeDeserializer): CatchClauseNode;
    constructor(body: ExpressionNode, param?: ExpressionNode | undefined, range?: [number, number], loc?: SourceLocation);
    getParam(): ExpressionNode | undefined;
    getBody(): ExpressionNode;
    set(stack: Stack, error: any): void;
    get(stack: Stack, thisContext?: any): any;
    dependency(computed?: true): ExpressionNode[];
    dependencyPath(computed?: true): ExpressionEventPath[];
    toString(): string;
    toJson(key?: string): {
        [key: string]: any;
    };
}
export declare class TryCatchNode extends AbstractExpressionNode {
    private block;
    private handler?;
    private finalizer?;
    static fromJSON(node: TryCatchNode, deserializer: NodeDeserializer): TryCatchNode;
    constructor(block: ExpressionNode, handler?: ExpressionNode | undefined, finalizer?: ExpressionNode | undefined, range?: [number, number], loc?: SourceLocation);
    getBlock(): ExpressionNode;
    getHandler(): ExpressionNode | undefined;
    getFinalizer(): ExpressionNode | undefined;
    set(stack: Stack, value: any): void;
    get(stack: Stack): void;
    dependency(computed?: true): ExpressionNode[];
    dependencyPath(computed?: true): ExpressionEventPath[];
    toString(): string;
    toJson(): object;
}
//# sourceMappingURL=throw.d.ts.map