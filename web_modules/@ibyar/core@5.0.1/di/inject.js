import { InjectionProvider } from './provider.js';
const ROOT_PROVIDER = new InjectionProvider();
const PROVIDERS = [ROOT_PROVIDER];
export function forkProvider() {
    return ROOT_PROVIDER.fork();
}
export function addProvider(modelProvider) {
    PROVIDERS.push(modelProvider);
}
export function removeProvider(modelProvider) {
    const index = PROVIDERS.lastIndexOf(modelProvider);
    if (index >= 0) {
        PROVIDERS.splice(index, 1);
    }
}
function getProvider() {
    return PROVIDERS.at(-1) ?? ROOT_PROVIDER;
}
export function provide(provider, value) {
    getProvider().provide(provider, value);
}
export function inject(provider) {
    return getProvider().inject(provider);
}
//# sourceMappingURL=inject.js.map