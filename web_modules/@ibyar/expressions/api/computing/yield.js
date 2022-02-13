var YieldExpression_1;
import { __decorate, __metadata } from "../../../../tslib/tslib.es6.js";
import { AbstractExpressionNode, YieldDelegateValue, YieldValue } from '../abstract.js';
import { Deserializer } from '../deserialize/deserialize.js';
let YieldExpression = YieldExpression_1 = class YieldExpression extends AbstractExpressionNode {
    constructor(delegate, argument) {
        super();
        this.delegate = delegate;
        this.argument = argument;
    }
    static fromJSON(node, deserializer) {
        return new YieldExpression_1(node.delegate, node.argument ? deserializer(node.argument) : void 0);
    }
    getArgument() {
        return this.argument;
    }
    shareVariables(scopeList) {
        this.argument?.shareVariables(scopeList);
    }
    set(stack, value) {
        throw new Error(`YieldExpression#set() has no implementation.`);
    }
    get(stack) {
        const value = this.argument?.get(stack);
        if (this.delegate) {
            return new YieldDelegateValue(value);
        }
        return new YieldValue(value);
    }
    dependency(computed) {
        return this.argument?.dependency(computed) || [];
    }
    dependencyPath(computed) {
        return this.argument?.dependencyPath(computed) || [];
    }
    toString() {
        return `yield${this.delegate ? '*' : ''} ${this.argument?.toString() || ''}`;
    }
    toJson() {
        return {
            delegate: this.delegate,
            argument: this.argument?.toJSON()
        };
    }
};
YieldExpression = YieldExpression_1 = __decorate([
    Deserializer('YieldExpression'),
    __metadata("design:paramtypes", [Boolean, Object])
], YieldExpression);
export { YieldExpression };
//# yield.js.map