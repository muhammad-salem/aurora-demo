var SwitchCase_1, DefaultExpression_1, SwitchStatement_1;
import { __decorate, __metadata } from "../../../../../tslib/tslib.es6.js";
import { AbstractExpressionNode } from '../../abstract.js';
import { Deserializer } from '../../deserialize/deserialize.js';
import { BreakStatement } from './terminate.js';
import { Identifier } from '../../definition/values.js';
let SwitchCase = SwitchCase_1 = class SwitchCase extends AbstractExpressionNode {
    constructor(test, consequent) {
        super();
        this.test = test;
        this.consequent = consequent;
    }
    static fromJSON(node, deserializer) {
        return new SwitchCase_1(deserializer(node.test), deserializer(node.consequent));
    }
    static visit(node, visitNode, visitNodeList) {
        visitNode(node.test);
        visitNode(node.consequent);
    }
    getTest() {
        return this.test;
    }
    getConsequent() {
        return this.consequent;
    }
    shareVariables(scopeList) {
        this.test.shareVariables(scopeList);
        this.consequent.shareVariables(scopeList);
    }
    set(stack, value) {
        throw new Error(`SwitchCase#set() has no implementation.`);
    }
    get(stack) {
        return this.consequent.get(stack);
    }
    dependency(computed) {
        return this.test.dependency(computed).concat(this.consequent.dependency(computed));
    }
    dependencyPath(computed) {
        return this.test.dependencyPath(computed).concat(this.consequent.dependencyPath(computed));
    }
    toString() {
        return `case ${this.test.toString()}: ${this.consequent.toString()};`;
    }
    toJson() {
        return {
            test: this.test.toJSON(),
            consequent: this.consequent.toJSON()
        };
    }
};
SwitchCase = SwitchCase_1 = __decorate([
    Deserializer('SwitchCase'),
    __metadata("design:paramtypes", [Object, Object])
], SwitchCase);
export { SwitchCase };
let DefaultExpression = DefaultExpression_1 = class DefaultExpression extends SwitchCase {
    constructor(block) {
        super(DefaultExpression_1.DefaultNode, block);
    }
    static fromJSON(node, deserializer) {
        return new DefaultExpression_1(deserializer(node.consequent));
    }
    static visit(node, visitNode, visitNodeList) {
        visitNode(node.consequent);
    }
    dependency(computed) {
        return this.consequent.dependency(computed);
    }
    dependencyPath(computed) {
        return this.consequent.dependencyPath(computed);
    }
    toString() {
        return `default: ${this.consequent.toString()};`;
    }
    toJson() {
        return {
            consequent: this.consequent.toJSON()
        };
    }
};
DefaultExpression.DEFAULT_KEYWORD = 'default';
DefaultExpression.DefaultNode = Object.freeze(new Identifier(DefaultExpression_1.DEFAULT_KEYWORD));
DefaultExpression = DefaultExpression_1 = __decorate([
    Deserializer('default'),
    __metadata("design:paramtypes", [Object])
], DefaultExpression);
export { DefaultExpression };
let SwitchStatement = SwitchStatement_1 = class SwitchStatement extends AbstractExpressionNode {
    constructor(discriminant, cases) {
        super();
        this.discriminant = discriminant;
        this.cases = cases;
    }
    static fromJSON(node, deserializer) {
        return new SwitchStatement_1(deserializer(node.discriminant), node.cases.map(deserializer));
    }
    static visit(node, visitNode, visitNodeList) {
        visitNode(node.discriminant);
        visitNodeList(node.cases);
    }
    getDiscriminant() {
        return this.discriminant;
    }
    getCases() {
        return this.cases;
    }
    shareVariables(scopeList) {
        this.discriminant.shareVariables(scopeList);
        this.cases.forEach(item => item.shareVariables(scopeList));
    }
    set(stack, value) {
        throw new Error(`SwitchStatement#set() has no implementation.`);
    }
    get(stack) {
        const result = this.discriminant.get(stack);
        const values = this.cases.map(item => item.getTest().get(stack));
        let startIndex = values.findIndex(item => result === item);
        if (startIndex === -1) {
            startIndex = this.cases.findIndex(item => item instanceof DefaultExpression);
            if (startIndex === -1) {
                return;
            }
        }
        const caseBlock = stack.pushBlockScope();
        for (let index = startIndex; index < this.cases.length; index++) {
            const returnValue = this.cases[index].get(stack);
            if (returnValue === BreakStatement.BreakSymbol) {
                break;
            }
        }
        stack.clearTo(caseBlock);
        return void 0;
    }
    dependency(computed) {
        return this.discriminant.dependency(computed).concat(this.cases.flatMap(expCase => expCase.dependency(computed)));
    }
    dependencyPath(computed) {
        return this.discriminant.dependencyPath(computed).concat(this.cases.flatMap(expCase => expCase.dependencyPath(computed)));
    }
    toString() {
        return `switch (${this.discriminant.toString()}) {${this.cases.map(item => item.toString())}`;
    }
    toJson() {
        return {
            discriminant: this.discriminant.toJSON(),
            cases: this.cases.map(item => item.toJSON())
        };
    }
};
SwitchStatement = SwitchStatement_1 = __decorate([
    Deserializer('SwitchStatement'),
    __metadata("design:paramtypes", [Object, Array])
], SwitchStatement);
export { SwitchStatement };
//# switch.js.map