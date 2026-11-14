import type { NodeDeserializer, VisitNodeType } from '../expression.js';
import { InfixExpressionNode } from '../abstract.js';
export type LogicalOperator = '||' | '&&' | '??';
export declare class LogicalExpression extends InfixExpressionNode<LogicalOperator> {
    static fromJSON(node: LogicalExpression, deserializer: NodeDeserializer): LogicalExpression;
    static visit(node: LogicalExpression, visitNode: VisitNodeType): void;
    static Evaluations: {
        [key: string]: (exp: LogicalExpression, context: any) => any;
    };
    get(context: object): any;
}
//# sourceMappingURL=logical.d.ts.map