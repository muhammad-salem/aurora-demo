var NewExpression_1;
import { __decorate, __metadata } from "../../../../tslib/tslib.es6.js";
import { AbstractExpressionNode } from '../abstract.js';
import { SpreadElement } from './spread.js';
import { Deserializer } from '../deserialize/deserialize.js';
let NewExpression = NewExpression_1 = class NewExpression extends AbstractExpressionNode {
    constructor(className, parameters) {
        super();
        this.className = className;
        this.arguments = parameters;
    }
    static fromJSON(node, deserializer) {
        return new NewExpression_1(deserializer(node.className), node.arguments?.map(deserializer));
    }
    static visit(node, visitNode) {
        visitNode(node.className);
        node.arguments?.forEach(visitNode);
    }
    getClassName() {
        return this.className;
    }
    getArguments() {
        return this.arguments;
    }
    shareVariables(scopeList) {
        this.arguments?.forEach(param => param.shareVariables(scopeList));
    }
    set(stack, value) {
        throw new Error(`NewExpression#set() has no implementation.`);
    }
    get(stack) {
        const classRef = this.className.get(stack);
        let value;
        if (this.arguments) {
            if (this.arguments.length > 0) {
                const parameters = [];
                for (const param of this.arguments) {
                    if (param instanceof SpreadElement) {
                        const paramScope = stack.pushBlockScopeFor(parameters);
                        param.get(stack);
                        stack.clearTo(paramScope);
                        break;
                    }
                    else {
                        parameters.push(param.get(stack));
                    }
                }
                value = new classRef(...parameters);
            }
            else {
                value = new classRef();
            }
        }
        else {
            value = new classRef;
        }
        return value;
    }
    dependency(computed) {
        return this.className.dependency(computed)
            .concat(this.arguments?.flatMap(parm => parm.dependency(computed)) || []);
    }
    dependencyPath(computed) {
        return this.className.dependencyPath(computed)
            .concat(this.arguments?.flatMap(param => param.dependencyPath(computed)) || []);
    }
    toString() {
        const parameters = this.arguments ? `(${this.arguments?.map(arg => arg.toString()).join(', ')})` : '';
        return `new ${this.className.toString()}${parameters}`;
    }
    toJson() {
        return {
            className: this.className.toJSON(),
            arguments: this.arguments?.map(arg => arg.toJSON())
        };
    }
};
NewExpression = NewExpression_1 = __decorate([
    Deserializer('NewExpression'),
    __metadata("design:paramtypes", [Object, Array])
], NewExpression);
export { NewExpression };
//# sourceMappingURL=new.js.map