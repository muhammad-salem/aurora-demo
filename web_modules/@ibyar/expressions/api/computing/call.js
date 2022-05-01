var CallExpression_1;
import { __decorate, __metadata } from "../../../../tslib/tslib.es6.js";
import { AbstractExpressionNode } from '../abstract.js';
import { SpreadElement } from './spread.js';
import { Deserializer } from '../deserialize/deserialize.js';
import { MemberExpression } from '../definition/member.js';
import { Identifier } from '../definition/values.js';
let CallExpression = CallExpression_1 = class CallExpression extends AbstractExpressionNode {
    constructor(callee, params, optional = false) {
        super();
        this.callee = callee;
        this.optional = optional;
        this.arguments = params;
    }
    static fromJSON(node, deserializer) {
        return new CallExpression_1(deserializer(node.callee), node.arguments.map(param => deserializer(param)), node.optional);
    }
    static visit(node, visitNode) {
        visitNode(node.callee);
        node.arguments.forEach(visitNode);
    }
    getCallee() {
        return this.callee;
    }
    getArguments() {
        return this.arguments;
    }
    shareVariables(scopeList) {
        this.arguments.forEach(param => param.shareVariables(scopeList));
    }
    set(stack, value) {
        throw new Error(`CallExpression#set() has no implementation.`);
    }
    get(stack, thisContext) {
        const funCallBack = this.callee.get(stack);
        if (this.optional && (funCallBack === null || funCallBack === undefined)) {
            return;
        }
        const parameters = this.getCallParameters(stack);
        if (!thisContext && this.callee instanceof MemberExpression) {
            thisContext = this.callee.getObject().get(stack);
        }
        else if (!thisContext && this.callee instanceof Identifier) {
            thisContext = stack.findScope(this.callee.getName()).getContextProxy?.();
        }
        return funCallBack.apply(thisContext, parameters);
    }
    getCallParameters(stack) {
        const parameters = [];
        for (const arg of this.arguments) {
            if (arg instanceof SpreadElement) {
                const paramScope = stack.pushBlockScopeFor(parameters);
                arg.get(stack);
                stack.clearTo(paramScope);
                break;
            }
            else {
                parameters.push(arg.get(stack));
            }
        }
        return parameters;
    }
    dependency(computed) {
        return this.callee.dependency(computed).concat(this.arguments.flatMap(param => param.dependency(computed)));
    }
    dependencyPath(computed) {
        return this.callee.dependencyPath(computed).concat(this.arguments.flatMap(param => param.dependencyPath(computed)));
    }
    toString() {
        return `${this.callee.toString()}${this.optional ? '?.' : ''}(${this.arguments.map(arg => arg.toString()).join(', ')})`;
    }
    toJson() {
        return {
            callee: this.callee.toJSON(),
            arguments: this.arguments.map(arg => arg.toJSON()),
            optional: this.optional
        };
    }
};
CallExpression = CallExpression_1 = __decorate([
    Deserializer('CallExpression'),
    __metadata("design:paramtypes", [Object, Array, Boolean])
], CallExpression);
export { CallExpression };
//# sourceMappingURL=call.js.map