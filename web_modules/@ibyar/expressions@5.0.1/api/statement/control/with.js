import { __esDecorate, __runInitializers } from "../../../../../tslib@2.9.1/tslib.es6.js";
import { AbstractExpressionNode } from '../../abstract.js';
import { Deserializer } from '../../deserialize/deserialize.js';
/**
 * The with statement extends the scope chain for a statement.
 */
let WithStatement = (() => {
    let _classDecorators = [Deserializer('WithStatement')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AbstractExpressionNode;
    var WithStatement = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            WithStatement = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        object;
        body;
        static fromJSON(node, deserializer) {
            return new WithStatement(deserializer(node.object), deserializer(node.body), node.range, node.loc);
        }
        static visit(node, visitNode) {
            visitNode(node.object);
            visitNode(node.body);
        }
        constructor(object, body, range, loc) {
            super(range, loc);
            this.object = object;
            this.body = body;
        }
        getObject() {
            return this.object;
        }
        getBody() {
            return this.body;
        }
        set(stack, value) {
            throw new Error(`WithStatement#set() has no implementation.`);
        }
        get(stack) {
            const object = this.object.get(stack);
            let propertyKeys;
            if (object[Symbol.unscopables]) {
                const allKeys = [...Object.keys(object), ...Object.getOwnPropertySymbols(object)];
                const unscopablesKeys = Object.entries(object[Symbol.unscopables])
                    .filter(entry => entry[1])
                    .map(entry => entry[0]);
                propertyKeys = allKeys.filter(key => !unscopablesKeys.includes(key));
            }
            const objectScope = stack.pushBlockScopeFor(object, propertyKeys);
            objectScope.getContextProxy = () => object;
            const value = this.body.get(stack);
            stack.clearTo(objectScope);
            return value;
        }
        dependency(computed) {
            return this.object.dependency(computed).concat(this.body.dependency(computed));
        }
        dependencyPath(computed) {
            return this.object.dependencyPath(computed).concat(this.body.dependencyPath(computed));
        }
        toString() {
            return `with (${this.object.toString()}) ${this.body.toString()}`;
        }
        toJson() {
            return {
                object: this.object.toJSON(),
                body: this.body.toJSON()
            };
        }
    };
    return WithStatement = _classThis;
})();
export { WithStatement };
//# sourceMappingURL=with.js.map