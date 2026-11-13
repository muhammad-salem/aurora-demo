import { Person, PersonView } from './person.js';
export declare class PersonApp {
    appVersion: import("@ibyar/core").InputWithoutTransform<string>;
    title: string;
    appName: import("@ibyar/core").InputWithoutTransform<string>;
    name: import("@ibyar/core").InputWithoutTransform<string>;
    view: HTMLElement;
    people: Person[];
    i: number;
    fruits: string[];
    selectFruit: string;
    asyncIterable: {
        [Symbol.asyncIterator](): {
            i: number;
            next(): Promise<{
                done: boolean;
            }>;
        };
    };
    personUtils: {
        x: number;
        getDetails(person: Person): string;
    };
    controlFlowSyntax: string[];
    onPersonEdit(event: Event): void;
    onPerson(event: CustomEvent<Person>): void;
    printPerson(person: PersonView): void;
    onPersonViewClick(event: string, person: PersonView): void;
    selectPersonView(event: CustomEvent<Person>): void;
}
//# sourceMappingURL=person-app.d.ts.map