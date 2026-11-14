import type { Type } from '../utils/typeof.js';
import { MetadataClass } from '@ibyar/decorators';
import { ComponentRef } from '../component/component.js';
import { HTMLComponent } from '../component/custom-element.js';
/**
 *
 * @param modelClass
 * @param componentRef
 */
export declare function initCustomElementView<T extends Object>(modelClass: MetadataClass<T>, componentRef: ComponentRef<T>): MetadataClass<HTMLComponent<T>>;
export type ComponentModelClass = MetadataClass & {
    [key: string]: string;
} & {
    component: {
        [key: string]: string;
    };
} & {
    [key: string]: Type<HTMLComponent<any>>;
};
export declare function addViewToModelClass<T extends object>(modelClass: MetadataClass<T>, selector: string, viewClass: Type<HTMLComponent<T>>, htmlViewClassName: string): void;
export declare function buildViewClassNameFromSelector(selector: string): string;
//# sourceMappingURL=view.d.ts.map