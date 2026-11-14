var isArray = Array.isArray;
export function argsOrArgArray(args) {
    return args.length === 1 && isArray(args[0]) ? args[0] : args;
}
//# argsOrArgArray.js.map