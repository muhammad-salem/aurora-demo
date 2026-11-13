/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __esDecorate, __runInitializers } from "../../tslib/tslib.es6.js";
import { ChangeDetectorRef, inject, Pipe } from '../core/index.js';
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
let AsyncPipe = (() => {
    let _classDecorators = [Pipe({ name: 'async', asynchronous: true })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AsyncPipe = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AsyncPipe = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        cd = inject(ChangeDetectorRef);
        _latestValue = null;
        _subscription = null;
        _obj = null;
        _strategy = null;
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
            throw Error(`InvalidPipeArgument: '${AsyncPipe.name}' for pipe '${obj}'`);
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
                this.cd.markForCheck();
            }
        }
    };
    return AsyncPipe = _classThis;
})();
export { AsyncPipe };
//# sourceMappingURL=async.pipe.js.map