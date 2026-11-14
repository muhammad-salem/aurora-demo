import { __esDecorate, __runInitializers } from "../../../tslib@2.9.1/tslib.es6.js";
import { ChangeDetectorRef, inject, Pipe } from '../../core@5.0.1/index.js';
let AsyncRelativeTimeFormatPipe = (() => {
    let _classDecorators = [Pipe({
            name: 'rtf',
            asynchronous: true
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AsyncRelativeTimeFormatPipe = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AsyncRelativeTimeFormatPipe = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        cd = inject(ChangeDetectorRef);
        input;
        latestInput;
        intervalId = setInterval(() => this.update(), 1000);
        rtf = this.createRTF('en');
        transform(date, unit, lang, options) {
            this.latestInput = { date, unit, lang, options };
            return this.calcValue();
        }
        createRTF(lang, options) {
            return new Intl.RelativeTimeFormat(lang, options);
        }
        getFormatter() {
            if (this.rtf
                && this.input?.unit === this.latestInput?.unit
                && this.input?.lang === this.latestInput?.lang
                && this.input?.options?.style == this.latestInput?.options?.style
                && this.input?.options?.numeric === this.latestInput?.options?.numeric
                && this.input?.options?.localeMatcher === this.latestInput?.options?.localeMatcher) {
                return this.rtf;
            }
            this.input = this.latestInput;
            return this.rtf = this.createRTF(this.input.lang, this.input.options);
        }
        calcValue() {
            const rtf = this.getFormatter();
            const nowSeconds = new Date().getSeconds();
            const seconds = this.input.date.getSeconds() - nowSeconds;
            return rtf.format(seconds, this.input.unit ?? 'seconds');
        }
        update() {
            this.calcValue();
            this.cd.markForCheck();
        }
        onDestroy() {
            clearInterval(this.intervalId);
        }
    };
    return AsyncRelativeTimeFormatPipe = _classThis;
})();
export { AsyncRelativeTimeFormatPipe };
//# sourceMappingURL=relative-time-format.pipe.js.map