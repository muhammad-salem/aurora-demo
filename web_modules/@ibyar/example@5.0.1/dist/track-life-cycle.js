import { makeClassDecorator } from '../../aurora@5.0.1/index.js';
function trackLifecycle(prototype, name, lifecycle) {
    const fn = Object.getOwnPropertyDescriptor(prototype, lifecycle)?.value;
    console.log(`-- set tracker for ${name} of ${lifecycle}`, fn?.toString());
    Object.defineProperty(prototype, lifecycle, {
        writable: true,
        configurable: true,
        value: function (...args) {
            console.log(`-- call - [${name}]: [${lifecycle}] --`);
            fn?.apply(this, args);
        }
    });
}
/**
 * define a new custom element model class
 */
export const TrackLifeCycle = makeClassDecorator((_, constructor, context, metadata) => {
    const prototype = Object.getPrototypeOf(constructor);
    const name = constructor['name'];
    trackLifecycle(prototype, name, 'onChanges');
    trackLifecycle(prototype, name, 'onInit');
    trackLifecycle(prototype, name, 'doCheck');
    trackLifecycle(prototype, name, 'afterContentInit');
    trackLifecycle(prototype, name, 'afterContentChecked');
    trackLifecycle(prototype, name, 'afterViewInit');
    trackLifecycle(prototype, name, 'afterViewChecked');
    trackLifecycle(prototype, name, 'onViewMove');
    trackLifecycle(prototype, name, 'onViewAdopted');
    trackLifecycle(prototype, name, 'onDestroy');
});
//# sourceMappingURL=track-life-cycle.js.map