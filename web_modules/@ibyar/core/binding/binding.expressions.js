import { __decorate, __metadata } from "../../../tslib/tslib.es6.js";
import { InfixExpressionNode, findReactiveScopeByEventMap, Scope, MemberExpression, Deserializer } from '../../expressions/index.js';
import { createSubscriptionDestroyer } from '../context/subscription.js';
import { isOnDestroy } from '../component/lifecycle.js';
import { AsyncPipeProvider, AsyncPipeScope, PipeProvider } from '../pipe/pipe.js';
let OneWayAssignmentExpression = class OneWayAssignmentExpression extends InfixExpressionNode {
    constructor(left, right) {
        super('.=', left, right);
        this.rightEvents = this.right.events();
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
                        subscriptions.push(createSubscriptionDestroyer(() => asyncPipeScope.unsubscribe(pipelineName)));
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
        const callback = (newValue, oldValue) => {
            stack.detach();
            this.get(stack);
            stack.reattach();
        };
        tuples.forEach(tuple => {
            const subscription = tuple[1].subscribe(tuple[0], callback);
            subscriptions.push(subscription);
        });
        return subscriptions;
    }
};
OneWayAssignmentExpression = __decorate([
    Deserializer('OneWayAssignment'),
    __metadata("design:paramtypes", [MemberExpression, Object])
], OneWayAssignmentExpression);
export { OneWayAssignmentExpression };
let TwoWayAssignmentExpression = class TwoWayAssignmentExpression extends InfixExpressionNode {
    constructor(left, right) {
        super(':=', left, right);
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
        return (newValue, oldValue) => {
            stack.detach();
            this.getRTL(stack);
            stack.reattach();
        };
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
        return (newValue, oldValue) => {
            stack.detach();
            this.getLTR(stack);
            stack.reattach();
        };
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
        const rightTuples = findReactiveScopeByEventMap(this.rightEvents, stack);
        const rtlAction = this.actionRTL(stack);
        const rtlSubscriptions = this.subscribeToEvents(stack, rightTuples, rtlAction);
        const leftTuples = findReactiveScopeByEventMap(this.leftEvents, stack);
        const ltrAction = this.actionLTR(stack);
        const ltrSubscriptions = this.subscribeToEvents(stack, leftTuples, ltrAction);
        return rtlSubscriptions.concat(ltrSubscriptions);
    }
};
TwoWayAssignmentExpression = __decorate([
    Deserializer('TwoWayAssignment'),
    __metadata("design:paramtypes", [MemberExpression, Object])
], TwoWayAssignmentExpression);
export { TwoWayAssignmentExpression };
//# sourceMappingURL=binding.expressions.js.map