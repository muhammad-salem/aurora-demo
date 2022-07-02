var ImportAttribute_1;
import { __decorate, __metadata } from "../../../../tslib/tslib.es6.js";
import { AbstractExpressionNode } from '../abstract.js';
import { Literal } from '../definition/values.js';
import { Deserializer } from '../deserialize/deserialize.js';
export class ModuleSpecifier extends AbstractExpressionNode {
    constructor(local) {
        super();
        this.local = local;
    }
    getLocal() {
        return this.local;
    }
    toJson() {
        return {
            local: this.local.toJSON()
        };
    }
}
let ImportAttribute = ImportAttribute_1 = class ImportAttribute extends AbstractExpressionNode {
    constructor(key, value) {
        super();
        this.key = key;
        this.value = value;
    }
    static fromJSON(node, deserializer) {
        return new ImportAttribute_1(deserializer(node.key), deserializer(node.value));
    }
    static visit(node, visitNode) {
        visitNode(node.key);
        visitNode(node.value);
    }
    getKey() {
        return this.key;
    }
    getValue() {
        return this.value;
    }
    shareVariables(scopeList) {
        throw new Error('Method not implemented.');
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
ImportAttribute = ImportAttribute_1 = __decorate([
    Deserializer('ImportAttribute'),
    __metadata("design:paramtypes", [Object, Literal])
], ImportAttribute);
export { ImportAttribute };
//# sourceMappingURL=common.js.map