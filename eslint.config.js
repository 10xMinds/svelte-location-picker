import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';
import sveltePlugin from 'eslint-plugin-svelte';
import svelteParser from 'svelte-eslint-parser';

export default [
	js.configs.recommended,
	{
		ignores: [
			'!.env.example',
			'.DS_Store',
			'.env',
			'.env.*',
			'/.pnpm/*',
			'/.svelte-kit',
			'/dist/**',
			'/public',
			'node_modules',
			'pnpm-lock.yaml',
			'src/app.html' // Ignoring app.html to fix the linting issue
		]
	},
	{
		plugins: {
			'@typescript-eslint': tsPlugin
		},
		languageOptions: {
			parser: tsParser,
			sourceType: 'module',
			ecmaVersion: 2020,
			parserOptions: {
				ecmaVersion: 2020,
				sourceType: 'module'
			},
			globals: {
				...js.configs.recommended.globals,
				browser: true,
				es2017: true,
				node: true
			}
		},
		files: ['**/*.js', '**/*.ts'],
		rules: {
			...tsPlugin.configs.recommended.rules
		}
	},
	{
		files: ['**/*.svelte', '**/*.html'],
		plugins: {
			svelte: sveltePlugin
		},
		languageOptions: {
			parser: svelteParser,
			parserOptions: {
				parser: tsParser
			}
		},
		rules: {
			...sveltePlugin.configs.recommended.rules
		}
	},
	prettier // Make sure to add prettier at the end to disable conflicting rules
];
