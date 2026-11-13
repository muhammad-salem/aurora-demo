import { OnDestroy, StructuralDirective } from '@ibyar/core';
export interface RouteData {
    selector: string;
    is?: string;
}
export declare class RouterOutlet extends StructuralDirective implements OnDestroy {
    data: import("@ibyar/core").InputWithTransform<void, RouteData | undefined>;
    onDestroy(): void;
}
//# sourceMappingURL=router-outlet.d.ts.map