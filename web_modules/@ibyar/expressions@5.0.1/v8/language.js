export var LanguageMode;
(function (LanguageMode) {
    LanguageMode[LanguageMode["Sloppy"] = 0] = "Sloppy";
    LanguageMode[LanguageMode["Strict"] = 1] = "Strict";
})(LanguageMode || (LanguageMode = {}));
;
export function isSloppy(mode) {
    return LanguageMode.Sloppy === mode;
}
export function isStrict(mode) {
    return LanguageMode.Strict === mode;
}
export function getLanguageMode(isModule) {
    return !!isModule ? LanguageMode.Strict : LanguageMode.Sloppy;
}
//# sourceMappingURL=language.js.map