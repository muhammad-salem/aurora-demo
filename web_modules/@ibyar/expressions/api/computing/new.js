import { __esDecorate, __runInitializers } from "../../../../tslib/tslib.es6.js";
import { AbstractExpressionNode } from '../abstract.js';
import { SpreadElement } from './spread.js';
import { Deserializer } from '../deserialize/deserialize.js';
let NewExpression = (() => {
    let _classDecorators = [Deserializer('NewExpression')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AbstractExpressionNode;
    var NewExpression = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            NewExpression = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        className;
        static fromJSON(node, deserializer) {
            return new NewExpression(deserializer(node.className), node.arguments?.map(deserializer), node.range, node.loc);
        }
        static visit(node, visitNode) {
            visitNode(node.className);
            node.arguments?.forEach(visitNode);
        }
        arguments;
        constructor(className, parameters, range, loc) {
            super(range, loc);
            this.className = className;
            this.arguments = parameters;
        }
        getClassName() {
            return this.className;
        }
        getArguments() {
            return this.arguments;
        }
        set(stack, value) {
            throw new Error(`NewExpression#set() has no implementation.`);
        }
        get(stack) {
            const classRef = this.className.get(stack);
            let value;
            if (this.arguments) {
                if (this.arguments.length > 0) {
                    const parameters = [];
                    for (const param of this.arguments) {
                        if (param instanceof SpreadElement) {
                            const paramScope = stack.pushBlockScopeFor(parameters);
                            param.get(stack);
                            stack.clearTo(paramScope);
                            break;
                        }
                        else {
                            parameters.push(param.get(stack));
                        }
                    }
                    value = new classRef(...parameters);
                }
                else {
                    value = new classRef();
                }
            }
            else {
                value = new classRef;
            }
            return value;
        }
        dependency(computed) {
            return this.className.dependency(computed)
                .concat(this.arguments?.flatMap(parm => parm.dependency(computed)) || []);
        }
        dependencyPath(computed) {
            return this.className.dependencyPath(computed)
                .concat(this.arguments?.flatMap(param => param.dependencyPath(computed)) || []);
        }
        toString() {
            const parameters = this.arguments ? `(${this.arguments?.map(arg => arg.toString()).join(', ')})` : '';
            return `new ${this.className.toString()}${parameters}`;
        }
        toJson() {
            return {
                className: this.className.toJSON(),
                arguments: this.arguments?.map(arg => arg.toJSON())
            };
        }
    };
    return NewExpression = _classThis;
})();
export { NewExpression };
//# sourceMappingURL=new.js.map