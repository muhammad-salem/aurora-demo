import { DomElementNode } from '@ibyar/elements/node.js';
import { HostBindingRef, ListenerRef } from '../component/reflect.js';
export type ViewBindingOption = {
    prototype: Record<PropertyKey, any>;
    hostBindings?: HostBindingRef[];
    hostListeners?: ListenerRef[];
    selector?: string;
};
export type HostNode = {
    host?: DomElementNode;
    window?: DomElementNode;
    template?: DomElementNode[];
};
export declare function createOutputs(Listeners?: ListenerRef[]): string;
export declare function parseHostNode(option: ViewBindingOption): HostNode;
//# sourceMappingURL=host.d.ts.map