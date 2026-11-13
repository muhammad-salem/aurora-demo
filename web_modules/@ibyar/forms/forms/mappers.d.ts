export interface Mapper<A, B> {
    convert(input: A): B;
}
export declare class InputNumberMapper implements Mapper<string, number> {
    convert(input: string): number;
}
export declare class InputDateMapper implements Mapper<string | number, Date> {
    convert(input: string | number): Date;
}
export declare class InputDefaultMapper<T = any> implements Mapper<T, T> {
    convert(input: T): T;
}
export declare class Mappers {
    static default: InputDefaultMapper<any>;
    static number: InputNumberMapper;
    static date: InputDateMapper;
}
//# sourceMappingURL=mappers.d.ts.map