import { TMGrammar } from './types';
import { templateScope } from './utility';

const grammar: TMGrammar = {
	name: 'Tagged',
	scopeName: 'source.tagged',
	injectionSelector: 'L:source -comment -string',
	patterns: [
		{ include: '#regex-template' },
		{ include: '#re-template' },
		{ include: '#html-template' },
		{ include: '#template-template' },
		{ include: '#css-template' },
		{ include: '#scss-template' },
		{ include: '#sass-template' },
		{ include: '#glsl-template' },
		{ include: '#markdown-template' },
	],
	repository: {
		'regex-template': templateScope('regex', 'source.ts', {
			contentName: 'meta.embedded.regexp.ts',
		}),
		're-template': templateScope('re', 'source.ts', {
			contentName: 'meta.embedded.regexp.ts',
		}),
		'html-template': templateScope('html', 'text.html.basic'),
		'template-template': templateScope('template', 'text.html.basic'),
		'css-template': templateScope('css', 'source.css'),
		'scss-template': templateScope('scss', 'source.scss'),
		'sass-template': templateScope('sass', 'source.sass'),
		'glsl-template': templateScope('glsl', 'source.glsl'),
		'markdown-template': templateScope('markdown', 'text.html.markdown', {
			begin: /(md)(`)/,
		}),
		// prettier-ignore
		interpolation: {
			begin: /\$\{/,
			beginCaptures: {
				0: { name: 'punctuation.definition.template-expression.begin.ts' },
			},
			end: /\}/,
			endCaptures: {
				0: { name: 'punctuation.definition.template-expression.end.ts' },
			},
			patterns: [{ include: 'source.ts' }],
		},
	},
};

export default grammar;
