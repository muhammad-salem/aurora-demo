import type { ExpressionEventPath, ExpressionNode, NodeDeserializer, SourceLocation, VisitNodeType } from './expression.js';
import type { Stack } from '../scope/stack.js';
import { AbstractExpressionNode } from './abstract.js';
export type ProgramSourceType = 'script' | 'module';
export declare class Program extends AbstractExpressionNode {
    private sourceType;
    private body;
    static fromJSON(node: Program, deserializer: NodeDeserializer): Program;
    static visit(node: Program, visitNode: VisitNodeType): void;
    constructor(sourceType: ProgramSourceType, body: ExpressionNode[], range?: [number, number], loc?: SourceLocation);
    set(stack: Stack, value: any): any;
    get(stack: Stack): any;
    dependency(computed?: true): ExpressionNode[];
    dependencyPath(computed?: true): ExpressionEventPath[];
    toString(): string;
    toJson(): object;
}
//# sourceMappingURL=program.d.ts.map