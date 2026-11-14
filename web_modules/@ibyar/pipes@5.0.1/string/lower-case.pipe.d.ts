import { PipeTransform } from '@ibyar/core';
export declare class LowerCasePipe implements PipeTransform<string, string> {
    transform(value: string): string;
    transform(value: null | undefined): null;
    transform(value: string | null | undefined): string | null;
}
//# sourceMappingURL=lower-case.pipe.d.ts.map