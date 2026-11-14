import { makeClassDecorator, makeClassMemberDecorator } from '../../decorators@5.0.1/index.js';
import { Components } from '../component/component.js';
import { ReflectComponents } from '../component/reflect.js';
import { fetchHtml } from '../utils/path.js';
export function HostListener(eventName, args) {
    return makeClassMemberDecorator((value, context, metadata) => {
        if (typeof context.name !== 'string') {
            throw new TypeError(`type ${typeof context.name} of '${context.name.toString()}' is not supported`);
        }
        args = typeof args === 'string' ? [args] : args;
        ReflectComponents.addHostListener(metadata, context.name, eventName, args || []);
    });
}
export function HostBinding(hostPropertyName) {
    return makeClassMemberDecorator((value, context, metadata) => {
        if (typeof context.name !== 'string') {
            throw new TypeError(`type ${typeof context.name} of '${context.name.toString()}' is not supported`);
        }
        if (context.private) {
            throw new SyntaxError(`private members '${context.name.toString()}' is not supported.`);
        }
        ReflectComponents.addHostBinding(metadata, context.name, hostPropertyName);
    });
}
/**
 * register a new pipe
 */
export const Pipe = makeClassDecorator((opt, constructor, context, metadata) => {
    Components.definePipe(constructor, opt, metadata);
});
/**
 * register a new structure or attribute directive
 */
export const Directive = makeClassDecorator((opt, constructor, context, metadata) => {
    Components.defineDirective(constructor, opt, metadata);
});
/**
 * register a new service
 */
export const Injectable = makeClassDecorator((opt, constructor, context) => {
    Components.defineService(constructor, opt, context.metadata);
});
/**
 * register a new service
 */
export const Service = makeClassDecorator((opt, constructor, context) => {
    Components.defineService(constructor, {}, context.metadata);
});
function generateComponent(target, opt, metadata) {
    if (opt.templateUrl) {
        fetchHtml(opt.templateUrl)
            .then(htmlTemplate => {
            if (htmlTemplate) {
                opt.template = htmlTemplate;
                Components.defineComponent(target, opt, metadata);
            }
        })
            .catch(reason => {
            console.error(`Error @URL: ${opt.templateUrl}, for model Class: ${target.name},\n Reason: ${reason}.`);
        });
    }
    else {
        Components.defineComponent(target, opt, metadata);
    }
}
/**
 * define a new custom element model class
 */
export const Component = makeClassDecorator((opt, constructor, context, metadata) => {
    if (Array.isArray(opt)) {
        for (const comp of opt) {
            generateComponent(constructor, comp, metadata);
        }
    }
    else if (typeof opt === 'object') {
        generateComponent(constructor, opt, metadata);
    }
});
export const customElement = makeClassDecorator((opt, constructor, context) => {
    Components.defineView(constructor, opt);
});
export const Module = makeClassDecorator((opt, constructor, context) => {
});
//# sourceMappingURL=decorators.js.map