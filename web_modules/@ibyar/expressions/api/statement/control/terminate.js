var BreakStatement_1, ContinueStatement_1;
import { __decorate } from "../../../../../tslib/tslib.es6.js";
import { AbstractExpressionNode } from '../../abstract.js';
import { Deserializer } from '../../deserialize/deserialize.js';
class TerminateStatement extends AbstractExpressionNode {
    constructor(symbol, label) {
        super();
        this.symbol = symbol;
        this.label = label;
    }
    getSymbol() {
        return this.symbol;
    }
    getLabel() {
        this.label;
    }
    shareVariables(scopeList) { }
    set(stack, value) {
        throw new Error(`TerminateStatement#set() has no implementation.`);
    }
    get(stack) {
        return this.symbol;
    }
    dependency(computed) {
        return [];
    }
    dependencyPath(computed) {
        return [];
    }
    toString() {
        return this.symbol.description;
    }
    toJson() {
        return { symbol: this.symbol.description, label: this.label };
    }
}
let BreakStatement = BreakStatement_1 = class BreakStatement extends TerminateStatement {
    static fromJSON(node) {
        return BreakStatement_1.BREAK_INSTANCE;
    }
    static visit(node, visitNode, visitNodeList) {
        node.label && visitNode(node.label);
    }
};
BreakStatement.BreakSymbol = Symbol.for('break');
BreakStatement.BREAK_INSTANCE = Object.freeze(new BreakStatement_1(BreakStatement_1.BreakSymbol));
BreakStatement = BreakStatement_1 = __decorate([
    Deserializer('BreakStatement')
], BreakStatement);
export { BreakStatement };
let ContinueStatement = ContinueStatement_1 = class ContinueStatement extends TerminateStatement {
    static fromJSON(node) {
        return ContinueStatement_1.CONTINUE_INSTANCE;
    }
    static visit(node, visitNode, visitNodeList) {
        node.label && visitNode(node.label);
    }
};
ContinueStatement.ContinueSymbol = Symbol.for('continue');
ContinueStatement.CONTINUE_INSTANCE = Object.freeze(new ContinueStatement_1(ContinueStatement_1.ContinueSymbol));
ContinueStatement = ContinueStatement_1 = __decorate([
    Deserializer('ContinueStatement')
], ContinueStatement);
export { ContinueStatement };
//# terminate.js.map