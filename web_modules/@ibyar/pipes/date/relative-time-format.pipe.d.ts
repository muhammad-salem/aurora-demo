import { AsyncPipeTransform } from '@ibyar/core';
export declare class AsyncRelativeTimeFormatPipe implements AsyncPipeTransform<Date, string> {
    private cd;
    private input;
    private latestInput;
    private intervalId;
    private rtf;
    transform(date: Date, unit?: Intl.RelativeTimeFormatUnit, lang?: string | string[], options?: Intl.RelativeTimeFormatOptions): string;
    private createRTF;
    private getFormatter;
    private calcValue;
    private update;
    onDestroy(): void;
}
//# sourceMappingURL=relative-time-format.pipe.d.ts.map