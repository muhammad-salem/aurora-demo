import { __esDecorate, __runInitializers } from "../../../../../tslib/tslib.es6.js";
import { AbstractExpressionNode, ReturnValue } from '../../abstract.js';
import { Deserializer } from '../../deserialize/deserialize.js';
import { TerminateReturnType } from './terminate.js';
import { isDeclarationExpression } from '../../utils.js';
/**
 * A block statement (or compound statement in other languages) is used to group zero or more statements.
 * The block is delimited by a pair of braces ("curly brackets") and may optionally be labelled:
 */
let BlockStatement = (() => {
    let _classDecorators = [Deserializer('BlockStatement')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AbstractExpressionNode;
    var BlockStatement = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            BlockStatement = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        body;
        static fromJSON(node, deserializer) {
            return new BlockStatement(node.body.map(deserializer), node.range, node.loc);
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
            throw new Error(`BlockStatement#set() has no implementation.`);
        }
        get(stack) {
            const blockScope = stack.pushBlockScope();
            let value;
            for (const node of this.body) {
                value = node.get(stack);
                if (value instanceof ReturnValue) {
                    stack.clearTo(blockScope);
                    return value.value;
                }
                if (value instanceof TerminateReturnType) {
                    return value;
                }
            }
            stack.clearTo(blockScope);
            return value;
        }
        dependency(computed) {
            return this.body.flatMap(exp => exp.dependency(computed));
        }
        dependencyPath(computed) {
            return this.body.flatMap(node => node.dependencyPath(computed));
        }
        toString() {
            return `{\n${this.body
                .map(node => ({ insert: !isDeclarationExpression(node), string: node.toString() }))
                .map(ref => `\t\t${ref.string}${ref.insert ? ';' : ''}`)
                .join('\n')}\n}`;
        }
        toJson() {
            return { body: this.body.map(node => node.toJSON()) };
        }
    };
    return BlockStatement = _classThis;
})();
export { BlockStatement };
//# sourceMappingURL=block.js.map