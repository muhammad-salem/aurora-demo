import { DeclarationExpression, ExpressionNode } from './expression.js';
export interface TypeOf<T> {
    new (...params: any[]): T;
}
export declare function isDeclarationExpression(node: ExpressionNode): node is DeclarationExpression;
//# sourceMappingURL=utils.d.ts.map