var Param_1, FunctionExpression_1, FunctionDeclaration_1, ArrowFunctionExpression_1;
import { __decorate, __metadata } from "../../../../tslib/tslib.es6.js";
import { Scope } from '../../scope/scope.js';
import { AbstractExpressionNode, AwaitPromise, ReturnValue, YieldDelegateValue, YieldValue } from '../abstract.js';
import { Deserializer } from '../deserialize/deserialize.js';
import { BreakStatement, ContinueStatement } from '../statement/control/terminate.js';
export var FunctionKind;
(function (FunctionKind) {
    FunctionKind["NORMAL"] = "NORMAL";
    FunctionKind["ASYNC"] = "ASYNC";
    FunctionKind["GENERATOR"] = "GENERATOR";
    FunctionKind["ASYNC_GENERATOR"] = "ASYNC_GENERATOR";
    FunctionKind["CONCISE"] = "CONCISE";
    FunctionKind["ASYNC_CONCISE"] = "ASYNC_CONCISE";
    FunctionKind["CONCISE_GENERATOR"] = "CONCISE_GENERATOR";
    FunctionKind["ASYNC_CONCISE_GENERATOR"] = "ASYNC_CONCISE_GENERATOR";
    FunctionKind["STATIC_CONCISE"] = "STATIC_CONCISE";
    FunctionKind["STATIC_ASYNC_CONCISE"] = "STATIC_ASYNC_CONCISE";
    FunctionKind["STATIC_CONCISE_GENERATOR"] = "STATIC_CONCISE_GENERATOR";
    FunctionKind["STATIC_ASYNC_CONCISE_GENERATOR"] = "STATIC_ASYNC_CONCISE_GENERATOR";
    FunctionKind["DERIVED_CONSTRUCTOR"] = "DERIVED_CONSTRUCTOR";
    FunctionKind["BASE_CONSTRUCTOR"] = "BASE_CONSTRUCTOR";
})(FunctionKind || (FunctionKind = {}));
export var ArrowFunctionType;
(function (ArrowFunctionType) {
    ArrowFunctionType["NORMAL"] = "NORMAL";
    ArrowFunctionType["ASYNC"] = "ASYNC";
})(ArrowFunctionType || (ArrowFunctionType = {}));
let Param = Param_1 = class Param extends AbstractExpressionNode {
    constructor(identifier, defaultValue) {
        super();
        this.identifier = identifier;
        this.defaultValue = defaultValue;
    }
    static fromJSON(node, deserializer) {
        return new Param_1(deserializer(node.identifier), node.defaultValue ? deserializer(node.defaultValue) : void 0);
    }
    static visit(node, visitNode, visitNodeList) {
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
        this.identifier.declareVariable?.(stack, 'function', value);
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
export class FunctionBaseExpression extends AbstractExpressionNode {
    shareVariables(scopeList) {
        this.sharedVariables = scopeList;
    }
    initFunctionScope(stack) {
        const scope = Scope.functionScope();
        const innerScopes = this.sharedVariables ? this.sharedVariables.slice() : [];
        innerScopes.push(scope);
        innerScopes.forEach(variableScope => stack.pushScope(variableScope));
        return innerScopes;
    }
    clearFunctionScope(stack, innerScopes) {
        stack.clearTo(innerScopes[0]);
    }
}
let FunctionExpression = FunctionExpression_1 = class FunctionExpression extends FunctionBaseExpression {
    constructor(params, body, kind, id, rest, generator) {
        super();
        this.params = params;
        this.body = body;
        this.kind = kind;
        this.id = id;
        this.rest = rest;
        this.generator = generator;
    }
    static fromJSON(node, deserializer) {
        return new FunctionExpression_1(node.params.map(deserializer), node.body.map(deserializer), FunctionKind[node.kind], node.id ? deserializer(node.id) : void 0, node.rest, node.generator);
    }
    static visit(node, visitNode, visitNodeList) {
        node.id && visitNode(node.id);
        visitNodeList(node.params);
        visitNodeList(node.body);
    }
    getParams() {
        return this.params;
    }
    getBody() {
        return this.body;
    }
    getKind() {
        return this.kind;
    }
    getId() {
        return this.id;
    }
    getRest() {
        return this.rest;
    }
    set(stack, value) {
        throw new Error(`${this.constructor.name}#set() has no implementation.`);
    }
    setParameter(stack, args) {
        const limit = this.rest ? this.params.length - 1 : this.params.length;
        for (let i = 0; i < limit; i++) {
            this.params[i].set(stack, args[i]);
        }
        if (this.rest) {
            this.params[limit].set(stack, args.slice(limit));
        }
    }
    get(stack) {
        const self = this;
        let func;
        switch (this.kind) {
            case FunctionKind.ASYNC:
                func = async function (...args) {
                    const innerScopes = self.initFunctionScope(stack);
                    stack.declareVariable('function', 'this', this);
                    self.setParameter(stack, args);
                    let returnValue;
                    for (const statement of self.body) {
                        statement.shareVariables(innerScopes);
                        returnValue = statement.get(stack);
                        if (stack.awaitPromise.length > 0) {
                            for (const awaitRef of stack.awaitPromise) {
                                const awaitValue = await awaitRef.promise;
                                if (awaitRef.declareVariable) {
                                    awaitRef.node.declareVariable(stack, awaitRef.scopeType, awaitValue);
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
                                if (ContinueStatement.ContinueSymbol === result) {
                                    continue;
                                }
                                else if (BreakStatement.BreakSymbol === result) {
                                    break;
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
                break;
            case FunctionKind.GENERATOR:
                func = function* (...args) {
                    const innerScopes = self.initFunctionScope(stack);
                    stack.declareVariable('function', 'this', this);
                    self.setParameter(stack, args);
                    let returnValue;
                    for (const statement of self.body) {
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
                break;
            case FunctionKind.ASYNC_GENERATOR:
                func = async function* (...args) {
                    const innerScopes = self.initFunctionScope(stack);
                    stack.declareVariable('function', 'this', this);
                    self.setParameter(stack, args);
                    let returnValue;
                    for (const statement of self.body) {
                        statement.shareVariables(innerScopes);
                        returnValue = statement.get(stack);
                        if (stack.awaitPromise.length > 0) {
                            for (const awaitRef of stack.awaitPromise) {
                                const awaitValue = await awaitRef.promise;
                                if (awaitRef.declareVariable) {
                                    awaitRef.node.declareVariable(stack, awaitRef.scopeType, awaitValue);
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
                                if (ContinueStatement.ContinueSymbol === result) {
                                    continue;
                                }
                                else if (BreakStatement.BreakSymbol === result) {
                                    break;
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
                break;
            default:
            case FunctionKind.NORMAL:
                func = function (...args) {
                    const innerScopes = self.initFunctionScope(stack);
                    stack.declareVariable('function', 'this', this);
                    self.setParameter(stack, args);
                    let returnValue;
                    for (const statement of self.body) {
                        statement.shareVariables(innerScopes);
                        returnValue = statement.get(stack);
                        if (returnValue instanceof ReturnValue) {
                            self.clearFunctionScope(stack, innerScopes);
                            return returnValue.value;
                        }
                    }
                    self.clearFunctionScope(stack, innerScopes);
                };
                break;
        }
        this.id?.declareVariable(stack, 'block', func);
        return func;
    }
    dependency(computed) {
        return this.params.flatMap(param => param.dependency());
    }
    dependencyPath(computed) {
        return this.params.flatMap(param => param.dependencyPath(computed));
    }
    toString() {
        let declare;
        switch (this.kind) {
            case FunctionKind.ASYNC:
                declare = 'async function';
                break;
            case FunctionKind.GENERATOR:
                declare = 'function*';
                break;
            case FunctionKind.ASYNC_GENERATOR:
                declare = 'async function*';
                break;
            default:
            case FunctionKind.NORMAL:
                declare = 'function';
                break;
        }
        return `${declare} ${this.id?.toString() || ''}(${this.params.map((param, index, array) => {
            if (index === array.length - 1 && this.rest) {
                return '...' + param.toString();
            }
            else {
                return param.toString();
            }
        }).join(', ')}) ${this.body.toString()}`;
    }
    toJson() {
        return {
            params: this.params.map(param => param.toJSON()),
            body: this.body.map(statement => statement.toJSON()),
            kind: this.kind,
            id: this.id?.toJSON(),
            rest: this.rest,
            generator: this.generator
        };
    }
};
FunctionExpression = FunctionExpression_1 = __decorate([
    Deserializer('FunctionExpression'),
    __metadata("design:paramtypes", [Array, Array, String, Object, Boolean, Boolean])
], FunctionExpression);
export { FunctionExpression };
let FunctionDeclaration = FunctionDeclaration_1 = class FunctionDeclaration extends FunctionExpression {
    constructor(params, body, kind, id, rest, generator) {
        super(params, body, kind, id, rest, generator);
    }
    static fromJSON(node, deserializer) {
        return new FunctionDeclaration_1(node.params.map(deserializer), node.body.map(deserializer), FunctionKind[node.kind], deserializer(node.id), node.rest, node.generator);
    }
    static visit(node, visitNode, visitNodeList) {
        visitNode(node.id);
        visitNodeList(node.params);
        visitNodeList(node.body);
    }
};
FunctionDeclaration = FunctionDeclaration_1 = __decorate([
    Deserializer('FunctionDeclaration'),
    __metadata("design:paramtypes", [Array, Array, String, Object, Boolean, Boolean])
], FunctionDeclaration);
export { FunctionDeclaration };
let ArrowFunctionExpression = ArrowFunctionExpression_1 = class ArrowFunctionExpression extends FunctionBaseExpression {
    constructor(params, body, kind, rest, generator) {
        super();
        this.params = params;
        this.body = body;
        this.kind = kind;
        this.rest = rest;
        this.generator = generator;
    }
    static fromJSON(node, deserializer) {
        return new ArrowFunctionExpression_1(node.params.map(deserializer), Array.isArray(node.body)
            ? node.body.map(deserializer)
            : deserializer(node.body), ArrowFunctionType[node.kind], node.rest, node.generator);
    }
    static visit(node, visitNode, visitNodeList) {
        visitNodeList(node.params);
        Array.isArray(node.body)
            ? visitNodeList(node.body)
            : visitNode(node.body);
    }
    getParams() {
        return this.params;
    }
    getBody() {
        return this.body;
    }
    getRest() {
        return this.rest;
    }
    set(stack, value) {
        throw new Error('ArrowFunctionExpression#set() has no implementation.');
    }
    setParameter(stack, args) {
        const limit = this.rest ? this.params.length - 1 : this.params.length;
        for (let i = 0; i < limit; i++) {
            this.params[i].set(stack, args[i]);
        }
        if (this.rest) {
            this.params[limit].set(stack, args.slice(limit));
        }
    }
    get(stack) {
        let func;
        switch (this.kind) {
            case ArrowFunctionType.ASYNC:
                func = async (...args) => {
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
                                    awaitRef.node.declareVariable(stack, awaitRef.scopeType, awaitValue);
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
                                if (ContinueStatement.ContinueSymbol === result) {
                                    continue;
                                }
                                else if (BreakStatement.BreakSymbol === result) {
                                    break;
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
                    if (!Array.isArray(this.body)) {
                        return returnValue;
                    }
                };
                break;
            default:
            case ArrowFunctionType.NORMAL:
                func = (...args) => {
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
                    if (!Array.isArray(this.body)) {
                        return returnValue;
                    }
                };
                break;
        }
        return func;
    }
    dependency(computed) {
        return this.params.flatMap(param => param.dependency());
    }
    dependencyPath(computed) {
        return this.params.flatMap(param => param.dependencyPath(computed));
    }
    toString() {
        let str = this.kind === ArrowFunctionType.ASYNC ? 'async ' : '';
        if (this.params.length === 0) {
            str += '()';
        }
        else if (this.params.length === 1) {
            str += this.params[0].toString();
        }
        else {
            str += '(';
            str += this.params.map((param, index, array) => {
                if (index === array.length - 1 && this.rest) {
                    return '...' + param.toString();
                }
                else {
                    return param.toString();
                }
            }).join(', ');
            str += ')';
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
            kind: this.kind,
            rest: this.rest,
            generator: this.generator
        };
    }
};
ArrowFunctionExpression = ArrowFunctionExpression_1 = __decorate([
    Deserializer('ArrowFunctionExpression'),
    __metadata("design:paramtypes", [Array, Object, String, Boolean, Boolean])
], ArrowFunctionExpression);
export { ArrowFunctionExpression };
//# function.js.map