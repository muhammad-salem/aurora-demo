var LowerCasePipe_1;
import { __decorate } from "../../../tslib/tslib.es6.js";
import { Pipe } from '../../core/index.js';
let LowerCasePipe = LowerCasePipe_1 = class LowerCasePipe {
    transform(value) {
        if (value == null)
            return null;
        if (typeof value !== 'string') {
            throw Error(`InvalidPipeArgument: '${value}' of '${LowerCasePipe_1.name}' pipe`);
        }
        return value.toLowerCase();
    }
};
LowerCasePipe = LowerCasePipe_1 = __decorate([
    Pipe({
        name: 'lowercase'
    })
], LowerCasePipe);
export { LowerCasePipe };
//# lower-case.pipe.js.map