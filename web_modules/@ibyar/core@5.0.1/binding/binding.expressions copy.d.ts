import { Context, DeclarationExpression, ExpressionNode, Identifier, InfixExpressionNode, MemberExpression, NodeDeserializer, ScopeSubscription, Stack, VisitNodeType } from '@ibyar/expressions';
type OneWayOperator = '=:';
type TwoWayOperator = '=::';
type BindingOperators = OneWayOperator | TwoWayOperator;
export interface BindingAssignment extends InfixExpressionNode<BindingOperators> {
    subscribe(stack: Stack, pipelineNames?: string[]): ScopeSubscription<Context>[];
}
export declare class OneWayAssignmentExpression extends InfixExpressionNode<OneWayOperator> implements BindingAssignment {
    static fromJSON(node: OneWayAssignmentExpression, deserializer: NodeDeserializer): OneWayAssignmentExpression;
    static visit(node: OneWayAssignmentExpression, visitNode: VisitNodeType): void;
    protected left: MemberExpression;
    private rightEvents;
    constructor(left: MemberExpression | DeclarationExpression, right: ExpressionNode);
    set(stack: Stack, value: any): any;
    get(stack: Stack): any;
    subscribe(stack: Stack, pipelineNames?: string[]): ScopeSubscription<Context>[];
}
/**
 * the default behavior is assign the right hand side to the left hand side.
 *
 *
 */
export declare class TwoWayAssignmentExpression extends InfixExpressionNode<TwoWayOperator> implements BindingAssignment {
    static fromJSON(node: TwoWayAssignmentExpression, deserializer: NodeDeserializer): TwoWayAssignmentExpression;
    static visit(node: TwoWayAssignmentExpression, visitNode: VisitNodeType): void;
    protected left: MemberExpression;
    protected right: MemberExpression | Identifier;
    private rightEvents;
    private leftEvents;
    constructor(left: MemberExpression, right: MemberExpression | Identifier);
    set(stack: Stack, value: any): any;
    get(stack: Stack): any;
    private setRTL;
    private getRTL;
    private actionRTL;
    private setLTR;
    private getLTR;
    private actionLTR;
    private subscribeToEvents;
    subscribe(stack: Stack): ScopeSubscription<Context>[];
}
export {};
//# sourceMappingURL=binding.expressions%20copy.d.ts.map