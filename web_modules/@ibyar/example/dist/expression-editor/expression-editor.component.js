import { __decorate, __metadata } from "../../../../tslib/tslib.es6.js";
import { Component, JavaScriptParser, LanguageMode, Scope, Stack, ViewChild } from '../../../aurora/index.js';
import { debounceTime, distinctUntilChanged, fromEvent, map } from '../../../../rxjs/dist/esm5/index.js';
const styles = `
	.content {
		flex: 1;
		display: flex;
	}

	.box {
		display: flex;
		min-height: min-content;
	}

	.column {
		padding: 20px;
		border-right: 1px solid #999;
		overflow-y: auto;
		max-width: 700px;
	}

	.column > pre, textarea {
		height: 750px;
		overflow: unset !important;
	}
`;
let ExpressionEditorComponent = class ExpressionEditorComponent {
    constructor() {
        this.ast = '';
        this.str = '';
        this.examples = [
            'IMPORT_ALL',
            'IMPORT_DEFAULT',
            'IMPORT_NAMED',
            'IMPORT_NAMED_ALIAS',
            'PLAY',
            'CLASS_EXAMPLE'
        ];
    }
    onInit() {
        this.loadExample('IMPORT_ALL');
    }
    loadExample(name) {
        this.example = name;
        import('./expression.spec.js')
            .then(module => (this.error.innerText = '', module))
            .then(module => this.loadCode(module[name]))
            .then(code => this.editor.value = code);
    }
    afterViewInit() {
        fromEvent(this.editor, 'change')
            .pipe(map(() => this.editor.value), debounceTime(400), distinctUntilChanged()).subscribe(code => this.loadCode(code));
    }
    loadCode(code) {
        if (!code) {
            this.ast = '';
            this.str = '';
            return;
        }
        try {
            const node = JavaScriptParser.parse(code, { mode: LanguageMode.Strict });
            this.ast = JSON.stringify(node.toJSON(), undefined, 2);
            this.str = node.toString();
            this.node = node;
        }
        catch (e) {
            this.error.innerText = e.stack ?? e ?? 'exception';
            console.error(e);
        }
        return code;
    }
    stringify(str) {
        return JSON.stringify(str, undefined, 2);
    }
    executeCode() {
        this.logs.innerText = '';
        this.error.innerText = '';
        try {
            const mockConsole = {
                log: (...data) => {
                    this.logs.innerText += data.map(item => this.stringify(item)).join(' ').concat('\n');
                    console.log(...data);
                },
            };
            mockConsole.log('run code...');
            const context = { console: mockConsole };
            const stack = new Stack(Scope.for(context));
            this.node.get(stack);
        }
        catch (e) {
            this.error.innerText = e.stack ?? e ?? 'exception';
            console.error(e);
        }
    }
    splitUnderscore(title) {
        return title.replace(/_/g, ' ');
    }
};
__decorate([
    ViewChild('editor'),
    __metadata("design:type", HTMLTextAreaElement)
], ExpressionEditorComponent.prototype, "editor", void 0);
__decorate([
    ViewChild('logs'),
    __metadata("design:type", HTMLPreElement)
], ExpressionEditorComponent.prototype, "logs", void 0);
__decorate([
    ViewChild('error'),
    __metadata("design:type", HTMLPreElement)
], ExpressionEditorComponent.prototype, "error", void 0);
ExpressionEditorComponent = __decorate([
    Component({
        selector: 'expression-editor',
        template: `
		<div class="content w-100 h-100">
			<div class="box">
				<div class="column">
					<div class="h-25 d-flex flex-column d-flex justify-content-evenly">
						<button class="btn"
							*for="let name of examples"
							@click="loadExample(name)"
							[class]="{'btn-outline-primary': example == name, 'btn-link': example != name}"
							>{{name |> splitUnderscore |> titlecase}}</button>
					</div>
				</div>
				<div class="column"><textarea #editor cols="40" rows="700">...</textarea></div>
				<div class="column">
					<div class="d-flex flex-column">
						<pre class="text-success">{{str}}</pre>
						<button class="btn btn-outline-primary" (click)="executeCode()">Run</button>
						<pre class="text-secondary" #logs></pre>
						<pre class="text-danger" #error></pre>
					</div>
				</div>
				<div class="column"><pre>{{ast}}</pre></div>
			</div>
		</div>
		`,
        styles: styles,
    })
], ExpressionEditorComponent);
export { ExpressionEditorComponent };
//# sourceMappingURL=expression-editor.component.js.map