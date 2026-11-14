import { __esDecorate, __runInitializers } from "../../../../tslib@2.9.1/tslib.es6.js";
import { AbstractExpressionNode } from '../abstract.js';
import { Deserializer } from '../deserialize/deserialize.js';
import { SpreadElement } from '../computing/spread.js';
import { MemberExpression } from '../definition/member.js';
/**
 * pipeline ('|>') operator support syntax:
 *  param |> func
 *  param |> func:arg1:arg2:arg3
 *  param |> func:arg1:?:arg3
 *  param |> func:arg1:?:arg3:?:arg5
 *  param |> func:arg1:...?:arg3
 *
 *  param |> func(arg1, arg2, arg3)
 *  param |> func(arg1, ?, arg3)
 *  param |> func(arg1, ?, arg3, arg4, ?, arg6)
 */
let PipelineExpression = (() => {
    let _classDecorators = [Deserializer('PipelineExpression')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AbstractExpressionNode;
    var PipelineExpression = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            PipelineExpression = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        left;
        right;
        static fromJSON(node, deserializer) {
            return new PipelineExpression(deserializer(node.left), deserializer(node.right), node.arguments.map(arg => typeof arg === 'string' ? arg : deserializer(arg)), node.range, node.loc);
        }
        static visit(node, visitNode) {
            visitNode(node.left);
            visitNode(node.right);
            node.arguments.forEach(arg => typeof arg == 'object' && visitNode(arg));
        }
        arguments;
        constructor(left, right, params = [], range, loc) {
            super(range, loc);
            this.left = left;
            this.right = right;
            this.arguments = params;
        }
        getLeft() {
            return this.left;
        }
        getRight() {
            return this.right;
        }
        getArguments() {
            return this.arguments;
        }
        set(stack, value) {
            throw new Error(`PipelineNode#set() has no implementation.`);
        }
        get(stack) {
            const paramValue = this.left.get(stack);
            const parameters = [];
            let indexed = false;
            for (const arg of this.arguments) {
                if (arg === '?') {
                    parameters.push(paramValue);
                    indexed = true;
                }
                else if (arg === '...?') {
                    parameters.push(...paramValue);
                    indexed = true;
                }
                else {
                    if (arg instanceof SpreadElement) {
                        const paramScope = stack.pushBlockScopeFor(parameters);
                        arg.get(stack);
                        stack.clearTo(paramScope);
                    }
                    else {
                        parameters.push(arg.get(stack));
                    }
                }
            }
            if (!indexed) {
                parameters.unshift(paramValue);
            }
            const funCallBack = this.right.get(stack);
            if (this.right instanceof MemberExpression) {
                const thisArg = this.right.getObject().get(stack);
                return funCallBack.apply(thisArg, parameters);
            }
            return funCallBack(...parameters);
        }
        dependency(computed) {
            return this.right.dependency(computed)
                .concat(this.left.dependency(computed), this.arguments.filter(arg => (arg !== '?' && arg !== '...?'))
                .flatMap(param => param.dependency(computed)));
        }
        dependencyPath(computed) {
            return this.right.dependencyPath(computed)
                .concat(this.left.dependencyPath(computed), this.arguments.filter(arg => (arg !== '?' && arg !== '...?'))
                .flatMap(param => param.dependencyPath(computed)));
        }
        toString() {
            return `${this.left.toString()} |> ${this.right.toString()}${this.arguments.flatMap(arg => `:${arg.toString()}`).join('')}`;
        }
        toJson() {
            return {
                left: this.left.toJSON(),
                right: this.right.toJSON(),
                arguments: this.arguments.map(arg => typeof arg === 'string' ? arg : arg.toJSON())
            };
        }
    };
    return PipelineExpression = _classThis;
})();
export { PipelineExpression };
//# sourceMappingURL=pipeline.js.map