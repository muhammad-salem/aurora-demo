const __moduleDir__ = import.meta.url.substring(0, import.meta.url.lastIndexOf('/') + 1);function __GetModuleDir() {return __moduleDir__;}(() => {const link = document.createElement('link');link.rel = 'stylesheet';link.href = __GetModuleDir() + "../../../bootstrap/dist/css/bootstrap.min.css";document.head.append(link);})();
import '../../../bootstrap/dist/js/bootstrap.esm.js';
import '../../../@popperjs/core/lib/index.js';
export * from './directive/add-note.directive.js';
export * from './directive/notify-user.directive.js';
export * from './directive/time.directive.js';
export * from './person-app/person.js';
export * from './person-app/person-app.js';
export * from './two-way/binding-2-way.js';
export * from './two-way/shared-model.js';
export * from './video-player/video.js';
export * from './pipe-app/pipe-test.js';
export * from './fetch/fetch-app.js';
export * from './route/component-outlet.js';
export * from './route/router-outlet.js';
export * from './app-root.js';
//# index.js.map