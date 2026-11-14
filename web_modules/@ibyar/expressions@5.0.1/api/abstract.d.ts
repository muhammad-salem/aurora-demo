import type { AwaitPromiseInfo, Stack } from '../scope/stack.js';
import type { NodeDeserializer, ExpressionNode, ExpressionNodConstructor, NodeJsonType, DeclarationExpression, ExpressionEventMap, ExpressionEventPath, VisitNodeType, SourceLocation } from './expression.js';
export declare abstract class AbstractExpressionNode implements ExpressionNode {
    static fromJSON(node: ExpressionNode, deserializer: NodeDeserializer): ExpressionNode;
    type: string;
    loc?: SourceLocation;
    range?: [number, number];
    constructor(range?: [number, number], loc?: SourceLocation);
    getClass(): ExpressionNodConstructor<ExpressionNode>;
    toJSON(key?: string): NodeJsonType;
    events(): ExpressionEventMap;
    abstract set(stack: Stack, value: any): any;
    abstract get(stack: Stack, thisContext?: any): any;
    abstract dependency(computed?: true): ExpressionNode[];
    abstract dependencyPath(computed?: true): ExpressionEventPath[];
    abstract toString(): string;
    abstract toJson(key?: string): {
        [key: string]: any;
    };
}
export declare abstract class InfixExpressionNode<T> extends AbstractExpressionNode {
    protected operator: T;
    protected left: ExpressionNode;
    protected right: ExpressionNode;
    static visit(node: InfixExpressionNode<any>, visitNode: VisitNodeType): void;
    constructor(operator: T, left: ExpressionNode, right: ExpressionNode, range?: [number, number], loc?: SourceLocation);
    getOperator(): T;
    getLeft(): ExpressionNode;
    getRight(): ExpressionNode;
    set(context: object, value: any): void;
    abstract get(stack: Stack): any;
    dependency(computed?: true): ExpressionNode[];
    dependencyPath(computed?: true): ExpressionEventPath[];
    toString(): string;
    toJson(key: string): object;
}
export declare class ReturnValue {
    value: any;
    constructor(value: any);
    getValue(): any;
}
export declare class YieldValue {
    value: any;
    constructor(value: any);
    getValue(): any;
}
export declare class YieldDelegateValue {
    value: any;
    constructor(value: any);
    getValue(): any;
}
export declare class AwaitPromise implements AwaitPromiseInfo {
    promise: Promise<any>;
    node: DeclarationExpression;
    declareVariable: boolean;
    constructor(promise: Promise<any>);
}
//# sourceMappingURL=abstract.d.ts.map