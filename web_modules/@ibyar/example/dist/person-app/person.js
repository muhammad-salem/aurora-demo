import { __decorate, __metadata, __param } from "../../../../tslib/tslib.es6.js";
import { Component, EventEmitter, HostBinding, HostListener, Input, Optional, Output, SelfSkip, Service, View, ViewChild, ViewChildren } from '../../../aurora/index.js';
let LogService = class LogService {
    constructor() { }
    info(message) {
        let date = new Date();
        console.log(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} -- ${message}`);
    }
};
LogService = __decorate([
    Service({ provideIn: 'root' }),
    __metadata("design:paramtypes", [])
], LogService);
export { LogService };
let PersonModel = class PersonModel {
    constructor(service, service2) {
        this.service = service;
        this.service2 = service2;
        this.person = {
            name: 'Delilah',
            age: 24
        };
        this.open = new EventEmitter();
        this._select = new EventEmitter();
        this.className = 'p1 m1';
    }
    onInit() {
        console.log('onInit', this);
        this.open.emit('init data');
    }
    get yearOfBirth() {
        return 2021 - this.person.age;
    }
    onLoad(e) {
        console.log(this, e);
    }
    onResize(e) {
        console.log(this, e);
    }
    onClick(event) {
        event.preventDefault();
        console.log('button', event, 'number of clicks:');
        this._select.emit(this.person);
    }
    onClose(data) {
        console.log('select', data);
    }
    personChange() {
        console.log('age change', this.person.age);
    }
    set resize(msg) {
        console.log(this, msg);
    }
    collectData(data, ddd, p) {
        return [];
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], PersonModel.prototype, "person", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], PersonModel.prototype, "open", void 0);
__decorate([
    Output('select'),
    __metadata("design:type", EventEmitter)
], PersonModel.prototype, "_select", void 0);
__decorate([
    View(),
    __metadata("design:type", HTMLElement)
], PersonModel.prototype, "view", void 0);
__decorate([
    ViewChild(HTMLParagraphElement, { id: 'p-name' }),
    __metadata("design:type", HTMLParagraphElement)
], PersonModel.prototype, "childName", void 0);
__decorate([
    ViewChild(HTMLParagraphElement, { id: 'p-age' }),
    __metadata("design:type", HTMLParagraphElement)
], PersonModel.prototype, "childAge", void 0);
__decorate([
    ViewChildren(HTMLParagraphElement),
    __metadata("design:type", Array)
], PersonModel.prototype, "children", void 0);
__decorate([
    HostBinding('class.valid'),
    __metadata("design:type", Boolean)
], PersonModel.prototype, "valid", void 0);
__decorate([
    HostBinding('class.invalid'),
    __metadata("design:type", Boolean)
], PersonModel.prototype, "invalid", void 0);
__decorate([
    HostListener('window:load', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", void 0)
], PersonModel.prototype, "onLoad", null);
__decorate([
    HostListener('window:resize', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", void 0)
], PersonModel.prototype, "onResize", null);
__decorate([
    HostListener('click', ['$event.target']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", void 0)
], PersonModel.prototype, "onClick", null);
__decorate([
    HostListener('select'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PersonModel.prototype, "onClose", null);
__decorate([
    HostListener('person.age'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PersonModel.prototype, "personChange", null);
__decorate([
    Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], PersonModel.prototype, "resize", null);
__decorate([
    __param(0, Optional()),
    __param(1, SelfSkip('GG')),
    __param(2, SelfSkip()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Array)
], PersonModel.prototype, "collectData", null);
PersonModel = __decorate([
    Component({
        selector: 'person-view',
        template: `
			<p id="p-name" #nameArea class="{{className}}" onclick="onResize()">
				Person name is {{person.name}}
			</p>
			<p id="p-age" #ageArea>your age is: {{person.age}}, born in Year of {{yearOfBirth}}</p>
			<div *if="person.age >= 18">
				Can have license
				<p>Data</p>
			</div>`
    }),
    __param(0, Optional()),
    __param(1, SelfSkip()),
    __metadata("design:paramtypes", [LogService, LogService])
], PersonModel);
export { PersonModel };
let PersonEdit = class PersonEdit {
    constructor() {
        this.show = true;
        this.save = new EventEmitter();
    }
    printPerson() {
        console.log(this.person);
        this.save.emit(this.person);
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], PersonEdit.prototype, "person", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PersonEdit.prototype, "show", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], PersonEdit.prototype, "save", void 0);
PersonEdit = __decorate([
    Component({
        selector: 'person-edit',
        template: `<form #form>
					<input if="show" type="text" [(value)]="person.name" />
					<input type="number" [(value)]="person.age" />
					<input type="button" (click)="printPerson()" value="Save" />
				</form>`
    })
], PersonEdit);
export { PersonEdit };
let ProgressBar = class ProgressBar {
};
__decorate([
    Input(),
    __metadata("design:type", Number)
], ProgressBar.prototype, "min", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], ProgressBar.prototype, "max", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], ProgressBar.prototype, "value", void 0);
ProgressBar = __decorate([
    Component({
        selector: 'progress-bar',
        template: '<progress [min]="min" [max]="max" [value]="value" ></progress>'
    })
], ProgressBar);
export { ProgressBar };
//# person.js.map