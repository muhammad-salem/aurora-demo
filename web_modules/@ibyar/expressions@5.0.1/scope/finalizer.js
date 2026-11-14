const actionsFinalizer = !FinalizationRegistry ? undefined : new FinalizationRegistry(actions => actions.forEach(action => { try {
    action();
}
catch (e) { } }));
export function finalizerRegister(target, actions, unregisterToken) {
    actionsFinalizer?.register(target, actions, unregisterToken);
}
export function finalizerUnregister(unregisterToken) {
    actionsFinalizer?.unregister(unregisterToken);
}
//# sourceMappingURL=finalizer.js.map