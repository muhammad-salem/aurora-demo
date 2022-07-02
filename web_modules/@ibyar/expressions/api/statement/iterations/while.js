var WhileNode_1, DoWhileNode_1;
import { __decorate, __metadata } from "../../../../../tslib/tslib.es6.js";
import { AbstractExpressionNode, ReturnValue } from '../../abstract.js';
import { Deserializer } from '../../deserialize/deserialize.js';
import { TerminateReturnType } from '../control/terminate.js';
/**
 * The while statement creates a loop that executes a specified
 * statement as long as the test condition evaluates to true.
 * The condition is evaluated before executing the statement.
 *
 */
let WhileNode = WhileNode_1 = class WhileNode extends AbstractExpressionNode {
    constructor(test, body) {
        super();
        this.test = test;
        this.body = body;
    }
    static fromJSON(node, deserializer) {
        return new WhileNode_1(deserializer(node.test), deserializer(node.body));
    }
    static visit(node, visitNode) {
        visitNode(node.body);
        visitNode(node.test);
    }
    getTest() {
        return this.test;
    }
    getBody() {
        return this.body;
    }
    shareVariables(scopeList) {
        this.test.shareVariables(scopeList);
        this.body.shareVariables(scopeList);
    }
    set(stack, value) {
        throw new Error(`WhileNode#set() has no implementation.`);
    }
    get(stack) {
        const condition = this.test.get(stack);
        const whileBlock = stack.pushBlockScope();
        while (condition) {
            const result = this.body.get(stack);
            // useless case, as it at the end of for statement
            // an array/block statement, should return last signal
            if (result instanceof TerminateReturnType) {
                if (result.type === 'continue') {
                    continue;
                }
                else {
                    break;
                }
            }
            if (result instanceof ReturnValue) {
                stack.clearTo(whileBlock);
                return result;
            }
        }
        stack.clearTo(whileBlock);
        return void 0;
    }
    dependency(computed) {
        return this.test.dependency(computed).concat(this.body.dependency(computed));
    }
    dependencyPath(computed) {
        return this.test.dependencyPath(computed).concat(this.body.dependencyPath(computed));
    }
    toString() {
        return `while (${this.test.toString()}) ${this.body.toString()}`;
    }
    toJson() {
        return {
            test: this.test.toJSON(),
            body: this.body.toJSON()
        };
    }
};
WhileNode = WhileNode_1 = __decorate([
    Deserializer('WhileStatement'),
    __metadata("design:paramtypes", [Object, Object])
], WhileNode);
export { WhileNode };
let DoWhileNode = DoWhileNode_1 = class DoWhileNode extends AbstractExpressionNode {
    constructor(test, body) {
        super();
        this.test = test;
        this.body = body;
    }
    static fromJSON(node, deserializer) {
        return new DoWhileNode_1(deserializer(node.test), deserializer(node.body));
    }
    static visit(node, visitNode) {
        visitNode(node.test);
        visitNode(node.body);
    }
    getTest() {
        return this.test;
    }
    getBody() {
        return this.body;
    }
    shareVariables(scopeList) {
        this.test.shareVariables(scopeList);
        this.body.shareVariables(scopeList);
    }
    set(stack, value) {
        throw new Error(`WhileNode#set() has no implementation.`);
    }
    get(stack) {
        const whileBlock = stack.pushBlockScope();
        do {
            const result = this.body.get(stack);
            // useless case, as it at the end of for statement
            // an array/block statement, should return last signal
            if (result instanceof TerminateReturnType) {
                if (result.type === 'continue') {
                    continue;
                }
                else {
                    break;
                }
            }
            if (result instanceof ReturnValue) {
                stack.clearTo(whileBlock);
                return result;
            }
        } while (this.test.get(stack));
        stack.clearTo(whileBlock);
        return void 0;
    }
    dependency(computed) {
        return this.body.dependency(computed).concat(this.test.dependency(computed));
    }
    dependencyPath(computed) {
        return this.body.dependencyPath(computed).concat(this.test.dependencyPath(computed));
    }
    toString() {
        return `do {${this.body.toString()}} while (${this.test.toString()})`;
    }
    toJson() {
        return {
            test: this.test.toJSON(),
            body: this.body.toJSON()
        };
    }
};
DoWhileNode = DoWhileNode_1 = __decorate([
    Deserializer('DoWhileStatement'),
    __metadata("design:paramtypes", [Object, Object])
], DoWhileNode);
export { DoWhileNode };
//# sourceMappingURL=while.js.map