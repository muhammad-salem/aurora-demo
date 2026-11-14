import { __esDecorate, __runInitializers } from "../../../../tslib@2.9.1/tslib.es6.js";
import { Component, view, viewChild } from '../../../aurora@5.0.1/index.js';
let ManualSlotExample = (() => {
    let _classDecorators = [Component({
            selector: 'manual-slot',
            encapsulation: 'shadow-dom',
            shadowRootInit: { mode: 'open', slotAssignment: 'manual' },
            template: `<div class="d-flex">
		<div>
			slot begin
			<slot #slot name="slot-el">NEED DESCRIPTION</slot>
			slot end
		</div>
		<div #div1 slot="slot-el">div A</div>
		<div #div2 slot="slot-el">div B</div>
		<div>
			<button class="btn btn-primary" @click="assignDiv1()">Assign div A</button>
			<button class="btn btn-primary" @click="assignDiv2()">Assign div B</button>
			<button class="btn btn-primary" @click="assign(++count)">Append div {{count + 1}}</button>
		</div>
		<div>
		</div>
	</div>`
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ManualSlotExample = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ManualSlotExample = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        count = 0;
        view = view(ManualSlotExample);
        slot = viewChild('slot');
        div1 = viewChild('div1');
        div2 = viewChild('div2');
        onInit() {
            // slot is not defined yet
            if (this.slot !== undefined) {
                console.error('slot should be not defied yet');
            }
        }
        afterViewInit() {
            // slot is defined.
            if (this.slot === undefined) {
                console.error('slot should be not `undefined` yet');
            }
            this.slot.get().addEventListener('slotchange', e => {
                const nodes = this.slot.get().assignedNodes();
                console.log(`Element in Slot "${this.slot.get().name}" changed to:`, nodes);
            });
            this.view.append(this.div1.get());
            this.view.append(this.div2.get());
        }
        assign(num) {
            const element = document.createElement('div');
            // element.setAttribute('name', 'slot-el');
            element.innerText = 'manual slot assignment ' + num;
            this.view.append(element);
            this.slot.get().assign(element);
            console.log(this.slot, element);
        }
        assignDiv1() {
            this.slot.get().assign(this.div1.get());
        }
        assignDiv2() {
            this.slot.get().assign(this.div2.get());
        }
    };
    return ManualSlotExample = _classThis;
})();
export { ManualSlotExample };
//# sourceMappingURL=manual-slot.js.map