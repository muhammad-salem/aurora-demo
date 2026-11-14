import { __esDecorate, __runInitializers } from "../../../../tslib@2.9.1/tslib.es6.js";
import { Directive, StructuralDirective, Pipe, Component, input, } from '../../../aurora@5.0.1/index.js';
import { map, timer, timestamp } from '../../../../rxjs@7.8.2/dist/esm5/index.js';
let ToDate = (() => {
    let _classDecorators = [Pipe({ name: 'toDate' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ToDate = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ToDate = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        transform(timestamp) {
            return new Date(timestamp);
        }
    };
    return ToDate = _classThis;
})();
export { ToDate };
const stringLiteralFormat = '`${hh}:${mm}:${ss}`';
let ShowTimeComponent = (() => {
    let _classDecorators = [Component({
            selector: 'show-time',
            template: `<div class="alert alert-success" role="alert">
			<ul>
				<li>HH:MM:SS {{hh}}:{{mm}}:{{ss}}</li>
				<li>hh:mm:ss {{${stringLiteralFormat}}} format using string literal ==> \`$\{hh\}:$\{mm\}:$\{ss\}\`</li>
				<li>Time: {{time |> toDate}}</li>
				<li>Day of month: {{date}}</li>
			</ul>
		</div>`
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ShowTimeComponent = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ShowTimeComponent = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        time = input(0);
        date = input(0);
        hh = input(0);
        mm = input(0);
        ss = input(0);
    };
    return ShowTimeComponent = _classThis;
})();
let TimeDirective = (() => {
    let _classDecorators = [Directive({
            selector: '*time',
            imports: [ShowTimeComponent]
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = StructuralDirective;
    var TimeDirective = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            TimeDirective = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        dateSubscription;
        updateContext;
        onInit() {
            if (this.templateRef.astNode?.children?.length) {
                this.initUserView();
            }
            else {
                this.initDefaultView();
            }
            this.startTimer();
        }
        initUserView() {
            const initValue = {
                time: 0,
                date: 0,
                hh: 0,
                mm: 0,
                ss: 0,
            };
            const viewRef = this.viewContainerRef.createEmbeddedView(this.templateRef, { context: initValue });
            this.updateContext = ctx => {
                Object.assign(viewRef.context, ctx);
                viewRef.detectChanges();
            };
        }
        initDefaultView() {
            const model = this.viewContainerRef.createComponent(ShowTimeComponent).instance;
            this.updateContext = ctx => {
                model.date.set(ctx.date);
                model.time.set(ctx.time);
                model.hh.set(ctx.hh);
                model.mm.set(ctx.mm);
                model.ss.set(ctx.ss);
            };
        }
        startTimer() {
            this.dateSubscription = timer(1000, 1000).pipe(timestamp(), map(timestamp => timestamp.timestamp), map(timestamp => new Date(timestamp)), map(date => ({
                time: date.getTime(),
                date: date.getDate(),
                hh: date.getHours(),
                mm: date.getMinutes(),
                ss: date.getSeconds(),
            }))).subscribe(this.updateContext);
        }
        onDestroy() {
            this.dateSubscription.unsubscribe();
            this.viewContainerRef.clear();
        }
    };
    return TimeDirective = _classThis;
})();
export { TimeDirective };
//# sourceMappingURL=time.directive.js.map