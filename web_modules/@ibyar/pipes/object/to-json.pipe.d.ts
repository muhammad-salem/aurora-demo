import { PipeTransform } from '@ibyar/core';
export declare class ToJSONPipe implements PipeTransform<string, any> {
    transform(text: string, reviver?: ((this: any, key: string, value: any) => any)): any;
}
//# sourceMappingURL=to-json.pipe.d.ts.map