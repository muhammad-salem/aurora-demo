import { Type } from '@ibyar/aurora';
export interface AppWindow {
    id: string;
    title: string;
    component?: Type<object>;
}
export declare class WindowManagerComponent {
    windows: import("@ibyar/expressions").Signal<AppWindow[]>;
    focusedWindow: import("@ibyar/expressions").Signal<Type<object> | undefined>;
    newWindowTitle: string;
    selectedWindowComponentPath: string;
    availableWindowComponents: {
        path: string;
        title: string;
        load: () => Promise<Type<object>>;
    }[];
    /**
     * Opens a new window by dynamically loading the specified component.
     */
    openWindow(): Promise<void>;
    /**
     * Closes a window by filtering it out of the windows signal.
     * @param id The ID of the window to close.
     */
    closeWindow(id: string): void;
}
//# sourceMappingURL=window-manager.component.d.ts.map