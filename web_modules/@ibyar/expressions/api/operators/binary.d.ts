import type { EvaluateType } from './types.js';
import type { Stack } from '../../scope/stack.js';
import type { NodeDeserializer, VisitNodeType } from '../expression.js';
import { InfixExpressionNode } from '../abstract.js';
export type BinaryOperator = '==' | '!=' | '===' | '!==' | '<' | '<=' | '>' | '>=' | '<<' | '>>' | '>>>' | '+' | '-' | '*' | '/' | '%' | '|' | '^' | '&' | 'in' | 'instanceof' | '**' | '%%' | '>?' | '<?' | '<=>';
export declare class BinaryExpression extends InfixExpressionNode<BinaryOperator> {
    static fromJSON(node: BinaryExpression, deserializer: NodeDeserializer): BinaryExpression;
    static visit(node: BinaryExpression, visitNode: VisitNodeType): void;
    static Evaluations: EvaluateType;
    set(context: object, value: any): void;
    get(stack: Stack): any;
}
//# sourceMappingURL=binary.d.ts.map