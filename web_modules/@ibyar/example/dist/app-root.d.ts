import { OnInit, Type } from '@ibyar/aurora';
export interface App {
    path: string;
    title: string;
    component?: Type<object>;
    load: () => Promise<any>;
}
export declare class AppRoot implements OnInit {
    show: import("@ibyar/expressions").Signal<boolean>;
    appList: App[];
    selected: import("@ibyar/expressions").Signal<App | undefined>;
    test: import("@ibyar/core").OutputSignal<string>;
    eventTest: import("@ibyar/core").OutputSignal<number>;
    onInit(): void;
    loadPreviousApp(): void;
    lazyLoad(app: App): void;
}
//# sourceMappingURL=app-root.d.ts.map