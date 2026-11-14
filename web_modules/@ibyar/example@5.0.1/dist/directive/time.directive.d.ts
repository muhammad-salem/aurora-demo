import { OnDestroy, OnInit, StructuralDirective, PipeTransform } from '@ibyar/aurora';
export declare class ToDate implements PipeTransform<number, Date> {
    transform(timestamp: number): Date;
}
type TimeContext = {
    time: number;
    date: number;
    hh: number;
    mm: number;
    ss: number;
};
export declare class TimeDirective extends StructuralDirective implements OnInit, OnDestroy {
    private dateSubscription;
    updateContext: (context: TimeContext) => void;
    onInit(): void;
    private initUserView;
    private initDefaultView;
    private startTimer;
    onDestroy(): void;
}
export {};
//# sourceMappingURL=time.directive.d.ts.map