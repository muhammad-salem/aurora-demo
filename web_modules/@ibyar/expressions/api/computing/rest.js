import { __esDecorate, __runInitializers } from "../../../../tslib/tslib.es6.js";
import { AbstractExpressionNode } from '../abstract.js';
import { Deserializer } from '../deserialize/deserialize.js';
let RestElement = (() => {
    let _classDecorators = [Deserializer('RestElement')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AbstractExpressionNode;
    var RestElement = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            RestElement = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        argument;
        static fromJSON(node, deserializer) {
            return new RestElement(deserializer(node.argument), node.range, node.loc);
        }
        static visit(node, visitNode) {
            visitNode(node.argument);
        }
        constructor(argument, range, loc) {
            super(range, loc);
            this.argument = argument;
        }
        getArgument() {
            return this.argument;
        }
        set(stack, value) {
            throw new Error('RestElement#set() Method has no implementation.');
        }
        get(stack) {
            throw new Error('RestElement#get() Method has no implementation.');
        }
        declareVariable(stack, propertyValue) {
            this.argument.declareVariable(stack, propertyValue);
        }
        dependency(computed) {
            return this.argument.dependency(computed);
        }
        dependencyPath(computed) {
            return this.argument.dependencyPath(computed);
        }
        toString() {
            return `...${this.argument.toString()}`;
        }
        toJson() {
            return { argument: this.argument.toJSON() };
        }
    };
    return RestElement = _classThis;
})();
export { RestElement };
//# sourceMappingURL=rest.js.map