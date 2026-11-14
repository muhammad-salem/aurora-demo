import { __esDecorate, __runInitializers } from "../../../tslib@2.9.1/tslib.es6.js";
import { AttributeDirective, Directive, input } from '../../core@5.0.1/index.js';
class DOMTokenListProxyHandler {
    get(target, className) {
        return target.contains(className);
    }
    set(target, className, newValue) {
        if (newValue) {
            target.add(className);
        }
        else {
            target.remove(className);
        }
        return true;
    }
}
const handler = new DOMTokenListProxyHandler();
let ClassDirective = (() => {
    let _classDecorators = [Directive({
            selector: 'class'
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AttributeDirective;
    var ClassDirective = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ClassDirective = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        proxy;
        'class' = input.required({
            alias: 'class',
            transform: rawClass => {
                this.setClass(rawClass);
                return (this.proxy ??= new Proxy(this.el.classList, handler));
            }
        });
        setClass(className) {
            if (typeof className === 'string') {
                const add = className.split(/[ ]{1,}/);
                this.updateClassList(add);
            }
            else if (Array.isArray(className)) {
                this.updateClassList(className);
            }
            else if (typeof className === 'object') {
                const keys = Object.keys(className);
                const add = keys.filter(key => className[key]);
                const remove = keys.filter(key => !className[key]);
                this.updateClassList(add, remove);
            }
        }
        updateClassList(add, remove) {
            remove && this.el.classList.remove(...remove);
            add && this.el.classList.add(...add);
        }
    };
    return ClassDirective = _classThis;
})();
export { ClassDirective };
//# sourceMappingURL=class.js.map