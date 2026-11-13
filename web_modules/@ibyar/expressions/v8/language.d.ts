export declare enum LanguageMode {
    Sloppy = 0,
    Strict = 1
}
export declare function isSloppy(mode: LanguageMode): mode is LanguageMode.Sloppy;
export declare function isStrict(mode: LanguageMode): mode is LanguageMode.Strict;
export declare function getLanguageMode(isModule: boolean): LanguageMode;
//# sourceMappingURL=language.d.ts.map