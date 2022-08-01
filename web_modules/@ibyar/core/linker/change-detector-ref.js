export class ChangeDetectorRef {
}
/**
 * create a change Detector Reference by property key.
 */
export function createChangeDetectorRef(scope, propertyKey) {
    return {
        detach() {
            scope.detach();
        },
        reattach() {
            scope.reattach();
        },
        markForCheck() {
            scope.emitChanges(propertyKey, scope.get(propertyKey));
        },
        detectChanges() {
            scope.detectChanges();
        },
        checkNoChanges() {
            scope.checkNoChanges();
        },
    };
}
export function createModelChangeDetectorRef(resolver) {
    return {
        detach() {
            resolver().detach();
        },
        reattach() {
            resolver().reattach();
        },
        markForCheck() {
            resolver().detectChanges();
        },
        detectChanges() {
            resolver().detectChanges();
        },
        checkNoChanges() {
            resolver().checkNoChanges();
        },
    };
}
//# sourceMappingURL=change-detector-ref.js.map