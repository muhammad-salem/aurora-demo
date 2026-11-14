import { __esDecorate, __runInitializers } from "../../../tslib@2.9.1/tslib.es6.js";
import { Directive, input, StructuralDirective } from '../../core@5.0.1/index.js';
let IfThenElseDirective = (() => {
    let _classDecorators = [Directive({
            selector: '*if',
            successors: ['*else'],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = StructuralDirective;
    var IfThenElseDirective = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            IfThenElseDirective = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        _condition;
        _thenTemplateRef = this.templateRef;
        _elseTemplateRef;
        _lastCondition = null;
        if = input.required({
            transform: condition => {
                this._condition = condition;
                this._updateUI();
                return this._condition;
            }
        });
        then = input.required({
            transform: template => {
                this._thenTemplateRef = template;
                if (this._condition) {
                    // need to force rendering the new template in case of false condition
                    this._lastCondition = null;
                }
                this._updateUI();
                return this._thenTemplateRef;
            }
        });
        else = input(undefined, {
            transform: template => {
                this._elseTemplateRef = template;
                if (!this._condition) {
                    // need to force rendering the new template in case of false condition
                    this._lastCondition = null;
                }
                this._updateUI();
                return this._elseTemplateRef;
            }
        });
        _updateUI() {
            const elseSuccessor = this.getSuccessor('*else');
            if (this._condition !== this._lastCondition) {
                this._lastCondition = this._condition;
                this.viewContainerRef.clear();
                if (this._condition) {
                    this.viewContainerRef.createEmbeddedView(this._thenTemplateRef);
                }
                else if (this._elseTemplateRef) {
                    this.viewContainerRef.createEmbeddedView(this._elseTemplateRef);
                }
                else if (elseSuccessor) {
                    this.viewContainerRef.createEmbeddedView(elseSuccessor);
                }
            }
        }
        onDestroy() {
            this.viewContainerRef.clear();
        }
    };
    return IfThenElseDirective = _classThis;
})();
export { IfThenElseDirective };
//# sourceMappingURL=if.js.map