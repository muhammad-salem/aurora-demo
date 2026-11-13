import { OnDestroy, StructuralDirective, Type } from '@ibyar/core';
export declare class ComponentOutlet<C extends {}> extends StructuralDirective implements OnDestroy {
    component: import("@ibyar/core").InputWithTransform<void, Type<C> | undefined>;
    onDestroy(): void;
}
//# sourceMappingURL=component-outlet.d.ts.map