var PipelineExpression_1;
import { __decorate, __metadata } from "../../../../tslib/tslib.es6.js";
import { AbstractExpressionNode } from '../abstract.js';
import { Deserializer } from '../deserialize/deserialize.js';
import { SpreadElement } from '../computing/spread.js';
import { MemberExpression } from '../definition/member.js';
let PipelineExpression = PipelineExpression_1 = class PipelineExpression extends AbstractExpressionNode {
    constructor(left, right, params = []) {
        super();
        this.left = left;
        this.right = right;
        this.arguments = params;
    }
    static fromJSON(node, deserializer) {
        return new PipelineExpression_1(deserializer(node.left), deserializer(node.right), node.arguments.map(arg => typeof arg === 'string' ? arg : deserializer(arg)));
    }
    static visit(node, visitNode) {
        visitNode(node.left);
        visitNode(node.right);
        node.arguments.forEach(arg => typeof arg == 'object' && visitNode(arg));
    }
    getLeft() {
        return this.left;
    }
    getRight() {
        return this.right;
    }
    getArguments() {
        return this.arguments;
    }
    shareVariables(scopeList) {
        this.left.shareVariables(scopeList);
        this.right.shareVariables(scopeList);
        this.arguments
            .filter(param => typeof param !== 'string')
            .forEach(param => param.shareVariables(scopeList));
    }
    set(stack, value) {
        throw new Error(`PipelineNode#set() has no implementation.`);
    }
    get(stack) {
        const paramValue = this.left.get(stack);
        const parameters = [];
        let indexed = false;
        for (const arg of this.arguments) {
            if (arg === '?') {
                parameters.push(paramValue);
                indexed = true;
            }
            else if (arg === '...?') {
                parameters.push(...paramValue);
                indexed = true;
            }
            else {
                if (arg instanceof SpreadElement) {
                    const paramScope = stack.pushBlockScopeFor(parameters);
                    arg.get(stack);
                    stack.clearTo(paramScope);
                }
                else {
                    parameters.push(arg.get(stack));
                }
            }
        }
        if (!indexed) {
            parameters.unshift(paramValue);
        }
        const funCallBack = this.right.get(stack);
        if (this.right instanceof MemberExpression) {
            const thisArg = this.right.getObject().get(stack);
            return funCallBack.apply(thisArg, parameters);
        }
        return funCallBack(...parameters);
    }
    dependency(computed) {
        return this.right.dependency(computed)
            .concat(this.left.dependency(computed), this.arguments.filter(arg => (arg !== '?' && arg !== '...?'))
            .flatMap(param => param.dependency(computed)));
    }
    dependencyPath(computed) {
        return this.right.dependencyPath(computed)
            .concat(this.left.dependencyPath(computed), this.arguments.filter(arg => (arg !== '?' && arg !== '...?'))
            .flatMap(param => param.dependencyPath(computed)));
    }
    toString() {
        return `${this.left.toString()} |> ${this.right.toString()}${this.arguments.flatMap(arg => `:${arg.toString()}`).join('')}`;
    }
    toJson() {
        return {
            left: this.left.toJSON(),
            right: this.right.toJSON(),
            arguments: this.arguments.map(arg => typeof arg === 'string' ? arg : arg.toJSON())
        };
    }
};
PipelineExpression = PipelineExpression_1 = __decorate([
    Deserializer('PipelineExpression'),
    __metadata("design:paramtypes", [Object, Object, Array])
], PipelineExpression);
export { PipelineExpression };
//# sourceMappingURL=pipeline.js.map