/// <reference types="@ibyar/types" />
import './polyfills.js';
import './reactive-scope/scope.js';
(() => {const link = document.createElement('link');link.rel = 'stylesheet';link.href = __GetModuleDir() + "../../../bootstrap@5.3.8/dist/css/bootstrap.min.css";document.head.append(link);})();
import '../../../bootstrap@5.3.8/dist/js/bootstrap.esm.js';
export * from './extends/inherits.js';
export * from './app-root.js';
//# sourceMappingURL=index.js.map
var __moduleDir__;function __GetModuleDir() {return __moduleDir__ || (__moduleDir__ = import.meta.url.substring(0, import.meta.url.lastIndexOf('/') + 1));}