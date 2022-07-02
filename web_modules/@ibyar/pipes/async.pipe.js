/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var AsyncPipe_1;
import { __decorate } from "../../tslib/tslib.es6.js";
import { AsyncPipeTransform, Pipe } from '../core/index.js';
class SubscribableStrategy {
    createSubscription(async, updateLatestValue) {
        return async.subscribe({
            next: updateLatestValue,
            error: (e) => {
                throw e;
            }
        });
    }
    dispose(subscription) {
        subscription.unsubscribe();
    }
    onDestroy(subscription) {
        subscription.unsubscribe();
    }
}
class PromiseStrategy {
    createSubscription(async, updateLatestValue) {
        return async.then(updateLatestValue, e => {
            throw e;
        });
    }
    dispose(subscription) { }
    onDestroy(subscription) { }
}
function isPromise(obj) {
    // allow any Promise/A+ compliant thenable.
    // It's up to the caller to ensure that obj.then conforms to the spec
    return !!obj && typeof obj.then === 'function';
}
/**
 * Determine if the argument is a Subscribable
 */
function isSubscribable(obj) {
    return !!obj && typeof obj.subscribe === 'function';
}
const _promiseStrategy = new PromiseStrategy();
const _subscribableStrategy = new SubscribableStrategy();
let AsyncPipe = AsyncPipe_1 = class AsyncPipe extends AsyncPipeTransform {
    constructor() {
        super(...arguments);
        this._latestValue = null;
        this._subscription = null;
        this._obj = null;
        this._strategy = null;
    }
    onDestroy() {
        if (this._subscription) {
            this._dispose();
        }
    }
    transform(obj) {
        if (!this._obj) {
            if (obj) {
                this._subscribe(obj);
            }
            return this._latestValue;
        }
        if (obj !== this._obj) {
            this._dispose();
            return this.transform(obj);
        }
        return this._latestValue;
    }
    _subscribe(obj) {
        this._obj = obj;
        this._strategy = this._selectStrategy(obj);
        this._subscription = this._strategy.createSubscription(obj, (value) => this._updateLatestValue(obj, value));
    }
    _selectStrategy(obj) {
        if (isPromise(obj)) {
            return _promiseStrategy;
        }
        if (isSubscribable(obj)) {
            return _subscribableStrategy;
        }
        throw Error(`InvalidPipeArgument: '${AsyncPipe_1.name}' for pipe '${obj}'`);
    }
    _dispose() {
        this._strategy.dispose(this._subscription);
        this._latestValue = null;
        this._subscription = null;
        this._obj = null;
    }
    _updateLatestValue(async, value) {
        if (async === this._obj) {
            this._latestValue = value;
            this.changeDetectorRef.markForCheck();
        }
    }
};
AsyncPipe = AsyncPipe_1 = __decorate([
    Pipe({ name: 'async', asynchronous: true })
], AsyncPipe);
export { AsyncPipe };
//# sourceMappingURL=async.pipe.js.map