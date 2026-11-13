import { OnDestroy, StructuralDirective } from '@ibyar/aurora';
export interface RouteData {
    selector: string;
    is?: string;
}
export declare class RouterOutlet extends StructuralDirective implements OnDestroy {
    data: import("@ibyar/aurora").InputWithTransform<void, RouteData | undefined>;
    onDestroy(): void;
}
//# sourceMappingURL=router-outlet.d.ts.map