const notScheduled = 'notScheduled', scheduling = 'scheduling', scheduled = 'scheduled', running = 'running', canceling = 'canceling', unknown = 'unknown';
const microTask = 'microTask', macroTask = 'macroTask', eventTask = 'eventTask';
export class AbstractTask {
    constructor(type, source, callback, data, scheduleFn, cancelFn) {
        this.type = type;
        this.source = source;
        this.callback = callback;
        this.data = data;
        this.scheduleFn = scheduleFn;
        this.cancelFn = cancelFn;
        this.runCount = 0;
        this._zone = null;
        this._state = 'notScheduled';
        if (!callback) {
            throw new Error('callback is not defined');
        }
    }
    get zone() {
        return this._zone;
    }
    get state() {
        return this._state;
    }
    cancelScheduleRequest() {
        this._transitionTo(notScheduled, scheduling);
    }
    _transitionTo(toState, fromState1, fromState2) {
        if (this._state === fromState1 || this._state === fromState2) {
            this._state = toState;
        }
        else {
            throw new Error(`${this.type} '${this.source}': can not transition to '${toState}', expecting state '${fromState1}'${fromState2 ? ' or \'' + fromState2 + '\'' : ''}, was '${this._state}'.`);
        }
    }
    toString() {
        if (this.data && typeof this.data.handleId !== 'undefined') {
            return this.data.handleId.toString();
        }
        else {
            return Object.prototype.toString.call(this);
        }
    }
    toJSON() {
        return {
            type: this.type,
            state: this.state,
            source: this.source,
            zone: this.zone.name,
            runCount: this.runCount
        };
    }
}
export class ScopeTask extends AbstractTask {
    constructor(scope, type, source, callback, data, scheduleFn, cancelFn) {
        super(type, source, callback, data, scheduleFn, cancelFn);
        this.scope = scope;
    }
    static microTask(scope, source, callback, data, customSchedule) {
        return new ScopeTask(scope, microTask, source, callback, data, customSchedule, undefined);
    }
    static macroTask(scope, source, callback, data, customSchedule, customCancel) {
        return new ScopeTask(scope, macroTask, source, callback, data, customSchedule, customCancel);
    }
    static eventTask(scope, source, callback, data, customSchedule, customCancel) {
        return new ScopeTask(scope, eventTask, source, callback, data, customSchedule, customCancel);
    }
    invoke(task, target, args) {
        try {
            this.runCount++;
            this.scope.detach();
            return this.zone.runTask(task, target, args);
        }
        finally {
            this.scope.reattach();
        }
    }
    toJSON() {
        return Object.assign(super.toJSON(), { scope: this.scope });
    }
}
export class StackTask extends AbstractTask {
    constructor(stack, type, source, callback, data, scheduleFn, cancelFn) {
        super(type, source, callback, data, scheduleFn, cancelFn);
        this.stack = stack;
    }
    static microTask(stack, source, callback, data, customSchedule) {
        return new StackTask(stack, microTask, source, callback, data, customSchedule, undefined);
    }
    static macroTask(stack, source, callback, data, customSchedule, customCancel) {
        return new StackTask(stack, macroTask, source, callback, data, customSchedule, customCancel);
    }
    static eventTask(stack, source, callback, data, customSchedule, customCancel) {
        return new StackTask(stack, eventTask, source, callback, data, customSchedule, customCancel);
    }
    invoke(task, target, args) {
        try {
            this.runCount++;
            this.stack.detach();
            return this.zone.runTask(task, target, args);
        }
        finally {
            this.stack.reattach();
        }
    }
    toJSON() {
        return Object.assign(super.toJSON(), { stack: this.stack });
    }
}
//# sourceMappingURL=task.js.map