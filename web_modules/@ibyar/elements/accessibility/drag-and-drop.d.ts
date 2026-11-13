export type AriaDropEffect = 'copy' | 'execute' | 'link' | 'move' | 'none' | 'popup';
export type AriaGrabbed = boolean | undefined;
export interface DragAndDropModel {
    ariaDropEffect: AriaDropEffect;
    ariaGrabbed: AriaGrabbed;
}
export declare const DragAndDropAttributes: string[];
export declare const DragAndDropAttributesMap: {
    'aria-dropeffect': string;
    'aria-grabbed': string;
};
//# sourceMappingURL=drag-and-drop.d.ts.map