export type TagClassRef = typeof HTMLElement;
export interface Tag {
    readonly name?: string;
    readonly classRef: TagClassRef;
}
export declare function getClassRef(htmlElementName: string): TagClassRef;
export declare const DefaultTag: Tag;
/**
 * see https://html.spec.whatwg.org/multipage/indices.html#element-interfaces
 */
export declare const NativeTags: Tag[];
export declare function findByTagName(tagName: string | undefined): Tag;
export declare function isTagNameNative(tagName: string): boolean;
export declare function isHTMLUnknownElementTagName(tagName: string): boolean;
export declare function getTagName(classRef: TagClassRef): string | undefined;
//# sourceMappingURL=tags.d.ts.map