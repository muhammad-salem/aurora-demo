import { __esDecorate, __runInitializers } from "../../../../tslib@2.9.1/tslib.es6.js";
import { AbstractExpressionNode, AwaitPromise, ReturnValue, YieldDelegateValue, YieldValue } from '../abstract.js';
import { Deserializer } from '../deserialize/deserialize.js';
import { TerminateReturnType } from '../statement/control/terminate.js';
import { RestElement } from '../computing/rest.js';
let AssignmentPattern = (() => {
    let _classDecorators = [Deserializer('AssignmentPattern')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AbstractExpressionNode;
    var AssignmentPattern = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AssignmentPattern = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        left;
        right;
        static fromJSON(node, deserializer) {
            return new AssignmentPattern(deserializer(node.left), deserializer(node.right), node.range, node.loc);
        }
        static visit(node, visitNode) {
            visitNode(node.left);
            visitNode(node.right);
        }
        constructor(left, right, range, loc) {
            super(range, loc);
            this.left = left;
            this.right = right;
        }
        getLeft() {
            return this.left;
        }
        getRight() {
            return this.right;
        }
        set(stack, value) {
            throw new Error('AssignmentPattern#set() has no implementation.');
        }
        get(stack) {
            throw new Error('AssignmentPattern#get() has no implementation.');
        }
        declareVariable(stack, value) {
            if (value === undefined) {
                value = this.right.get(stack);
            }
            this.left.declareVariable(stack, value);
        }
        dependency(computed) {
            return [this.right];
        }
        dependencyPath(computed) {
            return this.right.dependencyPath(computed) || [];
        }
        toString() {
            return `${this.left.toString()} = ${this.right.toString()}`;
        }
        toJson() {
            return {
                left: this.left.toJSON(),
                right: this.right.toJSON()
            };
        }
    };
    return AssignmentPattern = _classThis;
})();
export { AssignmentPattern };
let FunctionExpression = (() => {
    let _classDecorators = [Deserializer('FunctionExpression')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AbstractExpressionNode;
    var FunctionExpression = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            FunctionExpression = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        params;
        body;
        async;
        generator;
        id;
        static fromJSON(node, deserializer) {
            return new FunctionExpression(node.params.map(deserializer), deserializer(node.body), node.async, node.generator, node.id ? deserializer(node.id) : void 0, node.range, node.loc);
        }
        static visit(node, visitNode) {
            node.id && visitNode(node.id);
            node.params.forEach(visitNode);
            visitNode(node.body);
        }
        constructor(params, body, async, generator, id, range, loc) {
            super(range, loc);
            this.params = params;
            this.body = body;
            this.async = async;
            this.generator = generator;
            this.id = id;
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
        defineFunctionArguments(stack, args) {
            const rest = this.params[this.params.length - 1] instanceof RestElement;
            const limit = rest ? this.params.length - 1 : this.params.length;
            for (let i = 0; i < limit; i++) {
                this.params[i].declareVariable(stack, args[i]);
            }
            if (rest) {
                this.params[limit].declareVariable(stack, args.slice(limit));
            }
        }
        get(stack) {
            // freeze scopes
            stack = stack.copyStack();
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
        getAsyncFunction(gStack) {
            const self = this;
            return async function (...args) {
                const stack = gStack.copyStack();
                stack.pushBlockScope();
                stack.declareVariable('this', this);
                stack.declareVariable('super', this?.constructor?.prototype);
                self.defineFunctionArguments(stack, args);
                let returnValue;
                const statements = self.body.getBody();
                for (const statement of statements) {
                    returnValue = statement.get(stack);
                    if (stack.awaitPromise?.length > 0) {
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
                        }
                        return returnValue;
                    }
                }
            };
        }
        getGeneratorFunction(gStack) {
            const self = this;
            return function* (...args) {
                const stack = gStack.copyStack();
                stack.pushBlockScope();
                stack.declareVariable('this', this);
                stack.declareVariable('super', this?.constructor?.prototype);
                self.defineFunctionArguments(stack, args);
                let returnValue;
                const statements = self.body.getBody();
                for (const statement of statements) {
                    returnValue = statement.get(stack);
                    if (returnValue instanceof ReturnValue) {
                        return returnValue.value;
                    }
                    else if (returnValue instanceof YieldValue) {
                        yield returnValue.value;
                    }
                    else if (returnValue instanceof YieldDelegateValue) {
                        yield* returnValue.value;
                    }
                }
            };
        }
        getAsyncGeneratorFunction(gStack) {
            const self = this;
            return async function* (...args) {
                const stack = gStack.copyStack();
                stack.pushBlockScope();
                stack.declareVariable('this', this);
                stack.declareVariable('super', this?.constructor?.prototype);
                self.defineFunctionArguments(stack, args);
                let returnValue;
                const statements = self.body.getBody();
                for (const statement of statements) {
                    returnValue = statement.get(stack);
                    if (stack.awaitPromise?.length > 0) {
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
            };
        }
        getFunction(gStack) {
            const self = this;
            return function (...args) {
                const stack = gStack.copyStack();
                stack.pushBlockScope();
                stack.declareVariable('this', this);
                stack.declareVariable('super', this?.constructor?.prototype);
                self.defineFunctionArguments(stack, args);
                let returnValue;
                const statements = self.body.getBody();
                for (const statement of statements) {
                    returnValue = statement.get(stack);
                    if (returnValue instanceof ReturnValue) {
                        return returnValue.value;
                    }
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
    return FunctionExpression = _classThis;
})();
export { FunctionExpression };
let FunctionDeclaration = (() => {
    let _classDecorators = [Deserializer('FunctionDeclaration')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = FunctionExpression;
    var FunctionDeclaration = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            FunctionDeclaration = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        static fromJSON(node, deserializer) {
            return new FunctionDeclaration(node.params.map(deserializer), deserializer(node.body), node.async, node.generator, deserializer(node.id), node.range, node.loc);
        }
        static visit(node, visitNode) {
            visitNode(node.id);
            node.params.forEach(visitNode);
            visitNode(node.body);
        }
        constructor(params, body, async, generator, id, range, loc) {
            super(params, body, async, generator, id, range, loc);
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
    return FunctionDeclaration = _classThis;
})();
export { FunctionDeclaration };
let ArrowFunctionExpression = (() => {
    let _classDecorators = [Deserializer('ArrowFunctionExpression')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AbstractExpressionNode;
    var ArrowFunctionExpression = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ArrowFunctionExpression = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        params;
        body;
        expression;
        async;
        static fromJSON(node, deserializer) {
            return new ArrowFunctionExpression(node.params.map(deserializer), Array.isArray(node.body)
                ? node.body.map(deserializer)
                : deserializer(node.body), node.expression, node.async, node.range, node.loc);
        }
        static visit(node, visitNode) {
            node.params.forEach(visitNode);
            Array.isArray(node.body)
                ? node.body.forEach(visitNode)
                : visitNode(node.body);
        }
        generator = false;
        constructor(params, body, expression, async, range, loc) {
            super(range, loc);
            this.params = params;
            this.body = body;
            this.expression = expression;
            this.async = async;
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
                this.params[i].declareVariable(stack, args[i]);
            }
            if (rest) {
                this.params[limit].declareVariable(stack, args.slice(limit));
            }
        }
        get(stack) {
            // freeze stack
            stack = stack.copyStack();
            return this.async ? this.getAsyncArrowFunction(stack) : this.getArrowFunction(stack);
        }
        getAsyncArrowFunction(gStack) {
            async (...args) => {
                const stack = gStack.copyStack();
                stack.pushBlockScope();
                this.setParameter(stack, args);
                let returnValue;
                const statements = Array.isArray(this.body) ? this.body : [this.body];
                for (const state of statements) {
                    returnValue = state.get(stack);
                    if (stack.awaitPromise?.length > 0) {
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
                            return await returnValue.promise;
                        }
                    }
                }
                if (this.expression) {
                    return returnValue;
                }
            };
        }
        getArrowFunction(gStack) {
            return (...args) => {
                const stack = gStack.copyStack();
                stack.pushBlockScope();
                this.setParameter(stack, args);
                let returnValue;
                const statements = Array.isArray(this.body) ? this.body : [this.body];
                for (const statement of statements) {
                    returnValue = statement.get(stack);
                    if (returnValue instanceof ReturnValue) {
                        return returnValue.value;
                    }
                }
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
    return ArrowFunctionExpression = _classThis;
})();
export { ArrowFunctionExpression };
//# sourceMappingURL=function.js.map