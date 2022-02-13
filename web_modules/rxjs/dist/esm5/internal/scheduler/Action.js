import { __extends } from "../../../../../tslib/tslib.es6.js";
import { Subscription } from '../Subscription.js';
var Action = (function (_super) {
    __extends(Action, _super);
    function Action(scheduler, work) {
        return _super.call(this) || this;
    }
    Action.prototype.schedule = function (state, delay) {
        if (delay === void 0) { delay = 0; }
        return this;
    };
    return Action;
}(Subscription));
export { Action };
//# Action.js.map