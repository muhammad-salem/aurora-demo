import { __esDecorate, __runInitializers } from "tslib";
import { Deserializer, InfixExpressionNode, Scope, findReactiveScopeByEventMap, isReactive, isSignal } from '@ibyar/expressions';
import { isOnDestroy } from '../component/lifecycle.js';
import { createDestroySubscription } from '../context/subscription.js';
import { AsyncPipeProvider, AsyncPipeScope, PipeProvider } from '../pipe/pipe.js';
/**
 * this.input.set(model.property |> pipe);
 * left = this.input.set(value);
 * right = model.property |> pipe;
 */
let SignalOneWayAssignmentExpression = (() => {
    let _classDecorators = [Deserializer('SignalOneWayAssignment')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = InfixExpressionNode;
    var SignalOneWayAssignmentExpression = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            SignalOneWayAssignmentExpression = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        static fromJSON(node, deserializer) {
            return new SignalOneWayAssignmentExpression(deserializer(node.left), deserializer(node.right));
        }
        static visit(node, visitNode) {
            visitNode(node.left);
            visitNode(node.right);
        }
        rightEvents = this.right.events();
        constructor(left, right) {
            super('=:$', left, right);
        }
        set(stack, value) {
            stack = stack.copyStack();
            stack.pushBlockScopeFor({ '$value$': value });
            return this.left.get(stack);
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
    return SignalOneWayAssignmentExpression = _classThis;
})();
export { SignalOneWayAssignmentExpression };
/**
 * `the default behavior is assign the right hand side to the left hand side.`
 *
 * this.input.set(model.property.get());
 * model.property.set(this.input.get());
 */
let SignalTwoWayAssignmentExpression = (() => {
    let _classDecorators = [Deserializer('SignalTwoWayAssignment')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = InfixExpressionNode;
    var SignalTwoWayAssignmentExpression = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            SignalTwoWayAssignmentExpression = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        static fromJSON(node, deserializer) {
            return new SignalTwoWayAssignmentExpression(deserializer(node.left), deserializer(node.right));
        }
        static visit(node, visitNode) {
            visitNode(node.left);
            visitNode(node.right);
        }
        rightEvents;
        leftEvents;
        constructor(left, right) {
            super('=::$', left, right);
            this.rightEvents = this.right.getCallee().events();
            this.leftEvents = this.left.getCallee().events();
        }
        set(stack, value) {
            return this.setRTL(stack, value);
        }
        get(stack) {
            return this.getRTL(stack);
        }
        setRTL(stack, value) {
            stack = stack.copyStack();
            stack.pushBlockScopeFor({ '$value$': value });
            return this.left.get(stack);
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
            stack = stack.copyStack();
            stack.pushBlockScopeFor({ '$value$': value });
            return this.right.get(stack);
        }
        getLTR(stack) {
            const lv = this.left.get(stack);
            this.setLTR(stack, lv);
            return lv;
        }
        actionLTR(stack) {
            return () => this.getLTR(stack);
        }
        bindSignal(getter, setter) {
            const value = isReactive(getter) ? getter.get() : getter;
            if (isSignal(setter)) {
                setter.set(value);
            }
            else {
                setter = value;
            }
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
    return SignalTwoWayAssignmentExpression = _classThis;
})();
export { SignalTwoWayAssignmentExpression };
//# sourceMappingURL=signal.expressions.js.map