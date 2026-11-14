import type { EvaluateType } from './types.js';
import type { NodeDeserializer, ExpressionNode, VisitNodeType, SourceLocation } from '../expression.js';
import type { Stack } from '../../scope/stack.js';
import { InfixExpressionNode } from '../abstract.js';
export type AssignmentOperator = '=' | '+=' | '-=' | '*=' | '**=' | '/=' | '%=' | '<<=' | '>>=' | '>>>=' | '|=' | '^=' | '&=' | '||=' | '&&=' | '??=' | '%%=' | '>?=' | '<?=';
export declare class AssignmentExpression extends InfixExpressionNode<AssignmentOperator> {
    static fromJSON(node: AssignmentExpression, deserializer: NodeDeserializer): AssignmentExpression;
    static visit(node: AssignmentExpression, visitNode: VisitNodeType): void;
    static Evaluations: EvaluateType;
    static LogicalEvaluations: {
        [key: string]: (exp: AssignmentExpression, context: any) => any;
    };
    constructor(operator: AssignmentOperator, left: ExpressionNode, right: ExpressionNode, range?: [number, number], loc?: SourceLocation);
    set(stack: Stack, value: any): any;
    get(stack: Stack): any;
}
//# sourceMappingURL=assignment.d.ts.map