# Aurora Demo

Aurora Demo, is a helper for how to build your applications with different web bundler.


see test app for full [`example`](https://github.com/ibyar/aurora/tree/dev/example)


## Integration with `Webpack`


### add @ibyar/cli as loader

```js
module.exports = {
  entry: './src/index.ts',
    module: {
      exprContextCritical: false,
        rules: [
          {
            test: /\.tsx?$/,
            use: ['@ibyar/cli',],
            exclude: /node_modules/,
          }
        ]
      }
};
```

### use `ts-loader`

```js
// 1. import default from the plugin module
import {
	beforeCompileDirectiveOptions, beforeCompileComponentOptions,
	afterDeclarationsCompileComponentOptions,
	afterDeclarationsCompileDirectiveOptions,
	scanDirectivesOnceAsTransformer,
} from '@ibyar/cli';


// 3. add getCustomTransformer method to the loader config
var config = {
    ...
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    ... // other loader's options
                    getCustomTransformers: () => ({
						before: [
							scanDirectivesOnceAsTransformer(),
							beforeCompileDirectiveOptions,
							beforeCompileComponentOptions,
						],
						after: [],
						afterDeclarations: [
							afterDeclarationsCompileComponentOptions,
							afterDeclarationsCompileDirectiveOptions,
						],
					})
                }
            }
        ]
    }
    ...
};
```

## Integration with `Rollup`


```js
import typescript from '@rollup/plugin-typescript';
import {
	beforeCompileDirectiveOptions, beforeCompileComponentOptions,
	afterDeclarationsCompileComponentOptions,
	afterDeclarationsCompileDirectiveOptions,
	scanDirectivesOnceAsTransformer,
} from '@ibyar/cli';

export default = {
	...,
	plugins: [
		typescript({
			transformers: {
				before: [
					{ type: 'program', factory: scanDirectivesOnceAsTransformer() },
					{ type: 'program', factory: beforeCompileDirectiveOptions },
					{ type: 'program', factory: beforeCompileComponentOptions },
				],
				after: [],
				afterDeclarations: [
					{ type: 'program', factory: afterDeclarationsCompileComponentOptions },
					{ type: 'program', factory: afterDeclarationsCompileDirectiveOptions },
				],
			}
		}),
	],
};

```


see test app for full [`bundles/webpack`](https://github.com/ibyar/aurora/tree/dev/bundles/webpack)

see test app for full [`bundles/rollup`](https://github.com/ibyar/aurora/tree/dev/bundles/rollup)
