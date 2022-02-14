import { __decorate } from "../../../../tslib/tslib.es6.js";
import { Component } from '../../../aurora/index.js';
let FetchApp = class FetchApp {
    constructor() {
        this.list = [];
        this.selected = 1;
    }
    onInit() {
        fetch('/aurora-demo/web_modules/@ibyar/example/dist/fetch/data.json')
            .then(response => response.json())
            .then((list) => this.list = list.map(i => +i));
    }
    move(index, direction) {
        if (!this.list) {
            return;
        }
        if (direction == -1 && index > 0) {
            this.list.splice(index + direction, 2, this.list[index], this.list[index + direction]);
        }
        else if (direction == 1 && index < this.list.length - 1) {
            this.list.splice(index, 2, this.list[index + direction], this.list[index]);
        }
    }
    delete(index) {
        this.selected = this.list.at(index - 1) ?? 0;
        return this.list.splice(index, 1)[0];
    }
    appendItem() {
        this.list.push(this.list.length > 0 ? Math.max.apply(Math, this.list) + 1 : 0);
        this.selected = this.list.length - 1;
    }
    sortItems(direction) {
        this.list.sort((a, b) => (a - b) * direction);
    }
};
FetchApp = __decorate([
    Component({
        selector: 'fetch-app',
        template: `	<div class="row gx-5">
		<div class="col">
			<ul class="list-group">
				<li *for="let item of list" class="list-group-item" [class]="{'active': selected === item}" @click="selected = item">
					{{item}}
				</li>
			</ul>
		</div>
		<div class="col">
			<button type="button" class="btn btn-link" @click="move(list.indexOf(selected), -1)">UP</button>
			<button type="button" class="btn btn-link" @click="move(list.indexOf(selected), +1)">Down</button>
			<button type="button" class="btn btn-link" @click="sortItems(+1)">SORT</button>
			<button type="button" class="btn btn-link" @click="sortItems(-1)">Reverse SORT</button>
			<button type="button" class="btn btn-link" @click="delete(list.indexOf(selected))">DELETE</button>
			<button type="button" class="btn btn-link" @click="appendItem()">APPEND</button>
		</div>
	</div>`
    })
], FetchApp);
export { FetchApp };
//# fetch-app.js.map