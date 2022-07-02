var Param_1, FunctionExpression_1, FunctionDeclaration_1, ArrowFunctionExpression_1;
import { __decorate, __metadata } from "../../../../tslib/tslib.es6.js";
import { Scope } from '../../scope/scope.js';
import { AbstractExpressionNode, AwaitPromise, ReturnValue, YieldDelegateValue, YieldValue } from '../abstract.js';
import { Deserializer } from '../deserialize/deserialize.js';
import { Identifier } from './values.js';
import { TerminateReturnType } from '../statement/control/terminate.js';
import { RestElement } from '../computing/rest.js';
let Param = Param_1 = class Param extends AbstractExpressionNode {
    constructor(identifier, defaultValue) {
        super();
        this.identifier = identifier;
        this.defaultValue = defaultValue;
    }
    static fromJSON(node, deserializer) {
        return new Param_1(deserializer(node.identifier), node.defaultValue ? deserializer(node.defaultValue) : void 0);
    }
    static visit(node, visitNode) {
        visitNode(node.identifier);
        node.defaultValue && visitNode(node.defaultValue);
    }
    getIdentifier() {
        return this.identifier;
    }
    getDefaultValue() {
        return this.defaultValue;
    }
    shareVariables(scopeList) {
        this.defaultValue?.shareVariables(scopeList);
    }
    set(stack, value) {
        this.identifier.declareVariable?.(stack, value);
    }
    get(stack) {
        throw new Error('Param#get() has no implementation.');
    }
    dependency(computed) {
        return this.defaultValue ? [this.defaultValue] : [];
    }
    dependencyPath(computed) {
        return this.defaultValue?.dependencyPath(computed) || [];
    }
    toString() {
        let init = this.defaultValue ? (' = ' + this.defaultValue.toString()) : '';
        return this.identifier.toString() + init;
    }
    toJson() {
        return {
            identifier: this.identifier.toJSON(),
            defaultValue: this.defaultValue?.toJSON()
        };
    }
};
Param = Param_1 = __decorate([
    Deserializer('Param'),
    __metadata("design:paramtypes", [Object, Object])
], Param);
export { Param };
export class BaseFunctionExpression extends AbstractExpressionNode {
    shareVariables(scopeList) {
        this.sharedVariables = scopeList;
    }
    initFunctionScope(stack) {
        const scope = Scope.blockScope();
        const innerScopes = this.sharedVariables ? this.sharedVariables.slice() : [];
        innerScopes.push(scope);
        innerScopes.forEach(variableScope => stack.pushScope(variableScope));
        return innerScopes;
    }
    clearFunctionScope(stack, innerScopes) {
        stack.clearTo(innerScopes[0]);
    }
}
let FunctionExpression = FunctionExpression_1 = class FunctionExpression extends BaseFunctionExpression {
    constructor(params, body, async, generator, id) {
        super();
        this.params = params;
        this.body = body;
        this.async = async;
        this.generator = generator;
        this.id = id;
    }
    static fromJSON(node, deserializer) {
        return new FunctionExpression_1(node.params.map(deserializer), deserializer(node.body), node.async, node.generator, node.id ? deserializer(node.id) : void 0);
    }
    static visit(node, visitNode) {
        node.id && visitNode(node.id);
        node.params.forEach(visitNode);
        visitNode(node.body);
    }
    getParams() {
        return this.params;
    }
    getBody() {
        return this.body;
    }
    getGenerator() {
        return this.generator;
    }
    getId() {
        return this.id;
    }
    getAsync() {
        return this.async;
    }
    set(stack, value) {
        throw new Error(`${this.constructor.name}#set() has no implementation.`);
    }
    setParameter(stack, args) {
        const rest = this.params[this.params.length - 1] instanceof RestElement;
        const limit = rest ? this.params.length - 1 : this.params.length;
        for (let i = 0; i < limit; i++) {
            this.params[i].set(stack, args[i]);
        }
        if (rest) {
            this.params[limit].set(stack, args.slice(limit));
        }
    }
    get(stack) {
        let func;
        if (this.async && this.generator) {
            func = this.getAsyncGeneratorFunction(stack);
        }
        else if (this.async) {
            func = this.getAsyncFunction(stack);
        }
        else if (this.generator) {
            func = this.getGeneratorFunction(stack);
        }
        else {
            func = this.getFunction(stack);
        }
        // this.id?.declareVariable(stack, func);
        return func;
    }
    getAsyncFunction(stack) {
        const self = this;
        return async function (...args) {
            const innerScopes = self.initFunctionScope(stack);
            stack.declareVariable('this', this);
            self.setParameter(stack, args);
            let returnValue;
            const statements = self.body.getBody();
            for (const statement of statements) {
                statement.shareVariables(innerScopes);
                returnValue = statement.get(stack);
                if (stack.awaitPromise.length > 0) {
                    for (const awaitRef of stack.awaitPromise) {
                        const awaitValue = await awaitRef.promise;
                        if (awaitRef.declareVariable) {
                            awaitRef.node.declareVariable(stack, awaitValue);
                        }
                        else {
                            awaitRef.node.set(stack, awaitValue);
                        }
                    }
                    stack.awaitPromise.splice(0);
                }
                else if (stack.forAwaitAsyncIterable) {
                    for await (let iterator of stack.forAwaitAsyncIterable.iterable) {
                        const result = stack.forAwaitAsyncIterable.forAwaitBody(iterator);
                        if (result instanceof TerminateReturnType) {
                            if (result.type === 'continue') {
                                continue;
                            }
                            else {
                                break;
                            }
                        }
                        else if (result instanceof ReturnValue) {
                            returnValue = result;
                            break;
                        }
                    }
                    stack.forAwaitAsyncIterable = undefined;
                }
                if (returnValue instanceof ReturnValue) {
                    returnValue = returnValue.value;
                    if (returnValue instanceof AwaitPromise) {
                        returnValue = await returnValue.promise;
                        self.clearFunctionScope(stack, innerScopes);
                        return returnValue;
                    }
                }
            }
            self.clearFunctionScope(stack, innerScopes);
        };
    }
    getGeneratorFunction(stack) {
        const self = this;
        return function* (...args) {
            const innerScopes = self.initFunctionScope(stack);
            stack.declareVariable('this', this);
            self.setParameter(stack, args);
            let returnValue;
            const statements = self.body.getBody();
            for (const statement of statements) {
                statement.shareVariables(innerScopes);
                returnValue = statement.get(stack);
                if (returnValue instanceof ReturnValue) {
                    self.clearFunctionScope(stack, innerScopes);
                    return returnValue.value;
                }
                else if (returnValue instanceof YieldValue) {
                    yield returnValue.value;
                }
                else if (returnValue instanceof YieldDelegateValue) {
                    yield* returnValue.value;
                }
            }
            self.clearFunctionScope(stack, innerScopes);
        };
    }
    getAsyncGeneratorFunction(stack) {
        const self = this;
        return async function* (...args) {
            const innerScopes = self.initFunctionScope(stack);
            stack.declareVariable('this', this);
            self.setParameter(stack, args);
            let returnValue;
            const statements = self.body.getBody();
            for (const statement of statements) {
                statement.shareVariables(innerScopes);
                returnValue = statement.get(stack);
                if (stack.awaitPromise.length > 0) {
                    for (const awaitRef of stack.awaitPromise) {
                        const awaitValue = await awaitRef.promise;
                        if (awaitRef.declareVariable) {
                            awaitRef.node.declareVariable(stack, awaitValue);
                        }
                        else {
                            awaitRef.node.set(stack, awaitValue);
                        }
                    }
                    stack.awaitPromise.splice(0);
                }
                else if (stack.forAwaitAsyncIterable) {
                    for await (let iterator of stack.forAwaitAsyncIterable.iterable) {
                        const result = stack.forAwaitAsyncIterable.forAwaitBody(iterator);
                        if (result instanceof TerminateReturnType) {
                            if (result.type === 'continue') {
                                continue;
                            }
                            else {
                                break;
                            }
                        }
                        else if (result instanceof ReturnValue) {
                            self.clearFunctionScope(stack, innerScopes);
                            returnValue = returnValue.value;
                            if (returnValue instanceof AwaitPromise) {
                                return await returnValue.promise;
                            }
                            else if (returnValue instanceof YieldValue) {
                                yield returnValue.value;
                            }
                            else if (returnValue instanceof YieldDelegateValue) {
                                yield* returnValue.value;
                            }
                            return returnValue;
                        }
                    }
                    stack.forAwaitAsyncIterable = undefined;
                }
                if (returnValue instanceof ReturnValue) {
                    returnValue = returnValue.value;
                    if (returnValue instanceof AwaitPromise) {
                        return await returnValue.promise;
                    }
                    return returnValue;
                }
            }
            self.clearFunctionScope(stack, innerScopes);
        };
    }
    getFunction(stack) {
        const self = this;
        return function (...args) {
            const innerScopes = self.initFunctionScope(stack);
            stack.declareVariable('this', this);
            self.setParameter(stack, args);
            let returnValue;
            const statements = self.body.getBody();
            for (const statement of statements) {
                statement.shareVariables(innerScopes);
                returnValue = statement.get(stack);
                if (returnValue instanceof ReturnValue) {
                    self.clearFunctionScope(stack, innerScopes);
                    return returnValue.value;
                }
            }
            self.clearFunctionScope(stack, innerScopes);
        };
    }
    dependency(computed) {
        return this.params.flatMap(param => param.dependency());
    }
    dependencyPath(computed) {
        return this.params.flatMap(param => param.dependencyPath(computed));
    }
    toString() {
        let declare = 'function ';
        if (this.async && this.generator) {
            declare = 'async function* ';
        }
        else if (this.async) {
            declare = 'async function ';
        }
        else if (this.generator) {
            declare = 'function* ';
        }
        return `${declare}${this.id?.toString() || ''}${this.paramsAndBodyToString()}`;
    }
    paramsAndBodyToString() {
        return `(${this.params.map(param => param.toString()).join(', ')}) ${this.body.toString()}`;
    }
    toJson() {
        return {
            params: this.params.map(param => param.toJSON()),
            body: this.body.toJSON(),
            async: this.async,
            id: this.id?.toJSON(),
            generator: this.generator
        };
    }
};
FunctionExpression = FunctionExpression_1 = __decorate([
    Deserializer('FunctionExpression'),
    __metadata("design:paramtypes", [Array, Object, Boolean, Boolean, Identifier])
], FunctionExpression);
export { FunctionExpression };
let FunctionDeclaration = FunctionDeclaration_1 = class FunctionDeclaration extends FunctionExpression {
    static fromJSON(node, deserializer) {
        return new FunctionDeclaration_1(node.params.map(deserializer), deserializer(node.body), node.async, node.generator, deserializer(node.id));
    }
    static visit(node, visitNode) {
        visitNode(node.id);
        node.params.forEach(visitNode);
        visitNode(node.body);
    }
    constructor(params, body, async, generator, id) {
        super(params, body, async, generator, id);
    }
    get(stack) {
        const func = super.get(stack);
        this.declareVariable(stack, func);
        return func;
    }
    declareVariable(stack, value) {
        this.id.declareVariable(stack, value);
    }
};
FunctionDeclaration = FunctionDeclaration_1 = __decorate([
    Deserializer('FunctionDeclaration'),
    __metadata("design:paramtypes", [Array, Object, Boolean, Boolean, Identifier])
], FunctionDeclaration);
export { FunctionDeclaration };
let ArrowFunctionExpression = ArrowFunctionExpression_1 = class ArrowFunctionExpression extends BaseFunctionExpression {
    constructor(params, body, expression, async) {
        super();
        this.params = params;
        this.body = body;
        this.expression = expression;
        this.async = async;
        this.generator = false;
    }
    static fromJSON(node, deserializer) {
        return new ArrowFunctionExpression_1(node.params.map(deserializer), Array.isArray(node.body)
            ? node.body.map(deserializer)
            : deserializer(node.body), node.expression, node.async);
    }
    static visit(node, visitNode) {
        node.params.forEach(visitNode);
        Array.isArray(node.body)
            ? node.body.forEach(visitNode)
            : visitNode(node.body);
    }
    getParams() {
        return this.params;
    }
    getBody() {
        return this.body;
    }
    getExpression() {
        return this.expression;
    }
    set(stack, value) {
        throw new Error('ArrowFunctionExpression#set() has no implementation.');
    }
    setParameter(stack, args) {
        const rest = this.params[this.params.length - 1] instanceof RestElement;
        const limit = rest ? this.params.length - 1 : this.params.length;
        for (let i = 0; i < limit; i++) {
            this.params[i].set(stack, args[i]);
        }
        if (rest) {
            this.params[limit].set(stack, args.slice(limit));
        }
    }
    get(stack) {
        return this.async ? this.getAsyncArrowFunction(stack) : this.getArrowFunction(stack);
    }
    getAsyncArrowFunction(stack) {
        async (...args) => {
            const innerScopes = this.initFunctionScope(stack);
            this.setParameter(stack, args);
            let returnValue;
            const statements = Array.isArray(this.body) ? this.body : [this.body];
            for (const state of statements) {
                state.shareVariables(innerScopes);
                returnValue = state.get(stack);
                if (stack.awaitPromise.length > 0) {
                    for (const awaitRef of stack.awaitPromise) {
                        const awaitValue = await awaitRef.promise;
                        if (awaitRef.declareVariable) {
                            awaitRef.node.declareVariable(stack, awaitValue);
                        }
                        else {
                            awaitRef.node.set(stack, awaitValue);
                        }
                    }
                    stack.awaitPromise.splice(0);
                }
                else if (stack.forAwaitAsyncIterable) {
                    for await (let iterator of stack.forAwaitAsyncIterable.iterable) {
                        const result = stack.forAwaitAsyncIterable.forAwaitBody(iterator);
                        if (result instanceof TerminateReturnType) {
                            if (result.type === 'continue') {
                                continue;
                            }
                            else {
                                break;
                            }
                        }
                        else if (result instanceof ReturnValue) {
                            returnValue = result;
                            break;
                        }
                    }
                    stack.forAwaitAsyncIterable = undefined;
                }
                if (returnValue instanceof ReturnValue) {
                    returnValue = returnValue.value;
                    if (returnValue instanceof AwaitPromise) {
                        this.clearFunctionScope(stack, innerScopes);
                        return await returnValue.promise;
                    }
                }
            }
            this.clearFunctionScope(stack, innerScopes);
            if (this.expression) {
                return returnValue;
            }
        };
    }
    getArrowFunction(stack) {
        return (...args) => {
            const innerScopes = this.initFunctionScope(stack);
            this.setParameter(stack, args);
            let returnValue;
            const statements = Array.isArray(this.body) ? this.body : [this.body];
            for (const statement of statements) {
                statement.shareVariables(innerScopes);
                returnValue = statement.get(stack);
                if (returnValue instanceof ReturnValue) {
                    this.clearFunctionScope(stack, innerScopes);
                    return returnValue.value;
                }
            }
            this.clearFunctionScope(stack, innerScopes);
            if (this.expression) {
                return returnValue;
            }
        };
    }
    dependency(computed) {
        return this.params.flatMap(param => param.dependency());
    }
    dependencyPath(computed) {
        return this.params.flatMap(param => param.dependencyPath(computed));
    }
    toString() {
        let str = this.async ? 'async ' : '';
        if (this.params.length === 1) {
            str += this.params[0].toString();
        }
        else {
            str += `(${this.params.map(param => param.toString()).join(', ')})`;
        }
        str += ' => ';
        str += this.body.toString();
        return str;
    }
    toJson() {
        return {
            params: this.params.map(param => param.toJSON()),
            body: Array.isArray(this.body) ? this.body.map(item => item.toJSON()) : this.body.toJSON(),
            expression: true,
            async: this.async,
            generator: this.generator
        };
    }
};
ArrowFunctionExpression = ArrowFunctionExpression_1 = __decorate([
    Deserializer('ArrowFunctionExpression'),
    __metadata("design:paramtypes", [Array, Object, Boolean, Boolean])
], ArrowFunctionExpression);
export { ArrowFunctionExpression };
//# sourceMappingURL=function.js.map