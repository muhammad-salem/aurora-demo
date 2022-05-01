import { filter } from './filter.js';
export function skip(count) {
    return filter(function (_, index) { return count <= index; });
}
//# sourceMappingURL=skip.js.map