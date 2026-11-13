import { CommentNode, DomElementNode, DomFragmentNode, parseTextChild, TextContent } from '../ast/dom.js';
import { NodeFactory } from '../ast/factory.js';
export class TemplateParser {
    parse(template) {
        if (template.content.childNodes.length == 0) {
            return new DomFragmentNode([new TextContent('')]);
        }
        else if (template.content.childNodes.length === 1) {
            let node = this.createComponent(template.content.firstChild);
            if (Array.isArray(node)) {
                return new DomFragmentNode(node);
            }
            else {
                return node;
            }
        }
        else /* if (template.content.childNodes.length > 1)*/ {
            const children = Array.prototype.slice.call(template.content.childNodes)
                .map(item => this.createComponent(item))
                .flatMap(function (toFlat) {
                if (Array.isArray(toFlat)) {
                    return toFlat;
                }
                else {
                    return [toFlat];
                }
            });
            return new DomFragmentNode(children);
        }
    }
    createComponent(child) {
        if (child instanceof Text) {
            return parseTextChild(child.textContent || '');
        }
        else if (child instanceof Comment) {
            return new CommentNode(child.textContent || '');
        }
        else {
            /**
             * can't detect directives in template, as '*' not allowed as qualified attribute name
             * also all attributes names will be 'lower case'
             */
            const element = child;
            const node = new DomElementNode(element.tagName.toLowerCase(), element.attributes.getNamedItem('is')?.value);
            for (let i = 0; i < element.attributes.length; i++) {
                const attr = element.attributes.item(i);
                NodeFactory.handelAttribute(node, attr.name, attr.value);
            }
            const children = Array.prototype.slice.call(element.childNodes)
                .map(item => this.createComponent(item));
            children.forEach(child => {
                if (Array.isArray(child)) {
                    child.forEach(text => node.addChild(text));
                }
                else {
                    node.addChild(child);
                }
            });
            return node;
        }
    }
    toDomRenderRootNode(template) {
        if (typeof template === 'string') {
            let temp = document.createElement('template');
            temp.innerHTML = template;
            template = temp;
        }
        else if (template instanceof HTMLTemplateElement) {
            template = this.parse(template);
        }
        return ((model) => template);
    }
}
export const templateParser = new TemplateParser();
//# sourceMappingURL=template-parser.js.map