import { __esDecorate, __runInitializers } from "../../../../tslib/tslib.es6.js";
import { Component } from '../../../aurora/index.js';
let ControlFlowExample = (() => {
    let _classDecorators = [Component({
            selector: 'control-flow',
            template: `
		escape \\@ by adding double \\ before \\@
		@for(let item of list; let i = index, isFirst = first, isLast = last;) {
			@if(isFirst){
				<hr>
			}
			<p>index: {{i}}, item: {{item}}</p>
			@if(isLast){
				<hr>
			}
		}
		print yes => @for(let x of []){x}@empty{y}@if('bool'){e}@else if(false){b}@else{c}@for(let x of []){m}@empty{s}
		<hr>
		Local template variables ==>  \\@let double = 2 * x; \\@let y = x + 2, z = x - 2;
		<hr>
		@let double = 2 * x;
		@let y = x + 2, z = x - 2;
		<div class="d-flex flex-column">
			<span class="ms-5"> x - 2 = {{z}}</span>
			<span class="ms-5">x = {{x}} </span>
			<span class="ms-5"> x + 2 = {{y}}</span>
			<span class="ms-5"> x * 2 = {{double}}</span>
		</div>
		<hr>
		<table class="table">
			<thead>
				<tr>
					<th>number</th>
					<th>number + 2</th>
					<th>number - 2</th>
					<th>number * 2</th>
					<th>number / 2</th>
					<th>number % 2</th>
				</tr>
			</thead>
			<tbody>
				@for(let num of [1,2,3,4,5]){
					@let a = num + 2, b = num -2, c = num * 2, d = num /2, e = num %2;
					<tr>
						<td>{{num}}</td>
						<td>{{a}}</td>
						<td>{{b}}</td>
						<td>{{c}}</td>
						<td>{{d}}</td>
						<td>{{e}}</td>
					</tr>
				}
			</tbody>
		</table>
		<hr>
	`
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ControlFlowExample = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ControlFlowExample = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        x = 4;
        list = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        interval;
        onInit() {
            this.interval = setInterval(() => this.x++, 1000);
        }
        onDestroy() {
            clearInterval(this.interval);
        }
    };
    return ControlFlowExample = _classThis;
})();
export { ControlFlowExample };
//# sourceMappingURL=control-flow.js.map