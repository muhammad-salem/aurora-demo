import { metadataHoler } from '../../decorators/index.js';
import { findByTagName, htmlParser, templateParser, canAttachShadow, directiveRegistry, DomElementNode, DomParentNode, isValidCustomElementName } from '../../elements/index.js';
import { classRegistryProvider } from '../providers/provider.js';
import { initCustomElementView } from '../view/view.js';
import { buildExpressionNodes } from '../html/expression.js';
import { ReflectComponents } from './reflect.js';
import { deserializeExpressionNodes } from '../html/deserialize.js';
import { parseHostNode } from '../html/host.js';
import { provide } from '../di/inject.js';
import { RuntimeClassMetadata } from '../signals/runtime.js';
const DEFAULT_SHADOW_ROOT_INIT = { mode: 'open', delegatesFocus: false, slotAssignment: 'named' };
export class Components {
    static EMPTY_LIST = Object.freeze([]);
    static emptyList() {
        return Components.EMPTY_LIST;
    }
    static patchTemplate(child, templates) {
        if (child instanceof DomElementNode && child.templateRefName?.name) {
            const ref = templates.find(node => child.templateRefName?.name === node.templateRefName?.name);
            if (ref?.outputs) {
                (child.outputs ??= []).push(...ref.outputs);
            }
        }
        if (child instanceof DomParentNode) {
            child.children?.forEach(node => Components.patchTemplate(node, templates));
        }
    }
    static defineDirective(modelClass, opts, metadata) {
        if (!opts.signals) {
            const scanParent = !metadataHoler.has(Object.getPrototypeOf(modelClass));
            opts.signals = RuntimeClassMetadata.scanMetadata(modelClass, scanParent);
        }
        this.scanRuntimeSignals(modelClass, opts, metadata);
        Object.assign(metadata, opts);
        if (metadata.hostListeners?.length || metadata.hostBindings?.length) {
            const hostNode = parseHostNode({
                prototype: modelClass.prototype,
                hostBindings: metadata.hostBindings,
                hostListeners: metadata.hostListeners,
            });
            metadata.viewBindings = hostNode.host;
        }
        metadata.modelClass = modelClass;
        classRegistryProvider.registerDirective(modelClass);
        const successors = [];
        if (metadata.successor) {
            successors.push(metadata.successor.trim());
        }
        if (Array.isArray(metadata.successors)) {
            successors.push(...metadata.successors.map(s => s.trim()));
        }
        metadata.successors = successors;
        directiveRegistry.register(opts.selector, {
            inputs: metadata.inputs?.map(input => input.viewAttribute),
            outputs: metadata.outputs?.map(output => output.viewAttribute),
            successors: successors,
        });
    }
    static definePipe(modelClass, opts, metadata) {
        Object.assign(metadata, opts);
        metadata.modelClass = modelClass;
        classRegistryProvider.registerPipe(modelClass);
    }
    static defineService(modelClass, opts, metadata) {
        Object.assign(metadata, opts);
        metadata.modelClass = modelClass;
        metadata.name = modelClass.name;
        classRegistryProvider.registerService(modelClass);
        provide(modelClass);
    }
    static defineComponent(modelClass, opts, metadata) {
        if (!opts.signals) {
            const scanParent = !metadataHoler.has(Object.getPrototypeOf(modelClass));
            opts.signals = RuntimeClassMetadata.scanMetadata(modelClass, scanParent);
        }
        this.scanRuntimeSignals(modelClass, opts, metadata);
        const componentRef = Object.assign(metadata, opts);
        componentRef.extend = findByTagName(opts.extend);
        componentRef.extendCustomElement = !!opts.extend && isValidCustomElementName(opts.extend);
        if (typeof componentRef.template === 'string') {
            if (componentRef.styles) {
                const template = `<style>${componentRef.styles}</style>${componentRef.template}`;
                componentRef.template = htmlParser.toDomRootNode(template);
            }
            else {
                componentRef.template = htmlParser.toDomRootNode(componentRef.template);
            }
            buildExpressionNodes(componentRef.template);
        }
        else if (typeof componentRef.template === 'object') {
            buildExpressionNodes(componentRef.template);
        }
        else if (typeof componentRef.compiledTemplate === 'object') {
            htmlParser.deserializeNode(componentRef.compiledTemplate);
            deserializeExpressionNodes(componentRef.compiledTemplate);
            componentRef.template = componentRef.compiledTemplate;
            componentRef.compiledTemplate = undefined;
        }
        if (!componentRef.template && /template/g.test(componentRef.encapsulation)) {
            const template = document.querySelector('#' + componentRef.selector);
            if (template && template instanceof HTMLTemplateElement) {
                componentRef.template = templateParser.parse(template);
                buildExpressionNodes(componentRef.template);
            }
            else {
                // didn't find this template in 'index.html' document
            }
        }
        componentRef.inputs ||= Components.emptyList();
        componentRef.outputs ||= Components.emptyList();
        componentRef.viewChild ||= Components.emptyList();
        componentRef.ViewChildren ||= Components.emptyList();
        componentRef.hostBindings ||= Components.emptyList();
        componentRef.hostListeners ||= Components.emptyList();
        componentRef.encapsulation ||= 'custom';
        componentRef.isShadowDom = /shadow/g.test(componentRef.encapsulation);
        if (componentRef.isShadowDom) {
            componentRef.shadowRootInit = Object.assign({}, DEFAULT_SHADOW_ROOT_INIT, (componentRef.shadowRootInit ?? {}));
        }
        if (componentRef.hostListeners.length || componentRef.hostBindings.length) {
            const hostNode = parseHostNode({
                prototype: modelClass.prototype,
                selector: componentRef.selector,
                hostBindings: componentRef.hostBindings,
                hostListeners: componentRef.hostListeners,
            });
            componentRef.viewBindings = hostNode.host;
            componentRef.windowBindings = hostNode.window;
            if (typeof componentRef.template === 'function') {
                const creator = componentRef.template;
                componentRef.template = (model) => {
                    const template = creator(model);
                    if (hostNode.template) {
                        Components.patchTemplate(template, hostNode.template);
                    }
                    return template;
                };
            }
            else if (hostNode.template) {
                Components.patchTemplate(componentRef.template, hostNode.template);
            }
        }
        if (!(componentRef.formAssociated === true || typeof componentRef.formAssociated === 'function')) {
            componentRef.formAssociated = false;
        }
        if (componentRef.isShadowDom && componentRef.extend.name) {
            componentRef.isShadowDom = canAttachShadow(componentRef.extend.name);
        }
        componentRef.modelClass = modelClass;
        componentRef.viewClass = initCustomElementView(modelClass, componentRef);
        classRegistryProvider.registerComponent(modelClass);
        classRegistryProvider.registerView(componentRef.viewClass);
        const options = {};
        const parentTagName = componentRef.extend?.name;
        if (parentTagName) {
            if (parentTagName !== '!' && parentTagName.indexOf('-') === -1) {
                options.extends = parentTagName;
            }
        }
        customElements.define(componentRef.selector, componentRef.viewClass, options);
    }
    static defineView(viewClass, opt) {
        classRegistryProvider.registerView(viewClass);
        const { selector, ...definition } = opt;
        customElements.define(selector, viewClass, definition);
    }
    static scanRuntimeSignals(modelClass, opts, metadata) {
        if (!opts.signals) {
            return;
        }
        const signals = opts.signals;
        signals.filter(item => item.signal === 'input')
            .flatMap(item => item.options)
            .forEach(option => ReflectComponents.addInput(metadata, option.name, option.alias));
        signals.filter(item => item.signal === 'formValue')
            .flatMap(item => item.options)
            .forEach(option => ReflectComponents.addInput(metadata, option.name, 'view'));
        signals.filter(item => item.signal === 'output')
            .flatMap(item => item.options)
            .forEach(option => ReflectComponents.addOutput(metadata, option.name, option.alias, {}));
        signals.filter(item => item.signal === 'view')
            .flatMap(item => item.options)
            .forEach(option => ReflectComponents.setComponentView(metadata, option.name));
        signals.filter(item => item.signal === 'viewChild')
            .flatMap(item => item.options)
            .forEach(option => ReflectComponents.addViewChild(metadata, option.name, 'ɵSignal', {}));
    }
}
//# sourceMappingURL=component.js.map