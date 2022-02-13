var LogicalExpression_1;
import { __decorate } from "../../../../tslib/tslib.es6.js";
import { InfixExpressionNode } from '../abstract.js';
import { Deserializer } from '../deserialize/deserialize.js';
let LogicalExpression = LogicalExpression_1 = class LogicalExpression extends InfixExpressionNode {
    static fromJSON(node, deserializer) {
        return new LogicalExpression_1(node.operator, deserializer(node.left), deserializer(node.right));
    }
    static visit(node, visitNode, visitNodeList) {
        visitNode(node.left);
        visitNode(node.right);
    }
    get(context) {
        return LogicalExpression_1.Evaluations[this.operator](this, context);
    }
};
LogicalExpression.Evaluations = {
    '&&': (exp, context) => {
        let value = exp.left.get(context);
        if (value) {
            value = exp.right.get(context);
        }
        return value;
    },
    '||': (exp, context) => {
        let value = exp.left.get(context);
        if (!value) {
            value = exp.right.get(context);
        }
        return value;
    },
    '??': (exp, context) => {
        let value = exp.left.get(context);
        if (value === undefined || value === null) {
            value = exp.right.get(context);
        }
        return value;
    }
};
LogicalExpression = LogicalExpression_1 = __decorate([
    Deserializer('LogicalExpression')
], LogicalExpression);
export { LogicalExpression };
//# logical.js.map