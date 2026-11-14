import { __esDecorate, __runInitializers } from "../../../../tslib@2.9.1/tslib.es6.js";
import { Component, Directive, input, Pipe, metadataHoler } from '../../../aurora@5.0.1/index.js';
function debugClass(constructor) {
    const metadata = metadataHoler.get(Reflect.get(constructor, Symbol.metadata));
    console.log(`${constructor.name} frozen`, JSON.parse(JSON.stringify(metadata)));
    console.log(`${constructor.name} ref`, metadata);
}
let Parent = (() => {
    let _classDecorators = [Pipe({ name: 'pipe' }), Directive({ selector: 'parent' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var Parent = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            Parent = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        name = input();
    };
    return Parent = _classThis;
})();
export { Parent };
debugClass(Parent);
let FirstChild = (() => {
    let _classDecorators = [Component({
            selector: 'first-child-comp'
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = Parent;
    var FirstChild = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            FirstChild = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        age = input();
    };
    return FirstChild = _classThis;
})();
export { FirstChild };
let LastChild = (() => {
    let _classDecorators = [Component({
            selector: 'last-child-comp'
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = Parent;
    var LastChild = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            LastChild = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        address = input();
    };
    return LastChild = _classThis;
})();
export { LastChild };
debugClass(Parent);
debugClass(FirstChild);
debugClass(LastChild);
//# sourceMappingURL=inherits.js.map