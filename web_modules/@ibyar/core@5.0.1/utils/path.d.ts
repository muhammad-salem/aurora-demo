export declare function fetchFromCache(url: string): Promise<string>;
export type TemplateUrl = {
    filename?: string;
    meta: {
        url: string;
    };
};
export declare function fetchHtmlFromModule(fileNameResolver: TemplateUrl): Promise<string>;
export declare function htmlFullPath(fileFullPath: string): Promise<string>;
export declare function fetchHtml(fileNameResolver: TemplateUrl | string): Promise<string>;
//# sourceMappingURL=path.d.ts.map