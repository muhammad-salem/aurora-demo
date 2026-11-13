import { OnInit, ValueControl, WriteValueOptions } from '@ibyar/aurora';
export declare class SimpleCustomTextareaComponent implements OnInit, ValueControl<string> {
    private text;
    private _onChange;
    onInit(): void;
    updateTextarea(text: string): void;
    writeValue(opt: WriteValueOptions<string>): void;
    registerOnChange(fn: (value?: string | null | undefined) => void): void;
    onChanges(): void;
}
export declare class SimpleCustomMessage {
    message: import("@ibyar/core").FormValueSignal<string | null>;
    updateMessage(): void;
    onMessageChange(text: string): void;
}
export declare class SimpleCustomInputElement implements OnInit {
    elId: import("@ibyar/core").InputWithTransform<string, string>;
    numberValue: import("@ibyar/core").FormValueSignal<number>;
    onInit(): void;
}
export declare class SimpleForm {
    model: {
        test: string;
        index: number;
        message: string;
        textArea: string;
    };
    data: {};
    onSubmit(event: Event): void;
    onFormData(event: FormDataEvent): void;
}
//# sourceMappingURL=simple-form.d.ts.map