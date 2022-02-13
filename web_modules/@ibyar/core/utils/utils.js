export function ToCamelCase(str) {
    return str.replace(/([A-Z])/g, ' $1')
        .replace(/^./, function (str) { return str.toUpperCase(); })
        .replace(/ /g, '');
}
//# utils.js.map