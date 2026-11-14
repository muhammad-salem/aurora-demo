export interface DirectiveNodeOptions {
    /**
     * list of inputs view name
     */
    inputs?: string[];
    /**
     * list of outputs view name
     */
    outputs?: string[];
    /**
     * successors block/scope for a directive
     *
     * ex: [`@if`/`@else`] & [`@for`/`@empty`]
     */
    successors?: string[];
}
declare class DirectiveNodeInfo {
    private inputs?;
    private outputs?;
    private successors?;
    constructor(inputs?: string[] | undefined, outputs?: string[] | undefined, successors?: string[] | undefined);
    hasAttributes(): boolean;
    hasInputs(): boolean;
    hasOutputs(): boolean;
    hasSuccessors(): boolean;
    getAttributes(): string[] | undefined;
    getInputs(): string[] | undefined;
    getOutputs(): string[] | undefined;
    getSuccessors(): string[] | undefined;
    hasAttribute(attributeName: string): boolean;
    hasInput(inputName: string): boolean;
    hasOutput(outputName: string): boolean;
    hasSuccessor(successor: string): boolean;
}
export declare class DirectiveRegistry {
    /**
     * store options info about directives
     */
    private directives;
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
    register(directiveName: string, options?: DirectiveNodeOptions): void;
    /**
     * set value of directive
     * @param directiveName
     * @param options
     */
    set(directiveName: string, options?: DirectiveNodeOptions): void;
    /**
     * replace the current options with a new one.
     *
     * the directive could be a structural directive or an attribute directive.
     *
     * if the directive name not exists, no set options will be done
     * @param directiveName
     * @param options to be replaced
     */
    replace(directiveName: string, options: DirectiveNodeOptions): void;
    /**
     * check if directive name is registered
     * @param directiveName
     * @returns `boolean`
     */
    has(attributeName: string): boolean;
    /**
     * get the DirectiveOptions for a directive name
     * @param directiveName
     * @returns `DirectiveOptions` if the name has been registered, otherwise `undefined`
     */
    get(directiveName: string): DirectiveNodeInfo | undefined;
    /**
     * check if the options registered with a `directiveName` has attributes array
     * @param directiveName
     * @returns `boolean`
     */
    hasAttributes(directiveName: string): boolean;
    hasInputs(directiveName: string): boolean;
    hasOutputs(directiveName: string): boolean;
    hasSuccessors(directiveName: string): boolean;
    hasAllSuccessors(directiveName: string, names: string[]): boolean;
    /**
     * get the value of the registered inputs and outputs by directive name
     * @param directiveName
     * @returns array of strings if found, otherwise `undefined`
     */
    getAttributes(directiveName: string): string[] | undefined;
    /**
     * get the value of the registered inputs by directive name
     * @param directiveName
     * @returns array of strings if found, otherwise `undefined`
     */
    getInputs(directiveName: string): string[] | undefined;
    /**
     * get the value of the registered outputs by directive name
     * @param directiveName
     * @returns array of strings if found, otherwise `undefined`
     */
    getOutputs(directiveName: string): string[] | undefined;
    /**
     * get the value of the registered successors by directive name
     * @param directiveName
     * @returns
     */
    getSuccessors(directiveName: string): string[] | undefined;
    /**
     * check if a directive has a attribute
     * @param directiveName
     * @param attributeName
     * @returns
     */
    hasAttribute(directiveName: string, attributeName: string): boolean;
    /**
     * check if has input
     * @param directiveName
     * @param inputName
     * @returns
     */
    hasInput(directiveName: string, inputName: string): boolean;
    /**
     * check if has successor
     * @param directiveName
     * @param successorName
     * @returns
     */
    hasSuccessor(directiveName: string, successorName: string): boolean;
    /**
     * check if has output
     * @param directiveName
     * @param outputName
     * @returns
     */
    hasOutput(directiveName: string, outputName: string): boolean;
    filterDirectives(attributes: string[]): string[];
}
export declare const directiveRegistry: DirectiveRegistry;
export {};
//# sourceMappingURL=register-directive.d.ts.map