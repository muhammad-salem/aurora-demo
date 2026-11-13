import type { DeclarationExpression, ExpressionEventPath, ExpressionNode, NodeDeserializer, SourceLocation, VisitNodeType } from '../expression.js';
import { Stack } from '../../scope/stack.js';
import { AbstractExpressionNode } from '../abstract.js';
import { Identifier } from './values.js';
export declare class AssignmentPattern extends AbstractExpressionNode implements DeclarationExpression {
    private left;
    private right;
    static fromJSON(node: AssignmentPattern, deserializer: NodeDeserializer): AssignmentPattern;
    static visit(node: AssignmentPattern, visitNode: VisitNodeType): void;
    constructor(left: DeclarationExpression, right: ExpressionNode, range?: [number, number], loc?: SourceLocation);
    getLeft(): DeclarationExpression;
    getRight(): ExpressionNode;
    set(stack: Stack, value?: Function): void;
    get(stack: Stack): void;
    declareVariable(stack: Stack, value?: any): void;
    dependency(computed?: true): ExpressionNode[];
    dependencyPath(computed?: true): ExpressionEventPath[];
    toString(): string;
    toJson(): object;
}
export declare class FunctionExpression extends AbstractExpressionNode {
    protected params: DeclarationExpression[];
    protected body: ExpressionNode;
    protected async: boolean;
    protected generator: boolean;
    protected id?: Identifier | undefined;
    static fromJSON(node: FunctionExpression, deserializer: NodeDeserializer): FunctionExpression;
    static visit(node: FunctionExpression, visitNode: VisitNodeType): void;
    constructor(params: DeclarationExpression[], body: ExpressionNode, async: boolean, generator: boolean, id?: Identifier | undefined, range?: [number, number], loc?: SourceLocation);
    getParams(): DeclarationExpression[];
    getBody(): ExpressionNode;
    getGenerator(): boolean;
    getId(): Identifier | undefined;
    getAsync(): boolean;
    set(stack: Stack, value: Function): void;
    defineFunctionArguments(stack: Stack, args: any[]): void;
    get(stack: Stack): Function;
    private getAsyncFunction;
    private getGeneratorFunction;
    private getAsyncGeneratorFunction;
    private getFunction;
    dependency(computed?: true): ExpressionNode[];
    dependencyPath(computed?: true): ExpressionEventPath[];
    toString(): string;
    paramsAndBodyToString(): string;
    toJson(): object;
}
export declare class FunctionDeclaration extends FunctionExpression implements DeclarationExpression {
    static fromJSON(node: FunctionDeclaration, deserializer: NodeDeserializer): FunctionDeclaration;
    static visit(node: FunctionDeclaration, visitNode: VisitNodeType): void;
    protected id: Identifier;
    constructor(params: DeclarationExpression[], body: ExpressionNode, async: boolean, generator: boolean, id: Identifier, range?: [number, number], loc?: SourceLocation);
    get(stack: Stack): Function;
    declareVariable(stack: Stack, value: Function): void;
}
export declare class ArrowFunctionExpression extends AbstractExpressionNode {
    private params;
    private body;
    private expression;
    private async;
    static fromJSON(node: ArrowFunctionExpression, deserializer: NodeDeserializer): ArrowFunctionExpression;
    static visit(node: ArrowFunctionExpression, visitNode: VisitNodeType): void;
    private generator;
    constructor(params: DeclarationExpression[], body: ExpressionNode | ExpressionNode[], expression: boolean, async: boolean, range?: [number, number], loc?: SourceLocation);
    getParams(): DeclarationExpression[];
    getBody(): ExpressionNode | ExpressionNode[];
    getExpression(): boolean;
    set(stack: Stack, value: Function): void;
    private setParameter;
    get(stack: Stack): void | ((...args: any[]) => any);
    private getAsyncArrowFunction;
    private getArrowFunction;
    dependency(computed?: true): ExpressionNode[];
    dependencyPath(computed?: true): ExpressionEventPath[];
    toString(): string;
    toJson(): object;
}
//# sourceMappingURL=function.d.ts.map