import { __esDecorate, __runInitializers } from "../../../../tslib/tslib.es6.js";
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
let Identifier = (() => {
    let _classDecorators = [Deserializer('Identifier')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AbstractExpressionNode;
    var Identifier = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            Identifier = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        name;
        static fromJSON(node) {
            return new Identifier(node.name, node.range, node.loc);
        }
        constructor(name, range, loc) {
            super(range, loc);
            this.name = name;
        }
        getName() {
            return this.name;
        }
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
                return scope.getInnerScope(this.name) ?? scope;
            }
            scope = stack.findScope(this.name);
            return scope.getInnerScope(this.name) ?? scope;
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
    return Identifier = _classThis;
})();
export { Identifier };
let ThisExpression = (() => {
    let _classDecorators = [Deserializer('ThisExpression')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = Identifier;
    var ThisExpression = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ThisExpression = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        static fromJSON(node) {
            return new ThisExpression(node.range, node.loc);
        }
        constructor(range, loc) {
            super('this', range, loc);
        }
        toJson() {
            return {};
        }
    };
    return ThisExpression = _classThis;
})();
export { ThisExpression };
let Literal = (() => {
    let _classDecorators = [Deserializer('Literal')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AbstractExpressionNode;
    var Literal = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            Literal = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        value;
        static fromJSON(node) {
            if (node.bigint) {
                return new Literal(BigInt(node.bigint), node.raw, undefined, node.bigint, node.range, node.loc);
            }
            else if (node.regex) {
                return new Literal(RegExp(node.regex.pattern, node.regex.flags), node.raw, node.regex, undefined, node.range, node.loc);
            }
            return new Literal(node.value, node.raw, undefined, undefined, node.range, node.loc);
        }
        regex;
        bigint;
        raw;
        constructor(value, raw, regex, bigint, range, loc) {
            super(range, loc);
            this.value = value;
            raw && (this.raw = raw);
            regex && (this.regex = regex);
            bigint && (this.bigint = bigint);
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
        set() {
            throw new Error(`${this.constructor.name}#set() has no implementation.`);
        }
        get() {
            return this.value;
        }
        findScope(stack, scope) {
            if (scope) {
                return scope.getInnerScope(this.value);
            }
            scope = stack.findScope(this.value);
            return scope.getInnerScope(this.value);
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
    return Literal = _classThis;
})();
export { Literal };
class TemplateArray extends Array {
    raw;
    constructor(strings) {
        super(...strings);
        this.raw = strings;
    }
}
export class TemplateLiteralExpressionNode extends AbstractExpressionNode {
    quasis;
    expressions;
    tag;
    static visit(node, visitNode) {
        node.tag && visitNode(node.tag);
        node.expressions.forEach(visitNode);
    }
    constructor(quasis, expressions, tag, range, loc) {
        super(range, loc);
        this.quasis = quasis;
        this.expressions = expressions;
        this.tag = tag;
    }
    getTag() {
        return this.tag;
    }
    getExpressions() {
        return this.expressions;
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
let TemplateLiteral = (() => {
    let _classDecorators = [Deserializer('TemplateLiteral')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = TemplateLiteralExpressionNode;
    var TemplateLiteral = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            TemplateLiteral = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        static fromJSON(node, deserializer) {
            return new TemplateLiteral(node.quasis, node.expressions.map(deserializer), node.range, node.loc);
        }
        constructor(quasis, expressions, range, loc) {
            super(quasis, expressions, undefined, range, loc);
        }
        getTag() {
            return undefined;
        }
    };
    return TemplateLiteral = _classThis;
})();
export { TemplateLiteral };
let TaggedTemplateExpression = (() => {
    let _classDecorators = [Deserializer('TaggedTemplateExpression')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = TemplateLiteralExpressionNode;
    var TaggedTemplateExpression = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            TaggedTemplateExpression = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        static fromJSON(node, deserializer) {
            return new TaggedTemplateExpression(deserializer(node.tag), node.quasis, node.expressions.map(deserializer), node.range, node.loc);
        }
        constructor(tag, quasis, expressions, range, loc) {
            super(quasis, expressions, tag, range, loc);
        }
        getTag() {
            return super.getTag();
        }
    };
    return TaggedTemplateExpression = _classThis;
})();
export { TaggedTemplateExpression };
//# sourceMappingURL=values.js.map