import { Components } from '../component/component.js';
import { EmbeddedViewRefImpl } from './view-ref.js';
import { getComponentView } from '../view/view.js';
export class ViewContainerRef {
}
export class ViewContainerRefImpl extends ViewContainerRef {
    constructor(parent, firstComment) {
        super();
        this.parent = parent;
        this.firstComment = firstComment;
        this.views = [];
    }
    get anchorElement() {
        return this.parent;
    }
    get length() {
        return this.views.length;
    }
    clear() {
        if (this.views.length > 0) {
            for (const elm of this.views) {
                elm.destroy();
            }
            this.views.splice(0);
        }
    }
    get(index) {
        if (index >= this.views.length) {
            return undefined;
        }
        return this.views[index];
    }
    detach(index) {
        index ?? (index = this.views.length - 1);
        const viewRef = this.views[index];
        viewRef.detach();
        this.views.splice(index, 1);
        return viewRef;
    }
    indexOf(viewRef) {
        return this.views.indexOf(viewRef);
    }
    remove(index) {
        index ?? (index = this.views.length - 1);
        this.views[index].destroy();
        this.views.splice(index, 1);
    }
    insert(viewRef, index) {
        index = ((index ?? (index = this.views.length)) > this.views.length) ? this.views.length : index;
        const lastNode = index == 0 ? this.firstComment : this.views[index - 1].last;
        this.views.splice(index, 0, viewRef);
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
        const viewRef = templateRef.createEmbeddedView(options?.context || {}, this.parent);
        this.insert(viewRef, options?.index);
        return viewRef;
    }
    createComponent(componentType, options) {
        const defaultTagName = Components.getComponentRef(componentType).selector;
        const ViewClass = getComponentView(componentType, options?.selector ?? defaultTagName);
        if (!ViewClass) {
            throw new Error(`Can't find View component for class ${componentType.name}`);
        }
        const component = new ViewClass();
        const viewRef = new EmbeddedViewRefImpl(component._proxyModel, [component]);
        this.insert(viewRef, options?.index);
        return component._proxyModel;
    }
}
//# sourceMappingURL=view-container-ref.js.map