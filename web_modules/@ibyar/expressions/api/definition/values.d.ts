import type { DeclarationExpression, ExpressionNode, NodeDeserializer, CanFindScope, ExpressionEventPath, VisitNodeType, SourceLocation } from '../expression.js';
import type { Context, Scope } from '../../scope/scope.js';
import type { Stack } from '../../scope/stack.js';
import { AbstractExpressionNode } from '../abstract.js';
/**
 * An identifier is a sequence of characters in the code that identifies a variable, function, or property.
 * In JavaScript, identifiers are case-sensitive and can contain Unicode letters, $, _, and digits (0-9),
 * but may not start with a digit.
 * An identifier differs from a string in that a string is data,
 * while an identifier is part of the code. In JavaScript,
 * there is no way to convert identifiers to strings,
 * but sometimes it is possible to parse strings into identifiers.
 */
export declare class Identifier extends AbstractExpressionNode implements DeclarationExpression, CanFindScope {
    protected name: string | number;
    static fromJSON(node: Identifier): Identifier;
    constructor(name: string | number, range?: [number, number], loc?: SourceLocation);
    getName(): string | number;
    set(stack: Stack, value: any): any;
    get(stack: Stack, thisContext?: any): any;
    findScope<T extends object>(stack: Stack): Scope<T>;
    findScope<T extends object>(stack: Stack, scope: Scope<any>): Scope<T>;
    declareVariable(stack: Stack, propertyValue: any): any;
    getDeclarationName(): string;
    dependency(computed?: true): ExpressionNode[];
    dependencyPath(computed?: true): ExpressionEventPath[];
    toString(): string;
    toJson(): object;
}
export declare class ThisExpression extends Identifier {
    static fromJSON(node: ThisExpression): ThisExpression;
    constructor(range?: [number, number], loc?: SourceLocation);
    toJson(): object;
}
export declare class Literal<T> extends AbstractExpressionNode implements CanFindScope {
    value: T;
    static fromJSON(node: Literal<any>): Literal<string> | Literal<number> | Literal<boolean> | Literal<RegExp> | Literal<bigint> | Literal<null> | Literal<undefined>;
    type: 'Literal';
    regex?: {
        pattern: string;
        flags: string;
    };
    bigint?: string;
    raw?: string;
    constructor(value: T, raw?: string, regex?: {
        pattern: string;
        flags: string;
    }, bigint?: string, range?: [number, number], loc?: SourceLocation);
    getValue(): T;
    getRegex(): {
        pattern: string;
        flags: string;
    } | undefined;
    getBigint(): string | undefined;
    geRaw(): string | undefined;
    set(): void;
    get(): T;
    findScope<V extends Context>(stack: Stack): Scope<V>;
    findScope<V extends Context>(stack: Stack, scope: Scope<Record<PropertyKey, V>>): Scope<V>;
    dependency(computed: true): ExpressionNode[];
    dependencyPath(computed?: true): ExpressionEventPath[];
    toString(): string;
    toJson(): object;
}
export declare class TemplateLiteralExpressionNode extends AbstractExpressionNode {
    protected quasis: string[];
    protected expressions: ExpressionNode[];
    protected tag?: ExpressionNode | undefined;
    static visit(node: TemplateLiteralExpressionNode, visitNode: VisitNodeType): void;
    constructor(quasis: string[], expressions: ExpressionNode[], tag?: ExpressionNode | undefined, range?: [number, number], loc?: SourceLocation);
    getTag(): ExpressionNode | undefined;
    getExpressions(): ExpressionNode[];
    set(stack: Stack, value: any): void;
    get(stack: Stack): any;
    dependency(computed?: true): ExpressionNode[];
    dependencyPath(computed?: true): ExpressionEventPath[];
    toString(): string;
    toJson(): object;
}
export declare class TemplateLiteral extends TemplateLiteralExpressionNode {
    static fromJSON(node: TemplateLiteral, deserializer: NodeDeserializer): TemplateLiteralExpressionNode;
    protected tag: undefined;
    constructor(quasis: string[], expressions: ExpressionNode[], range?: [number, number], loc?: SourceLocation);
    getTag(): undefined;
}
export declare class TaggedTemplateExpression extends TemplateLiteralExpressionNode {
    static fromJSON(node: TaggedTemplateExpression, deserializer: NodeDeserializer): TemplateLiteralExpressionNode;
    protected tag: ExpressionNode;
    constructor(tag: ExpressionNode, quasis: string[], expressions: ExpressionNode[], range?: [number, number], loc?: SourceLocation);
    getTag(): ExpressionNode;
}
//# sourceMappingURL=values.d.ts.map