import { __esDecorate, __runInitializers } from "../../../../tslib/tslib.es6.js";
import { Component, computed, JavaScriptInlineParser, signal, Stack } from '../../../aurora/index.js';
export class SheetIndexer {
    evaluate;
    constructor(evaluate) {
        this.evaluate = evaluate;
    }
    getCell(target, p) {
        const col = p.codePointAt(0) - 65;
        const row = Number.parseInt(p.substring(1)) - 1;
        return target[row][col];
    }
    has(target, p) {
        try {
            return this.getCell(target, p) !== undefined;
        }
        catch (ignore) {
            return false;
        }
    }
    get(target, p, receiver) {
        const cell = this.getCell(target, p);
        if (!cell) {
            return;
        }
        if (!cell.calculated) {
            this.evaluate(cell);
        }
        return cell.value;
    }
}
let ExcelSheetComponent = (() => {
    let _classDecorators = [Component({
            selector: 'excel-sheet',
            template: `<div class="card">
		<div class="card-body">
			<div class="card-title">
				<div class="mb-3">
					<label for="expr" class="form-label">{{current.col}}{{current.row}}</label>
					<input id="expr" name="expr" type="text" class="form-control" placeholder="Fx"
						[(value)]="current.expr" (change)="evaluateExpr()">
				</div>
			</div>
			<div class="card-text">
				<div class="d-flex">
					<table class="table table-dark table-bordered border-success-subtle ">
						<thead>
							<tr>
								<th scope="col">#</th>
								@for(let header of headers) {
									<th scope="col">{{header}}</th>
								}
							</tr>
						</thead>
						<tbody>
							@for(let row of sheet; let rowNum = index + 1;){
								<tr [class]="{'table-active': highlight.row == rowNum && !highlight.col}">
									<th id="{{rowNum}}" scope="row" @click="highlightRow(rowNum)">{{rowNum}}</th>
									@for(let cell of row) {
										<td id="{{cell.col+cell.row}}" [class]="{'table-active': highlight == cell}"
											@click="selectCell(cell)">
											{{cell.value}}
										</td>
									}
								</tr>
							}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>`
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ExcelSheetComponent = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ExcelSheetComponent = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        sheet = signal([]);
        headers = computed(() => this.sheet.get()[0].map(cell => cell.col));
        numbers = computed(() => this.sheet.get().map((_, index) => index));
        current = signal();
        highlight = signal();
        onInit() {
            const sheet = [];
            for (let row = 1; row < 50; row++) {
                const rows = [];
                for (let col = 'A'; col <= 'Z'; col = String.fromCharCode(col.codePointAt(0) + 1)) {
                    rows.push({ row, col, expr: '', value: '', calculated: false });
                }
                sheet.push(rows);
            }
            this.sheet.set(sheet);
            sheet[0][0].expr = '2.3';
            sheet[0][1].expr = 'A1 + 2.7';
            sheet[0][2].expr = 'PI';
            sheet[0][3].expr = 'trunc(C1)';
            this.selectCell(this.sheet.get()[0][0]);
            this.evaluateExpr();
        }
        evaluateExpr() {
            const sheet = this.sheet.get();
            const indexer = new Proxy(sheet, new SheetIndexer(cell => evalCell(cell)));
            const stack = Stack.for(indexer, Math);
            const evalCell = (cell) => {
                const ast = JavaScriptInlineParser.parse(cell.expr);
                cell.value = ast.get(stack);
                cell.calculated = true;
            };
            sheet.forEach(row => row.forEach(cell => {
                if (cell.calculated) {
                    return;
                }
                evalCell(cell);
            }));
            this.updateSheetRef();
        }
        updateSheetRef() {
            // clone array and reset calculated
            const selected = this.current.get();
            this.sheet.set(this.sheet.get().map(row => row.map(cell => Object.assign({}, cell, { calculated: false }))));
            const newSelectedRf = this.sheet.get().flatMap(arr => arr).find(cell => cell.row == selected.row && cell.col == selected.col);
            newSelectedRf && this.current.set(newSelectedRf);
        }
        highlightRow(rowNum) {
            this.highlight.set({ row: rowNum });
        }
        selectCell(cell) {
            this.current.set(cell);
            this.highlight.set(cell);
        }
    };
    return ExcelSheetComponent = _classThis;
})();
export { ExcelSheetComponent };
//# sourceMappingURL=sheet.js.map