import type { NodeDeserializer, ExpressionNode, CanFindScope, ExpressionEventPath, VisitNodeType, SourceLocation } from '../expression.js';
import type { Scope } from '../../scope/scope.js';
import type { Stack } from '../../scope/stack.js';
import { AbstractExpressionNode } from '../abstract.js';
export declare class MemberExpression extends AbstractExpressionNode implements CanFindScope {
    protected object: ExpressionNode;
    protected property: ExpressionNode;
    private computed;
    private optional;
    static fromJSON(node: MemberExpression, deserializer: NodeDeserializer): MemberExpression;
    static visit(node: MemberExpression, visitNode: VisitNodeType): void;
    constructor(object: ExpressionNode, property: ExpressionNode, computed: boolean, optional?: boolean, range?: [number, number], loc?: SourceLocation);
    getObject(): ExpressionNode;
    getProperty(): ExpressionNode;
    getOptional(): boolean;
    set(stack: Stack, value: any): any;
    get(stack: Stack, thisContext?: any): any;
    findScope<T extends object>(stack: Stack): Scope<T>;
    findScope<T extends object>(stack: Stack, scope: Scope<any>): Scope<T>;
    dependency(computed?: true): ExpressionNode[];
    dependencyPath(computed?: true): ExpressionEventPath[];
    toString(): string;
    toJson(): object;
}
//# sourceMappingURL=member.d.ts.map