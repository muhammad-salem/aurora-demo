import { DomNode } from '@ibyar/elements';
import { ExpressionNode, Stack } from '@ibyar/expressions';
import { HTMLComponent } from '../component/custom-element.js';
import { StructuralDirective } from '../directive/directive.js';
import { ComponentRender } from '../view/render.js';
import { EmbeddedViewRef } from './view-ref.js';
export declare abstract class TemplateRef {
    /**
     * get the current ref of this template
     */
    abstract get astNode(): DomNode;
    /**
     * Instantiates an embedded view based on this template,
     * `Not attached to the view`.
     * @param context The data-binding context of the embedded view, as declared
     * in the `<template>` usage.
     *
     * To insert it to a view need to use a `ViewContainerRef.createEmbeddedView()`
     * @returns The new embedded view object.
     */
    abstract createEmbeddedView<C extends object>(context: C, parentNode: Node): EmbeddedViewRef<C>;
}
export declare class TemplateRefImpl extends TemplateRef {
    private _render;
    private _node;
    private _stack;
    private _templateExpressions;
    private _host;
    constructor(render: ComponentRender<any>, node: DomNode, stack: Stack, templateExpressions: ExpressionNode[]);
    get astNode(): DomNode;
    set host(host: HTMLComponent<any> | StructuralDirective);
    createEmbeddedView<C extends object>(context: C | undefined, parentNode: Node): EmbeddedViewRef<C>;
    private executeTemplateExpressions;
}
//# sourceMappingURL=template-ref.d.ts.map