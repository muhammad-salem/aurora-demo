var Program_1;
import { __decorate, __metadata } from "../../../tslib/tslib.es6.js";
import { AbstractExpressionNode } from './abstract.js';
import { Deserializer } from './deserialize/deserialize.js';
let Program = Program_1 = class Program extends AbstractExpressionNode {
    constructor(sourceType, body) {
        super();
        this.sourceType = sourceType;
        this.body = body;
    }
    static fromJSON(node, deserializer) {
        return new Program_1(node.sourceType, node.body.map(deserializer));
    }
    static visit(node, visitNode) {
        node.body.forEach(visitNode);
    }
    shareVariables(scopeList) { }
    set(stack, value) {
        throw new Error(`Program#set() has no implementation.`);
    }
    get(stack) {
        return this.body.map(statement => statement.get(stack)).at(-1);
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
Program = Program_1 = __decorate([
    Deserializer('Program'),
    __metadata("design:paramtypes", [String, Array])
], Program);
export { Program };
//# sourceMappingURL=program.js.map