import * as esbuild from 'esbuild';
import { createBuildSettings } from './common.mjs';

const settings = createBuildSettings({ minify: true });

await esbuild.build(settings);
