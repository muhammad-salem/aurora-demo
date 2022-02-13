export class ChangeDetectorRef {
}
class ChangeDetectorRefImpl extends ChangeDetectorRef {
    constructor(changeDetectorRef) {
        super();
        this.changeDetectorRef = changeDetectorRef;
    }
    detach() {
        this.changeDetectorRef.detach();
    }
    reattach() {
        this.changeDetectorRef.reattach();
    }
    markForCheck() {
        this.changeDetectorRef.markForCheck();
    }
}
export function createChangeDetectorRef(scope, propertyKey) {
    const changeDetectorRef = {
        detach() {
            scope.detach();
        },
        reattach() {
            scope.reattach();
        },
        markForCheck() {
            scope.emitChanges(propertyKey, scope.get(propertyKey));
        }
    };
    return new ChangeDetectorRefImpl(changeDetectorRef);
}
//# change-detector-ref.js.map