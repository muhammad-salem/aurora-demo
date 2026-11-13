import type { NodeDeserializer, ExpressionNode, DeclarationExpression, ExpressionEventPath, VisitNodeType, SourceLocation } from '../expression.js';
import type { Stack } from '../../scope/stack.js';
import { AbstractExpressionNode } from '../abstract.js';
import { RestElement } from '../computing/rest.js';
export declare class Property extends AbstractExpressionNode implements DeclarationExpression {
    protected key: ExpressionNode;
    protected value: DeclarationExpression | ExpressionNode;
    protected kind: 'init' | 'get' | 'set';
    protected method: boolean;
    protected shorthand: boolean;
    protected computed: boolean;
    static fromJSON(node: Property, deserializer: NodeDeserializer): Property;
    static visit(node: Property, visitNode: VisitNodeType): void;
    constructor(key: ExpressionNode, value: DeclarationExpression | ExpressionNode, kind: 'init' | 'get' | 'set', method: boolean, shorthand: boolean, computed: boolean, range?: [number, number], loc?: SourceLocation);
    getKey(): ExpressionNode;
    getValue(): ExpressionNode | DeclarationExpression;
    set(stack: Stack, value: any): void;
    get(stack: Stack, thisContext: ThisType<any>): any;
    declareVariable(stack: Stack, objectValue: any): void;
    dependency(computed?: true): ExpressionNode[];
    dependencyPath(computed?: true): ExpressionEventPath[];
    toString(): string;
    toJson(): object;
}
export declare class ObjectExpression extends AbstractExpressionNode {
    private properties;
    static fromJSON(node: ObjectExpression, deserializer: NodeDeserializer): ObjectExpression;
    static visit(node: ObjectExpression, visitNode: VisitNodeType): void;
    constructor(properties: Property[], range?: [number, number], loc?: SourceLocation);
    getProperties(): Property[];
    set(stack: Stack): void;
    get(stack: Stack): {};
    dependency(computed?: true): ExpressionNode[];
    dependencyPath(computed?: true): ExpressionEventPath[];
    toString(): string;
    toJson(): object;
}
export declare class ObjectPattern extends AbstractExpressionNode implements DeclarationExpression {
    private properties;
    static fromJSON(node: ObjectPattern, deserializer: NodeDeserializer): ObjectPattern;
    static visit(node: ObjectPattern, visitNode: VisitNodeType): void;
    constructor(properties: (Property | RestElement)[], range?: [number, number], loc?: SourceLocation);
    getProperties(): (RestElement | Property)[];
    set(stack: Stack, objectValue: any): void;
    get(scopeProvider: Stack): void;
    declareVariable(stack: Stack, objectValue: any): void;
    private getFromObject;
    dependency(computed?: true): ExpressionNode[];
    dependencyPath(computed?: true): ExpressionEventPath[];
    toString(): string;
    toJson(): object;
}
//# sourceMappingURL=object.d.ts.map