import { OnDestroy, OnInit, OnViewAdopted, OnViewMove } from '@ibyar/aurora';
export declare class NumberItemComponent implements OnInit, OnViewMove, OnViewAdopted, OnDestroy {
    item: import("@ibyar/core").InputWithTransform<number, number>;
    onInit(): void;
    onViewMove(): void;
    onViewAdopted(): void;
    onDestroy(): void;
}
export declare class FetchApp implements OnInit {
    list: {
        num: number;
    }[];
    selected: {
        num: number;
    } | undefined;
    private _cd;
    onInit(): void;
    move(index: number, direction: number): void;
    delete(index: number): void;
    appendItem(): void;
    sortItems(direction: number): void;
    reversSortItems(): void;
}
//# sourceMappingURL=fetch-app.d.ts.map