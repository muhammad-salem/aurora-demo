import type { ExpressionEventPath, ExpressionNode, NodeDeserializer, SourceLocation, VisitNodeType } from '../expression.js';
import { Stack } from '../../scope/stack.js';
import { AbstractExpressionNode } from '../abstract.js';
import { Identifier, Literal } from '../definition/values.js';
export declare abstract class ModuleSpecifier extends AbstractExpressionNode {
    protected local: Identifier;
    constructor(local: Identifier, range?: [number, number], loc?: SourceLocation);
    getLocal(): Identifier;
    getLocalName(): string | number;
    toJson(): object;
}
export declare class ImportAttribute extends AbstractExpressionNode {
    private key;
    private value;
    static fromJSON(node: ImportAttribute, deserializer: NodeDeserializer): ImportAttribute;
    static visit(node: ImportAttribute, visitNode: VisitNodeType): void;
    constructor(key: Identifier | Literal<string>, value: Literal<string>, range?: [number, number], loc?: SourceLocation);
    getKey(): Identifier | Literal<string>;
    getValue(): Literal<string>;
    set(stack: Stack, value: any): void;
    get(stack: Stack, thisContext?: any): {
        [key: string]: string;
    };
    dependency(computed?: true): ExpressionNode[];
    dependencyPath(computed?: true): ExpressionEventPath[];
    toString(): string;
    toJson(): object;
}
//# sourceMappingURL=common.d.ts.map