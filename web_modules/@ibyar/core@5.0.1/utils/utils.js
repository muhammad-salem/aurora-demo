export function ToCamelCase(str) {
    return str.replace(/([A-Z])/g, ' $1')
        // uppercase the first character
        .replace(/^./, function (str) { return str.toUpperCase(); })
        .replace(/ /g, '');
}
//# sourceMappingURL=utils.js.map