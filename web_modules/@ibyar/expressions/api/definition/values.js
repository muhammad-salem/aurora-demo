var Identifier_1, Literal_1;
import { __decorate, __metadata } from "../../../../tslib/tslib.es6.js";
import { Deserializer } from '../deserialize/deserialize.js';
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
let Identifier = Identifier_1 = class Identifier extends AbstractExpressionNode {
    constructor(name) {
        super();
        this.name = name;
    }
    static fromJSON(node) {
        return new Identifier_1(node.name);
    }
    getName() {
        return this.name;
    }
    shareVariables(scopeList) { }
    set(stack, value) {
        return stack.set(this.name, value) ? value : void 0;
    }
    get(stack, thisContext) {
        if (thisContext) {
            return thisContext[this.name];
        }
        return stack.get(this.name);
    }
    findScope(stack, scope) {
        if (scope) {
            return scope.getScope(this.name);
        }
        scope = stack.findScope(this.name);
        return scope.getScope(this.name);
    }
    declareVariable(stack, propertyValue) {
        return stack.declareVariable(this.name, propertyValue);
    }
    getDeclarationName() {
        return this.toString();
    }
    dependency(computed) {
        return [this];
    }
    dependencyPath(computed) {
        const path = [{ computed: false, path: this.toString() }];
        return computed ? [{ computed, path: this.toString(), computedPath: [path] }] : path;
    }
    toString() {
        return String(this.name);
    }
    toJson() {
        return { name: this.name };
    }
};
Identifier = Identifier_1 = __decorate([
    Deserializer('Identifier'),
    __metadata("design:paramtypes", [Object])
], Identifier);
export { Identifier };
let ThisExpression = class ThisExpression extends Identifier {
    static fromJSON(node) {
        return ThisNode;
    }
    constructor() {
        super('this');
    }
};
ThisExpression = __decorate([
    Deserializer('ThisExpression'),
    __metadata("design:paramtypes", [])
], ThisExpression);
export { ThisExpression };
let Literal = Literal_1 = class Literal extends AbstractExpressionNode {
    constructor(value, raw, regex, bigint) {
        super();
        this.value = value;
        this.raw = raw;
        this.regex = regex;
        this.bigint = bigint;
    }
    static fromJSON(node) {
        if (node.bigint) {
            return new Literal_1(BigInt(node.bigint), node.raw, undefined, node.bigint);
        }
        else if (node.regex) {
            return new Literal_1(RegExp(node.regex.pattern, node.regex.flags), node.raw, node.regex);
        }
        return new Literal_1(node.value, node.raw);
    }
    getValue() {
        return this.value;
    }
    getRegex() {
        return this.regex;
    }
    getBigint() {
        return this.bigint;
    }
    geRaw() {
        return this.raw;
    }
    shareVariables(scopeList) { }
    set() {
        throw new Error(`${this.constructor.name}#set() has no implementation.`);
    }
    get() {
        return this.value;
    }
    findScope(stack, scope) {
        if (scope) {
            return scope.getScope(this.value);
        }
        scope = stack.findScope(this.value);
        return scope.getScope(this.value);
    }
    dependency(computed) {
        return computed ? [this] : [];
    }
    dependencyPath(computed) {
        return computed ? [{ computed: false, path: this.toString() }] : [];
    }
    toString() {
        return this.raw ?? String(this.value);
    }
    toJson() {
        if (this.bigint) {
            return {
                bigint: this.bigint,
                raw: this.raw,
            };
        }
        else if (this.regex) {
            return {
                regex: { pattern: this.regex?.pattern, flags: this.regex?.flags },
                raw: this.raw,
            };
        }
        return {
            value: this.value,
            raw: this.raw,
        };
    }
};
Literal = Literal_1 = __decorate([
    Deserializer('Literal'),
    __metadata("design:paramtypes", [Object, String, Object, String])
], Literal);
export { Literal };
class TemplateArray extends Array {
    constructor(strings) {
        super(...strings);
        this.raw = strings;
    }
}
export class TemplateLiteralExpressionNode extends AbstractExpressionNode {
    constructor(quasis, expressions, tag) {
        super();
        this.quasis = quasis;
        this.expressions = expressions;
        this.tag = tag;
    }
    static fromJSON(node, deserializer) {
        return new TemplateLiteralExpressionNode(node.quasis, node.expressions.map(deserializer), node.tag ? deserializer(node.tag) : void 0);
    }
    static visit(node, visitNode) {
        node.tag && visitNode(node.tag);
        node.expressions.forEach(visitNode);
    }
    getTag() {
        return this.tag;
    }
    getExpressions() {
        return this.expressions;
    }
    shareVariables(scopeList) {
        this.expressions.forEach(value => value.shareVariables(scopeList));
    }
    set(stack, value) {
        throw new Error(`TemplateLiteralExpressionNode#set() has no implementation.`);
    }
    get(stack) {
        const tagged = this.tag?.get(stack) || String.raw;
        const templateStringsArray = new TemplateArray(this.quasis);
        templateStringsArray.raw = templateStringsArray;
        const values = this.expressions.map(expr => expr.get(stack));
        return tagged(templateStringsArray, ...values);
    }
    dependency(computed) {
        return this.expressions.flatMap(exp => exp.dependency(computed));
    }
    dependencyPath(computed) {
        return this.expressions.flatMap(exp => exp.dependencyPath(computed));
    }
    toString() {
        let str = this.tag?.toString() || '';
        str += '`';
        let i = 0;
        for (; i < this.quasis.length - 1; i++) {
            str += this.quasis[i];
            str += '${';
            str += this.expressions[i].toString();
            str += '}';
        }
        str += this.quasis[i];
        str += '`';
        return str;
    }
    toJson() {
        return {
            quasis: this.quasis,
            expressions: this.expressions.map(expr => expr.toJSON()),
            tag: this.tag?.toJSON(),
        };
    }
}
let TemplateLiteral = class TemplateLiteral extends TemplateLiteralExpressionNode {
    constructor(quasis, expressions) {
        super(quasis, expressions);
    }
    getTag() {
        return undefined;
    }
};
TemplateLiteral = __decorate([
    Deserializer('TemplateLiteral'),
    __metadata("design:paramtypes", [Array, Array])
], TemplateLiteral);
export { TemplateLiteral };
let TaggedTemplateExpression = class TaggedTemplateExpression extends TemplateLiteralExpressionNode {
    constructor(tag, quasis, expressions) {
        super(quasis, expressions, tag);
    }
    getTag() {
        return super.getTag();
    }
};
TaggedTemplateExpression = __decorate([
    Deserializer('TaggedTemplateExpression'),
    __metadata("design:paramtypes", [Object, Array, Array])
], TaggedTemplateExpression);
export { TaggedTemplateExpression };
// @Deserializer('BigIntLiteral')
// export class BigIntLiteral extends Literal<bigint> {
// 	static fromJSON(node: BigIntLiteral): BigIntLiteral {
// 		return new BigIntLiteral(BigInt(String(node.value)));
// 	}
// 	toString(): string {
// 		return `${this.value}n`;
// 	}
// 	toJson(): object {
// 		return { value: this.value.toString() };
// 	}
// }
export const TRUE = String(true);
export const FALSE = String(false);
export const NULL = String(null);
export const UNDEFINED = String(undefined);
export const NullNode = Object.freeze(new Literal(null));
export const UndefinedNode = Object.freeze(new Literal(undefined));
export const TrueNode = Object.freeze(new Literal(true));
export const FalseNode = Object.freeze(new Literal(false));
export const ThisNode = Object.freeze(new ThisExpression());
export const GlobalThisNode = Object.freeze(new Identifier('globalThis'));
export const SymbolNode = Object.freeze(new Identifier('Symbol'));
export const OfNode = Object.freeze(new Identifier('of'));
export const AsNode = Object.freeze(new Identifier('as'));
export const DefaultNode = Object.freeze(new Identifier('default'));
export const GetIdentifier = Object.freeze(new Identifier('get'));
export const SetIdentifier = Object.freeze(new Identifier('set'));
export const AsyncIdentifier = Object.freeze(new Identifier('async'));
export const AwaitIdentifier = Object.freeze(new Identifier('await'));
export const ConstructorIdentifier = Object.freeze(new Identifier('constructor'));
export const NameIdentifier = Object.freeze(new Identifier('name'));
export const EvalIdentifier = Object.freeze(new Identifier('eval'));
export const ArgumentsIdentifier = Object.freeze(new Identifier('arguments'));
export const YieldIdentifier = Object.freeze(new Identifier('yield'));
export const SuperIdentifier = Object.freeze(new Identifier('super'));
export const LetIdentifier = Object.freeze(new Identifier('let'));
//# sourceMappingURL=values.js.map