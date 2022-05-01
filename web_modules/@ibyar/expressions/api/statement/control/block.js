var BlockStatement_1;
import { __decorate, __metadata } from "../../../../../tslib/tslib.es6.js";
import { AbstractExpressionNode, ReturnValue } from '../../abstract.js';
import { Deserializer } from '../../deserialize/deserialize.js';
import { BreakStatement, ContinueStatement } from './terminate.js';
let BlockStatement = BlockStatement_1 = class BlockStatement extends AbstractExpressionNode {
    constructor(body, isStatement) {
        super();
        this.body = body;
        this.isStatement = isStatement;
    }
    static fromJSON(node, deserializer) {
        return new BlockStatement_1(node.body.map(line => deserializer(line)), node.isStatement);
    }
    static visit(node, visitNode) {
        node.body.forEach(visitNode);
    }
    getBody() {
        return this.body;
    }
    shareVariables(scopeList) {
        this.body.forEach(statement => statement.shareVariables(scopeList));
    }
    set(stack, value) {
        throw new Error(`BlockStatement#set() has no implementation.`);
    }
    get(stack) {
        const blockScope = stack.pushBlockScope();
        for (const node of this.body) {
            const value = node.get(stack);
            if (this.isStatement) {
                switch (true) {
                    case BreakStatement.BreakSymbol === value:
                    case ContinueStatement.ContinueSymbol === value:
                    case value instanceof ReturnValue:
                        stack.clearTo(blockScope);
                        return value;
                }
            }
            else {
                if (value instanceof ReturnValue) {
                    stack.clearTo(blockScope);
                    return value.value;
                }
            }
        }
        stack.clearTo(blockScope);
    }
    dependency(computed) {
        return this.body.flatMap(exp => exp.dependency(computed));
    }
    dependencyPath(computed) {
        return this.body.flatMap(node => node.dependencyPath(computed));
    }
    toString() {
        return `{ ${this.body.map(node => node.toString()).join('; ')}; }`;
    }
    toJson() {
        return { body: this.body.map(node => node.toJSON()), isStatement: this.isStatement };
    }
};
BlockStatement = BlockStatement_1 = __decorate([
    Deserializer('BlockStatement'),
    __metadata("design:paramtypes", [Array, Boolean])
], BlockStatement);
export { BlockStatement };
//# sourceMappingURL=block.js.map