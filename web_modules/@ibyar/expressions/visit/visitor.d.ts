import { ExpressionNode } from '../api/expression.js';
export interface VisitorControl {
    /**
     * terminate the traversal
     */
    abort(): void;
}
export type VisitorCallback = (expression: ExpressionNode, type: string, control: VisitorControl) => void;
export declare class ExpressionVisitor {
    private getType;
    visit(node: ExpressionNode, visitorCallback: VisitorCallback): void;
    private visitExpressionNode;
}
export declare const expressionVisitor: ExpressionVisitor;
//# sourceMappingURL=visitor.d.ts.map