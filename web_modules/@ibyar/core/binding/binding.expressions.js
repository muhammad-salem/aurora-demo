import { __esDecorate, __runInitializers } from "../../../tslib/tslib.es6.js";
import { Deserializer, InfixExpressionNode, Scope, findReactiveScopeByEventMap } from '../../expressions/index.js';
import { isOnDestroy } from '../component/lifecycle.js';
import { createDestroySubscription } from '../context/subscription.js';
import { AsyncPipeProvider, AsyncPipeScope, PipeProvider } from '../pipe/pipe.js';
let OneWayAssignmentExpression = (() => {
    let _classDecorators = [Deserializer('OneWayAssignment')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = InfixExpressionNode;
    var OneWayAssignmentExpression = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            OneWayAssignmentExpression = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        static fromJSON(node, deserializer) {
            return new OneWayAssignmentExpression(deserializer(node.left), deserializer(node.right));
        }
        static visit(node, visitNode) {
            visitNode(node.left);
            visitNode(node.right);
        }
        rightEvents = this.right.events();
        constructor(left, right) {
            super('=:', left, right);
        }
        set(stack, value) {
            return this.left.set(stack, value);
        }
        get(stack) {
            const rv = this.right.get(stack);
            this.set(stack, rv);
            return rv;
        }
        subscribe(stack, pipelineNames) {
            const subscriptions = [];
            if (pipelineNames?.length) {
                const syncPipeScope = Scope.blockScope();
                const asyncPipeScope = AsyncPipeScope.blockScope();
                let hasAsync = false, hasSync = false;
                pipelineNames.forEach(pipelineName => {
                    const scope = stack.findScope(pipelineName);
                    const pipe = scope.get(pipelineName);
                    if (scope instanceof AsyncPipeProvider) {
                        hasAsync = true;
                        asyncPipeScope.set(pipelineName, pipe);
                        if (isOnDestroy(pipe.prototype)) {
                            subscriptions.push(createDestroySubscription(() => asyncPipeScope.unsubscribe(pipelineName)));
                        }
                    }
                    else if (scope instanceof PipeProvider) {
                        hasSync = true;
                        syncPipeScope.set(pipelineName, pipe);
                    }
                });
                hasSync && stack.pushScope(syncPipeScope);
                hasAsync && stack.pushScope(asyncPipeScope);
            }
            const tuples = findReactiveScopeByEventMap(this.rightEvents, stack);
            const callback = () => this.get(stack);
            tuples.forEach(tuple => {
                const subscription = tuple[1].subscribe(tuple[0], callback);
                subscriptions.push(subscription);
            });
            return subscriptions;
        }
    };
    return OneWayAssignmentExpression = _classThis;
})();
export { OneWayAssignmentExpression };
/**
 * the default behavior is assign the right hand side to the left hand side.
 *
 *
 */
let TwoWayAssignmentExpression = (() => {
    let _classDecorators = [Deserializer('TwoWayAssignment')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = InfixExpressionNode;
    var TwoWayAssignmentExpression = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            TwoWayAssignmentExpression = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        static fromJSON(node, deserializer) {
            return new TwoWayAssignmentExpression(deserializer(node.left), deserializer(node.right));
        }
        static visit(node, visitNode) {
            visitNode(node.left);
            visitNode(node.right);
        }
        rightEvents;
        leftEvents;
        constructor(left, right) {
            super('=::', left, right);
            this.rightEvents = this.right.events();
            this.leftEvents = this.left.events();
        }
        set(stack, value) {
            return this.setRTL(stack, value);
        }
        get(stack) {
            return this.getRTL(stack);
        }
        setRTL(stack, value) {
            return this.left.set(stack, value);
        }
        getRTL(stack) {
            const rv = this.right.get(stack);
            this.setRTL(stack, rv);
            return rv;
        }
        actionRTL(stack) {
            return () => this.getRTL(stack);
        }
        setLTR(stack, value) {
            return this.right.set(stack, value);
        }
        getLTR(stack) {
            const lv = this.left.get(stack);
            this.setLTR(stack, lv);
            return lv;
        }
        actionLTR(stack) {
            return () => this.getLTR(stack);
        }
        subscribeToEvents(stack, tuples, actionCallback) {
            const subscriptions = [];
            tuples.forEach(tuple => {
                const subscription = tuple[1].subscribe(tuple[0], actionCallback);
                subscriptions.push(subscription);
            });
            return subscriptions;
        }
        subscribe(stack) {
            // right to left
            const rightTuples = findReactiveScopeByEventMap(this.rightEvents, stack);
            const rtlAction = this.actionRTL(stack);
            const rtlSubscriptions = this.subscribeToEvents(stack, rightTuples, rtlAction);
            // left to right 
            const leftTuples = findReactiveScopeByEventMap(this.leftEvents, stack);
            const ltrAction = this.actionLTR(stack);
            const ltrSubscriptions = this.subscribeToEvents(stack, leftTuples, ltrAction);
            return rtlSubscriptions.concat(ltrSubscriptions);
        }
    };
    return TwoWayAssignmentExpression = _classThis;
})();
export { TwoWayAssignmentExpression };
//# sourceMappingURL=binding.expressions.js.map