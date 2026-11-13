import { __esDecorate, __runInitializers } from "../../../../../tslib/tslib.es6.js";
import { AbstractExpressionNode } from '../../abstract.js';
import { Deserializer } from '../../deserialize/deserialize.js';
import { TerminateReturnType } from './terminate.js';
import { Identifier } from '../../definition/values.js';
let SwitchCase = (() => {
    let _classDecorators = [Deserializer('SwitchCase')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AbstractExpressionNode;
    var SwitchCase = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            SwitchCase = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        test;
        consequent;
        static fromJSON(node, deserializer) {
            return new SwitchCase(deserializer(node.test), deserializer(node.consequent), node.range, node.loc);
        }
        static visit(node, visitNode) {
            visitNode(node.test);
            visitNode(node.consequent);
        }
        constructor(test, consequent, range, loc) {
            super(range, loc);
            this.test = test;
            this.consequent = consequent;
        }
        getTest() {
            return this.test;
        }
        getConsequent() {
            return this.consequent;
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
    return SwitchCase = _classThis;
})();
export { SwitchCase };
let DefaultExpression = (() => {
    let _classDecorators = [Deserializer('default')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = SwitchCase;
    var DefaultExpression = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            DefaultExpression = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        static fromJSON(node, deserializer) {
            return new DefaultExpression(deserializer(node.consequent), node.range, node.loc);
        }
        static visit(node, visitNode) {
            visitNode(node.consequent);
        }
        constructor(block, range, loc) {
            super(new Identifier('default'), block, range, loc);
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
    return DefaultExpression = _classThis;
})();
export { DefaultExpression };
/**
 * The switch statement evaluates an expression, matching the expression's value to a case clause,
 * and executes statements associated with that case,
 * as well as statements in cases that follow the matching case.
 *
 */
let SwitchStatement = (() => {
    let _classDecorators = [Deserializer('SwitchStatement')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AbstractExpressionNode;
    var SwitchStatement = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            SwitchStatement = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        discriminant;
        cases;
        static fromJSON(node, deserializer) {
            return new SwitchStatement(deserializer(node.discriminant), node.cases.map(deserializer), node.range, node.loc);
        }
        static visit(node, visitNode) {
            visitNode(node.discriminant);
            node.cases.forEach(visitNode);
        }
        constructor(discriminant, cases, range, loc) {
            super(range, loc);
            this.discriminant = discriminant;
            this.cases = cases;
        }
        getDiscriminant() {
            return this.discriminant;
        }
        getCases() {
            return this.cases;
        }
        set(stack, value) {
            throw new Error(`SwitchStatement#set() has no implementation.`);
        }
        get(stack) {
            // need to fix statements execution and support default case
            // stack = stack.newStack();
            const result = this.discriminant.get(stack);
            const values = this.cases.map(item => item.getTest().get(stack));
            let startIndex = values.findIndex(item => result === item);
            if (startIndex === -1) {
                // search for default statement
                startIndex = this.cases.findIndex(item => item instanceof DefaultExpression);
                if (startIndex === -1) {
                    return;
                }
            }
            const caseBlock = stack.pushBlockScope();
            for (let index = startIndex; index < this.cases.length; index++) {
                const returnValue = this.cases[index].get(stack);
                if (result instanceof TerminateReturnType) {
                    if (result.type === 'continue') {
                        continue;
                    }
                    else {
                        break;
                    }
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
    return SwitchStatement = _classThis;
})();
export { SwitchStatement };
//# sourceMappingURL=switch.js.map