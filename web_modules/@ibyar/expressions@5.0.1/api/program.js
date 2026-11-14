import { __esDecorate, __runInitializers } from "../../../tslib@2.9.1/tslib.es6.js";
import { AbstractExpressionNode, ReturnValue } from './abstract.js';
import { Deserializer } from './deserialize/deserialize.js';
let Program = (() => {
    let _classDecorators = [Deserializer('Program')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AbstractExpressionNode;
    var Program = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            Program = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        sourceType;
        body;
        static fromJSON(node, deserializer) {
            return new Program(node.sourceType, node.body.map(deserializer), node.range, node.loc);
        }
        static visit(node, visitNode) {
            node.body.forEach(visitNode);
        }
        constructor(sourceType, body, range, loc) {
            super(range, loc);
            this.sourceType = sourceType;
            this.body = body;
        }
        set(stack, value) {
            throw new Error(`Program#set() has no implementation.`);
        }
        get(stack) {
            let value = this.body.map(statement => statement.get(stack)).at(-1);
            if (value instanceof ReturnValue) {
                value = value.getValue();
            }
            return value;
        }
        dependency(computed) {
            return this.body.flatMap(statement => statement.dependency());
        }
        dependencyPath(computed) {
            return this.body.flatMap(statement => statement.dependencyPath());
        }
        toString() {
            return this.body.map(statement => statement.toString()).join('\n');
        }
        toJson() {
            return {
                sourceType: this.sourceType,
                body: this.body.map(statement => statement.toJSON())
            };
        }
    };
    return Program = _classThis;
})();
export { Program };
//# sourceMappingURL=program.js.map