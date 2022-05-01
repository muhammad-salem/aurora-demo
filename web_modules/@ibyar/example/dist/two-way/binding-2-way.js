import { __decorate, __metadata } from "../../../../tslib/tslib.es6.js";
import { Component, HostListener } from '../../../aurora/index.js';
import { interval } from '../../../../rxjs/dist/esm5/index.js';
let Binding2Way = class Binding2Way {
    constructor() {
        this.data1 = 'two way data binding';
        this.data2 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla laoreet';
        this.timer = interval(1000);
    }
    onDataOneChange() {
        console.log(`onDataOneChange ==> ${this.data1}`);
    }
    onDataTwoChange() {
        console.log(`onDataTwoChange  ==> ${this.data2}`);
    }
};
__decorate([
    HostListener('data1'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Binding2Way.prototype, "onDataOneChange", null);
__decorate([
    HostListener('data2'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Binding2Way.prototype, "onDataTwoChange", null);
Binding2Way = __decorate([
    Component({
        selector: 'bind-2way',
        extend: 'div',
        template: `
    <div class="row">
        <input class="col-sm-12" type="text" [(value)]="data1" />
        <pre class="col-sm-12">{{data1}} {{timer |> async}}</pre>
		<input class="col-sm-12" type="text" [(value)]="data1" />
    </div>
    <div class="row">
        <input class="col-sm-12" type="text" [(value)]="data2" />
        <pre class="col-sm-12">{{data2 |> lowercase}} {{timer |> async}}</pre>
    </div>
    <hr />
    `
    })
], Binding2Way);
export { Binding2Way };
//# sourceMappingURL=binding-2-way.js.map