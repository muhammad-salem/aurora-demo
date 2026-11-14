import { __esDecorate, __runInitializers } from "../../../../tslib@2.9.1/tslib.es6.js";
import { AbstractExpressionNode } from '../abstract.js';
import { Deserializer } from '../deserialize/deserialize.js';
import { isDeclarationExpression } from '../utils.js';
let ExpressionStatement = (() => {
    let _classDecorators = [Deserializer('ExpressionStatement')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AbstractExpressionNode;
    var ExpressionStatement = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ExpressionStatement = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        body;
        static fromJSON(node, deserializer) {
            return new ExpressionStatement(node.body.map(deserializer), node.range, node.loc);
        }
        static visit(node, visitNode) {
            node.body.forEach(visitNode);
        }
        constructor(body, range, loc) {
            super(range, loc);
            this.body = body;
        }
        getBody() {
            return this.body;
        }
        set(stack, value) {
            throw new Error(`ExpressionStatement#set() has no implementation.`);
        }
        get(stack) {
            let value;
            this.body.forEach(node => value = node.get(stack));
            return value;
        }
        dependency(computed) {
            return this.body.flatMap(exp => exp.dependency(computed));
        }
        dependencyPath(computed) {
            return this.body.flatMap(node => node.dependencyPath(computed));
        }
        toString() {
            return this.body
                .map(node => ({ insert: !isDeclarationExpression(node), string: node.toString() }))
                .map(ref => `${ref.string}${ref.insert ? ';' : ''}`)
                .join('\n');
        }
        toJson() {
            return { body: this.body.map(exp => exp.toJSON()) };
        }
    };
    return ExpressionStatement = _classThis;
})();
export { ExpressionStatement };
//# sourceMappingURL=statement.js.map