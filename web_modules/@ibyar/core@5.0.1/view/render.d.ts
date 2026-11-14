import { Context, ScopeSubscription, Stack } from '@ibyar/expressions';
import { CommentNode, DomStructuralDirectiveNode, LocalTemplateVariables, DomElementNode, DomFragmentNode, DomNode, LiveTextContent, TextContent, DomAttributeDirectiveNode } from '@ibyar/elements';
import { HTMLComponent } from '../component/custom-element.js';
import { AttributeDirective, StructuralDirective } from '../directive/directive.js';
export declare class ComponentRender<T extends object> {
    view: HTMLComponent<T>;
    private subscriptions;
    private componentRef;
    private template;
    private contextStack;
    private templateNameScope;
    private exportAsScope;
    private viewScope;
    private viewChildSignal;
    modelStack: Stack;
    constructor(view: HTMLComponent<T>, subscriptions: ScopeSubscription<Context>[]);
    initView(): void;
    isTemplateRefName(template: DomNode): template is DomElementNode;
    initTemplateRefMap(domNode: DomNode): void;
    initViewBinding(): void;
    getElementByName(name: string): any;
    createStructuralDirective(directive: DomStructuralDirectiveNode, comment: Comment, directiveStack: Stack, subscriptions: ScopeSubscription<Context>[], parentNode: Node, host: HTMLComponent<any> | StructuralDirective): void;
    createComment(node: CommentNode): Comment;
    createText(node: TextContent): Text;
    createLiveText(textNode: LiveTextContent, contextStack: Stack, subscriptions: ScopeSubscription<Context>[]): Text;
    createLocalTemplateVariables(localNode: LocalTemplateVariables, contextStack: Stack, subscriptions: ScopeSubscription<Context>[]): void;
    createDocumentFragment(node: DomFragmentNode, contextStack: Stack, parentNode: Node, subscriptions: ScopeSubscription<Context>[], host: HTMLComponent<any> | StructuralDirective): DocumentFragment;
    appendChildToParent(fragmentParent: HTMLElement | DocumentFragment, child: DomNode, contextStack: Stack, parentNode: Node, subscriptions: ScopeSubscription<Context>[], host: HTMLComponent<any> | StructuralDirective): void;
    createElementByTagName(node: {
        tagName: string;
        is?: string;
    }): HTMLElement;
    createElement(node: DomElementNode, contextStack: Stack, subscriptions: ScopeSubscription<Context>[], host: HTMLComponent<any> | StructuralDirective): HTMLElement;
    /**
     * use for init host bindings
     * @param element
     * @param node
     * @param contextStack
     * @param subscriptions
     */
    initHtmlElement(element: HTMLElement, node: DomElementNode, contextStack: Stack, subscriptions: ScopeSubscription<Context>[]): void;
    /**
     * use to initialize a newly created html element
     * @param element
     * @param node
     * @param contextStack
     * @param subscriptions
     * @param host is the direct html element `this.view` or a sub `structural directive` like `*if` or `*for`, etc...
     */
    initHtmlElement(element: HTMLElement, node: DomElementNode, contextStack: Stack, subscriptions: ScopeSubscription<Context>[], host: HTMLComponent<any> | StructuralDirective): void;
    private initAttributeDirectives;
    initAttribute(element: HTMLElement, node: DomElementNode, contextStack: Stack): ScopeSubscription<Context>[];
    initDirective(context: StructuralDirective | AttributeDirective, node: DomStructuralDirectiveNode | DomAttributeDirectiveNode, contextStack: Stack): ScopeSubscription<Context>[];
    private getViewChildSignal;
    private maskRawSignalScope;
}
//# sourceMappingURL=render.d.ts.map