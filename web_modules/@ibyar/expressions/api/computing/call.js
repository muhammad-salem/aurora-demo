import { __esDecorate, __runInitializers } from "../../../../tslib/tslib.es6.js";
import { AbstractExpressionNode } from '../abstract.js';
import { SpreadElement } from './spread.js';
import { Deserializer } from '../deserialize/deserialize.js';
import { MemberExpression } from '../definition/member.js';
import { Identifier } from '../definition/values.js';
let CallExpression = (() => {
    let _classDecorators = [Deserializer('CallExpression')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AbstractExpressionNode;
    var CallExpression = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            CallExpression = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        callee;
        optional;
        static fromJSON(node, deserializer) {
            return new CallExpression(deserializer(node.callee), node.arguments.map(param => deserializer(param)), node.optional, node.range, node.loc);
        }
        static visit(node, visitNode) {
            visitNode(node.callee);
            node.arguments.forEach(visitNode);
        }
        arguments;
        constructor(callee, params, optional = false, range, loc) {
            super(range, loc);
            this.callee = callee;
            this.optional = optional;
            this.arguments = params;
        }
        getCallee() {
            return this.callee;
        }
        getArguments() {
            return this.arguments;
        }
        set(stack, value) {
            throw new Error(`CallExpression#set() has no implementation.`);
        }
        get(stack, thisContext) {
            const funCallBack = this.callee.get(stack);
            if (this.optional && (funCallBack === null || funCallBack === undefined)) {
                return;
            }
            const parameters = this.getCallParameters(stack);
            if (!thisContext && this.callee instanceof MemberExpression) {
                thisContext = this.callee.getObject().get(stack);
                if ((funCallBack === null || funCallBack === undefined) && this.callee.getOptional()) {
                    return;
                }
            }
            else if (!thisContext && this.callee instanceof Identifier) {
                thisContext = stack.findScope(this.callee.getName()).getContextProxy?.();
            }
            return funCallBack.apply(thisContext, parameters);
        }
        getCallParameters(stack) {
            const parameters = [];
            for (const arg of this.arguments) {
                if (arg instanceof SpreadElement) {
                    const paramScope = stack.pushBlockScopeFor(parameters);
                    arg.get(stack);
                    stack.clearTo(paramScope);
                    break;
                }
                else {
                    parameters.push(arg.get(stack));
                }
            }
            return parameters;
        }
        dependency(computed) {
            return this.callee.dependency(computed).concat(this.arguments.flatMap(param => param.dependency(computed)));
        }
        dependencyPath(computed) {
            return this.callee.dependencyPath(computed).concat(this.arguments.flatMap(param => param.dependencyPath(computed)));
        }
        toString() {
            return `${this.callee.toString()}${this.optional ? '?.' : ''}(${this.arguments.map(arg => arg.toString()).join(', ')})`;
        }
        toJson() {
            return {
                callee: this.callee.toJSON(),
                arguments: this.arguments.map(arg => arg.toJSON()),
                optional: this.optional
            };
        }
    };
    return CallExpression = _classThis;
})();
export { CallExpression };
//# sourceMappingURL=call.js.map