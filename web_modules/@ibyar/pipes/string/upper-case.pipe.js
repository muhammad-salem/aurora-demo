var UpperCasePipe_1;
import { __decorate } from "../../../tslib/tslib.es6.js";
import { Pipe } from '../../core/index.js';
let UpperCasePipe = UpperCasePipe_1 = class UpperCasePipe {
    transform(value) {
        if (value == null)
            return null;
        if (typeof value !== 'string') {
            throw Error(`InvalidPipeArgument: '${value}' of '${UpperCasePipe_1.name}' pipe`);
        }
        return value.toUpperCase();
    }
};
UpperCasePipe = UpperCasePipe_1 = __decorate([
    Pipe({
        name: 'uppercase'
    })
], UpperCasePipe);
export { UpperCasePipe };
//# upper-case.pipe.js.map