var Identifier_1, Literal_1, StringLiteral_1, NumberLiteral_1, BigIntLiteral_1, RegExpLiteral_1;
import { __decorate, __metadata } from "../../../../tslib/tslib.es6.js";
import { Deserializer } from '../deserialize/deserialize.js';
import { AbstractExpressionNode } from '../abstract.js';
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
    declareVariable(stack, scopeType, propertyValue) {
        return stack.declareVariable(scopeType, this.name, propertyValue);
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
let Literal = Literal_1 = class Literal extends AbstractExpressionNode {
    constructor(value) {
        super();
        this.value = value;
    }
    static fromJSON(node) {
        return new Literal_1(node.value);
    }
    getValue() {
        return this.value;
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
        return String(this.value);
    }
    toJson() {
        return { value: this.value };
    }
};
Literal = Literal_1 = __decorate([
    Deserializer('Literal'),
    __metadata("design:paramtypes", [Object])
], Literal);
export { Literal };
let StringLiteral = StringLiteral_1 = class StringLiteral extends Literal {
    constructor(value, quote) {
        super(value);
        const firstChar = value.charAt(0);
        if (quote) {
            this.quote = quote;
            this.value = value;
        }
        else if (firstChar === '"' || firstChar == `'` || firstChar === '`') {
            this.quote = firstChar;
            this.value = `"${value.substring(1, value.length - 1)}"`;
        }
        else {
            this.quote = '';
            this.value = value;
        }
    }
    static fromJSON(node) {
        return new StringLiteral_1(node.value, node.quote);
    }
    getQuote() {
        return this.quote;
    }
    toString() {
        return `${this.quote}${this.value}${this.quote}`;
    }
    toJson() {
        return {
            value: this.value,
            quote: this.quote
        };
    }
};
StringLiteral = StringLiteral_1 = __decorate([
    Deserializer('StringLiteral'),
    __metadata("design:paramtypes", [String, String])
], StringLiteral);
export { StringLiteral };
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
    static visit(node, visitNode, visitNodeList) {
        node.tag && visitNode(node.tag);
        visitNodeList(node.expressions);
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
let NumberLiteral = NumberLiteral_1 = class NumberLiteral extends Literal {
    static fromJSON(node) {
        return new NumberLiteral_1(node.value);
    }
    constructor(value) {
        super(value);
    }
};
NumberLiteral = NumberLiteral_1 = __decorate([
    Deserializer('NumberLiteral'),
    __metadata("design:paramtypes", [Number])
], NumberLiteral);
export { NumberLiteral };
let BigIntLiteral = BigIntLiteral_1 = class BigIntLiteral extends Literal {
    static fromJSON(node) {
        return new BigIntLiteral_1(BigInt(String(node.value)));
    }
    toString() {
        return `${this.value}n`;
    }
    toJson() {
        return { value: this.value.toString() };
    }
};
BigIntLiteral = BigIntLiteral_1 = __decorate([
    Deserializer('BigIntLiteral')
], BigIntLiteral);
export { BigIntLiteral };
let RegExpLiteral = RegExpLiteral_1 = class RegExpLiteral extends Literal {
    static fromJSON(node) {
        return new RegExpLiteral_1(new RegExp(node.regex.pattern, node.regex.flags));
    }
    toString() {
        return `${this.value}n`;
    }
    toJson() {
        return {
            regex: {
                pattern: this.value.source,
                flags: this.value.flags
            }
        };
        ;
    }
};
RegExpLiteral = RegExpLiteral_1 = __decorate([
    Deserializer('RegExpLiteral')
], RegExpLiteral);
export { RegExpLiteral };
export const TRUE = String(true);
export const FALSE = String(false);
let BooleanLiteral = class BooleanLiteral extends Literal {
    static fromJSON(node) {
        switch (String(node.value)) {
            case TRUE: return TrueNode;
            case FALSE:
            default:
                return FalseNode;
        }
    }
};
BooleanLiteral = __decorate([
    Deserializer('BooleanLiteral')
], BooleanLiteral);
export { BooleanLiteral };
export const NULL = String(null);
export const UNDEFINED = String(undefined);
let NullishLiteral = class NullishLiteral extends Literal {
    static fromJSON(node) {
        switch (String(node.value)) {
            case NULL: return NullNode;
            case UNDEFINED:
            default: return UndefinedNode;
        }
    }
    toString() {
        if (typeof this.value === 'undefined') {
            return UNDEFINED;
        }
        return NULL;
    }
    toJson() {
        return { value: this.toString() };
    }
};
NullishLiteral = __decorate([
    Deserializer('NullishLiteral')
], NullishLiteral);
export { NullishLiteral };
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
export const NullNode = Object.freeze(new NullishLiteral(null));
export const UndefinedNode = Object.freeze(new NullishLiteral(undefined));
export const TrueNode = Object.freeze(new BooleanLiteral(true));
export const FalseNode = Object.freeze(new BooleanLiteral(false));
export const ThisNode = Object.freeze(new ThisExpression());
export const GlobalThisNode = Object.freeze(new Identifier('globalThis'));
export const SymbolNode = Object.freeze(new Identifier('Symbol'));
export const OfNode = Object.freeze(new Identifier('of'));
export const AsNode = Object.freeze(new Identifier('as'));
export const GetIdentifier = Object.freeze(new Identifier('get'));
export const SetIdentifier = Object.freeze(new Identifier('set'));
export const AsyncIdentifier = Object.freeze(new Identifier('async'));
export const AwaitIdentifier = Object.freeze(new Identifier('await'));
export const ConstructorIdentifier = Object.freeze(new Identifier('constructor'));
export const NameIdentifier = Object.freeze(new Identifier('name'));
export const EvalIdentifier = Object.freeze(new Identifier('eval'));
export const ArgumentsIdentifier = Object.freeze(new Identifier('arguments'));
//# values.js.map