function resolveHtmlFilePath(moduleUrl, filename) {
    if (filename) {
        return moduleUrl.substring(0, moduleUrl.lastIndexOf('/') + 1) + filename;
    }
    return moduleUrl.replace('.js', '.html');
}
export async function fetchFromCache(url) {
    return fetch(url, { cache: 'force-cache' })
        .then(response => {
        if (!response.ok) {
            throw new Error(`fetch ${url}, ${response}`);
        }
        return response.text();
    });
}
export function fetchHtmlFromModule(fileNameResolver) {
    const url = resolveHtmlFilePath(fileNameResolver.meta?.url, fileNameResolver.filename);
    return fetchFromCache(url);
}
export function htmlFullPath(fileFullPath) {
    if (fileFullPath.match(/^https?:\/\//g)) {
        return fetchFromCache(fileFullPath);
    }
    else {
        return fetchFromCache(window.location.href + fileFullPath);
    }
}
export function fetchHtml(fileNameResolver) {
    if (typeof fileNameResolver === 'string') {
        return htmlFullPath(fileNameResolver);
    }
    else if (typeof fileNameResolver === 'object' && fileNameResolver.meta) {
        return fetchHtmlFromModule(fileNameResolver);
    }
    else if (typeof fileNameResolver === 'object' && fileNameResolver.filename) {
        return htmlFullPath(fileNameResolver.filename);
    }
    throw new Error('no url provided');
}
//# path.js.map