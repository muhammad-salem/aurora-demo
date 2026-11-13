import { OnDestroy, StructuralDirective, Type } from '@ibyar/aurora';
export declare class ComponentOutlet<C extends {}> extends StructuralDirective implements OnDestroy {
    component: import("@ibyar/aurora").InputWithTransform<void, Type<C> | undefined>;
    onDestroy(): void;
}
//# sourceMappingURL=component-outlet.d.ts.map