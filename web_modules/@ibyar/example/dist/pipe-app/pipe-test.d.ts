import { OnDestroy, OnInit } from '@ibyar/aurora';
export declare class PipeAppComponent implements OnInit, OnDestroy {
    text: string;
    obj: {
        a: number[];
        b: string;
        c: {
            d: never[];
            e: number;
            f: {
                5: string;
            }[];
        };
    };
    keyValueObject: {
        1: number;
        a: string;
    };
    keyValueArray: number[];
    keyValueMap: Map<number, string | number>;
    observable: import("rxjs").Observable<number>;
    array: string[];
    users: {
        firstName: string;
        lastName: string;
        age: number;
    }[];
    colors: string[];
    currentColor: import("@ibyar/expressions").Signal<string>;
    date: Date;
    lang: string;
    options: Intl.RelativeTimeFormatOptions;
    unit: Intl.RelativeTimeFormatUnit;
    langs: string[];
    units: string[];
    numerics: Intl.RelativeTimeFormatNumeric[];
    styles: Intl.ListFormatStyle[];
    localeMatchers: Intl.ListFormatLocaleMatcher[];
    private _subscription;
    onInit(): void;
    updateOptions(key: keyof Intl.RelativeTimeFormatOptions, value: Intl.RelativeTimeFormatOptions[keyof Intl.RelativeTimeFormatOptions]): void;
    onDestroy(): void;
}
//# sourceMappingURL=pipe-test.d.ts.map