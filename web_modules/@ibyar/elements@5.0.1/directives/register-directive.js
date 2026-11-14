class DirectiveNodeInfo {
    inputs;
    outputs;
    successors;
    constructor(inputs, outputs, successors) {
        this.inputs = inputs;
        this.outputs = outputs;
        this.successors = successors;
    }
    hasAttributes() {
        return this.hasInputs() || this.hasOutputs();
    }
    hasInputs() {
        return (this.inputs?.length ?? 0) > 0;
    }
    hasOutputs() {
        return (this.outputs?.length ?? 0) > 0;
    }
    hasSuccessors() {
        return (this.successors?.length ?? 0) > 0;
    }
    getAttributes() {
        if (this.inputs && this.outputs) {
            return this.inputs.concat(this.outputs);
        }
        else if (this.inputs) {
            return this.inputs;
        }
        else if (this.outputs) {
            return this.outputs;
        }
        return undefined;
    }
    getInputs() {
        return this.inputs;
    }
    getOutputs() {
        return this.outputs;
    }
    getSuccessors() {
        return this.successors;
    }
    hasAttribute(attributeName) {
        return this.hasInput(attributeName) || this.hasOutput(attributeName);
    }
    hasInput(inputName) {
        return this.inputs?.includes(inputName) || false;
    }
    hasOutput(outputName) {
        return this.outputs?.includes(outputName) || false;
    }
    hasSuccessor(successor) {
        return this.successors?.includes(successor) || false;
    }
}
export class DirectiveRegistry {
    /**
     * store options info about directives
     */
    directives = new Map();
    /**
     * register a directive with a name,
     *
     * the directive could be a structural directive or an attribute directive.
     *
     * if the directive name exists, will not replace the old directive options.
     * @param directiveName
     * @param options contain the attributes of the registered directive name
     * @override
     */
    register(directiveName, options) {
        if (!this.directives.has(directiveName)) {
            this.set(directiveName, options);
        }
    }
    /**
     * set value of directive
     * @param directiveName
     * @param options
     */
    set(directiveName, options) {
        const info = new DirectiveNodeInfo(options?.inputs, options?.outputs, options?.successors);
        this.directives.set(directiveName, info);
    }
    /**
     * replace the current options with a new one.
     *
     * the directive could be a structural directive or an attribute directive.
     *
     * if the directive name not exists, no set options will be done
     * @param directiveName
     * @param options to be replaced
     */
    replace(directiveName, options) {
        if (this.directives.has(directiveName)) {
            this.set(directiveName, options);
        }
    }
    /**
     * check if directive name is registered
     * @param directiveName
     * @returns `boolean`
     */
    has(attributeName) {
        return this.directives.has(attributeName);
    }
    /**
     * get the DirectiveOptions for a directive name
     * @param directiveName
     * @returns `DirectiveOptions` if the name has been registered, otherwise `undefined`
     */
    get(directiveName) {
        return this.directives.get(directiveName);
    }
    /**
     * check if the options registered with a `directiveName` has attributes array
     * @param directiveName
     * @returns `boolean`
     */
    hasAttributes(directiveName) {
        return this.hasInputs(directiveName) || this.hasOutputs(directiveName);
    }
    hasInputs(directiveName) {
        return this.directives.get(directiveName)?.hasInputs() || false;
    }
    hasOutputs(directiveName) {
        return this.directives.get(directiveName)?.hasOutputs() || false;
    }
    hasSuccessors(directiveName) {
        return this.directives.get(directiveName)?.hasSuccessors() || false;
    }
    hasAllSuccessors(directiveName, names) {
        const successors = this.getSuccessors(directiveName) ?? [];
        return successors.length === names.length && successors.every(name => names.includes(name));
    }
    /**
     * get the value of the registered inputs and outputs by directive name
     * @param directiveName
     * @returns array of strings if found, otherwise `undefined`
     */
    getAttributes(directiveName) {
        return this.directives.get(directiveName)?.getAttributes();
    }
    /**
     * get the value of the registered inputs by directive name
     * @param directiveName
     * @returns array of strings if found, otherwise `undefined`
     */
    getInputs(directiveName) {
        return this.directives.get(directiveName)?.getInputs();
    }
    /**
     * get the value of the registered outputs by directive name
     * @param directiveName
     * @returns array of strings if found, otherwise `undefined`
     */
    getOutputs(directiveName) {
        return this.directives.get(directiveName)?.getOutputs();
    }
    /**
     * get the value of the registered successors by directive name
     * @param directiveName
     * @returns
     */
    getSuccessors(directiveName) {
        return this.directives.get(directiveName)?.getSuccessors();
    }
    /**
     * check if a directive has a attribute
     * @param directiveName
     * @param attributeName
     * @returns
     */
    hasAttribute(directiveName, attributeName) {
        return this.directives.get(directiveName)?.hasAttribute(attributeName) || false;
    }
    /**
     * check if has input
     * @param directiveName
     * @param inputName
     * @returns
     */
    hasInput(directiveName, inputName) {
        return this.directives.get(directiveName)?.hasInput(inputName) || false;
    }
    /**
     * check if has successor
     * @param directiveName
     * @param successorName
     * @returns
     */
    hasSuccessor(directiveName, successorName) {
        return this.directives.get(directiveName)?.hasSuccessor(successorName) || false;
    }
    /**
     * check if has output
     * @param directiveName
     * @param outputName
     * @returns
     */
    hasOutput(directiveName, outputName) {
        return this.directives.get(directiveName)?.hasOutput(outputName) || false;
    }
    filterDirectives(attributes) {
        return attributes.filter(name => this.has(name));
    }
}
export const directiveRegistry = new DirectiveRegistry();
//# sourceMappingURL=register-directive.js.map