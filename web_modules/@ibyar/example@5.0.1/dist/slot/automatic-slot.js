import { __esDecorate, __runInitializers } from "../../../../tslib@2.9.1/tslib.es6.js";
import { Component } from '../../../aurora@5.0.1/index.js';
let ElementDetailsComponent = (() => {
    let _classDecorators = [Component({
            selector: 'element-details',
            encapsulation: 'shadow-dom',
            template: `
	<style>
		details {
			font-family: "Open Sans Light", Helvetica, Arial;
		}
		.name {
			font-weight: bold;
			color: #217ac0;
			font-size: 120%;
		}
		h4 {
			margin: 10px 0 -8px 0;
		}
		h4 span {
			background: #217ac0;
			padding: 2px 6px 2px 6px;
		}
		h4 span {
			border: 1px solid #cee9f9;
			border-radius: 4px;
		}
		h4 span {
			color: white;
		}
		dl, dt {
			margin-top: 10px !important;
		}
		.attributes {
			margin-left: 22px;
			font-size: 90%;
		}
		.attributes p {
			margin-left: 16px;
			font-style: italic;
		}
	</style>
	<details>
		<summary>
			<span>
				<code class="name">&lt;<slot name="element-name">NEED NAME</slot>&gt;</code>
				<span class="desc"><slot name="description">NEED DESCRIPTION</slot></span>
			</span>
		</summary>
		<div class="attributes">
			<h4><span>Attributes</span></h4>
			<slot name="attributes"><p>None</p></slot>
		</div>
	</details>
	<hr />`,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ElementDetailsComponent = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ElementDetailsComponent = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return ElementDetailsComponent = _classThis;
})();
export { ElementDetailsComponent };
let ElementDetailsExampleComponent = (() => {
    let _classDecorators = [Component({
            selector: 'element-details-example',
            template: `
		<element-details id="1">
			<span slot="element-name">slot</span>
			<span slot="description"> placeholder inside a web
				component that users can fill with their own markup,
				with the effect of composing different DOM trees together.
			</span>
			<dl slot="attributes">
				<dt>name</dt>
				<dd>The name of the slot.</dd>
			</dl>
		</element-details>
		<element-details id="2">
			<span slot="element-name">template</span>
			<span slot="description">A mechanism for holding client-side
				content that is not to be rendered when a page is
				loaded but may subsequently be instantiated during
				runtime using JavaScript.
			</span>
		</element-details>
		<element-details id="empty"></element-details>`
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ElementDetailsExampleComponent = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ElementDetailsExampleComponent = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return ElementDetailsExampleComponent = _classThis;
})();
export { ElementDetailsExampleComponent };
//# sourceMappingURL=automatic-slot.js.map