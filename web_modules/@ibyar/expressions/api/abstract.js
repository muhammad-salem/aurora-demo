function initPathExpressionEventMap(rootEventMap, path) {
    let lastMap = rootEventMap;
    // let index = 0;
    for (const node of path) {
        const scopeName = node.path;
        let eventMap = lastMap[scopeName];
        if (eventMap) {
            lastMap = eventMap;
            continue;
        }
        // if ((index++) === path.length - 1) {
        // 	lastMap[scopeName] = undefined;
        // 	continue;
        // }
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
    type;
    loc;
    range;
    constructor(range, loc) {
        this.type = this.getClass().type;
        range && (this.range = range);
        loc && (this.loc = loc);
    }
    getClass() {
        return this.constructor;
    }
    toJSON(key) {
        const json = this.toJson(key);
        const index = {};
        this.range && (index.range = this.range);
        this.loc && (index.loc = this.loc);
        return Object.assign({ type: this.type }, json, index);
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
    operator;
    left;
    right;
    static visit(node, visitNode) {
        visitNode(node.getLeft());
        visitNode(node.getRight());
    }
    constructor(operator, left, right, range, loc) {
        super(range, loc);
        this.operator = operator;
        this.left = left;
        this.right = right;
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
    value;
    constructor(value) {
        this.value = value;
    }
    getValue() {
        return this.value;
    }
}
export class YieldValue {
    value;
    constructor(value) {
        this.value = value;
    }
    getValue() {
        return this.value;
    }
}
export class YieldDelegateValue {
    value;
    constructor(value) {
        this.value = value;
    }
    getValue() {
        return this.value;
    }
}
export class AwaitPromise {
    promise;
    node;
    declareVariable;
    constructor(promise) {
        this.promise = promise;
    }
}
//# sourceMappingURL=abstract.js.map