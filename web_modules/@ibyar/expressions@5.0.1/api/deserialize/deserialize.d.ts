import type { ExpressionNode, ExpressionNodConstructor } from '../expression.js';
export declare const Deserializer: (param: string) => (constructor: any, context: ClassDecoratorContext<new (...args: any) => any>) => any;
export declare function getDeserializerType(target: ExpressionNodConstructor<ExpressionNode>): string;
export declare function serializeNode(node: ExpressionNode): string;
/**
 * convert from json expression `JSON.stringify(node)` or `serializeNode` to `ExpressionNode`
 * @param node as type `NodeJsonType`
 * @returns ExpressionNode
 */
export declare function deserialize(node: ExpressionNode): ExpressionNode;
export declare function deserializeNode(node: string): ExpressionNode;
//# sourceMappingURL=deserialize.d.ts.map