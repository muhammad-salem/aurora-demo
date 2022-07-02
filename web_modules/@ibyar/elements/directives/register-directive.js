class DirectiveNodeInfo {
    constructor(inputs, outputs) {
        this.inputs = inputs;
        this.outputs = outputs;
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
    hasAttribute(attributeName) {
        return this.hasInput(attributeName) || this.hasOutput(attributeName);
    }
    hasInput(inputName) {
        return this.inputs?.includes(inputName) || false;
    }
    hasOutput(outputName) {
        return this.outputs?.includes(outputName) || false;
    }
}
export class DirectiveRegistry {
    constructor() {
        /**
         * store options info about directives
         */
        this.directives = new Map();
    }
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
            const info = new DirectiveNodeInfo(options?.inputs, options?.outputs);
            this.directives.set(directiveName, info);
        }
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
            const info = new DirectiveNodeInfo(options?.inputs, options?.outputs);
            this.directives.set(directiveName, info);
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