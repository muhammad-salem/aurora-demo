import { PipeTransform } from '@ibyar/core';
export declare class TitleCasePipe implements PipeTransform<string, string> {
    transform(value: string): string;
    transform(value: null | undefined): null;
    transform(value: string | null | undefined): string | null;
}
//# sourceMappingURL=title-case.pipe.d.ts.map