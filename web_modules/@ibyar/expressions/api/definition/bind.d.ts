import type { NodeDeserializer, ExpressionNode, CanFindScope, ExpressionEventPath, VisitNodeType, SourceLocation } from '../expression.js';
import type { Scope } from '../../scope/scope.js';
import type { Stack } from '../../scope/stack.js';
import { AbstractExpressionNode } from '../abstract.js';
/**
 * ```js
 * const x = {method: function(){...}};
 * const z = x::method;
 * ```
 */
export declare class BindExpression extends AbstractExpressionNode implements CanFindScope {
    protected object: ExpressionNode;
    protected property: ExpressionNode;
    private computed;
    private optional;
    static fromJSON(node: BindExpression, deserializer: NodeDeserializer): BindExpression;
    static visit(node: BindExpression, visitNode: VisitNodeType): void;
    constructor(object: ExpressionNode, property: ExpressionNode, computed: boolean, optional?: boolean, range?: [number, number], loc?: SourceLocation);
    getObject(): ExpressionNode;
    getProperty(): ExpressionNode;
    set(stack: Stack): void;
    get(stack: Stack, thisContext?: any): any;
    findScope<T extends object>(stack: Stack): Scope<T>;
    findScope<T extends object>(stack: Stack, scope: Scope<any>): Scope<T>;
    dependency(computed?: true): ExpressionNode[];
    dependencyPath(computed?: true): ExpressionEventPath[];
    toString(): string;
    toJson(): object;
}
//# sourceMappingURL=bind.d.ts.map