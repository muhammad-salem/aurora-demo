import { __esDecorate, __runInitializers } from "../../../../tslib@2.9.1/tslib.es6.js";
import { AbstractExpressionNode, ReturnValue } from '../abstract.js';
import { Deserializer } from '../deserialize/deserialize.js';
/**
 * The expression whose value is to be returned.
 * If omitted, undefined is returned instead.
 */
let ReturnStatement = (() => {
    let _classDecorators = [Deserializer('ReturnStatement')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AbstractExpressionNode;
    var ReturnStatement = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ReturnStatement = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        argument;
        static fromJSON(node, deserializer) {
            return new ReturnStatement(node.argument ? deserializer(node.argument) : void 0, node.range, node.loc);
        }
        static visit(node, visitNode) {
            node.argument && visitNode(node.argument);
        }
        constructor(argument, range, loc) {
            super(range, loc);
            this.argument = argument;
        }
        getArgument() {
            return this.argument;
        }
        set(stack, value) {
            throw new Error(`ReturnStatement#set() has no implementation.`);
        }
        get(stack) {
            return new ReturnValue(this.argument?.get(stack));
            // nothing should be written after this operation in a function body.
        }
        dependency(computed) {
            return this.argument?.dependency(computed) || [];
        }
        dependencyPath(computed) {
            return this.argument?.dependencyPath(computed) || [];
        }
        toString() {
            return `return ${this.argument?.toString() || ''}`;
        }
        toJson() {
            return { argument: this.argument?.toJSON() };
        }
    };
    return ReturnStatement = _classThis;
})();
export { ReturnStatement };
//# sourceMappingURL=return.js.map