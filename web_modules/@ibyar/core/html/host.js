import { DomElementNode, DomFragmentNode, htmlParser } from '../../elements/node.js';
import { ListenerRef } from '../component/reflect.js';
import { buildExpressionNodes } from './expression.js';
export function createOutputs(Listeners) {
    return Listeners?.map(listener => `(${listener.eventName})="${listener.modelCallbackName}(${listener.args.join(', ')})"`).join(' ') ?? '';
}
export function parseHostNode(option) {
    const inputs = option.hostBindings?.map(binding => {
        const descriptor = Object.getOwnPropertyDescriptor(option.prototype, binding.modelPropertyName);
        if (typeof descriptor?.value === 'function') {
            return `[${binding.hostPropertyName}]="${binding.modelPropertyName}()"`;
        }
        return `[${binding.hostPropertyName}]="${binding.modelPropertyName}"`;
    }).join(' ') ?? '';
    const hostListeners = [];
    const windowListeners = [];
    const templateListeners = {};
    option.hostListeners?.forEach(listener => {
        const [host, event] = listener.eventName.split(':', 2);
        if (event === undefined) {
            hostListeners.push(listener);
        }
        else if ('window' === host.toLowerCase()) {
            windowListeners.push(new ListenerRef(event, listener.args, listener.modelCallbackName));
        }
        else {
            (templateListeners[host] ??= []).push(new ListenerRef(event, listener.args, listener.modelCallbackName));
        }
    });
    const result = {};
    if (hostListeners.length) {
        const hostOutputs = createOutputs(hostListeners);
        const selector = option.selector ?? 'div';
        const hostTemplate = `<${selector} ${inputs} ${hostOutputs}></${selector}>`;
        result.host = htmlParser.toDomRootNode(hostTemplate);
        buildExpressionNodes(result.host);
    }
    if (windowListeners.length) {
        const windowOutputs = createOutputs(windowListeners);
        const windowTemplate = `<window ${windowOutputs}></window>`;
        result.window = htmlParser.toDomRootNode(windowTemplate);
        buildExpressionNodes(result.window);
    }
    const templateHosts = Object.keys(templateListeners);
    if (templateHosts.length) {
        const template = templateHosts.map(host => {
            const hostOutputs = createOutputs(templateListeners[host]);
            return `<template #${host} ${hostOutputs}></template>`;
        }).join('');
        const templateNodes = htmlParser.toDomRootNode(template);
        buildExpressionNodes(templateNodes);
        result.template = templateNodes instanceof DomFragmentNode
            ? templateNodes.children?.filter(child => child instanceof DomElementNode) ?? []
            : [templateNodes];
    }
    return result;
}
//# sourceMappingURL=host.js.map