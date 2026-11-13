import { expressionTypes } from '../api/deserialize/type-store.js';
;
class AbortException extends Error {
}
export class ExpressionVisitor {
    getType(node) {
        return node.constructor.type;
    }
    visit(node, visitorCallback) {
        const control = {
            abort() {
                throw new AbortException('terminate');
            }
        };
        const visitNode = (expression) => {
            visitorCallback(expression, this.getType(expression), control);
            this.visitExpressionNode(expression, visitNode);
        };
        try {
            visitorCallback(node, this.getType(node), control);
            this.visitExpressionNode(node, visitNode);
        }
        catch (abort) {
            if (!(abort instanceof AbortException)) {
                throw abort;
            }
        }
    }
    visitExpressionNode(node, visitNode) {
        const classType = expressionTypes.get(this.getType(node));
        const visit = classType.visit;
        if (!visit) {
            return;
        }
        visit(node, visitNode);
    }
}
export const expressionVisitor = new ExpressionVisitor();
//# sourceMappingURL=visitor.js.map