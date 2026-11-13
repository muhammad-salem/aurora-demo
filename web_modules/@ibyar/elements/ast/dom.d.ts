/**
 * a normal attribute with its source value without any binding.
 */
export declare class Attribute<N, V> {
    name: N;
    value: V;
    constructor(name: N, value: V);
    toJSON(): this & {
        type: string;
    };
}
export declare class ElementAttribute<N, V> extends Attribute<N, V> {
    toJSON(): this & {
        type: string;
    };
}
/**
 * an attribute with its source value for binding
 */
export declare class LiveAttribute extends Attribute<string, string> {
    toJSON(): this & {
        type: string;
    };
}
/**
 *
 * @param name
 * @param value
 * @returns LiveAttribute
 */
export declare function createLiveAttribute(name: string, value: string): LiveAttribute;
/**
 * a normal text
 */
export declare class TextContent extends Attribute<'textContent', string> {
    static propName: 'textContent';
    constructor(text: string);
    toJSON(): this & {
        type: string;
    };
}
/**
 * a text that its content is binding to variable from the component model.
 */
export declare class LiveTextContent extends TextContent {
    toJSON(): this & {
        type: string;
    };
}
export declare function isLiveTextContent(text: object): text is LiveTextContent;
export declare function isLocalTemplateVariables(text: object): text is LocalTemplateVariables;
/**
 * to comment in dom
 */
export declare class CommentNode {
    comment: string;
    constructor(comment: string);
    toJSON(): this & {
        type: string;
    };
}
export declare class LocalTemplateVariables {
    declarations: string;
    constructor(declarations: string);
    toJSON(): this & {
        type: string;
    };
}
export declare class BaseNode {
    /**
     * hold static attr and event that will resolve normally from the global window.
     */
    attributes?: ElementAttribute<string, string | number | boolean | object>[];
    /**
     * hold the attrs/inputs name marked as one way binding
     */
    inputs?: LiveAttribute[];
    /**
     * hold the name of events that should be connected to a listener
     */
    outputs?: ElementAttribute<string, string>[];
    /**
     * hold the name of attributes marked for 2 way data binding
     */
    twoWayBinding?: LiveAttribute[];
    /**
     * directive attribute
     */
    templateAttrs?: LiveAttribute[];
    /**
     * attributes directive
     */
    attributeDirectives?: DomAttributeDirectiveNode[];
    addAttribute(attrName: string, value?: string | number | boolean | object): void;
    addInput(attrName: string, valueSource: string): void;
    addOutput(eventName: string, handlerSource: string): void;
    addTwoWayBinding(eventName: string, handlerSource: string): void;
    addTemplateAttr(attrName: string, valueSource: string): void;
    toJSON(): this & {
        type: string;
    };
}
export declare class DomAttributeDirectiveNode extends BaseNode {
    /**
     * name of the directive
     */
    name: string;
    /**
     * set to `undefined` stop, loop
     */
    attributeDirectives: undefined;
    constructor(name: string);
    toJSON(): this & {
        type: string;
    };
}
export declare class DomParentNode extends BaseNode {
    /**
     * element children list
     */
    children?: DomChild[];
    addChild(child: DomChild): void;
    addTextChild(text: string): void;
    toJSON(): this & {
        type: string;
    };
}
/**
 * parent for a list of elements
 */
export declare class DomFragmentNode extends DomParentNode {
    constructor(children?: DomChild[]);
    toJSON(): this & {
        type: string;
    };
}
/**
 * dom structural successor structural fragment node
 */
export declare class DomStructuralDirectiveSuccessorNode extends DomFragmentNode {
    name: string;
    children: [DomStructuralDirectiveNode];
    constructor(name: string);
    toJSON(): this & {
        type: string;
    };
}
export declare class DomElementNode extends DomParentNode {
    /**
     * the tag name of the element
     */
    tagName: string;
    /**
     * used to upgrade an element to another custom-element name
     */
    is?: string;
    /**
     * a given name for element
     */
    templateRefName?: Attribute<string, string | undefined>;
    constructor(tagName: string, is?: string);
    setTagName(tagName: string): void;
    setTemplateRefName(name: string, value?: string): void;
    toJSON(): this & {
        type: string;
    };
}
/**
 * structural directive
 */
export declare class DomStructuralDirectiveNode extends BaseNode {
    /**
     * name of the directive
     */
    name: string;
    /**
     * value of the directive
     */
    value?: string;
    /**
     * the value of the template node, that this directive going to host-on
     */
    node: DomNode;
    /**
     * successors directives
     */
    successors?: DomStructuralDirectiveSuccessorNode[];
    constructor(name: string, node: DomNode, value?: string);
    toJSON(): this & {
        type: string;
    };
}
export declare function isDOMDirectiveNode(node: object): node is DomStructuralDirectiveNode;
export type DomChild = DomElementNode | DomStructuralDirectiveNode | LocalTemplateVariables | CommentNode | TextContent | LiveTextContent;
export type DomNode = DomFragmentNode | DomElementNode | DomStructuralDirectiveNode | LocalTemplateVariables | CommentNode | TextContent | LiveTextContent;
export type DomRenderNode<T> = (model: T) => DomNode;
export declare function parseTextChild(text: string): Array<TextContent | LiveTextContent>;
export declare function parseStringTemplate(text: string): string;
//# sourceMappingURL=dom.d.ts.map