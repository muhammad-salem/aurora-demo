export function isComponentModelClass(target) {
    return Reflect.has(target, 'component');
}
export function getComponentView(modelClass, selector) {
    if (!isComponentModelClass(modelClass)) {
        return;
    }
    let viewClassName;
    if (selector) {
        viewClassName = modelClass.component[selector];
        if (!viewClassName) {
            throw new Error(`${modelClass.name} doesn't have ${selector} as view`);
        }
    }
    else {
        viewClassName = Object.keys(modelClass.component)[0];
    }
    return modelClass[viewClassName];
}
//# sourceMappingURL=utils.js.map