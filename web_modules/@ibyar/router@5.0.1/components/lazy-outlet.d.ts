import { OnDestroy, StructuralDirective, Type } from '@ibyar/core';
export declare class LazyHiddenViewComponent {
    private hidden;
    hide(nativeElement: HTMLElement): void;
}
export declare class LazyOutletComponent<C extends {}> extends StructuralDirective implements OnDestroy {
    private viewRef;
    private hiddenView;
    private currentType;
    component: import("@ibyar/core").InputWithTransform<void, Type<C> | undefined>;
    onDestroy(): void;
}
//# sourceMappingURL=lazy-outlet.d.ts.map