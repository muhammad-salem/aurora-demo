var CommentExpression_1;
import { __decorate, __metadata } from "../../../../tslib/tslib.es6.js";
import { AbstractExpressionNode } from '../abstract.js';
import { Deserializer } from '../deserialize/deserialize.js';
let CommentExpression = CommentExpression_1 = class CommentExpression extends AbstractExpressionNode {
    constructor(comment) {
        super();
        this.comment = comment;
    }
    static fromJSON(nodeExp) {
        return new CommentExpression_1(nodeExp.comment);
    }
    getComment() {
        return this.comment;
    }
    shareVariables(scopeList) { }
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
CommentExpression = CommentExpression_1 = __decorate([
    Deserializer('CommentExpression'),
    __metadata("design:paramtypes", [String])
], CommentExpression);
export { CommentExpression };
//# sourceMappingURL=comment.js.map