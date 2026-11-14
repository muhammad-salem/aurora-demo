import { __esDecorate, __runInitializers } from "../../../../tslib@2.9.1/tslib.es6.js";
import { Component, JavaScriptParser, LanguageMode, Scope, Stack, viewChild, ModuleScopeResolver, inject, ChangeDetectorRef, } from '../../../aurora@5.0.1/index.js';
import { debounceTime, distinctUntilChanged, fromEvent, map } from '../../../../rxjs@7.8.2/dist/esm5/index.js';
let ExpressionEditorComponent = (() => {
    let _classDecorators = [Component({
            selector: 'expression-editor',
            zone: 'manual',
            template: `
		<div class="content w-100 h-100">
			<div class="box">
				<div class="column column-200">
					<div class="h-25 d-flex flex-column d-flex justify-content-start gap-1">
						<button class="btn"
							*for="let name of examples"
							@click="loadExample(name)"
							[class]="{'btn-outline-primary': example == name, 'btn-link': example != name}"
							>{{name |> replaceUnderscore |> titlecase}}</button>
					</div>
				</div>
				<div>
					<div class="column">
						<h5>/moduleB</h5>
						<textarea #moduleB cols="40" rows="500">...</textarea>
					</div>
					<div class="column">
						<h5>/moduleA</h5>
						<textarea #moduleA cols="40" rows="200">...</textarea>
					</div>
				</div>
				<div class="column"><pre>{{ast}}</pre></div>
				<div class="column">
					<div class="d-flex flex-column">
						<pre class="text-success">{{str}}</pre>
						<button class="btn btn-outline-primary" (click)="executeCode()">Run</button>
						<pre class="text-secondary" #logs></pre>
						<pre class="text-danger" #error></pre>
					</div>
				</div>
			</div>
		</div>
		`,
            styles: `
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

		.column-200 {
			width: 200px;
		}

		textarea {
			height: 750px;
			overflow: unset !important;
		}
	`,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ExpressionEditorComponent = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ExpressionEditorComponent = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        ast = '';
        str = '';
        node;
        moduleA = viewChild('moduleA');
        moduleB = viewChild('moduleB');
        logs = viewChild('logs');
        error = viewChild('error');
        examples = [
            'FUNCTION_SCOPES',
            'IMPORT_ALL',
            'IMPORT_DEFAULT',
            'IMPORT_NAMED',
            'IMPORT_NAMED_ALIAS',
            'PLAY',
            'CLASS_EXAMPLE',
            'CLASS_SUPER_EXAMPLE',
        ];
        example;
        _cd = inject(ChangeDetectorRef);
        onInit() {
            this.loadExample('FUNCTION_SCOPES');
        }
        loadExample(name) {
            this.example = name;
            import('./expression.spec.js')
                .then(module => (this.error.get().innerText = '', module))
                .then(module => this.loadCode(module[name]))
                .then(code => this.moduleB.get().value = code)
                .then(() => this._cd.detectChanges());
        }
        afterViewInit() {
            fromEvent(this.moduleB.get(), 'change')
                .pipe(map(() => this.moduleB.get().value), debounceTime(400), distinctUntilChanged()).subscribe(code => this.loadCode(code));
            import('./expression.spec.js').then(module => this.moduleA.get().value = module.MODULE_A);
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
                this.error.get().innerText = e.stack ?? e ?? 'exception';
                console.error(e);
            }
            finally {
                this._cd.detectChanges();
            }
            return code;
        }
        stringify(str) {
            if (typeof str !== 'object') {
                return str;
            }
            return JSON.stringify(str, undefined, 1);
        }
        executeCode() {
            this.logs.get().innerText = '';
            this.error.get().innerText = '';
            try {
                const mockConsole = {
                    log: (...data) => {
                        this.logs.get().innerText += data.map(item => this.stringify(item)).join(' ').concat('\n');
                        console.log(...data);
                    },
                };
                mockConsole.log('run code...');
                const context = { Object, console: mockConsole };
                const stack = new Stack(Scope.for(context));
                const fileProvider = {
                    '/moduleA': this.moduleA.get().value,
                    '/moduleB': this.moduleB.get().value,
                };
                const resolver = new ModuleScopeResolver(stack, fileProvider, { allowImportExternal: false });
                resolver.resolve('/moduleB');
            }
            catch (e) {
                this.error.get().innerText = e.stack ?? e ?? 'exception';
                console.error(e);
            }
            finally {
                this._cd.detectChanges();
            }
        }
        replaceUnderscore(title) {
            return title.replace(/_/g, ' ');
        }
    };
    return ExpressionEditorComponent = _classThis;
})();
export { ExpressionEditorComponent };
//# sourceMappingURL=expression-editor.component.js.map