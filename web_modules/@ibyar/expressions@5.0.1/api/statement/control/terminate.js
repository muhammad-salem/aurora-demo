import { __esDecorate, __runInitializers } from "../../../../../tslib@2.9.1/tslib.es6.js";
import { AbstractExpressionNode } from '../../abstract.js';
import { Deserializer } from '../../deserialize/deserialize.js';
export class TerminateReturnType {
    type;
    label;
    constructor(type, label) {
        this.type = type;
        this.label = label;
    }
}
;
/**
 * The break statement terminates the current loop, switch, or label statement
 * and transfers program control to the statement following the terminated statement.
 *
 * The continue statement terminates execution of the statements in the current iteration of the current or labeled loop,
 * and continues execution of the loop with the next iteration.
 *
 */
class TerminateStatement extends AbstractExpressionNode {
    label;
    constructor(label, range, loc) {
        super(range, loc);
        this.label = label;
    }
    getLabel() {
        this.label;
    }
    set(stack, value) {
        throw new Error(`TerminateStatement#set() has no implementation.`);
    }
    get(stack) {
        return new TerminateReturnType(this.getType(), this.label?.get(stack));
    }
    dependency(computed) {
        return [];
    }
    dependencyPath(computed) {
        return [];
    }
    toString() {
        return `${this.getType()}${this.label ? ` ${this.label.toString()}` : ''};`;
    }
    toJson() {
        return { label: this.label?.toJSON() };
    }
}
let BreakStatement = (() => {
    let _classDecorators = [Deserializer('BreakStatement')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = TerminateStatement;
    var BreakStatement = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            BreakStatement = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        static fromJSON(node, deserializer) {
            return new BreakStatement(node.label ? deserializer(node.label) : void 0, node.range, node.loc);
        }
        static visit(node, visitNode) {
            node.label && visitNode(node.label);
        }
        getType() {
            return 'break';
        }
    };
    return BreakStatement = _classThis;
})();
export { BreakStatement };
let ContinueStatement = (() => {
    let _classDecorators = [Deserializer('ContinueStatement')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = TerminateStatement;
    var ContinueStatement = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ContinueStatement = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        static fromJSON(node, deserializer) {
            return new ContinueStatement(node.label && deserializer(node.label), node.range, node.loc);
        }
        static visit(node, visitNode) {
            node.label && visitNode(node.label);
        }
        getType() {
            return 'continue';
        }
    };
    return ContinueStatement = _classThis;
})();
export { ContinueStatement };
let LabeledStatement = (() => {
    let _classDecorators = [Deserializer('LabeledStatement')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AbstractExpressionNode;
    var LabeledStatement = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            LabeledStatement = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        label;
        body;
        static fromJSON(node, deserializer) {
            return new LabeledStatement(deserializer(node.label), deserializer(node.body), node.range, node.loc);
        }
        static visit(node, visitNode) {
            visitNode(node.label);
            visitNode(node.body);
        }
        constructor(label, body, range, loc) {
            super(range, loc);
            this.label = label;
            this.body = body;
        }
        getLabel() {
            return this.label;
        }
        getBody() {
            return this.body;
        }
        set(stack, value) {
            throw new Error('LabeledStatement#set() not implemented.');
        }
        get(stack) {
            return this.body.get(stack);
        }
        dependency(computed) {
            return this.body.dependency(computed);
        }
        dependencyPath(computed) {
            return this.body.dependencyPath(computed);
        }
        toString() {
            return `${this.label.toString()}:\n${this.body.toString()}`;
        }
        toJson() {
            return {
                label: this.label.toJSON(),
                body: this.body.toJSON()
            };
        }
    };
    return LabeledStatement = _classThis;
})();
export { LabeledStatement };
//# sourceMappingURL=terminate.js.map