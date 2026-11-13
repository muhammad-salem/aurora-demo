import { ClassBody, ClassDeclaration, ClassExpression, MetaProperty, MethodDefinition, PropertyDefinition, StaticBlock, Super } from '../api/class/class.js';
import { CallExpression } from '../api/computing/call.js';
import { DebuggerStatement } from '../api/computing/debugger.js';
import { NewExpression } from '../api/computing/new.js';
import { RestElement } from '../api/computing/rest.js';
import { ReturnStatement } from '../api/computing/return.js';
import { SpreadElement } from '../api/computing/spread.js';
import { CatchClauseNode, ThrowStatement, TryCatchNode } from '../api/computing/throw.js';
import { YieldExpression } from '../api/computing/yield.js';
import { ArrayExpression, ArrayPattern } from '../api/definition/array.js';
import { BindExpression } from '../api/definition/bind.js';
import { ArrowFunctionExpression, AssignmentPattern, FunctionDeclaration, FunctionExpression } from '../api/definition/function.js';
import { MemberExpression } from '../api/definition/member.js';
import { ObjectExpression, ObjectPattern, Property } from '../api/definition/object.js';
import { ExpressionStatement } from '../api/definition/statement.js';
import { Identifier, Literal, TaggedTemplateExpression, TemplateLiteral, ThisExpression } from '../api/definition/values.js';
import { ImportAttribute } from '../api/module/common.js';
import { ExportAllDeclaration, ExportDefaultDeclaration, ExportNamedDeclaration, ExportSpecifier } from '../api/module/export.js';
import { ImportDeclaration, ImportDefaultSpecifier, ImportExpression, ImportNamespaceSpecifier, ImportSpecifier } from '../api/module/import.js';
import { AssignmentExpression } from '../api/operators/assignment.js';
import { AwaitExpression } from '../api/operators/await.js';
import { BinaryExpression } from '../api/operators/binary.js';
import { ChainExpression } from '../api/operators/chaining.js';
import { SequenceExpression } from '../api/operators/comma.js';
import { GroupingExpression } from '../api/operators/grouping.js';
import { LogicalExpression } from '../api/operators/logical.js';
import { PipelineExpression } from '../api/operators/pipeline.js';
import { ConditionalExpression } from '../api/operators/ternary.js';
import { UnaryExpression } from '../api/operators/unary.js';
import { UpdateExpression } from '../api/operators/update.js';
import { Program } from '../api/program.js';
import { BlockStatement } from '../api/statement/control/block.js';
import { EmptyStatement } from '../api/statement/control/empty.js';
import { IfStatement } from '../api/statement/control/if.js';
import { DefaultExpression, SwitchCase, SwitchStatement } from '../api/statement/control/switch.js';
import { BreakStatement, ContinueStatement, LabeledStatement } from '../api/statement/control/terminate.js';
import { WithStatement } from '../api/statement/control/with.js';
import { VariableDeclarationNode, VariableDeclarator } from '../api/statement/declarations/declares.js';
import { ForAwaitOfNode, ForInNode, ForNode, ForOfNode } from '../api/statement/iterations/for.js';
import { DoWhileNode, WhileNode } from '../api/statement/iterations/while.js';
export class ExpressionNodeSourcePosition {
    source;
    newLineRegex = new RegExp('\n', 'g');
    constructor(source) {
        this.source = source;
    }
    getLineNumber(index, defaultValue) {
        return this.source.substring(0, index).match(this.newLineRegex)?.length ?? defaultValue;
    }
    getColumnNumber(index) {
        const end = this.source.lastIndexOf('\n', index);
        if (end === -1) {
            return index;
        }
        return index - end - 1;
    }
    createSourcePosition(range) {
        if (!range || !this.source) {
            return;
        }
        const startLine = this.getLineNumber(range[0], 1);
        const endLine = this.getLineNumber(range[1], startLine);
        const startColumn = this.getColumnNumber(range[0]);
        const endColumn = this.getColumnNumber(range[1]);
        return {
            start: { line: startLine, column: startColumn },
            end: { line: endLine, column: endColumn },
        };
    }
}
export class ExpressionNodeFactory {
    rangeFactory;
    constructor(rangeFactory) {
        this.rangeFactory = rangeFactory;
    }
    createDebuggerStatement(range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new DebuggerStatement(range, loc);
    }
    createSuper(range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new Super(range, loc);
    }
    createThis(range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new ThisExpression(range, loc);
    }
    createNull(range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new Literal(null, undefined, undefined, undefined, range, loc);
    }
    createTrue(range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new Literal(true, undefined, undefined, undefined, range, loc);
    }
    createFalse(range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new Literal(false, undefined, undefined, undefined, range, loc);
    }
    createVoidZero(argument, range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new UnaryExpression('void', argument, range, loc);
    }
    createEmptyStatement(range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new EmptyStatement(range, loc);
    }
    createExpressionStatement(list, range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new ExpressionStatement(list, range, loc);
    }
    createCatchClause(block, identifier, range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new CatchClauseNode(block, identifier, range, loc);
    }
    createTryStatement(tryBlock, catchBlock, finallyBlock, range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new TryCatchNode(tryBlock, catchBlock, finallyBlock, range, loc);
    }
    createThrowStatement(exception, range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new ThrowStatement(exception, range, loc);
    }
    createBlock(statements, range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new BlockStatement(statements, range, loc);
    }
    createIfStatement(condition, thenStatement, elseStatement, range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new IfStatement(condition, thenStatement, elseStatement, range, loc);
    }
    createDoStatement(condition, body, range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new DoWhileNode(condition, body, range, loc);
    }
    createClassDeclaration(body, decorators, id, superClass, range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new ClassDeclaration(body, decorators, id, superClass, range, loc);
    }
    createFunctionDeclaration(formals, bodyBlock, isAsync, isGenerator, name, range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new FunctionDeclaration(formals, bodyBlock, isAsync, isGenerator, name, range, loc);
    }
    createFunctionExpression(formals, bodyBlock, isAsync, isGenerator, range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new FunctionExpression(formals, bodyBlock, isAsync, isGenerator, undefined, range, loc);
    }
    createWhileStatement(condition, body, range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new WhileNode(condition, body, range, loc);
    }
    createSwitchStatement(tag, cases, range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new SwitchStatement(tag, cases, range, loc);
    }
    createCaseBlock(test, block, range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new SwitchCase(test, block, range, loc);
    }
    createDefaultClause(block, range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new DefaultExpression(block, range, loc);
    }
    createWithStatement(object, body, range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new WithStatement(object, body, range, loc);
    }
    createForStatement(body, initializer, cond, next, range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new ForNode(body, initializer, cond, next, range, loc);
    }
    createForOfStatement(initializer, enumerable, body, range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new ForOfNode(initializer, enumerable, body, range, loc);
    }
    createForAwaitOfStatement(left, right, body, range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new ForAwaitOfNode(left, right, body, range, loc);
    }
    createForInStatement(initializer, enumerable, body, range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new ForInNode(initializer, enumerable, body, range, loc);
    }
    createVariableDeclaration(id, init, range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new VariableDeclarator(id, init, range, loc);
    }
    createVariableStatement(variables, kind, range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new VariableDeclarationNode(variables, kind, range, loc);
    }
    createContinueStatement(label, range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new ContinueStatement(label, range, loc);
    }
    createBreakStatement(label, range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new BreakStatement(label, range, loc);
    }
    createReturnStatement(argument, range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new ReturnStatement(argument, range, loc);
    }
    createLabeledStatement(expression, result, range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new LabeledStatement(expression, result, range, loc);
    }
    createAssignmentPattern(left, right, range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new AssignmentPattern(left, right, range, loc);
    }
    createSpreadElement(argument, range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new SpreadElement(argument, range, loc);
    }
    createCommaListExpression(expressions, range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new SequenceExpression(expressions, range, loc);
    }
    createTemplateExpression(quasis, expressions, range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new TemplateLiteral(quasis, expressions, range, loc);
    }
    createTaggedTemplateExpression(tag, quasis, expressions, range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new TaggedTemplateExpression(tag, quasis, expressions, range, loc);
    }
    createNewExpression(className, parameters, range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new NewExpression(className, parameters, range, loc);
    }
    createObjectBindingPattern(properties, range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new ObjectPattern(properties, range, loc);
    }
    createObjectLiteralExpression(properties, range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new ObjectExpression(properties, range, loc);
    }
    createArrayBindingPattern(elements, range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new ArrayPattern(elements, range, loc);
    }
    createArrayLiteralExpression(elements, range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new ArrayExpression(elements, range, loc);
    }
    createAssignment(operator, left, right, range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new AssignmentExpression(operator, left, right, range, loc);
    }
    createRestElement(argument, range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new RestElement(argument, range, loc);
    }
    createArrowFunction(params, body, expression, async, range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new ArrowFunctionExpression(params, body, expression, async, range, loc);
    }
    createPropertyDeclaration(key, value, kind, method, shorthand, computed, range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new Property(key, value, kind, method, shorthand, computed, range, loc);
    }
    createIdentifier(name, range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new Identifier(name, range, loc);
    }
    createPropertyAssignment(object, property, computed, optional, range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new MemberExpression(object, property, computed, optional, range, loc);
    }
    createPipelineExpression(left, right, params, range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new PipelineExpression(left, right, params, range, loc);
    }
    createCallExpression(callee, params, optional, range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new CallExpression(callee, params, optional, range, loc);
    }
    createBindExpression(object, property, computed, optional, range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new BindExpression(object, property, computed, optional, range, loc);
    }
    createChainExpression(expression, range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new ChainExpression(expression, range, loc);
    }
    createLogicalExpression(operator, left, right, range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new LogicalExpression(operator, left, right, range, loc);
    }
    createConditionalExpression(test, alternate, consequent, range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new ConditionalExpression(test, alternate, consequent, range, loc);
    }
    createYieldExpression(delegate, argument, range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new YieldExpression(delegate, argument, range, loc);
    }
    createMetaProperty(meta, property, range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new MetaProperty(meta, property, range, loc);
    }
    createProgram(sourceType, body, range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new Program(sourceType, body, range, loc);
    }
    createClassExpression(body, decorators, id, superClass, range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new ClassExpression(body, decorators, id, superClass, range, loc);
    }
    createClassStaticBlockDeclaration(body, range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new StaticBlock(body, range, loc);
    }
    createMethodSignature(kind, key, value, decorators, computed, isStatic, range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new MethodDefinition(kind, key, value, decorators, computed, isStatic, range, loc);
    }
    createPropertySignature(key, decorators, computed, isStatic, value, range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new PropertyDefinition(key, decorators, computed, isStatic, value, range, loc);
    }
    createClassBody(body, range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new ClassBody(body, range, loc);
    }
    createNamespaceExportDeclaration(specifiers, declaration, source, attributes, range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new ExportNamedDeclaration(specifiers, declaration, source, attributes, range, loc);
    }
    createExportSpecifier(local, exported, range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new ExportSpecifier(local, exported, range, loc);
    }
    createImportSpecifier(local, imported, range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new ImportSpecifier(local, imported, range, loc);
    }
    createImportDeclaration(source, specifiers, attributes, range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new ImportDeclaration(source, specifiers, attributes, range, loc);
    }
    createImportNamespaceSpecifier(local, range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new ImportNamespaceSpecifier(local, range, loc);
    }
    createImportDefaultSpecifier(local, range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new ImportDefaultSpecifier(local, range, loc);
    }
    createImportExpression(source, attributes, range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new ImportExpression(source, attributes, range, loc);
    }
    createImportWithEntry(key, value, range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new ImportAttribute(key, value, range, loc);
    }
    createExportDefault(declaration, range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new ExportDefaultDeclaration(declaration, range, loc);
    }
    createExportAllDeclaration(source, exported, attributes, range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new ExportAllDeclaration(source, exported, attributes, range, loc);
    }
    createInfixExpression(op, left, right, range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
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
                return new AssignmentExpression(op, left, right, range, loc);
            case '&&':
            case '||':
            case '??':
                return new LogicalExpression(op, left, right, range, loc);
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
                return new BinaryExpression(op, left, right, range, loc);
            default:
                throw new Error(`Not Supported Operator: ${op}`);
        }
    }
    createUnaryExpression(operator, expression, range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        switch (operator) {
            case '++':
            case '--':
                return new UpdateExpression(operator, expression, true, range, loc);
            case '+':
            case '-':
            case '!':
            case '~':
            case 'typeof':
            case 'void':
            case 'delete':
                return new UnaryExpression(operator, expression, range, loc);
            case 'await':
                return new AwaitExpression(expression, range, loc);
            default:
                throw new Error(`${operator} is not prefix operator`);
        }
    }
    createUpdateExpression(operator, argument, prefix, range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new UpdateExpression(operator, argument, prefix, range, loc);
    }
    createAwaitExpression(argument, range) {
        const loc = this.rangeFactory?.createSourcePosition(range);
        return new AwaitExpression(argument, range, loc);
    }
    isIdentifier(node) {
        return node instanceof Identifier || node?.type === 'Identifier';
    }
    isObjectExpression(node) {
        return node instanceof ObjectExpression || node?.type === 'ObjectExpression';
    }
    isArrayExpression(node) {
        return node instanceof ArrayExpression || node?.type === 'ArrayExpression';
    }
    isObjectPattern(node) {
        return node instanceof ObjectPattern || node?.type === 'ObjectPattern';
    }
    isArrayPattern(node) {
        return node instanceof ArrayPattern || node?.type === 'ArrayPattern';
    }
    isAssignmentPattern(node) {
        return node instanceof AssignmentPattern || node?.type === 'AssignmentPattern';
    }
    isPattern(node) {
        return this.isObjectPattern(node) || this.isArrayPattern(node) || this.isAssignmentPattern(node);
    }
    canBePattern(node) {
        return this.isObjectExpression(node) || this.isArrayExpression(node);
    }
    isProperty(node) {
        return node instanceof Property || node?.type === 'Property';
    }
    isMemberExpression(node) {
        return node instanceof MemberExpression || node?.type === 'MemberExpression';
    }
    isPropertyOrMemberExpression(node) {
        return this.isProperty(node) || this.isMemberExpression(node);
    }
    isEmptyStatement(node) {
        return node instanceof EmptyStatement || node?.type === 'EmptyStatement';
    }
    isSequenceExpression(node) {
        return node instanceof SequenceExpression || node?.type === 'SequenceExpression';
    }
    isSuper(node) {
        return node instanceof Super || node?.type === 'Super';
    }
    isAssignmentExpression(node) {
        return node instanceof AssignmentExpression || node?.type === 'AssignmentExpression';
    }
    isGroupingExpression(node) {
        return node instanceof GroupingExpression || node?.type === 'GroupingExpression';
    }
    isSpreadElement(node) {
        return node instanceof SpreadElement || node?.type === 'SpreadElement';
    }
}
//# sourceMappingURL=factory.js.map