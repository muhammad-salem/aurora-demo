import { __esDecorate, __runInitializers } from "../../../../tslib@2.9.1/tslib.es6.js";
import { Component, HostBinding, HostListener, Service, input, output, view, inject, viewChild, } from '../../../aurora@5.0.1/index.js';
let LogService = (() => {
    let _classDecorators = [Service()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var LogService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            LogService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        info(message) {
            let date = new Date();
            console.log(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} -- ${message}`);
        }
        log(...args) {
            let date = new Date();
            console.log(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} -- `, ...args);
        }
    };
    return LogService = _classThis;
})();
export { LogService };
const style = `

.valid {
	display: inline-block;
    width: 5rem;
    height: 5rem;
    margin: 0.25rem;
    background-color: #f5f5f5;
	border-color: #198754
}

.invalid {
	display: inline-block;
    width: 5rem;
    height: 5rem;
    margin: 0.25rem;
    background-color: #f5f5f5;
	border-color: #dc3545
}
`;
let PersonView = (() => {
    let _classDecorators = [Component({
            selector: 'person-view',
            template: `
			<p id="p-name" #nameArea class="{{className}}" onclick="onResize()">
				Person name is {{person.name}}
			</p>
			<p id="p-age" #ageArea>your age is: {{person.age}}, born in Year of {{yearOfBirth}}</p>
			<button class="btn btn-outline-primary" (click)="addOneYear()">+1</button>
			<button class="btn btn-outline-secondary" (click)="person.age--">-1</button>
			<div *if="person.age >= 18">
				Can have license
				<p>Data</p>
			</div>`,
            styles: style,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _on_decorators;
    let _on_initializers = [];
    let _on_extraInitializers = [];
    let _off_decorators;
    let _off_initializers = [];
    let _off_extraInitializers = [];
    let _onLoad_decorators;
    let _onResize_decorators;
    let _onClick_decorators;
    let _onClose_decorators;
    let _personChange_decorators;
    var PersonView = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _on_decorators = [HostBinding('class.on')];
            _off_decorators = [HostBinding('class.off')];
            _onLoad_decorators = [HostListener('window:load', ['$event'])];
            _onResize_decorators = [HostListener('window:resize', ['$event'])];
            _onClick_decorators = [HostListener('click', ['$event.target'])];
            _onClose_decorators = [HostListener('select', '$event.detail')];
            _personChange_decorators = [HostListener('person.age')];
            __esDecorate(this, null, _onLoad_decorators, { kind: "method", name: "onLoad", static: false, private: false, access: { has: obj => "onLoad" in obj, get: obj => obj.onLoad }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _onResize_decorators, { kind: "method", name: "onResize", static: false, private: false, access: { has: obj => "onResize" in obj, get: obj => obj.onResize }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _onClick_decorators, { kind: "method", name: "onClick", static: false, private: false, access: { has: obj => "onClick" in obj, get: obj => obj.onClick }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _onClose_decorators, { kind: "method", name: "onClose", static: false, private: false, access: { has: obj => "onClose" in obj, get: obj => obj.onClose }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _personChange_decorators, { kind: "method", name: "personChange", static: false, private: false, access: { has: obj => "personChange" in obj, get: obj => obj.personChange }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, null, _on_decorators, { kind: "field", name: "on", static: false, private: false, access: { has: obj => "on" in obj, get: obj => obj.on, set: (obj, value) => { obj.on = value; } }, metadata: _metadata }, _on_initializers, _on_extraInitializers);
            __esDecorate(null, null, _off_decorators, { kind: "field", name: "off", static: false, private: false, access: { has: obj => "off" in obj, get: obj => obj.off, set: (obj, value) => { obj.off = value; } }, metadata: _metadata }, _off_initializers, _off_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            PersonView = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        person = (__runInitializers(this, _instanceExtraInitializers), input({
            name: 'Delilah',
            age: 24
        }));
        resize = input(void 0, { transform: msg => this.logger.log(msg) });
        open = output();
        _select = output({ alias: '_select', bubbles: true });
        className = 'p1 m1';
        view = view();
        childName = viewChild('p-name');
        childAge = viewChild('p-age');
        on = __runInitializers(this, _on_initializers, void 0);
        off = (__runInitializers(this, _on_extraInitializers), __runInitializers(this, _off_initializers, void 0));
        logger = (__runInitializers(this, _off_extraInitializers), inject(LogService));
        onInit() {
            this.on = true;
            this.off = !this.on;
            this.logger.log('onInit', this);
            this.open.emit('init data');
        }
        get yearOfBirth() {
            return 2025 - this.person.get().age;
        }
        onLoad(e) {
            this.logger.log(this, e);
        }
        onResize(e) {
            this.logger.log(this, e);
        }
        onClick(target) {
            this.logger.log('target', target);
            this._select.emit(this.person.get());
            this.off = this.on;
            this.on = !this.on;
        }
        onClose(person) {
            this.logger.log('select person', person);
        }
        personChange() {
            this.logger.log('age change', this.person.get().age);
        }
        collectData(data, ddd, p) {
            return [];
        }
        addOneYear() {
            this.person.update(person => (person.age++, person));
        }
    };
    return PersonView = _classThis;
})();
export { PersonView };
let PersonEdit = (() => {
    let _classDecorators = [Component({
            selector: 'person-edit',
            template: `<form #form>
					<input if="show" type="text" [(value)]="person.name" />
					<input type="number" [(value)]="person.age" />
					<input type="button" (click)="printPerson()" value="Save" />
				</form>`
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var PersonEdit = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            PersonEdit = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        person = input();
        show = input(true);
        save = output();
        logger = inject(LogService);
        printPerson() {
            this.logger.log(this.person);
            this.save.emit(this.person.get());
        }
    };
    return PersonEdit = _classThis;
})();
export { PersonEdit };
let ProgressBar = (() => {
    let _classDecorators = [Component({
            selector: 'progress-bar',
            template: '<progress [max]="max" [value]="value"></progress>'
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ProgressBar = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ProgressBar = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        max = input();
        value = input();
    };
    return ProgressBar = _classThis;
})();
export { ProgressBar };
//# sourceMappingURL=person.js.map