import { __decorate, __metadata } from "../../../../tslib/tslib.es6.js";
import { Directive, StructuralDirective, Pipe, Component, Input } from '../../../aurora/index.js';
import { map, timer, timestamp } from '../../../../rxjs/dist/esm5/index.js';
let ToDate = class ToDate {
    transform(timestamp) {
        return new Date(timestamp);
    }
};
ToDate = __decorate([
    Pipe({
        name: 'toDate'
    })
], ToDate);
export { ToDate };
const stringLiteralFormat = '`${hh}:${mm}:${ss}`';
let ShowTimeComponent = class ShowTimeComponent {
    constructor() {
        this.time = 0;
        this.date = 0;
        this.hh = 0;
        this.mm = 0;
        this.ss = 0;
    }
};
__decorate([
    Input(),
    __metadata("design:type", Number)
], ShowTimeComponent.prototype, "time", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], ShowTimeComponent.prototype, "date", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], ShowTimeComponent.prototype, "hh", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], ShowTimeComponent.prototype, "mm", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], ShowTimeComponent.prototype, "ss", void 0);
ShowTimeComponent = __decorate([
    Component({
        selector: 'show-time',
        template: `<div class="alert alert-success" role="alert">
			<ul>
				<li>HH:MM:SS {{hh}}:{{mm}}:{{ss}}</li>
				<li>hh:mm:ss {{${stringLiteralFormat}}} format using string literal ==> \`$\{hh\}:$\{mm\}:$\{ss\}\`</li>
				<li>Time: {{time |> toDate}}</li>
				<li>Data: {{date}}</li>
			</ul>
		</div>`
    })
], ShowTimeComponent);
let TimeDirective = class TimeDirective extends StructuralDirective {
    onInit() {
        if (this.templateRef.astNode?.children?.length) {
            this.initUserView();
        }
        else {
            this.initDefaultView();
        }
        this.updateTime();
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
        this.context = viewRef.context;
    }
    initDefaultView() {
        this.context = this.viewContainerRef.createComponent(ShowTimeComponent);
    }
    updateTime() {
        this.dateSubscription = timer(1000, 1000).pipe(timestamp(), map(timestamp => timestamp.timestamp), map(timestamp => new Date(timestamp)), map(date => ({
            time: date.getTime(),
            date: date.getDate(),
            hh: date.getHours(),
            mm: date.getMinutes(),
            ss: date.getSeconds(),
        }))).subscribe(context => Object.assign(this.context, context));
    }
    onDestroy() {
        this.dateSubscription.unsubscribe();
        this.viewContainerRef.clear();
    }
};
TimeDirective = __decorate([
    Directive({
        selector: '*time',
    })
], TimeDirective);
export { TimeDirective };
//# sourceMappingURL=time.directive.js.map