import { Components } from '../component/component.js';
import { EmbeddedViewRefImpl } from './view-ref.js';
import { getComponentView } from '../view/view.js';
import { ReactiveScopeControl } from '../../expressions/index.js';
;
;
export class ViewContainerRef {
}
export class ViewContainerRefImpl extends ViewContainerRef {
    constructor(_parent, _firstComment) {
        super();
        this._parent = _parent;
        this._firstComment = _firstComment;
        this._views = [];
    }
    get anchorElement() {
        return this._parent;
    }
    get length() {
        return this._views.length;
    }
    clear() {
        if (this._views.length > 0) {
            for (const elm of this._views) {
                elm.destroy();
            }
            this._views.splice(0);
        }
    }
    get(index) {
        if (index >= this._views.length) {
            return undefined;
        }
        return this._views[index];
    }
    detach(index) {
        index ?? (index = this._views.length - 1);
        const viewRef = this._views[index];
        viewRef.detach();
        this._views.splice(index, 1);
        return viewRef;
    }
    indexOf(viewRef) {
        return this._views.indexOf(viewRef);
    }
    remove(index) {
        index ?? (index = this._views.length - 1);
        this._views[index].destroy();
        this._views.splice(index, 1);
    }
    insert(viewRef, index) {
        index = ((index ?? (index = this._views.length)) > this._views.length) ? this._views.length : index;
        const lastNode = index == 0 ? this._firstComment : this._views[index - 1].last;
        this._views.splice(index, 0, viewRef);
        viewRef.after(lastNode);
        return viewRef;
    }
    move(viewRef, newIndex) {
        const oldIndex = this.indexOf(viewRef);
        if (oldIndex > -1) {
            this.detach(oldIndex);
        }
        else {
            // should remove it from the container first
            viewRef.detach();
        }
        return this.insert(viewRef, newIndex);
    }
    createEmbeddedView(templateRef, options) {
        const viewRef = templateRef.createEmbeddedView(options?.context || {}, this._parent);
        (options?.insert != false) && this.insert(viewRef, options?.index);
        return viewRef;
    }
    createComponent(arg0, options) {
        let ViewClass;
        if (typeof arg0 === 'string') {
            ViewClass = customElements.get(arg0);
        }
        else if (typeof arg0 === 'function') {
            if (Reflect.has(arg0, 'observedAttributes')) {
                ViewClass = arg0;
            }
            else {
                const componentType = arg0;
                const defaultTagName = Components.getComponentRef(componentType).selector;
                const view = getComponentView(componentType, options?.selector ?? defaultTagName);
                if (!view) {
                    throw new Error(`Can't find View component for class ${componentType.name}`);
                }
                ViewClass = view;
            }
        }
        else {
            throw new Error(`Can't find View component for args, ${arg0}, ${options}`);
        }
        const component = new ViewClass();
        const viewRef = new EmbeddedViewRefImpl(component._modelScope, [component]);
        (options?.insert != false) && this.insert(viewRef, options?.index);
        return component;
    }
    createElement(arg0, options) {
        let element;
        if (typeof arg0 === 'string') {
            element = document.createElement(arg0, { is: options?.is });
        }
        else if (typeof arg0 === 'function') {
            element = new arg0();
        }
        else {
            throw new Error(`Can't find View component for args, ${arg0}, ${options}`);
        }
        const scope = ReactiveScopeControl.for(element);
        const viewRef = new EmbeddedViewRefImpl(scope, [element]);
        (options?.insert != false) && this.insert(viewRef, options?.index);
        return element;
    }
    createTextNode(data, options) {
        const text = document.createTextNode(data);
        const scope = ReactiveScopeControl.for(text);
        const viewRef = new EmbeddedViewRefImpl(scope, [text]);
        (options?.insert != false) && this.insert(viewRef, options?.index);
        return text;
    }
    updateViews(views) {
        for (let i = 0; i < views.length; i++) {
            this.move(views[i], i);
        }
        while (this.length > views.length) {
            this.remove();
        }
    }
}
//# sourceMappingURL=view-container-ref.js.map