import { __decorate, __metadata } from "../../../../tslib/tslib.es6.js";
import { Component, Directive, Input, StructuralDirective } from '../../../aurora/index.js';
let NotifyComponent = class NotifyComponent {
};
__decorate([
    Input(),
    __metadata("design:type", String)
], NotifyComponent.prototype, "notifyMessage", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], NotifyComponent.prototype, "notifyType", void 0);
NotifyComponent = __decorate([
    Component({
        selector: 'notify-component',
        template: `<div class="alert alert-{{notifyType}}" role="alert">{{notifyMessage}}</div>`
    })
], NotifyComponent);
let NotifyUserDirective = class NotifyUserDirective extends StructuralDirective {
    constructor() {
        super(...arguments);
        this.context = {
            notifyMessage: 'no message',
            notifyType: 'primary'
        };
        this.elements = [];
    }
    set notifyMessage(message) {
        this.context.notifyMessage = message;
    }
    set notifyType(type) {
        this.context.notifyType = type;
    }
    onInit() {
        const context = this.viewContainerRef.createComponent(NotifyComponent);
        context.notifyMessage = this.context.notifyMessage;
        context.notifyType = this.context.notifyType;
        this.context = context;
    }
    onDestroy() {
        this.viewContainerRef.clear();
    }
};
__decorate([
    Input('message'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], NotifyUserDirective.prototype, "notifyMessage", null);
__decorate([
    Input('type'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], NotifyUserDirective.prototype, "notifyType", null);
NotifyUserDirective = __decorate([
    Directive({
        selector: '*notify-user',
    })
], NotifyUserDirective);
export { NotifyUserDirective };
//# sourceMappingURL=notify-user.directive.js.map