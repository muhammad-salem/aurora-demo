import { __esDecorate, __runInitializers } from "../../../../tslib@2.9.1/tslib.es6.js";
import { AbstractExpressionNode } from '../abstract.js';
import { Deserializer } from '../deserialize/deserialize.js';
let CommentExpression = (() => {
    let _classDecorators = [Deserializer('CommentExpression')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AbstractExpressionNode;
    var CommentExpression = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            CommentExpression = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        comment;
        static fromJSON(node) {
            return new CommentExpression(node.comment, node.range, node.loc);
        }
        constructor(comment, range, loc) {
            super(range, loc);
            this.comment = comment;
        }
        getComment() {
            return this.comment;
        }
        set(stack, ...values) { }
        get(stack) { }
        dependency(computed) {
            return [];
        }
        dependencyPath(computed) {
            return [];
        }
        toString() {
            return this.comment;
        }
        toJson() {
            return { comment: this.comment };
        }
    };
    return CommentExpression = _classThis;
})();
export { CommentExpression };
//# sourceMappingURL=comment.js.map