import { __esDecorate, __runInitializers } from "../../../tslib@2.9.1/tslib.es6.js";
import { Directive, input, StructuralDirective } from '../../core@5.0.1/index.js';
import { diff, PatchOperation } from '../../platform@5.0.1/index.js';
export class ForContext {
    $implicit;
    index;
    count;
    constructor($implicit, index, count) {
        this.$implicit = $implicit;
        this.index = index;
        this.count = count;
    }
    get first() {
        return this.index === 0;
    }
    get last() {
        return this.index === this.count - 1;
    }
    get even() {
        return this.index % 2 === 0;
    }
    get odd() {
        return !this.even;
    }
    update(forContext) {
        Object.assign(this, forContext);
    }
}
export class ForOfContext extends ForContext {
    ['of'];
    constructor($implicit, forOf, index, count) {
        super($implicit, index, count);
        this.of = forOf;
    }
}
export class ForInContext extends ForContext {
    ['in'];
    constructor($implicit, forIn, index, count) {
        super($implicit, index, count);
        this.in = forIn;
    }
}
const TRACK_BY_IDENTITY = (index, item) => item;
export class AbstractForDirective extends StructuralDirective {
    _forOf;
    _forTrackBy = TRACK_BY_IDENTITY;
    _$implicitTrackBy = (index, item) => this._forTrackBy(index, item.$implicit);
    _updateUI() {
        const emptySuccessor = this.getSuccessor('*empty');
        if (!this._forOf || this._forOf.length == 0) {
            this.viewContainerRef.clear();
            if (emptySuccessor) {
                this.viewContainerRef.createEmbeddedView(emptySuccessor);
            }
            return;
        }
        const currentContext = this._forOf.map((item, index, array) => new ForOfContext(item, array, index, array.length));
        if (this.viewContainerRef.length === 0) {
            currentContext.forEach(context => {
                this.viewContainerRef.createEmbeddedView(this.templateRef, { context });
            });
            return;
        }
        const previousContext = [];
        this.viewContainerRef.forEach(view => previousContext.push(view.context));
        diff(previousContext, currentContext, { trackBy: this._$implicitTrackBy }).forEach(patch => {
            switch (patch.op) {
                case PatchOperation.ADD:
                    this.viewContainerRef.createEmbeddedView(this.templateRef, { context: patch.item, index: patch.nextIndex });
                    break;
                case PatchOperation.REMOVE:
                    this.viewContainerRef.remove(patch.currentIndex);
                    break;
                case PatchOperation.MOVE:
                    this.viewContainerRef.move(patch.currentIndex, patch.nextIndex);
                    this.viewContainerRef.get(patch.nextIndex)?.context.update(patch.item);
                    break;
            }
        });
        const count = this.viewContainerRef.length;
        this.viewContainerRef.forEach((view, index) => view.context.update({ index, count }));
        this.viewContainerRef.forEach(view => view.detectChanges());
    }
    onDestroy() {
        this.viewContainerRef.clear();
    }
}
let ForDirective = (() => {
    let _classDecorators = [Directive({
            selector: '*for',
            successors: ['*empty'],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AbstractForDirective;
    var ForDirective = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ForDirective = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        of = input.required({
            transform: forOf => {
                this._forOf = forOf;
                this._updateUI();
                return this._forOf;
            }
        });
        trackBy = input(TRACK_BY_IDENTITY, {
            transform: trackBy => {
                this._forTrackBy = typeof trackBy == 'function' ? trackBy : TRACK_BY_IDENTITY;
                this._updateUI();
                return this._forTrackBy;
            },
        });
    };
    return ForDirective = _classThis;
})();
export { ForDirective };
let ForOfDirective = (() => {
    let _classDecorators = [Directive({
            selector: '*forOf',
            successors: ['*empty'],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AbstractForDirective;
    var ForOfDirective = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ForOfDirective = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        of = input.required({
            transform: forOf => {
                this._forOf = forOf;
                this._updateUI();
                return this._forOf;
            }
        });
        trackBy = input(TRACK_BY_IDENTITY, {
            transform: trackBy => {
                this._forTrackBy = typeof trackBy == 'function' ? trackBy : TRACK_BY_IDENTITY;
                this._updateUI();
                return this._forTrackBy;
            },
        });
    };
    return ForOfDirective = _classThis;
})();
export { ForOfDirective };
let ForAwaitDirective = (() => {
    let _classDecorators = [Directive({
            selector: '*forAwait',
            successors: ['*empty'],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = StructuralDirective;
    var ForAwaitDirective = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ForAwaitDirective = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        _forAwait;
        of = input.required({
            transform: forAwait => {
                this._forAwait = forAwait;
                this._updateUI();
                return this._forAwait;
            }
        });
        async _updateUI() {
            this.viewContainerRef.clear();
            const emptySuccessor = this.getSuccessor('*empty');
            if (!this._forAwait) {
                if (emptySuccessor) {
                    this.viewContainerRef.createEmbeddedView(emptySuccessor);
                }
                return;
            }
            const previousContext = [];
            const asList = [];
            let index = 0;
            for await (const iterator of this._forAwait) {
                asList.push(iterator);
                const context = new ForOfContext(iterator, asList, index, asList.length);
                const view = this.viewContainerRef.createEmbeddedView(this.templateRef, { context });
                previousContext.forEach(c => c.count = asList.length);
                previousContext.push(view.context);
                index++;
            }
        }
        onDestroy() {
            this.viewContainerRef.clear();
        }
    };
    return ForAwaitDirective = _classThis;
})();
export { ForAwaitDirective };
let ForInDirective = (() => {
    let _classDecorators = [Directive({
            selector: '*forIn',
            successors: ['*empty'],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = StructuralDirective;
    var ForInDirective = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ForInDirective = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        _forIn;
        in = input.required({
            transform: forIn => {
                this._forIn = forIn;
                this._updateUI();
                return this._forIn;
            }
        });
        _updateUI() {
            this.viewContainerRef.clear();
            const emptySuccessor = this.getSuccessor('*empty');
            if (!this._forIn) {
                if (emptySuccessor) {
                    this.viewContainerRef.createEmbeddedView(emptySuccessor);
                }
                return;
            }
            const keys = Object.keys(this._forIn);
            keys.forEach((key, index, array) => {
                const context = new ForInContext(key, array, index, array.length);
                this.viewContainerRef.createEmbeddedView(this.templateRef, { context });
            });
            if (keys.length == 0 && emptySuccessor) {
                this.viewContainerRef.createEmbeddedView(emptySuccessor);
            }
        }
        onDestroy() {
            this.viewContainerRef.clear();
        }
    };
    return ForInDirective = _classThis;
})();
export { ForInDirective };
//# sourceMappingURL=for.js.map