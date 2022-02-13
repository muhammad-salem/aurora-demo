import { expressionTypes } from './type-store.js';
export function Deserializer(type) {
    return (target) => {
        Reflect.set(target, 'type', type);
        expressionTypes.set(type, target);
        return target;
    };
}
export function serializeNode(node) {
    return JSON.stringify(node);
}
export function deserialize(node) {
    const fromJSON = expressionTypes.get(node.type)?.fromJSON;
    if (fromJSON) {
        return fromJSON(node, deserialize);
    }
    else {
        throw new Error(`Couldn't find Expression class for name: ${JSON.stringify(node)}.`);
    }
}
export function deserializeNode(node) {
    const exp = JSON.parse(node);
    return deserialize(exp);
}
//# deserialize.js.map