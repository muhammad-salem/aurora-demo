import { __esDecorate, __runInitializers } from "../../../../tslib/tslib.es6.js";
import { ChangeDetectorRef, Component, inject, input, } from '../../../aurora/index.js';
let NumberItemComponent = (() => {
    let _classDecorators = [Component({
            selector: 'number-item',
            encapsulation: 'shadow-dom',
            shadowRootInit: { mode: 'closed' },
            template: `{{item}}`
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NumberItemComponent = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            NumberItemComponent = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        item = input.required();
        onInit() {
            console.log('model: on inti', this.item.get());
        }
        onViewMove() {
            console.log('view: on move', this.item.get());
        }
        onViewAdopted() {
            console.log('view: on adopted', this.item.get());
        }
        onDestroy() {
            console.log('model: on destroy', this.item.get());
        }
    };
    return NumberItemComponent = _classThis;
})();
export { NumberItemComponent };
let FetchApp = (() => {
    let _classDecorators = [Component({
            selector: 'fetch-app',
            zone: 'manual',
            imports: [NumberItemComponent],
            template: `	<div class="row gx-5">
		<div class="col">
			<ul class="list-group">
				<li *for="let item of list" class="list-group-item" [class]="{'active': selected === item}" @click="selected = item">
					<number-item [item]="item.num"></number-item>
				</li>
			</ul>
		</div>
		<div class="col">
			<button type="button" class="btn btn-link" @click="move(list.indexOf(selected), -1)">UP</button>
			<button type="button" class="btn btn-link" @click="move(list.indexOf(selected), +1)">Down</button>
			<button type="button" class="btn btn-link" @click="sortItems(+1)">SORT</button>
			<button type="button" class="btn btn-link" @click="reversSortItems()">Reverse SORT</button>
			<button type="button" class="btn btn-link" @click="delete(list.indexOf(selected))">DELETE</button>
			<button type="button" class="btn btn-link" @click="appendItem()">APPEND</button>
		</div>
	</div>`
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var FetchApp = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            FetchApp = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        list = [];
        selected;
        _cd = inject(ChangeDetectorRef);
        onInit() {
            fetch('https://raw.githubusercontent.com/ibyar/aurora/dev/example/src/fetch/data.json')
                .then(response => response.json())
                .then((list) => this.list = list.map(i => ({ num: +i })))
                .then(() => this._cd.markForCheck());
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
            if (this.selected) {
                this.selected = undefined;
                this.list.splice(index, 1);
            }
        }
        appendItem() {
            const num = this.list.map(i => i.num).reduce((a, b) => Math.max(a, b), 0) + 1;
            this.list.push({ num });
            this.selected = this.list.at(-1);
        }
        sortItems(direction) {
            this.list.sort((a, b) => (a.num - b.num) * direction);
        }
        reversSortItems() {
            this.list.reverse();
        }
    };
    return FetchApp = _classThis;
})();
export { FetchApp };
//# sourceMappingURL=fetch-app.js.map