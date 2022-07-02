var BlockStatement_1;
import { __decorate, __metadata } from "../../../../../tslib/tslib.es6.js";
import { AbstractExpressionNode, ReturnValue } from '../../abstract.js';
import { Deserializer } from '../../deserialize/deserialize.js';
import { TerminateReturnType } from './terminate.js';
import { isDeclarationExpression } from '../../utils.js';
/**
 * A block statement (or compound statement in other languages) is used to group zero or more statements.
 * The block is delimited by a pair of braces ("curly brackets") and may optionally be labelled:
 */
let BlockStatement = BlockStatement_1 = class BlockStatement extends AbstractExpressionNode {
    constructor(body) {
        super();
        this.body = body;
    }
    static fromJSON(node, deserializer) {
        return new BlockStatement_1(node.body.map(deserializer));
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
        let value;
        for (const node of this.body) {
            value = node.get(stack);
            if (value instanceof ReturnValue) {
                stack.clearTo(blockScope);
                return value.value;
            }
            if (value instanceof TerminateReturnType) {
                return value;
            }
        }
        stack.clearTo(blockScope);
        return value;
    }
    dependency(computed) {
        return this.body.flatMap(exp => exp.dependency(computed));
    }
    dependencyPath(computed) {
        return this.body.flatMap(node => node.dependencyPath(computed));
    }
    toString() {
        return `{
			${this.body
            .map(node => ({ insert: !isDeclarationExpression(node), string: node.toString() }))
            .map(ref => `${ref.string}${ref.insert ? ';' : ''}`)
            .join('\n')}
		}`;
    }
    toJson() {
        return { body: this.body.map(node => node.toJSON()) };
    }
};
BlockStatement = BlockStatement_1 = __decorate([
    Deserializer('BlockStatement'),
    __metadata("design:paramtypes", [Array])
], BlockStatement);
export { BlockStatement };
//# sourceMappingURL=block.js.map