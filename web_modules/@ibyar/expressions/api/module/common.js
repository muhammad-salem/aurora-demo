import { __esDecorate, __runInitializers } from "../../../../tslib/tslib.es6.js";
import { AbstractExpressionNode } from '../abstract.js';
import { Deserializer } from '../deserialize/deserialize.js';
export class ModuleSpecifier extends AbstractExpressionNode {
    local;
    constructor(local, range, loc) {
        super(range, loc);
        this.local = local;
    }
    getLocal() {
        return this.local;
    }
    getLocalName() {
        return this.local.getName();
    }
    toJson() {
        return {
            local: this.local.toJSON()
        };
    }
}
let ImportAttribute = (() => {
    let _classDecorators = [Deserializer('ImportAttribute')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AbstractExpressionNode;
    var ImportAttribute = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ImportAttribute = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        key;
        value;
        static fromJSON(node, deserializer) {
            return new ImportAttribute(deserializer(node.key), deserializer(node.value), node.range, node.loc);
        }
        static visit(node, visitNode) {
            visitNode(node.key);
            visitNode(node.value);
        }
        constructor(key, value, range, loc) {
            super(range, loc);
            this.key = key;
            this.value = value;
        }
        getKey() {
            return this.key;
        }
        getValue() {
            return this.value;
        }
        set(stack, value) {
            throw new Error('Method not implemented.');
        }
        get(stack, thisContext) {
            const key = this.key.get(stack);
            const value = this.value.get();
            return { [key]: value };
        }
        dependency(computed) {
            return [];
        }
        dependencyPath(computed) {
            return [];
        }
        toString() {
            return `${this.key.toString()}: ${this.value.toString()}`;
        }
        toJson() {
            return {
                key: this.key.toJSON(),
                value: this.value.toJSON(),
            };
        }
    };
    return ImportAttribute = _classThis;
})();
export { ImportAttribute };
//# sourceMappingURL=common.js.map