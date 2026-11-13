import { OnInit } from '@ibyar/aurora';
export type Cell = {
    row: number;
    col: string;
    expr: string;
    value: string | number;
    calculated: boolean;
};
export declare class SheetIndexer implements ProxyHandler<Cell[][]> {
    private evaluate;
    constructor(evaluate: (cell: Cell) => void);
    private getCell;
    has(target: Cell[][], p: string): boolean;
    get(target: Cell[][], p: string, receiver: any): string | number | undefined;
}
export declare class ExcelSheetComponent implements OnInit {
    sheet: import("@ibyar/expressions").Signal<Cell[][]>;
    headers: import("@ibyar/expressions").Computed<string[]>;
    numbers: import("@ibyar/expressions").Computed<number[]>;
    current: import("@ibyar/expressions").Signal<Cell>;
    highlight: import("@ibyar/expressions").Signal<{
        row: number;
        col?: string;
    }>;
    onInit(): void;
    evaluateExpr(): void;
    updateSheetRef(): void;
    highlightRow(rowNum: number): void;
    selectCell(cell: Cell): void;
}
//# sourceMappingURL=sheet.d.ts.map