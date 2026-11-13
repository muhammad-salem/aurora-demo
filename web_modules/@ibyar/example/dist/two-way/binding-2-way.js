import { __esDecorate, __runInitializers } from "../../../../tslib/tslib.es6.js";
import { Component, HostListener } from '../../../aurora/index.js';
import { interval } from '../../../../rxjs/dist/esm5/index.js';
let Binding2Way = (() => {
    let _classDecorators = [Component({
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
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _onDataOneChange_decorators;
    let _onDataTwoChange_decorators;
    var Binding2Way = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _onDataOneChange_decorators = [HostListener('data1')];
            _onDataTwoChange_decorators = [HostListener('data2')];
            __esDecorate(this, null, _onDataOneChange_decorators, { kind: "method", name: "onDataOneChange", static: false, private: false, access: { has: obj => "onDataOneChange" in obj, get: obj => obj.onDataOneChange }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _onDataTwoChange_decorators, { kind: "method", name: "onDataTwoChange", static: false, private: false, access: { has: obj => "onDataTwoChange" in obj, get: obj => obj.onDataTwoChange }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            Binding2Way = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        data1 = (__runInitializers(this, _instanceExtraInitializers), 'two way data binding');
        data2 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla laoreet';
        timer = interval(1000);
        onDataOneChange() {
            console.log(`onDataOneChange ==> ${this.data1}`);
        }
        onDataTwoChange() {
            console.log(`onDataTwoChange  ==> ${this.data2}`);
        }
    };
    return Binding2Way = _classThis;
})();
export { Binding2Way };
//# sourceMappingURL=binding-2-way.js.map