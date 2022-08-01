import { __decorate, __metadata } from "../../../../tslib/tslib.es6.js";
import { Component, Input } from '../../../aurora/index.js';
let Editor = class Editor {
    constructor() {
        this.text = '';
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], Editor.prototype, "text", void 0);
Editor = __decorate([
    Component({
        selector: 'text-editor',
        template: `<input type="number" [(value)]="text" />`
    })
], Editor);
export { Editor };
let EditorApp = class EditorApp {
    constructor() {
        this.model = { text: '25' };
    }
};
EditorApp = __decorate([
    Component({
        selector: 'app-edit',
        template: `
	<div>{{ model |> json }}</div>
	<text-editor id="editor_0" [(text)]="model.text" ></text-editor>
	<text-editor id="editor_1" [(text)]="model.text" *if="+model.text > 30"></text-editor>
	`
    })
], EditorApp);
export { EditorApp };
//# sourceMappingURL=shared-model.js.map