var DebuggerStatement_1;
import { __decorate } from "../../../../tslib/tslib.es6.js";
import { AbstractExpressionNode } from '../abstract.js';
import { Deserializer } from '../deserialize/deserialize.js';
let DebuggerStatement = DebuggerStatement_1 = class DebuggerStatement extends AbstractExpressionNode {
    static fromJSON() {
        return DebuggerStatement_1.INSTANCE;
    }
    shareVariables(scopeList) {
    }
    set(stack, value) {
        throw new Error(`DebuggerStatement#set() has no implementation.`);
    }
    get(stack) {
        debugger;
    }
    dependency(computed) {
        return [];
    }
    dependencyPath(computed) {
        return [];
    }
    toString() {
        return 'debugger';
    }
    toJson() {
        return {};
    }
};
DebuggerStatement.INSTANCE = new DebuggerStatement_1();
DebuggerStatement = DebuggerStatement_1 = __decorate([
    Deserializer('DebuggerStatement')
], DebuggerStatement);
export { DebuggerStatement };
//# sourceMappingURL=debugger.js.map