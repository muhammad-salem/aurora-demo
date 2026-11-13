import { OnInit } from '@ibyar/aurora';
export declare class LogService {
    info(message: string): void;
    log(...args: any[]): void;
}
export interface Person {
    name: string;
    age: number;
}
export declare class PersonView implements OnInit {
    person: import("@ibyar/core").InputWithoutTransform<Person>;
    resize: import("@ibyar/core").InputWithTransform<void, string>;
    open: import("@ibyar/core").OutputSignal<string>;
    _select: import("@ibyar/core").OutputSignal<Person>;
    className: string;
    view: HTMLElement;
    childName: import("@ibyar/expressions").Signal<HTMLParagraphElement>;
    childAge: import("@ibyar/expressions").Signal<HTMLParagraphElement>;
    on: boolean;
    off: boolean;
    private logger;
    onInit(): void;
    get yearOfBirth(): number;
    onLoad(e: Event): void;
    onResize(e: Event): void;
    onClick(target: HTMLElement): void;
    onClose(person: Person): void;
    personChange(): void;
    collectData(data: Object, ddd: Person, p: Person): string[];
    addOneYear(): void;
}
export declare class PersonEdit {
    person: import("@ibyar/core").InputWithoutTransform<Person>;
    show: import("@ibyar/core").InputWithoutTransform<boolean>;
    save: import("@ibyar/core").OutputSignal<Person>;
    private logger;
    printPerson(): void;
}
export declare class ProgressBar {
    max: import("@ibyar/core").InputWithoutTransform<number>;
    value: import("@ibyar/core").InputWithoutTransform<number>;
}
//# sourceMappingURL=person.d.ts.map