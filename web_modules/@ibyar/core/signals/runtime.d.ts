import { CallExpression, ExpressionNode, MemberExpression, VisitorCallback } from '@ibyar/expressions';
type Key = 'input' | 'output' | 'formValue' | 'view' | 'viewChild' | 'viewChildren' | 'signal' | 'computed' | 'lazy' | 'signalNode' | 'computedNode' | 'lazyNode';
type RuntimeOption = {
    name: Key;
    alias: string;
};
export type SignalRuntimeMetadata = {
    signal: Key;
    necessity?: 'required';
    options: Array<RuntimeOption>;
};
/**
 * scan model class for (inputs and output) property definitions with value by function call.
 */
export declare class RuntimeClassMetadata {
    static INSTANCE: RuntimeClassMetadata;
    static scanMetadata(modelClass: Function, scanParent?: boolean): SignalRuntimeMetadata[];
    static scanClass(modelClass: Function, visitorCallback: VisitorCallback, scanParent?: boolean): void;
    scan(modelClass: Function, scanParent: boolean): SignalRuntimeMetadata[];
    /**
     * scan class `Function` for properties and methods definitions.
     * @param modelClass
     * @param visitorCallback
     */
    scanModelClass(modelClass: Function, visitorCallback: VisitorCallback, scanParent: boolean): void;
    getClassScript(modelClass: Function, scanParent: boolean): string;
    getClassList(modelClass: Function): Function[];
    newModelInitializers(): SignalRuntimeMetadata[];
    createVisitor(properties: SignalRuntimeMetadata[]): VisitorCallback;
    getAliasNameFromOptionArgument(call: CallExpression): string | undefined;
    isProperty(node: ExpressionNode, property: string): boolean;
    isCallOf(call: CallExpression, objectName: string, propertyName?: string): boolean;
    isMemberOf(member: MemberExpression, objectName: string, propertyName: string): boolean;
    hasMemberOfThis(member: ExpressionNode): Key | false;
}
export {};
//# sourceMappingURL=runtime.d.ts.map