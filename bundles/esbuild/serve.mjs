import esbuild from 'esbuild';
import { createBuildSettings } from './common.mjs';

const settings = createBuildSettings({ 
  sourcemap: true,
  banner: {
    js: `new EventSource('/esbuild').addEventListener('change', () => location.reload());`,
  }
});

const ctx = await esbuild.context(settings);

await ctx.watch();

const { host, port } = await ctx.serve({
  port: 5000,
  servedir: '.',
  fallback: "./index.html"
});

console.log(`Serving app at ${host}:${port}.`);
