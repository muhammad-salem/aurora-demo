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
        this.directives = new Map();
    }
    register(directiveName, options) {
        if (!this.directives.has(directiveName)) {
            const info = new DirectiveNodeInfo(options?.inputs, options?.outputs);
            this.directives.set(directiveName, info);
        }
    }
    replace(directiveName, options) {
        if (this.directives.has(directiveName)) {
            const info = new DirectiveNodeInfo(options?.inputs, options?.outputs);
            this.directives.set(directiveName, info);
        }
    }
    has(attributeName) {
        return this.directives.has(attributeName);
    }
    get(directiveName) {
        return this.directives.get(directiveName);
    }
    hasAttributes(directiveName) {
        return this.hasInputs(directiveName) || this.hasOutputs(directiveName);
    }
    hasInputs(directiveName) {
        return this.directives.get(directiveName)?.hasInputs() || false;
    }
    hasOutputs(directiveName) {
        return this.directives.get(directiveName)?.hasOutputs() || false;
    }
    getAttributes(directiveName) {
        return this.directives.get(directiveName)?.getAttributes();
    }
    getInputs(directiveName) {
        return this.directives.get(directiveName)?.getInputs();
    }
    getOutputs(directiveName) {
        return this.directives.get(directiveName)?.getOutputs();
    }
    hasAttribute(directiveName, attributeName) {
        return this.directives.get(directiveName)?.hasAttribute(attributeName) || false;
    }
    hasInput(directiveName, inputName) {
        return this.directives.get(directiveName)?.hasInput(inputName) || false;
    }
    hasOutput(directiveName, outputName) {
        return this.directives.get(directiveName)?.hasOutput(outputName) || false;
    }
    filterDirectives(attributes) {
        return attributes.filter(name => this.has(name));
    }
}
export const directiveRegistry = new DirectiveRegistry();
//# sourceMappingURL=register-directive.js.map