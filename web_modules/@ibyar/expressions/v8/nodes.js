import { Token } from './token.js';
import { AssignmentExpression } from '../api/operators/assignment.js';
import { LogicalExpression } from '../api/operators/logical.js';
import { UnaryExpression } from '../api/operators/unary.js';
import { ConditionalExpression } from '../api/operators/ternary.js';
import { SequenceExpression } from '../api/operators/comma.js';
import { Literal, TrueNode, FalseNode, NullNode, UndefinedNode } from '../api/definition/values.js';
import { AwaitExpression } from '../api/operators/await.js';
import { UpdateExpression } from '../api/operators/update.js';
import { BinaryExpression } from '../api/operators/binary.js';
export function creteInfixExpression(op, left, right) {
    switch (op) {
        case '=':
        case '+=':
        case '-=':
        case '**=':
        case '/=':
        case '%=':
        case '<<=':
        case '>>=':
        case '>>>=':
        case '&=':
        case '^=':
        case '|=':
        case '&&=':
        case '||=':
        case '??=':
            return new AssignmentExpression(op, left, right);
        case '&&':
        case '||':
        case '??':
            return new LogicalExpression(op, left, right);
        case '**':
        case '*':
        case '/':
        case '%':
        case '+':
        case '-':
        case '<':
        case '<=':
        case '>':
        case '>=':
        case 'in':
        case 'instanceof':
        case '==':
        case '!=':
        case '===':
        case '!==':
        case '<<':
        case '>>':
        case '>>>':
        case '&':
        case '^':
        case '|':
        case '>?':
        case '<?':
        case '<=>':
            return new BinaryExpression(op, left, right);
        default:
            throw new Error(`Not Supported Operator: ${op}`);
    }
}
export function createTernaryExpression(op, logical, ifTrue, ifFalse) {
    switch (op) {
        case '?':
            return new ConditionalExpression(logical, ifTrue, ifFalse);
        default:
            throw new Error(`${op} is not ternary operator`);
    }
}
export function creteCommaExpression(nodes) {
    return new SequenceExpression(nodes);
}
const USELESS_STACK = null; //Object.create(null);
const ALLOWED_TYPES = ['string', 'number', 'bigint', 'boolean'];
export function shortcutNumericLiteralBinaryExpression(x, y, op) {
    const expression = creteInfixExpression(op.getName(), x, y);
    if (x instanceof Literal && y instanceof Literal) {
        const typeX = typeof x.getValue();
        const typeY = typeof y.getValue();
        if (x === y && ALLOWED_TYPES.indexOf(typeX) > -1) {
            const result = expression.get(USELESS_STACK);
            const rawString = `${x.toString()} ${op.getName()} ${x.toString()}`;
            return new Literal(result, rawString);
        }
    }
    return expression;
}
export function coverValue(value) {
    switch (typeof value) {
        case 'undefined': return UndefinedNode;
        case 'boolean': return value ? TrueNode : FalseNode;
        case 'number':
        case 'bigint':
        case 'string':
            return new Literal(value);
        case 'object':
            if (value === null) {
                return NullNode;
            }
        // never reach
        case 'function':
        case 'symbol':
        default:
            return false;
    }
}
export function buildUnaryExpression(expression, op) {
    const name = op.getName();
    switch (name) {
        case '++':
        case '--':
            return new UpdateExpression(name, expression, true);
        case '+':
        case '-':
        case '!':
        case '~':
        case 'typeof':
        case 'void':
        case 'delete':
            return new UnaryExpression(name, expression);
        case 'await':
            return new AwaitExpression(expression);
        default:
            throw new Error(`${op} is not prefix operator`);
    }
}
export function buildPostfixExpression(expression, op) {
    const name = op.getName();
    switch (name) {
        case '++':
        case '--':
            return new UpdateExpression(name, expression, false);
        default:
            throw new Error(`${op} is not postfix operator`);
    }
}
export function expressionFromLiteral(te) {
    switch (te.token) {
        case Token.NUMBER:
        case Token.BIGINT:
        case Token.STRING:
        case Token.REGEXP_LITERAL:
        case Token.IDENTIFIER:
            return te.getValue();
        case Token.NULL_LITERAL: return NullNode;
        case Token.TRUE_LITERAL: return TrueNode;
        case Token.FALSE_LITERAL: return FalseNode;
        default:
        case Token.UNDEFINED_LITERAL: return UndefinedNode;
    }
}
//# sourceMappingURL=nodes.js.map