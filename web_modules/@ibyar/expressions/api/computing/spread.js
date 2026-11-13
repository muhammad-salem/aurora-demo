import { __esDecorate, __runInitializers } from "../../../../tslib/tslib.es6.js";
import { AbstractExpressionNode } from '../abstract.js';
import { Deserializer } from '../deserialize/deserialize.js';
let SpreadElement = (() => {
    let _classDecorators = [Deserializer('SpreadElement')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AbstractExpressionNode;
    var SpreadElement = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            SpreadElement = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        argument;
        static fromJSON(node, deserializer) {
            return new SpreadElement(deserializer(node.argument), node.range, node.loc);
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
            throw new Error('SpreadElement#set() Method has no implementation.');
        }
        get(stack) {
            const value = this.argument.get(stack);
            if (Array.isArray(value)) {
                this.spreadFromArray(stack, value);
            }
            else if (Reflect.has(value, Symbol.iterator)) {
                this.spreadFromIterator(stack, value);
            }
        }
        spreadFromArray(stack, array) {
            let length = stack.get('length');
            array.forEach(value => stack.declareVariable(length++, value));
        }
        spreadFromIterator(stack, iterator) {
            let length = stack.get('length');
            while (true) {
                const iteratorResult = iterator.next();
                if (iteratorResult.done) {
                    break;
                }
                stack.declareVariable(length++, iteratorResult.value);
            }
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
    return SpreadElement = _classThis;
})();
export { SpreadElement };
//# sourceMappingURL=spread.js.map