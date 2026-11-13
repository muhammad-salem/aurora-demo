import { __esDecorate, __runInitializers } from "../../../../tslib/tslib.es6.js";
import { Module } from '../../../aurora/index.js';
import { AddNoteDirective } from '../directive/add-note.directive.js';
import { NotifyUserDirective } from '../directive/notify-user.directive.js';
import { TimeDirective } from '../directive/time.directive.js';
import { ColorTogglerDirective } from '../directive/color-toggle.directive.js';
import { PersonEdit, PersonView } from './person.js';
let PersonModule = (() => {
    let _classDecorators = [Module({
            imports: [
                AddNoteDirective,
                NotifyUserDirective,
                TimeDirective,
                ColorTogglerDirective,
                PersonView,
                PersonEdit,
            ],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var PersonModule = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            PersonModule = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return PersonModule = _classThis;
})();
export { PersonModule };
//# sourceMappingURL=person-module.js.map