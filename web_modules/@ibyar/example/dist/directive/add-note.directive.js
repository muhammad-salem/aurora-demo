import { __decorate, __metadata } from "../../../../tslib/tslib.es6.js";
import { Component, Directive, Input, StructuralDirective } from '../../../aurora/index.js';
let NoteComponent = class NoteComponent {
};
__decorate([
    Input(),
    __metadata("design:type", String)
], NoteComponent.prototype, "directiveName", void 0);
NoteComponent = __decorate([
    Component({
        selector: 'note-component',
        template: `<div class="alert alert-success" role="alert">structural directive name: '{{directiveName}}'</div>`
    })
], NoteComponent);
let AddNoteDirective = class AddNoteDirective extends StructuralDirective {
    onInit() {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
        const node = this.viewContainerRef.createComponent(NoteComponent);
        node.directiveName = '*add-note';
    }
    onDestroy() {
        this.viewContainerRef.clear();
    }
};
AddNoteDirective = __decorate([
    Directive({
        selector: '*add-note',
    })
], AddNoteDirective);
export { AddNoteDirective };
//# add-note.directive.js.map