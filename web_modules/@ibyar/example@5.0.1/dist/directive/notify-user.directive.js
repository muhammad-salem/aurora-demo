import { __esDecorate, __runInitializers } from "../../../../tslib@2.9.1/tslib.es6.js";
import { Component, Directive, effect, input, StructuralDirective } from '../../../aurora@5.0.1/index.js';
let NotifyComponent = (() => {
    let _classDecorators = [Component({
            selector: 'notify-component',
            template: `<div class="alert alert-{{notifyType}}" role="alert">{{notifyMessage}}</div>`
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NotifyComponent = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            NotifyComponent = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        notifyMessage = input();
        notifyType = input();
    };
    return NotifyComponent = _classThis;
})();
let NotifyUserDirective = (() => {
    let _classDecorators = [Directive({
            selector: '*notify-user',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = StructuralDirective;
    var NotifyUserDirective = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            NotifyUserDirective = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        context = this.viewContainerRef.createComponent(NotifyComponent).instance;
        notifyMessage = input(undefined, { alias: 'message' });
        notifyType = input(undefined, { alias: 'type' });
        typeRef = effect(() => this.context.notifyType.set(this.notifyType.get()));
        messageRef = effect(() => this.context.notifyMessage.set(this.notifyMessage.get()));
        onDestroy() {
            this.typeRef.destroy();
            this.messageRef.destroy();
            this.viewContainerRef.clear();
        }
    };
    return NotifyUserDirective = _classThis;
})();
export { NotifyUserDirective };
//# sourceMappingURL=notify-user.directive.js.map