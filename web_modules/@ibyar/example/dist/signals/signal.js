import { __esDecorate, __runInitializers } from "../../../../tslib/tslib.es6.js";
import { Component, Service, computed, effect, inject, input, lazy, output, signal, untracked } from '../../../aurora/index.js';
let SignalScopeService = (() => {
    let _classDecorators = [Service()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var SignalScopeService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            SignalScopeService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        date = signal(new Date());
    };
    return SignalScopeService = _classThis;
})();
export { SignalScopeService };
let SimpleCounter = (() => {
    let _classDecorators = [Component({
            selector: 'simple-counter',
            zone: 'manual',
            template: `
			<!-- count is invoked as a getter! -->
			<p>Count {{ count }}</p>
			<p>{{ name }}</p> <!-- Not reactive! -->
			<button class="btn btn-outline-success" (click)="increment()">Increment count</button>
			<hr>
			<p>x {{ x }}</p>
			<p>y {{ y }}</p>
			<p>z {{ z }}</p>
			<p>a {{ a }}</p>
			<p>g {{ g }}</p>
			<p>h {{ h }}</p>
			<hr>

			<div class="row">
				<div class="col-4">
					<label class="form-label">X:</label>
					<input type="number" class="form-control" [value]="x" (input)="x = +$event.target.value">
				</div>
				<div class="col-4">
					<label class="form-label">Y:</label>
					<input type="number" class="form-control" [value]="y" (input)="y = +$event.target.value">
				</div>
				<div class="col-4">
					<label class="form-label">Z:</label>
					<input type="number" class="form-control" [value]="z" (input)="z = +$event.target.value">
				</div>
			</div>
			<div class="row">
				<div class="col-4">
					<div class="form-check">
						<input class="form-check-input" type="checkbox" id="a" [(checked)]="a">
						<label class="form-check-label" for="a">A</label>
					</div>
				</div>
			</div>
			<hr>


			<p>lazy x*y= {{ l }} <button class="btn btn-outline-success" (click)="updateLazyValue()">Refresh value</button></p>
			<p>double g = <span [class]="{'text-danger': e instanceof Error}">{{ e }}</span> (error if a = false)</p>

			<hr>
			<p>date: {{ date }}</p>

		`,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var SimpleCounter = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            SimpleCounter = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        count = signal(0); // WritableSignal<number>
        x = signal(6);
        y = signal(4);
        z = signal(20);
        a = signal(true);
        name = input('name');
        age = input.required();
        inputWithAlias = input('init-value', { alias: 'alias-name-1' });
        requiredInputWithAlias = input.required({ alias: 'alias-name-2' });
        event = output();
        logEvents = computed(() => console.log('output event:', this.event.get()));
        l = lazy(() => this.x.get() * this.y.get());
        e = computed(() => {
            if (this.a.get()) {
                return this.g.get() * 2;
            }
            throw new Error('throw exception');
        });
        Error = Error;
        g = computed(() => {
            if (this.a.get()) {
                return this.x.get() + this.y.get();
            }
            return this.x.get() + this.z.get();
        });
        h = computed(() => this.g.get());
        service = inject(SignalScopeService);
        date = computed(() => this.service.date.get().toISOString());
        effectSubscription = effect(() => {
            console.log('x', this.x.get(), 'y', this.y.get(), 'z', this.z.get(), 'a', this.a.get(), 'g', untracked(this.g), 'h', untracked(this.h), 'event', this.event.get());
        });
        interval;
        onInit() {
            this.interval = setInterval(() => this.service.date.update(() => new Date()), 1000);
            this.event.emit('x = ' + this.x.get());
        }
        increment() {
            console.log('c', this.count.get());
            this.count.update(c => c + 1);
        }
        updateLazyValue() {
            this.l.get();
        }
        onDestroy() {
            this.effectSubscription.destroy();
            clearInterval(this.interval);
        }
    };
    return SimpleCounter = _classThis;
})();
export { SimpleCounter };
//# sourceMappingURL=signal.js.map