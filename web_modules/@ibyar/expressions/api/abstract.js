function initPathExpressionEventMap(rootEventMap, path) {
    let lastMap = rootEventMap;
    for (const node of path) {
        const scopeName = node.path;
        let eventMap = lastMap[scopeName];
        if (eventMap) {
            lastMap = eventMap;
            continue;
        }
        lastMap = lastMap[scopeName] = {};
        if (node.computed) {
            node.computedPath.forEach(path => initPathExpressionEventMap(rootEventMap, path));
        }
    }
}
export class AbstractExpressionNode {
    static fromJSON(node, deserializer) {
        return deserializer(node);
    }
    getClass() {
        return this.constructor;
    }
    toJSON(key) {
        const json = this.toJson(key);
        json.type = Reflect.get(this.constructor, 'type');
        return json;
    }
    events() {
        const dependencyNodes = this.dependency();
        const eventMap = {};
        for (const node of dependencyNodes) {
            const dependencyPath = node.dependencyPath();
            initPathExpressionEventMap(eventMap, dependencyPath);
        }
        return eventMap;
    }
}
export class InfixExpressionNode extends AbstractExpressionNode {
    constructor(operator, left, right) {
        super();
        this.operator = operator;
        this.left = left;
        this.right = right;
    }
    static visit(node, visitNode, visitNodeList) {
        visitNode(node.getLeft());
        visitNode(node.getRight());
    }
    getOperator() {
        return this.operator;
    }
    getLeft() {
        return this.left;
    }
    getRight() {
        return this.right;
    }
    shareVariables(scopeList) {
        this.left.shareVariables(scopeList);
        this.right.shareVariables(scopeList);
    }
    set(context, value) {
        throw new Error(`${this.constructor.name}#set() of operator: '${this.operator}' has no implementation.`);
    }
    dependency(computed) {
        return this.left.dependency(computed).concat(this.right.dependency(computed));
    }
    dependencyPath(computed) {
        return this.left.dependencyPath(computed).concat(this.right.dependencyPath(computed));
    }
    toString() {
        return `${this.left.toString()} ${this.operator} ${this.right.toString()}`;
    }
    toJson(key) {
        return {
            operator: this.operator,
            left: this.left.toJSON(),
            right: this.right.toJSON()
        };
    }
}
export class ReturnValue {
    constructor(value) {
        this.value = value;
    }
    getValue() {
        return this.value;
    }
}
export class YieldValue {
    constructor(value) {
        this.value = value;
    }
    getValue() {
        return this.value;
    }
}
export class YieldDelegateValue {
    constructor(value) {
        this.value = value;
    }
    getValue() {
        return this.value;
    }
}
export class AwaitPromise {
    constructor(promise) {
        this.promise = promise;
    }
}
//# abstract.js.map