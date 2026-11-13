import { __esDecorate, __runInitializers } from "../../../../../tslib/tslib.es6.js";
import { AbstractExpressionNode } from '../../abstract.js';
import { Deserializer } from '../../deserialize/deserialize.js';
/**
 * The empty statement is a semicolon (;) indicating that no statement will be executed,
 * even if JavaScript syntax requires one.
 * The opposite behavior, where you want multiple statements,
 * but JavaScript only allows a single one, is possible using a block statement,
 * which combines several statements into a single one.
 */
let EmptyStatement = (() => {
    let _classDecorators = [Deserializer('EmptyStatement')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AbstractExpressionNode;
    var EmptyStatement = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            EmptyStatement = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        static fromJSON(node) {
            return new EmptyStatement(node.range, node.loc);
        }
        constructor(range, loc) {
            super(range, loc);
        }
        set(stack, value) {
            throw new Error(`EmptyStatement#set() has no implementation.`);
        }
        get(stack) {
            return void 0;
        }
        dependency(computed) {
            return [];
        }
        dependencyPath(computed) {
            return [];
        }
        toString() {
            return ';';
        }
        toJson() {
            return {};
        }
    };
    return EmptyStatement = _classThis;
})();
export { EmptyStatement };
//# sourceMappingURL=empty.js.map