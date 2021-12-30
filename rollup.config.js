// @ts-check
import { defineConfig } from 'rollup'
import pkg from './package.json'
import esbuild from 'rollup-plugin-esbuild'

// banner
const banner = `/*!
* ${pkg.name} v${pkg.version} (${pkg.homepage})
* Copyright ${new Date().getFullYear()} ${pkg.author}
* Licensed under ${pkg.license} (${pkg.repository.replace('.git', '')}/blob/master/LICENSE)
*/`

// global variable name
const name = 'BsToast'

export default defineConfig([
	{
		input: pkg.source,
		output: [
			{ banner, format: 'umd', file: pkg.main, name },
			{ banner, format: 'es', file: pkg.module },
		],
		plugins: [esbuild()],
	},
	{
		input: pkg.source,
		output: [
			{ banner, format: 'umd', file: pkg.main.slice(0, -2) + 'min.js', name },
			{ banner, format: 'es', file: pkg.module.slice(0, -2) + 'min.js' },
		],
		plugins: [esbuild({ minify: true })],
	},
])
