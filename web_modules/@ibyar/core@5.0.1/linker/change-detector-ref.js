export class ChangeDetectorRef {
}
class ChangeDetectorRefImpl extends ChangeDetectorRef {
    ref;
    constructor(ref) {
        super();
        this.ref = ref;
    }
    detach() {
        this.ref.detach();
    }
    reattach() {
        this.ref.reattach();
    }
    markForCheck() {
        this.ref.markForCheck();
    }
    detectChanges() {
        this.ref.detectChanges();
    }
    checkNoChanges() {
        this.ref.checkNoChanges();
    }
}
/**
 * create a change Detector Reference by property key.
 */
export function createChangeDetectorRef(scope, propertyKey) {
    return new ChangeDetectorRefImpl({
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
    });
}
export function createModelChangeDetectorRef(resolver) {
    return new ChangeDetectorRefImpl({
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
    });
}
//# sourceMappingURL=change-detector-ref.js.map