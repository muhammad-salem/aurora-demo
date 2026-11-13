import { OnDestroy, StructuralDirective } from '@ibyar/aurora';
declare class NotifyComponent {
    notifyMessage: import("@ibyar/core").InputWithoutTransform<string>;
    notifyType: import("@ibyar/core").InputWithoutTransform<string>;
}
export declare class NotifyUserDirective extends StructuralDirective implements OnDestroy {
    context: NotifyComponent;
    notifyMessage: import("@ibyar/core").InputWithTransform<string, string>;
    notifyType: import("@ibyar/core").InputWithTransform<string, string>;
    typeRef: import("@ibyar/expressions").SignalDestroyRef;
    messageRef: import("@ibyar/expressions").SignalDestroyRef;
    onDestroy(): void;
}
export {};
//# sourceMappingURL=notify-user.directive.d.ts.map