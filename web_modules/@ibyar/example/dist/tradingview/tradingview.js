import { __esDecorate, __runInitializers } from "../../../../tslib/tslib.es6.js";
import { Component, Input, JavaScriptParser, ModuleScopeResolver, Scope, Stack } from '../../../aurora/index.js';
let ScriptLoader = (() => {
    let _classDecorators = [Component({ selector: 'script-loader' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _src_decorators;
    let _src_initializers = [];
    let _src_extraInitializers = [];
    let _parameters_decorators;
    let _parameters_initializers = [];
    let _parameters_extraInitializers = [];
    var ScriptLoader = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _src_decorators = [Input('')];
            _parameters_decorators = [Input()];
            __esDecorate(null, null, _src_decorators, { kind: "field", name: "src", static: false, private: false, access: { has: obj => "src" in obj, get: obj => obj.src, set: (obj, value) => { obj.src = value; } }, metadata: _metadata }, _src_initializers, _src_extraInitializers);
            __esDecorate(null, null, _parameters_decorators, { kind: "field", name: "parameters", static: false, private: false, access: { has: obj => "parameters" in obj, get: obj => obj.parameters, set: (obj, value) => { obj.parameters = value; } }, metadata: _metadata }, _parameters_initializers, _parameters_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ScriptLoader = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        src = __runInitializers(this, _src_initializers, void 0);
        parameters = (__runInitializers(this, _src_extraInitializers), __runInitializers(this, _parameters_initializers, void 0));
        onInit() {
            console.log('src', this.src, 'parameters', this.parameters);
            fetch(this.src).then(response => response.text()).then(script => this.runScript(script));
        }
        runScript(script) {
            console.log('script', script);
            const ast = JavaScriptParser.parse(script);
            console.log('ast', ast);
            const global = Stack.for(window.global);
            const fileSystem = {};
            const resolver = new ModuleScopeResolver(global, fileSystem, { allowImportExternal: true });
            const scope = Scope.for({});
            const stack = Stack.moduleScope(resolver, this.src, scope);
            ast.get(stack);
        }
        run() {
            const source = `import "${this.src}";`;
            const ast = JavaScriptParser.parse(source);
            console.log('ast', ast);
            const global = Stack.for({});
            const fileSystem = {};
            const resolver = new ModuleScopeResolver(global, fileSystem, { allowImportExternal: true });
            const scope = Scope.for({});
            const stack = Stack.moduleScope(resolver, this.src, scope);
            ast.get(stack);
        }
        constructor() {
            __runInitializers(this, _parameters_extraInitializers);
        }
    };
    return ScriptLoader = _classThis;
})();
export { ScriptLoader };
let TradingViewGoldWidget = (() => {
    let _classDecorators = [Component({
            selector: 'gold-view',
            template: `<div style="height: 750px;">
		<!-- TradingView Widget BEGIN -->
	<div class="tradingview-widget-container">
		<div class="tradingview-widget-container__widget"></div>
		<div class="tradingview-widget-copyright">
			<a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
				<span class="blue-text">Track all markets on TradingView</span>
			</a>
		</div>
		<script-loader [src]="src" [parameters]="parameters" ></script-loader>
		<!-- <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js" async>
		{
			"symbol": "XAUUSDG*USDEGP",
			"interval": "1",
			"timezone": "Africa/Cairo",
			"theme": "dark",
			"style": "1",
			"locale": "en",
			"withdateranges": true,
			"allow_symbol_change": true,
			"details": true,
			"calendar": false,
			"studies": [
				"STD;Zig_Zag"
			]
		}
		</script> -->
</div>
<!-- TradingView Widget END -->
	</div>`
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TradingViewGoldWidget = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            TradingViewGoldWidget = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
        parameters = {
            "symbol": "XAUUSDG*USDEGP",
            "interval": "1",
            "timezone": "Africa/Cairo",
            "theme": "dark",
            "style": "1",
            "locale": "en",
            "withdateranges": true,
            "allow_symbol_change": true,
            "details": true,
            "calendar": false,
            "studies": [
                "STD;Zig_Zag"
            ]
        };
    };
    return TradingViewGoldWidget = _classThis;
})();
export { TradingViewGoldWidget };
//# sourceMappingURL=tradingview.js.map