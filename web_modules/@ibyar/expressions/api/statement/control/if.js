var IfStatement_1;
import { __decorate, __metadata } from "../../../../../tslib/tslib.es6.js";
import { AbstractExpressionNode } from '../../abstract.js';
import { Deserializer } from '../../deserialize/deserialize.js';
let IfStatement = IfStatement_1 = class IfStatement extends AbstractExpressionNode {
    constructor(test, consequent, alternate) {
        super();
        this.test = test;
        this.consequent = consequent;
        this.alternate = alternate;
    }
    static fromJSON(node, deserializer) {
        return new IfStatement_1(deserializer(node.test), deserializer(node.consequent), node.alternate ? deserializer(node.alternate) : void 0);
    }
    static visit(node, visitNode) {
        visitNode(node.test);
        visitNode(node.consequent);
        node.alternate && visitNode(node.alternate);
    }
    getTest() {
        return this.test;
    }
    getConsequent() {
        return this.consequent;
    }
    getAlternate() {
        return this.alternate;
    }
    shareVariables(scopeList) {
        this.test.shareVariables(scopeList);
        this.consequent.shareVariables(scopeList);
        this.alternate?.shareVariables(scopeList);
    }
    set(stack, value) {
        throw new Error(`IfStatement#set() has no implementation.`);
    }
    get(stack) {
        const condition = this.test.get(stack);
        if (condition) {
            const ifBlock = stack.pushBlockScope();
            const value = this.consequent.get(stack);
            stack.clearTo(ifBlock);
            return value;
        }
        else if (this.alternate) {
            const elseBlock = stack.pushBlockScope();
            const value = this.alternate.get(stack);
            stack.clearTo(elseBlock);
            return value;
        }
        return void 0;
    }
    dependency(computed) {
        return this.test.dependency(computed)
            .concat(this.consequent.dependency(computed), this.alternate?.dependency(computed) || []);
    }
    dependencyPath(computed) {
        return this.test.dependencyPath(computed).concat(this.consequent.dependencyPath(computed), this.alternate?.dependencyPath(computed) || []);
    }
    toString() {
        return `if (${this.test.toString()}) ${this.consequent.toString()}${this.alternate ? ' else ' : ''}${this.alternate ? this.alternate.toString() : ''}`;
    }
    toJson() {
        return {
            test: this.test.toJSON(),
            consequent: this.consequent.toJSON(),
            alternate: this.alternate?.toJSON()
        };
    }
};
IfStatement = IfStatement_1 = __decorate([
    Deserializer('IfStatement'),
    __metadata("design:paramtypes", [Object, Object, Object])
], IfStatement);
export { IfStatement };
//# sourceMappingURL=if.js.map