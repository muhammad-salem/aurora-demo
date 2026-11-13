import { OnInit, ValueControl, WriteValueOptions } from '@ibyar/aurora';
export declare class CustomTextareaComponent implements OnInit, ValueControl<string> {
    private text;
    private disabled;
    private _onChange;
    onInit(): void;
    writeValue({ value, mode }: WriteValueOptions<string>): void;
    registerOnChange(fn: (_: any) => void): void;
    setDisabledState(isDisabled: boolean): void;
    onTextareaChange(text: string): void;
    updateTextarea(text: string): void;
}
export declare class CustomMessage implements ValueControl<string> {
    message: import("@ibyar/core").FormValueSignal<string | null>;
    private disabled;
    private _onChange;
    writeValue({ value, mode }: WriteValueOptions<string>): void;
    registerOnChange(fn: (_: any) => void): void;
    setDisabledState(isDisabled: boolean): void;
    onMessageChange(message: string): void;
    updateMessage(): void;
}
export declare class CustomInputValueControl implements ValueControl<number> {
    private _value;
    private _disabled;
    private _onChange;
    constructor();
    writeValue({ value, mode }: WriteValueOptions<number>): void;
    registerOnChange(fn: (_: any) => void): void;
    setDisabledState(isDisabled: boolean): void;
}
export declare class CustomInputElement {
    elId: import("@ibyar/core").InputWithTransform<string, string>;
    numberValue: import("@ibyar/core").FormValueSignal<number>;
}
export declare class AdvancedForm {
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
//# sourceMappingURL=advanced-form.d.ts.map