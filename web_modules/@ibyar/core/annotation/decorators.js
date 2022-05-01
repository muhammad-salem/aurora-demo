import { Components } from '../component/component.js';
import { fetchHtml } from '../utils/path.js';
export function Input(name) {
    return (target, propertyKey) => {
        Components.addInput(target, propertyKey, name || propertyKey);
    };
}
export function Output(name) {
    return (target, propertyKey) => {
        Components.addOutput(target, propertyKey, name || propertyKey);
    };
}
export function View() {
    return (target, propertyKey) => {
        Components.setComponentView(target, propertyKey);
    };
}
export function ViewChild(selector, childOptions) {
    return (target, propertyKey) => {
        Components.addViewChild(target, propertyKey, selector, childOptions);
    };
}
export function ViewChildren(selector) {
    return (target, propertyKey) => {
        Components.addViewChildren(target, propertyKey, selector);
    };
}
export function HostListener(eventName, args) {
    return (target, propertyKey) => {
        Components.addHostListener(target, propertyKey, eventName, args || []);
    };
}
export function HostBinding(hostPropertyName) {
    return (target, propertyKey) => {
        Components.addHostBinding(target, propertyKey, hostPropertyName);
    };
}
export function Pipe(opt) {
    return (target) => {
        Components.definePipe(target, opt);
        return target;
    };
}
export function Service(opt) {
    return (target) => {
        Components.defineService(target, opt);
        return target;
    };
}
export function Directive(opt) {
    return (target) => {
        Components.defineDirective(target, opt);
        return target;
    };
}
export function Component(opt) {
    return (target) => {
        if (opt.templateUrl) {
            fetchHtml(opt.templateUrl)
                .then(htmlTemplate => {
                if (htmlTemplate) {
                    opt.template = htmlTemplate;
                    Components.defineComponent(target, opt);
                }
            })
                .catch(reason => {
                console.error(`Error @URL: ${opt.templateUrl}, for model Class: ${target.name},\n Reason: ${reason}.`);
            });
        }
        else {
            Components.defineComponent(target, opt);
        }
        return target;
    };
}
export function SelfSkip(name) {
    return (target, propertyKey, index) => {
        let metadata = Reflect.getMetadata('selfskip', target, propertyKey);
        if (!metadata) {
            metadata = {};
            Reflect.defineMetadata('selfskip', metadata, target, propertyKey);
        }
        metadata[index] = name;
    };
}
export function Optional() {
    return (target, propertyKey, index) => {
        let metadata = Reflect.getMetadata('optional', target, propertyKey);
        if (!metadata) {
            metadata = {};
            Reflect.defineMetadata('optional', metadata, target, propertyKey);
        }
        metadata[index] = true;
    };
}
//# sourceMappingURL=decorators.js.map