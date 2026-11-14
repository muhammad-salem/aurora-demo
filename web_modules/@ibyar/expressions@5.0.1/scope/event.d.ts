import { ExpressionEventMap } from '../api/expression.js';
import { ReactiveScope, Scope, Context } from './scope.js';
import { Stack } from './stack.js';
export declare function findScopeByEventMap(events: ExpressionEventMap, stack: Stack): [string, Scope<Context>][];
export declare function findReactiveScopeByEventMap(events: ExpressionEventMap, stack: Stack): [string, ReactiveScope<Context>][];
//# sourceMappingURL=event.d.ts.map