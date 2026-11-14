import { CallExpression, Context, ExpressionNode, InfixExpressionNode, NodeDeserializer, ScopeSubscription, Stack, VisitNodeType } from '@ibyar/expressions';
type SignalOneWayOperator = '=:$';
type SignalTwoWayOperator = '=::$';
type SignalBindingOperators = SignalOneWayOperator | SignalTwoWayOperator;
export interface SignalBindingAssignment extends InfixExpressionNode<SignalBindingOperators> {
    subscribe(stack: Stack, pipelineNames?: string[]): ScopeSubscription<Context>[];
}
/**
 * this.input.set(model.property |> pipe);
 * left = this.input.set(value);
 * right = model.property |> pipe;
 */
export declare class SignalOneWayAssignmentExpression extends InfixExpressionNode<SignalOneWayOperator> implements SignalBindingAssignment {
    static fromJSON(node: SignalOneWayAssignmentExpression, deserializer: NodeDeserializer): SignalOneWayAssignmentExpression;
    static visit(node: SignalOneWayAssignmentExpression, visitNode: VisitNodeType): void;
    protected left: CallExpression;
    private rightEvents;
    constructor(left: CallExpression, right: ExpressionNode);
    set(stack: Stack, value: any): any;
    get(stack: Stack): any;
    subscribe(stack: Stack, pipelineNames?: string[]): ScopeSubscription<Context>[];
}
/**
 * `the default behavior is assign the right hand side to the left hand side.`
 *
 * this.input.set(model.property.get());
 * model.property.set(this.input.get());
 */
export declare class SignalTwoWayAssignmentExpression extends InfixExpressionNode<SignalTwoWayOperator> implements SignalBindingAssignment {
    static fromJSON(node: SignalTwoWayAssignmentExpression, deserializer: NodeDeserializer): SignalTwoWayAssignmentExpression;
    static visit(node: SignalTwoWayAssignmentExpression, visitNode: VisitNodeType): void;
    protected left: CallExpression;
    protected right: CallExpression;
    private rightEvents;
    private leftEvents;
    constructor(left: CallExpression, right: CallExpression);
    set(stack: Stack, value: any): any;
    get(stack: Stack): any;
    private setRTL;
    private getRTL;
    private actionRTL;
    private setLTR;
    private getLTR;
    private actionLTR;
    private bindSignal;
    private subscribeToEvents;
    subscribe(stack: Stack): ScopeSubscription<Context>[];
}
export {};
//# sourceMappingURL=signal.expressions.d.ts.map