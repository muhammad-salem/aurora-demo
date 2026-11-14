import type { MetadataClass } from '@ibyar/decorators';
import type { HTMLComponent } from '../component/custom-element.js';
import type { Type } from '../utils/typeof.js';
import type { ComponentModelClass } from './view.js';
export declare function isComponentModelClass(target: MetadataClass): target is ComponentModelClass;
export declare function getComponentView<T extends object>(modelClass: MetadataClass<T>, selector?: string): Type<HTMLComponent<T>> | undefined;
//# sourceMappingURL=utils.d.ts.map