import { AfterViewInit, OnInit } from '@ibyar/aurora';
export declare class ManualSlotExample implements OnInit, AfterViewInit {
    count: number;
    view: import("@ibyar/core").HTMLComponent<ManualSlotExample>;
    slot: import("@ibyar/expressions").Signal<HTMLSlotElement>;
    div1: import("@ibyar/expressions").Signal<HTMLDivElement>;
    div2: import("@ibyar/expressions").Signal<HTMLDivElement>;
    onInit(): void;
    afterViewInit(): void;
    assign(num: number): void;
    assignDiv1(): void;
    assignDiv2(): void;
}
//# sourceMappingURL=manual-slot.d.ts.map