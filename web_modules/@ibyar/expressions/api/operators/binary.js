var BinaryExpression_1;
import { __decorate } from "../../../../tslib/tslib.es6.js";
import { InfixExpressionNode } from '../abstract.js';
import { Deserializer } from '../deserialize/deserialize.js';
let BinaryExpression = BinaryExpression_1 = class BinaryExpression extends InfixExpressionNode {
    static fromJSON(node, deserializer) {
        return new BinaryExpression_1(node.operator, deserializer(node.left), deserializer(node.right));
    }
    static visit(node, visitNode, visitNodeList) {
        visitNode(node.left);
        visitNode(node.right);
    }
    set(context, value) {
        throw new Error(`BinaryExpression#set() for operator:(${this.operator}) has no implementation.`);
    }
    get(stack) {
        const evalNode = {
            left: this.left.get(stack),
            right: this.right.get(stack)
        };
        return BinaryExpression_1.Evaluations[this.operator](evalNode);
    }
};
BinaryExpression.Evaluations = {
    '==': (evalNode) => { return evalNode.left == evalNode.right; },
    '!=': (evalNode) => { return evalNode.left != evalNode.right; },
    '===': (evalNode) => { return evalNode.left === evalNode.right; },
    '!==': (evalNode) => { return evalNode.left !== evalNode.right; },
    '<': (evalNode) => { return evalNode.left < evalNode.right; },
    '<=': (evalNode) => { return evalNode.left <= evalNode.right; },
    '>': (evalNode) => { return evalNode.left > evalNode.right; },
    '>=': (evalNode) => { return evalNode.left >= evalNode.right; },
    '*': (evalNode) => { return evalNode.left * evalNode.right; },
    '/': (evalNode) => { return evalNode.left / evalNode.right; },
    '%': (evalNode) => { return evalNode.left % evalNode.right; },
    '+': (evalNode) => { return evalNode.left + evalNode.right; },
    '-': (evalNode) => { return evalNode.left - evalNode.right; },
    'in': (evalNode) => { return evalNode.left in evalNode.right; },
    'instanceof': (evalNode) => { return evalNode.left instanceof evalNode.right; },
    '<<': (evalNode) => { return evalNode.left << evalNode.right; },
    '>>': (evalNode) => { return evalNode.left >> evalNode.right; },
    '>>>': (evalNode) => { return evalNode.left >>> evalNode.right; },
    '&': (evalNode) => { return evalNode.left & evalNode.right; },
    '^': (evalNode) => { return evalNode.left ^ evalNode.right; },
    '|': (evalNode) => { return evalNode.left | evalNode.right; },
    '**': (evalNode) => { return evalNode.left ** evalNode.right; },
    '%%': (evalNode) => { return ((evalNode.left % evalNode.right) + evalNode.right) % evalNode.right; },
    '>?': (evalNode) => { return evalNode.left > evalNode.right ? evalNode.left : evalNode.right; },
    '<?': (evalNode) => { return evalNode.left > evalNode.right ? evalNode.right : evalNode.left; },
    '<=>': (evalNode) => {
        if ((evalNode.left === null || evalNode.right === null) || (typeof evalNode.left != typeof evalNode.right)) {
            return null;
        }
        if (typeof evalNode.left === 'string') {
            return evalNode.left.localeCompare(evalNode.right);
        }
        else {
            if (evalNode.left > evalNode.right) {
                return 1;
            }
            else if (evalNode.left < evalNode.right) {
                return -1;
            }
            return 0;
        }
    }
};
BinaryExpression = BinaryExpression_1 = __decorate([
    Deserializer('BinaryExpression')
], BinaryExpression);
export { BinaryExpression };
//# binary.js.map