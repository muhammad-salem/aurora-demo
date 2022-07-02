var BreakStatement_1, ContinueStatement_1, LabeledStatement_1;
import { __decorate, __metadata } from "../../../../../tslib/tslib.es6.js";
import { AbstractExpressionNode } from '../../abstract.js';
import { Deserializer } from '../../deserialize/deserialize.js';
import { Identifier } from '../../definition/values.js';
export class TerminateReturnType {
    constructor(type, label) {
        this.type = type;
        this.label = label;
    }
}
;
/**
 * The break statement terminates the current loop, switch, or label statement
 * and transfers program control to the statement following the terminated statement.
 *
 * The continue statement terminates execution of the statements in the current iteration of the current or labeled loop,
 * and continues execution of the loop with the next iteration.
 *
 */
class TerminateStatement extends AbstractExpressionNode {
    constructor(label) {
        super();
        this.label = label;
    }
    getLabel() {
        this.label;
    }
    shareVariables(scopeList) { }
    set(stack, value) {
        throw new Error(`TerminateStatement#set() has no implementation.`);
    }
    get(stack) {
        return new TerminateReturnType(this.getType(), this.label?.get(stack));
    }
    dependency(computed) {
        return [];
    }
    dependencyPath(computed) {
        return [];
    }
    toString() {
        return `${this.getType()}${this.label ? ` ${this.label.toString()}` : ''};`;
    }
    toJson() {
        return { label: this.label?.toJSON() };
    }
}
let BreakStatement = BreakStatement_1 = class BreakStatement extends TerminateStatement {
    static fromJSON(node, deserializer) {
        return node.label
            ? new BreakStatement_1(deserializer(node.label))
            : BreakStatement_1.BREAK_INSTANCE;
    }
    static visit(node, visitNode) {
        node.label && visitNode(node.label);
    }
    getType() {
        return 'break';
    }
};
BreakStatement.BREAK_INSTANCE = Object.freeze(new BreakStatement_1());
BreakStatement = BreakStatement_1 = __decorate([
    Deserializer('BreakStatement')
], BreakStatement);
export { BreakStatement };
let ContinueStatement = ContinueStatement_1 = class ContinueStatement extends TerminateStatement {
    static fromJSON(node, deserializer) {
        return node.label
            ? new ContinueStatement_1(deserializer(node.label))
            : ContinueStatement_1.CONTINUE_INSTANCE;
    }
    static visit(node, visitNode) {
        node.label && visitNode(node.label);
    }
    getType() {
        return 'continue';
    }
};
ContinueStatement.CONTINUE_INSTANCE = Object.freeze(new ContinueStatement_1());
ContinueStatement = ContinueStatement_1 = __decorate([
    Deserializer('ContinueStatement')
], ContinueStatement);
export { ContinueStatement };
let LabeledStatement = LabeledStatement_1 = class LabeledStatement extends AbstractExpressionNode {
    constructor(label, body) {
        super();
        this.label = label;
        this.body = body;
    }
    static fromJSON(node, deserializer) {
        return new LabeledStatement_1(deserializer(node.label), deserializer(node.body));
    }
    static visit(node, visitNode) {
        visitNode(node.label);
        visitNode(node.body);
    }
    getLabel() {
        return this.label;
    }
    getBody() {
        return this.body;
    }
    shareVariables(scopeList) {
        this.body.shareVariables(scopeList);
    }
    set(stack, value) {
        throw new Error('LabeledStatement#set() not implemented.');
    }
    get(stack) {
        return this.body.get(stack);
    }
    dependency(computed) {
        return this.body.dependency(computed);
    }
    dependencyPath(computed) {
        return this.body.dependencyPath(computed);
    }
    toString() {
        return `${this.label.toString()}:\n${this.body.toString()}`;
    }
    toJson() {
        return {
            label: this.label.toJSON(),
            body: this.body.toJSON()
        };
    }
};
LabeledStatement = LabeledStatement_1 = __decorate([
    Deserializer('LabeledStatement'),
    __metadata("design:paramtypes", [Identifier, Object])
], LabeledStatement);
export { LabeledStatement };
//# sourceMappingURL=terminate.js.map