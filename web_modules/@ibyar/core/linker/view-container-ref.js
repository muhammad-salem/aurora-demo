import { ReactiveControlScope } from '../../expressions/index.js';
import { EmbeddedViewRefImpl } from './view-ref.js';
import { getComponentView } from '../view/utils.js';
import { ReflectComponents } from '../component/reflect.js';
;
;
export class ViewContainerRef {
}
export class ViewContainerRefImpl extends ViewContainerRef {
    _parent;
    _firstComment;
    _views = [];
    constructor(_parent, _firstComment) {
        super();
        this._parent = _parent;
        this._firstComment = _firstComment;
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
        index ??= this._views.length - 1;
        if (index < 0 || index >= this._views.length) {
            return;
        }
        const viewRef = this._views[index];
        viewRef.detach();
        this._views.splice(index, 1);
        return viewRef;
    }
    adopt(viewRef, newIndex = this._views.length) {
        const lastNode = newIndex == 0 ? this._firstComment : this._views[newIndex - 1].last;
        this._views.splice(newIndex, 0, viewRef);
        viewRef.moveAfter(lastNode);
    }
    forEach(callbackfn) {
        this._views.forEach((view, index) => callbackfn(view, index));
    }
    indexOf(viewRef) {
        return this._views.indexOf(viewRef);
    }
    remove(index = this._views.length - 1, destroy = true) {
        if (index < 0 || index > this._views.length) {
            return;
        }
        destroy && this._views[index].destroy();
        return this._views.splice(index, 1)[0];
    }
    insert(viewRef, index) {
        index = ((index ??= this._views.length) > this._views.length) ? this._views.length : index;
        const lastNode = index == 0 ? this._firstComment : this._views[index - 1].last;
        this._views.splice(index, 0, viewRef);
        viewRef.after(lastNode);
        return viewRef;
    }
    move(oldIndex, newIndex) {
        if (oldIndex === newIndex
            || oldIndex < 0 || oldIndex >= this._views.length
            || newIndex < 0 || newIndex >= this._views.length) {
            return;
        }
        const view = this._views.at(oldIndex);
        const next = this._views.at(newIndex);
        view.moveBefore(next.first);
        this._views.splice(oldIndex, 1);
        this._views.splice(newIndex, 0, view);
    }
    swap(index1, index2) {
        const min = Math.min(index1, index2);
        const max = Math.max(index1, index2);
        this.move(max, min);
        this.move(min + 1, max);
    }
    createEmbeddedView(templateRef, options) {
        const viewRef = templateRef.createEmbeddedView(options?.context || {}, this._parent);
        this.insert(viewRef, options?.index);
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
                const defaultTagName = ReflectComponents.getMetaDate(componentType)?.selector;
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
        this.insert(viewRef, options?.index);
        return { instance: component._model, nativeElement: component, viewRef: viewRef };
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
        const scope = ReactiveControlScope.for(element);
        const viewRef = new EmbeddedViewRefImpl(scope, [element]);
        this.insert(viewRef, options?.index);
        return { nativeElement: element, viewRef: viewRef };
    }
    createTextNode(data, options) {
        const text = document.createTextNode(data);
        const scope = ReactiveControlScope.for(text);
        const viewRef = new EmbeddedViewRefImpl(scope, [text]);
        this.insert(viewRef, options?.index);
        return text;
    }
}
//# sourceMappingURL=view-container-ref.js.map