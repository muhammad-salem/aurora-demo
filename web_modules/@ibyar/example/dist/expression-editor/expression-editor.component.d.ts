import { AfterViewInit, ExpressionNode, OnInit } from '@ibyar/aurora';
export declare class ExpressionEditorComponent implements OnInit, AfterViewInit {
    ast: string;
    str: string;
    node: ExpressionNode;
    moduleA: import("@ibyar/expressions").Signal<HTMLTextAreaElement>;
    moduleB: import("@ibyar/expressions").Signal<HTMLTextAreaElement>;
    logs: import("@ibyar/expressions").Signal<HTMLPreElement>;
    error: import("@ibyar/expressions").Signal<HTMLPreElement>;
    examples: string[];
    example: string;
    private _cd;
    onInit(): void;
    loadExample(name: keyof typeof import('./expression.spec.js')): void;
    afterViewInit(): void;
    loadCode(code: string | null | undefined): string | undefined;
    stringify(str: any): any;
    executeCode(): void;
    replaceUnderscore(title: string): string;
}
//# sourceMappingURL=expression-editor.component.d.ts.map