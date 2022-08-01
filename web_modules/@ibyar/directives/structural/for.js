import { __decorate, __metadata } from "../../../tslib/tslib.es6.js";
import { Directive, Input, StructuralDirective } from '../../core/index.js';
import { diff, PatchOperation, PatchRoot } from '../../platform/index.js';
export class ForContext {
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
    constructor($implicit, forOf, index, count) {
        super($implicit, index, count);
        this.of = forOf;
    }
}
export class ForInContext extends ForContext {
    constructor($implicit, forIn, index, count) {
        super($implicit, index, count);
        this.in = forIn;
    }
}
const TRACK_BY_IDENTITY = (index, item) => item;
export class AbstractForDirective extends StructuralDirective {
    constructor() {
        super(...arguments);
        this._forTrackBy = TRACK_BY_IDENTITY;
        this._$implicitTrackBy = (index, item) => this._forTrackBy(index, item.$implicit);
    }
    _updateUI() {
        if (!this._forOf || this._forOf.length == 0) {
            this.viewContainerRef.clear();
            return;
        }
        const lastContext = new Array(this.viewContainerRef.length);
        for (let i = 0; i < lastContext.length; i++) {
            lastContext[i] = this.viewContainerRef.get(i).context;
        }
        const currentContext = this._forOf.map((item, index, array) => new ForOfContext(item, array, index, array.length));
        if (lastContext.length === 0) {
            currentContext.forEach(context => {
                this.viewContainerRef.createEmbeddedView(this.templateRef, { context });
            });
            return;
        }
        const patchActions = diff(lastContext, currentContext, { trackBy: this._$implicitTrackBy });
        if (patchActions.length === 0) {
            return;
        }
        else if (PatchRoot === patchActions[0]) {
            const views = currentContext.map(context => this.viewContainerRef.createEmbeddedView(this.templateRef, { context, insert: false }));
            this.viewContainerRef.updateViews(views);
        }
        else {
            const views = patchActions
                .map(patch => ({
                index: patch.nextIndex,
                view: this._getView(patch, lastContext),
            }))
                .filter(item => !!item.view)
                .sort((a, b) => a.index - b.index)
                .map(i => i.view);
            views.forEach(view => view.detectChanges());
            this.viewContainerRef.updateViews(views);
        }
    }
    _getView(patch, lastContext) {
        if (PatchOperation.REMOVE === patch.op) {
            return void 0;
        }
        if (PatchOperation.ADD === patch.op) {
            return this.viewContainerRef.createEmbeddedView(this.templateRef, { context: patch.item, index: patch.nextIndex });
        }
        if (PatchOperation.KEEP === patch.op) {
            lastContext[patch.nextIndex].update(patch.item);
            return this.viewContainerRef.get(patch.nextIndex);
        }
        lastContext[patch.currentIndex].update(patch.item);
        return this.viewContainerRef.get(patch.currentIndex);
    }
    onDestroy() {
        this.viewContainerRef.clear();
    }
}
let ForDirective = class ForDirective extends AbstractForDirective {
    set forOf(forOf) {
        this._forOf = forOf;
        this._updateUI();
    }
    set trackBy(trackBy) {
        this._forTrackBy = typeof trackBy == 'function' ? trackBy : TRACK_BY_IDENTITY;
        this._updateUI();
    }
    get trackBy() {
        return this._forTrackBy;
    }
};
__decorate([
    Input('of'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], ForDirective.prototype, "forOf", null);
__decorate([
    Input('trackBy'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], ForDirective.prototype, "trackBy", null);
ForDirective = __decorate([
    Directive({
        selector: '*for',
    })
], ForDirective);
export { ForDirective };
let ForOfDirective = class ForOfDirective extends AbstractForDirective {
    set forOf(forOf) {
        this._forOf = forOf;
        this._updateUI();
    }
    set trackBy(trackBy) {
        this._forTrackBy = typeof trackBy == 'function' ? trackBy : TRACK_BY_IDENTITY;
        this._updateUI();
    }
    get trackBy() {
        return this._forTrackBy;
    }
};
__decorate([
    Input('of'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], ForOfDirective.prototype, "forOf", null);
__decorate([
    Input('trackBy'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], ForOfDirective.prototype, "trackBy", null);
ForOfDirective = __decorate([
    Directive({
        selector: '*forOf',
    })
], ForOfDirective);
export { ForOfDirective };
let ForAwaitDirective = class ForAwaitDirective extends StructuralDirective {
    set forAwait(forAwait) {
        this._forAwait = forAwait;
        this._updateUI().then();
    }
    async _updateUI() {
        this.viewContainerRef.clear();
        if (!this._forAwait) {
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
__decorate([
    Input('of'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], ForAwaitDirective.prototype, "forAwait", null);
ForAwaitDirective = __decorate([
    Directive({
        selector: '*forAwait',
    })
], ForAwaitDirective);
export { ForAwaitDirective };
let ForInDirective = class ForInDirective extends StructuralDirective {
    set forIn(forIn) {
        this._forIn = forIn;
        this._updateUI();
    }
    _updateUI() {
        this.viewContainerRef.clear();
        if (!this._forIn) {
            return;
        }
        const keys = Object.keys(this._forIn);
        keys.forEach((key, index, array) => {
            const context = new ForInContext(key, array, index, array.length);
            this.viewContainerRef.createEmbeddedView(this.templateRef, { context });
        });
    }
    onDestroy() {
        this.viewContainerRef.clear();
    }
};
__decorate([
    Input('in'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], ForInDirective.prototype, "forIn", null);
ForInDirective = __decorate([
    Directive({
        selector: '*forIn',
    })
], ForInDirective);
export { ForInDirective };
//# sourceMappingURL=for.js.map