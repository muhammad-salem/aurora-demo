import { __esDecorate, __runInitializers } from "../../../../tslib/tslib.es6.js";
import { AbstractExpressionNode } from '../abstract.js';
import { Deserializer } from '../deserialize/deserialize.js';
import { RestElement } from '../computing/rest.js';
let ArrayExpression = (() => {
    let _classDecorators = [Deserializer('ArrayExpression')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AbstractExpressionNode;
    var ArrayExpression = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ArrayExpression = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        elements;
        static fromJSON(node, deserializer) {
            return new ArrayExpression(node.elements.map(element => element ? deserializer(element) : null), node.range, node.loc);
        }
        static visit(node, visitNode) {
            node.elements.forEach(element => element && visitNode(element));
        }
        constructor(elements, range, loc) {
            super(range, loc);
            this.elements = elements;
        }
        getElements() {
            return this.elements;
        }
        set(stack) {
            throw new Error("ArrayExpression#set() has no implementation.");
        }
        get(stack) {
            return this.elements.map(item => item?.get(stack));
        }
        dependency(computed) {
            return this.elements.filter(item => item).flatMap(item => item.dependency(computed));
        }
        dependencyPath(computed) {
            return this.elements.filter(item => item).flatMap(item => item.dependencyPath(computed));
        }
        toString() {
            return `[ ${this.elements.map(item => item?.toString()).toString()} ]`;
        }
        toJson() {
            return {
                elements: this.elements.map(item => item?.toJSON())
            };
        }
    };
    return ArrayExpression = _classThis;
})();
export { ArrayExpression };
let ArrayPattern = (() => {
    let _classDecorators = [Deserializer('ArrayPattern')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AbstractExpressionNode;
    var ArrayPattern = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ArrayPattern = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        elements;
        static fromJSON(node, deserializer) {
            return new ArrayPattern(node.elements.map(expression => expression ? deserializer(expression) : null), node.range, node.loc);
        }
        static visit(node, visitNode) {
            node.elements.forEach(expression => expression && visitNode(expression));
        }
        constructor(elements, range, loc) {
            super(range, loc);
            this.elements = elements;
        }
        getElements() {
            return this.elements;
        }
        set(stack, values) {
            throw new Error('ArrayPattern#set() has no implementation.');
        }
        get(scopeProvider) {
            throw new Error('ArrayPattern#get() has no implementation.');
        }
        declareVariable(stack, values) {
            if (Array.isArray(values)) {
                this.declareVariableFromArray(stack, values);
            }
            else if (Reflect.has(values, Symbol.iterator)) {
                this.declareVariableFromIterator(stack, values);
            }
        }
        declareVariableFromArray(stack, values) {
            for (let index = 0; index < this.elements.length; index++) {
                const elem = this.elements[index];
                if (elem == null) {
                    continue;
                }
                if (elem instanceof RestElement) {
                    const rest = values.slice(index);
                    elem.declareVariable(stack, rest);
                    break;
                }
                elem.declareVariable(stack, values[index]);
            }
        }
        declareVariableFromIterator(stack, iterator) {
            let index = 0;
            while (true) {
                let iteratorResult = iterator.next();
                if (iteratorResult.done) {
                    break;
                }
                const elem = this.elements[index++];
                if (elem == null) {
                    continue;
                }
                if (elem instanceof RestElement) {
                    const rest = [iteratorResult.value];
                    while (!iteratorResult.done) {
                        iteratorResult = iterator.next();
                        rest.push(iteratorResult.value);
                    }
                    elem.declareVariable(stack, rest);
                    break;
                }
                elem.declareVariable(stack, iteratorResult.value);
                if (index >= this.elements.length) {
                    break;
                }
            }
        }
        dependency(computed) {
            return this.elements.filter(item => item).flatMap(item => item.dependency(computed));
        }
        dependencyPath(computed) {
            return this.elements.filter(item => item).flatMap(item => item.dependencyPath(computed));
        }
        toString() {
            return `[ ${this.elements.map(item => item?.toString()).toString()} ]`;
        }
        toJson() {
            return {
                elements: this.elements.map(item => item?.toJSON())
            };
        }
    };
    return ArrayPattern = _classThis;
})();
export { ArrayPattern };
//# sourceMappingURL=array.js.map