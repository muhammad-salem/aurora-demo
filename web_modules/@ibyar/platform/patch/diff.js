export var PatchOperation;
(function (PatchOperation) {
    PatchOperation["ADD"] = "add";
    PatchOperation["REMOVE"] = "remove";
    PatchOperation["REPLACE"] = "replace";
    PatchOperation["MOVE"] = "move";
    PatchOperation["KEEP"] = "keep";
})(PatchOperation || (PatchOperation = {}));
;
export const PatchRoot = { op: PatchOperation.REPLACE, root: true };
export class JSONPatch {
    diffArray(input, output, options) {
        const trackBy = options?.trackBy;
        const identityInput = (trackBy && input.map((item, index) => trackBy(index, item))) ?? input;
        const identityOutput = (trackBy && output.map((item, index) => trackBy(index, item))) ?? output;
        const diffArray = [];
        identityInput.forEach((item, index) => {
            const nextIndex = identityOutput.indexOf(item);
            const op = nextIndex == -1
                ? PatchOperation.REMOVE
                : index == nextIndex
                    ? PatchOperation.KEEP
                    : PatchOperation.MOVE;
            diffArray.push({
                currentIndex: index,
                nextIndex: nextIndex,
                op: op,
                item: output[nextIndex]
            });
        });
        identityOutput.forEach((item, index) => {
            const oldIndex = identityInput.indexOf(item);
            if (oldIndex == -1) {
                diffArray.push({
                    currentIndex: -1,
                    nextIndex: index,
                    op: PatchOperation.ADD,
                    item: output[index]
                });
            }
        });
        const patchArray = new Array(output.length);
        let i = 0;
        diffArray.forEach(item => {
            if (item.ignore) {
                return;
            }
            let patch = item;
            if (PatchOperation.REMOVE == item.op) {
                const replacedItem = diffArray.find(r => !r.ignore && r.nextIndex == item.currentIndex);
                if (replacedItem) {
                    if (PatchOperation.MOVE == replacedItem.op) {
                        item.ignore = replacedItem.ignore = true;
                        return;
                    }
                    else {
                        replacedItem.ignore = true;
                        patch = {
                            currentIndex: item.currentIndex,
                            nextIndex: replacedItem.nextIndex,
                            op: PatchOperation.REPLACE,
                            item: replacedItem.item
                        };
                    }
                }
            }
            patchArray[i++] = patch;
        });
        const removed = patchArray
            .filter(item => !item.ignore && PatchOperation.REMOVE == item.op)
            .sort((a, b) => b.currentIndex - a.currentIndex);
        const apply = patchArray
            .filter(item => !item.ignore && PatchOperation.REMOVE != item.op)
            .sort((a, b) => a.nextIndex - b.nextIndex);
        return removed.concat(apply);
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
        return [PatchRoot];
    }
}
const jsonPatch = new JSONPatch();
export function diff(input, output, options) {
    return jsonPatch.diff(input, output, options);
}
//# diff.js.map