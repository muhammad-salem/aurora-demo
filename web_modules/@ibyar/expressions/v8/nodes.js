import { Token } from './token.js';
import { AssignmentExpression } from '../api/operators/assignment.js';
import { LogicalExpression } from '../api/operators/logical.js';
import { UnaryExpression } from '../api/operators/unary.js';
import { ConditionalExpression } from '../api/operators/ternary.js';
import { SequenceExpression } from '../api/operators/comma.js';
import { Literal, BigIntLiteral, NumberLiteral, BooleanLiteral, TrueNode, FalseNode, NullNode, StringLiteral, UndefinedNode } from '../api/definition/values.js';
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
export function cretePrefixExpression(op, node) {
    switch (op) {
        case '++':
        case '--':
            return new UpdateExpression(op, node, true);
        case '+':
        case '-':
        case '!':
        case '~':
        case 'typeof':
        case 'void':
        case 'delete':
            return new UnaryExpression(op, node);
        case 'await':
            return new AwaitExpression(node);
        default:
            throw new Error(`${op} is not prefix operator`);
    }
}
export function cretePostfixExpression(op, node) {
    switch (op) {
        case '++':
        case '--':
            return new UpdateExpression(op, node, false);
        default:
            throw new Error(`${op} is not postfix operator`);
    }
}
export function creteCommaExpression(nodes) {
    return new SequenceExpression(nodes);
}
const USELESS_STACK = null;
export function shortcutNumericLiteralBinaryExpression(x, y, op) {
    const expression = creteInfixExpression(op.getName(), x, y);
    if (expression
        && ((x instanceof NumberLiteral && y instanceof NumberLiteral)
            || (x instanceof StringLiteral && y instanceof StringLiteral)
            || (x instanceof BigIntLiteral && y instanceof BigIntLiteral)
            || (x instanceof BooleanLiteral && y instanceof BooleanLiteral))) {
        const result = expression.get(USELESS_STACK);
        if (result !== false) {
            switch (true) {
                case typeof result === 'number': return new NumberLiteral(result);
                case typeof result === 'string': return new StringLiteral(result);
                case typeof result === 'bigint': return new BigIntLiteral(result);
                case typeof result === 'boolean': return result ? TrueNode : FalseNode;
                default:
                    break;
            }
        }
    }
    return expression;
}
export function coverValue(value) {
    switch (typeof value) {
        case 'undefined': return UndefinedNode;
        case 'boolean': return value ? TrueNode : FalseNode;
        case 'number': return new NumberLiteral(value);
        case 'bigint': return new BigIntLiteral(value);
        case 'string': return new StringLiteral(value);
        case 'object':
            if (value === null) {
                return NullNode;
            }
        case 'function':
        case 'symbol':
        default:
            return false;
    }
}
export function buildUnaryExpression(expression, op) {
    let result = cretePrefixExpression(op.getName(), expression);
    if (expression instanceof Literal) {
        const value = result.get(USELESS_STACK);
        const temp = coverValue(value);
        if (temp !== false) {
            result = temp;
        }
    }
    return result;
}
export function buildPostfixExpression(expression, op) {
    let result = cretePostfixExpression(op.getName(), expression);
    if (expression instanceof Literal) {
        const value = result.get(USELESS_STACK);
        const temp = coverValue(value);
        if (temp !== false) {
            result = temp;
        }
    }
    return result;
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