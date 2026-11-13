import { CallExpression, expressionVisitor, Identifier, JavaScriptParser, Literal, MemberExpression, Property, SequenceExpression, ThisExpression } from '../../expressions/index.js';
/**
 * scan model class for (inputs and output) property definitions with value by function call.
 */
export class RuntimeClassMetadata {
    static INSTANCE = new RuntimeClassMetadata();
    static scanMetadata(modelClass, scanParent = true) {
        return RuntimeClassMetadata.INSTANCE.scan(modelClass, scanParent);
    }
    static scanClass(modelClass, visitorCallback, scanParent = true) {
        return RuntimeClassMetadata.INSTANCE.scanModelClass(modelClass, visitorCallback, scanParent);
    }
    scan(modelClass, scanParent) {
        const metadata = this.newModelInitializers();
        const visitor = this.createVisitor(metadata);
        this.scanModelClass(modelClass, visitor, scanParent);
        return metadata;
    }
    /**
     * scan class `Function` for properties and methods definitions.
     * @param modelClass
     * @param visitorCallback
     */
    scanModelClass(modelClass, visitorCallback, scanParent) {
        const script = this.getClassScript(modelClass, scanParent);
        const expr = JavaScriptParser.parse(script);
        expressionVisitor.visit(expr, visitorCallback);
    }
    getClassScript(modelClass, scanParent) {
        const modelList = scanParent ? this.getClassList(modelClass) : [modelClass];
        return modelList.map((ref, index) => `const Class${index} = ${ref};`).join('\n');
        ;
    }
    getClassList(modelClass) {
        const list = [];
        while (modelClass instanceof Function) {
            list.push(modelClass);
            modelClass = Object.getPrototypeOf(modelClass);
        }
        return list.reverse();
    }
    newModelInitializers() {
        return [
            { signal: 'input', options: [] },
            { signal: 'input', necessity: 'required', options: [] },
            { signal: 'output', options: [] },
            { signal: 'signal', options: [] },
            { signal: 'computed', options: [] },
            { signal: 'lazy', options: [] },
            { signal: 'formValue', options: [] },
            { signal: 'formValue', necessity: 'required', options: [] },
            { signal: 'view', options: [] },
            { signal: 'viewChild', options: [] },
            { signal: 'viewChild', necessity: 'required', options: [] },
            { signal: 'viewChildren', options: [] },
            { signal: 'signalNode', options: [] },
            { signal: 'computedNode', options: [] },
            { signal: 'lazyNode', options: [] },
        ];
    }
    createVisitor(properties) {
        return (expression, type) => {
            if (type === 'PropertyDefinition') {
                const definition = expression;
                const key = definition.getKey();
                let value = definition.getValue();
                if (definition.isPrivate()
                    || definition.isStatic()
                    || !(key instanceof Identifier || key instanceof Literal)) {
                    return;
                }
                if (!(value instanceof CallExpression)) {
                    if (value instanceof SequenceExpression) {
                        value = value.getExpressions().find(node => node instanceof CallExpression && properties.find(property => this.isCallOf(node, property.signal, property.necessity)));
                        if (!value) {
                            return;
                        }
                    }
                    else {
                        return;
                    }
                }
                const call = value;
                const property = properties.find(property => this.isCallOf(call, property.signal, property.necessity));
                if (property) {
                    const name = key instanceof Identifier ? key.getName() : key.getValue();
                    const alias = this.getAliasNameFromOptionArgument(call);
                    property.options.push({ name, alias: alias ?? name });
                }
            }
            else if (type === 'MethodDefinition') {
                const definition = expression;
                if (definition.getKind() !== 'constructor') {
                    return;
                }
                expressionVisitor.visit(definition.getValue(), (exp, expType) => {
                    if (expType === 'AssignmentExpression') {
                        const assignment = exp;
                        const right = assignment.getRight();
                        if (right instanceof CallExpression) {
                            const property = properties.find(property => this.isCallOf(right, property.signal, property.necessity));
                            if (!property) {
                                return;
                            }
                            const name = this.hasMemberOfThis(assignment.getLeft());
                            if (name) {
                                const alias = this.getAliasNameFromOptionArgument(right);
                                property.options.push({ name, alias: alias ?? name });
                            }
                        }
                    }
                });
            }
        };
    }
    getAliasNameFromOptionArgument(call) {
        let alias;
        call.getArguments()?.forEach(argument => expressionVisitor.visit(argument, (exp, type, control) => {
            if (exp instanceof Property) {
                if (this.isProperty(exp.getKey(), 'alias')) {
                    const value = exp.getValue();
                    if (value instanceof Literal) {
                        alias = value.getValue();
                        control.abort();
                    }
                }
            }
        }));
        return alias;
    }
    isProperty(node, property) {
        return (node instanceof Identifier && node.getName() === property)
            || (node instanceof Literal && node.getValue() === property);
    }
    isCallOf(call, objectName, propertyName) {
        const callee = call.getCallee();
        if (propertyName && callee instanceof MemberExpression) {
            return this.isMemberOf(callee, objectName, propertyName);
        }
        else if (!propertyName && callee instanceof Identifier && callee.getName() === objectName) {
            return true;
        }
        return false;
    }
    isMemberOf(member, objectName, propertyName) {
        const object = member.getObject();
        const property = member.getProperty();
        if (object instanceof Identifier && object.getName() === objectName) {
            if (property instanceof Identifier && property.getName() === propertyName) {
                return true;
            }
            else if (property instanceof Literal && property.getValue() === propertyName) {
                return true;
            }
            return true;
        }
        return false;
    }
    hasMemberOfThis(member) {
        if (!(member instanceof MemberExpression)) {
            return false;
        }
        const object = member.getObject();
        const property = member.getProperty();
        if (object instanceof ThisExpression) {
            if (property instanceof Identifier) {
                return property.getName();
            }
            else if (property instanceof Literal) {
                return property.getValue();
            }
        }
        return false;
    }
}
//# sourceMappingURL=runtime.js.map