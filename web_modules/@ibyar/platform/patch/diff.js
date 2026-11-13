/**
 * in memory patch operations
 */
export var PatchOperation;
(function (PatchOperation) {
    PatchOperation["ADD"] = "add";
    PatchOperation["REMOVE"] = "remove";
    PatchOperation["MOVE"] = "move";
})(PatchOperation || (PatchOperation = {}));
;
export class JSONPatch {
    diffArray(input, output, options) {
        const trackBy = options?.trackBy;
        const identityInput = (trackBy && input.map((item, index) => trackBy(index, item))) ?? input.slice();
        const identityOutput = (trackBy && output.map((item, index) => trackBy(index, item))) ?? output.slice();
        const diff = [];
        for (let currentIndex = identityInput.length - 1; currentIndex >= 0; currentIndex--) {
            const item = identityInput[currentIndex];
            const nextIndex = identityOutput.indexOf(item);
            if (nextIndex !== -1) {
                continue;
            }
            diff.push({
                nextIndex,
                currentIndex,
                op: PatchOperation.REMOVE,
                item: input[currentIndex]
            });
            identityInput.splice(currentIndex, 1);
        }
        identityOutput.forEach((item, nextIndex) => {
            const currentIndex = identityInput.indexOf(item);
            if (currentIndex === nextIndex) {
                return;
            }
            const op = currentIndex === -1 ? PatchOperation.ADD : PatchOperation.MOVE;
            diff.push({
                op,
                nextIndex,
                currentIndex,
                item: output[nextIndex]
            });
            if (op === PatchOperation.MOVE) {
                identityInput.splice(currentIndex, 1);
            }
            identityInput.splice(nextIndex, 0, item);
        });
        return diff;
    }
    diffObject(input, output) {
        return [];
    }
    diff(input, output, options) {
        if (Array.isArray(input) && Array.isArray(output)) {
            return this.diffArray(input, output, options);
        }
        else if (typeof input == 'object' && typeof output == 'object') {
            return this.diffObject(input, output);
        }
        throw new Error('Not supported operation');
    }
}
const jsonPatch = new JSONPatch();
export function diff(input, output, options) {
    return jsonPatch.diff(input, output, options);
}
//# sourceMappingURL=diff.js.map