import { ReactiveScope } from './scope.js';
function visitInnerScope(eventNames, events, scope, scopeTuples) {
    eventNames.forEach(eventName => {
        if (eventName.startsWith(':')) {
            return;
        }
        scopeTuples.push([eventName, scope]);
        const nextEvents = Object.keys(events[eventName]);
        if (!nextEvents.length) {
            return;
        }
        const innerScope = scope.getInnerScope(eventName) ?? scope.setInnerScope(eventName);
        visitInnerScope(nextEvents, events[eventName], innerScope, scopeTuples);
    });
}
export function findScopeByEventMap(events, stack) {
    const scopeTuples = [];
    const rootEventNames = Object.keys(events);
    rootEventNames.forEach(eventName => {
        const scope = stack.findScope(eventName);
        scopeTuples.push([eventName, scope]);
        const nextEvents = Object.keys(events[eventName]);
        if (!nextEvents.length) {
            return;
        }
        const eventScope = scope.getInnerScope(eventName) ?? scope.setInnerScope(eventName);
        visitInnerScope(nextEvents, events[eventName], eventScope, scopeTuples);
    });
    return scopeTuples;
}
export function findReactiveScopeByEventMap(events, stack) {
    const allScopes = findScopeByEventMap(events, stack);
    return allScopes.filter(tuple => tuple[1] instanceof ReactiveScope);
}
//# sourceMappingURL=event.js.map