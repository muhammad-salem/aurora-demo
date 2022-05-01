import { __decorate } from "../../../tslib/tslib.es6.js";
import { Pipe } from '../../core/index.js';
let DiffPipe = class DiffPipe {
    transform(input, ...diffArrays) {
        if (!Array.isArray(input)) {
            return input;
        }
        return diffArrays.reduce((d, c) => d.filter(e => !~c.indexOf(e)), input);
    }
};
DiffPipe = __decorate([
    Pipe({ name: 'diff' })
], DiffPipe);
export { DiffPipe };
//# sourceMappingURL=diff.pipe.js.map