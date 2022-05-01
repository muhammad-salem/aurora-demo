import { __decorate, __metadata } from "../../../tslib/tslib.es6.js";
import { AttributeDirective, Directive, Input } from '../../core/index.js';
let StyleDirective = class StyleDirective extends AttributeDirective {
    set style(style) {
        if (typeof style === 'string') {
            for (const line of style.split(';')) {
                this._setStyleFromLine(line);
            }
        }
        else if (Array.isArray(style)) {
            for (const line of style) {
                this._setStyleFromLine(line);
            }
        }
        else if (typeof style === 'object') {
            for (var property in style) {
                this._setStyle(property, style[property]);
            }
        }
    }
    get style() {
        return this.el.getAttribute('style');
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
        if (value != null) {
            this.el.style.setProperty(name, value, priority);
        }
        else {
            this.el.style.removeProperty(name);
        }
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], StyleDirective.prototype, "style", null);
StyleDirective = __decorate([
    Directive({
        selector: 'style'
    })
], StyleDirective);
export { StyleDirective };
//# sourceMappingURL=style.js.map