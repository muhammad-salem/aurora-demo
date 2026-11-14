import { defer } from './defer.js';
export function iif(condition, trueResult, falseResult) {
    return defer(function () { return (condition() ? trueResult : falseResult); });
}
//# iif.js.map