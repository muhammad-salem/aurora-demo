import cssImportPlugin from '@chialab/esbuild-plugin-css-import';
import htmlPlugin from '@chialab/esbuild-plugin-html';
import esbuildPluginTsc from 'esbuild-plugin-tsc';

export function createBuildSettings(options = {}) {
  return {
    entryPoints: ['src/index.ts'],
    outfile: 'dist/bundle.js',
    bundle: true,
    plugins: [
      cssImportPlugin(),
      htmlPlugin({minifyOptions: false}),
      esbuildPluginTsc({
        force: true
      }),
    ],
    ...options
  };
}
