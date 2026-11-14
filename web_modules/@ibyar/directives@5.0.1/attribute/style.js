import { __esDecorate, __runInitializers } from "../../../tslib@2.9.1/tslib.es6.js";
import { AttributeDirective, Directive, input } from '../../core@5.0.1/index.js';
let StyleDirective = (() => {
    let _classDecorators = [Directive({
            selector: 'style'
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AttributeDirective;
    var StyleDirective = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            StyleDirective = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        style = input.required({
            transform: rawStyle => {
                this.setStyle(rawStyle);
                return this.el.style;
            }
        });
        setStyle(style) {
            if (typeof style === 'string') {
                const lines = style.split(/\s{0,};\s{0,}/).filter(str => str);
                for (const line of lines) {
                    this._setStyleFromLine(line);
                }
            }
            else if (Array.isArray(style)) {
                const lines = style.map(str => str.trim()).filter(str => str);
                for (const line of lines) {
                    this._setStyleFromLine(line);
                }
            }
            else if (typeof style === 'object') {
                for (var property in style) {
                    this._setStyle(property, style[property]);
                }
            }
        }
        _setStyleFromLine(line) {
            let split = line.split(':');
            const property = split[0].trim();
            if (split.length === 1) {
                this._setStyle(property);
                return;
            }
            split = split[1].split('!');
            const value = split[0].trim();
            const priority = split[1];
            this._setStyle(property, value, priority);
        }
        _setStyle(nameAndUnit, value, priority) {
            const [name, unit] = nameAndUnit.split('.');
            value = value != null && unit ? `${value}${unit}` : value;
            this.updateStyle(name, value, priority);
        }
        updateStyle(property, value, priority) {
            if (value != null) {
                this.el.style.setProperty(property, value, priority);
            }
            else {
                this.el.style.removeProperty(property);
            }
        }
    };
    return StyleDirective = _classThis;
})();
export { StyleDirective };
//# sourceMappingURL=style.js.map