import { DomNode } from '@ibyar/elements/node.js';
import { ExpressionNode } from '@ibyar/expressions';
export declare function getPipelineNames(modelExpression: ExpressionNode): string[] | undefined;
export declare function buildExpressionNodes(node: DomNode): void;
/**
 * function to skip node checking
 * @param modelClass
 */
export declare function provideDirective(modelClass: Record<string, any>): void;
export declare function deleteDirective(selector: string): void;
//# sourceMappingURL=expression.d.ts.map