import { ConnectableObservable } from '../observable/ConnectableObservable.js';
import { isFunction } from '../util/isFunction.js';
import { connect } from './connect.js';
export function multicast(subjectOrSubjectFactory, selector) {
    var subjectFactory = isFunction(subjectOrSubjectFactory) ? subjectOrSubjectFactory : function () { return subjectOrSubjectFactory; };
    if (isFunction(selector)) {
        return connect(selector, {
            connector: subjectFactory,
        });
    }
    return function (source) { return new ConnectableObservable(source, subjectFactory); };
}
//# sourceMappingURL=multicast.js.map