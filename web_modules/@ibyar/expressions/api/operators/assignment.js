var AssignmentExpression_1;
import { __decorate, __metadata } from "../../../../tslib/tslib.es6.js";
import { InfixExpressionNode } from '../abstract.js';
import { Deserializer } from '../deserialize/deserialize.js';
let AssignmentExpression = AssignmentExpression_1 = class AssignmentExpression extends InfixExpressionNode {
    constructor(operator, left, right) {
        super(operator, left, right);
    }
    static fromJSON(node, deserializer) {
        return new AssignmentExpression_1(node.operator, deserializer(node.left), deserializer(node.right));
    }
    static visit(node, visitNode, visitNodeList) {
        visitNode(node.left);
        visitNode(node.right);
    }
    set(stack, value) {
        return this.left.set(stack, value);
    }
    get(stack) {
        switch (this.operator) {
            case '&&=':
            case '||=':
            case '??=':
                return AssignmentExpression_1.LogicalEvaluations[this.operator](this, stack);
        }
        const evalNode = {
            left: this.left.get(stack),
            right: this.right.get(stack)
        };
        const value = AssignmentExpression_1.Evaluations[this.operator](evalNode);
        this.set(stack, value);
        return value;
    }
};
AssignmentExpression.Evaluations = {
    '=': (evalNode) => { return evalNode.left = evalNode.right; },
    '*=': (evalNode) => { return evalNode.left *= evalNode.right; },
    '**=': (evalNode) => { return evalNode.left **= evalNode.right; },
    '/=': (evalNode) => { return evalNode.left /= evalNode.right; },
    '%=': (evalNode) => { return evalNode.left %= evalNode.right; },
    '+=': (evalNode) => { return evalNode.left += evalNode.right; },
    '-=': (evalNode) => { return evalNode.left -= evalNode.right; },
    '<<=': (evalNode) => { return evalNode.left <<= evalNode.right; },
    '>>=': (evalNode) => { return evalNode.left >>= evalNode.right; },
    '>>>=': (evalNode) => { return evalNode.left >>>= evalNode.right; },
    '&=': (evalNode) => { return evalNode.left &= evalNode.right; },
    '^=': (evalNode) => { return evalNode.left ^= evalNode.right; },
    '|=': (evalNode) => { return evalNode.left |= evalNode.right; },
    '%%=': (evalNode) => { return evalNode.left %= ((evalNode.left % evalNode.right) + evalNode.right) % evalNode.right; },
    '>?=': (evalNode) => { return evalNode.left = evalNode.left > evalNode.right ? evalNode.left : evalNode.right; },
    '<?=': (evalNode) => { return evalNode.left = evalNode.left > evalNode.right ? evalNode.right : evalNode.left; },
};
AssignmentExpression.LogicalEvaluations = {
    '&&=': (exp, context) => {
        let value = exp.left.get(context);
        if (value) {
            value = exp.right.get(context);
            exp.set(context, value);
        }
        return value;
    },
    '||=': (exp, context) => {
        let value = exp.left.get(context);
        if (!value) {
            value = exp.right.get(context);
            exp.set(context, value);
        }
        return value;
    },
    '??=': (exp, context) => {
        let value = exp.left.get(context);
        if (value === undefined || value === null) {
            value = exp.right.get(context);
            exp.set(context, value);
        }
        return value;
    },
};
AssignmentExpression = AssignmentExpression_1 = __decorate([
    Deserializer('AssignmentExpression'),
    __metadata("design:paramtypes", [String, Object, Object])
], AssignmentExpression);
export { AssignmentExpression };
//# assignment.js.map