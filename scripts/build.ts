import * as fs from 'fs-extra';

import { JsonObject, TMGrammar } from '../src/types';
import tagged from '../src';
import {
	regexInterp,
	htmlInterp,
	templateInterp,
	glslInterp,
	markdownInterp,
	cssInterp,
	scssInterp,
	sassInterp,
	sqlInterp,
} from '../src/interpolation';

interface GrammarConfig {
	grammar: TMGrammar;
	name: string;
	embeddedLang?: string;
}

(async function () {
	// prettier-ignore
	await build([{
		grammar: regexInterp,
		name: 'regex',
		embeddedLang: 'typescript',
	}, {
		grammar: regexInterp,
		name: 're',
		embeddedLang: 'typescript',
	}, {
		grammar: htmlInterp,
		name: 'html',
		embeddedLang: 'html',
	}, {
		grammar: templateInterp,
		name: 'template',
	}, {
		grammar: cssInterp,
		name: 'css',
	}, {
		grammar: scssInterp,
		name: 'scss',
	}, {
		grammar: sassInterp,
		name: 'sass',
	}, {
		grammar: glslInterp,
		name: 'glsl',
	}, {
		grammar: markdownInterp,
		name: 'markdown',
	}, {
		grammar: sqlInterp,
		name: 'sql',
	}]);
})();

async function build(grammars: GrammarConfig[]) {
	let taggedJson = toJson(tagged);
	let taggedContent = JSON.stringify(taggedJson, null, '\t');

	await fs.ensureDir('dist');
	await fs.writeFile(`dist/tagged.tmLanguage.json`, taggedContent);

	await Promise.all(
		grammars.map(async (g) => {
			let content = JSON.stringify(g.grammar, null, '\t');
			await fs.writeFile(
				`dist/${g.name}-interp.tmLanguage.json`,
				content,
			);
		}),
	);

	let packageJson = (await fs.readFile('package.base.json')).toString();
	let pkg = JSON.parse(packageJson);

	let injectTo = ['source.js', 'source.jsx', 'source.ts', 'source.tsx'];
	let taggedGrammar = {
		scopeName: 'source.tagged',
		embeddedLanguages: {},
		path: './dist/tagged.tmLanguage.json',
		injectTo,
	};

	grammars.forEach((g) => {
		pkg.contributes.grammars.push({
			scopeName: `source.tagged.${g.name}.interpolation`,
			embeddedLanguages: {
				'meta.template.expression.ts': 'typescript',
			},
			path: `./dist/${g.name}-interp.tmLanguage.json`,
			injectTo,
		});

		let key = g.grammar.injectionSelector!.match(/^L:(\S+)/)![1];
		taggedGrammar.embeddedLanguages[key] = g.embeddedLang ?? g.name;
	});

	pkg.contributes.grammars.unshift(taggedGrammar);

	packageJson = JSON.stringify(pkg, null, '\t');
	await fs.writeFile('package.json', packageJson);
}

function toJson(grammar: TMGrammar): JsonObject {
	let processed: JsonObject = {};
	for (let [key, value] of Object.entries(grammar)) {
		// prettier-ignore
		processed[key] =
			typeof value === 'string'
				? value :
			value instanceof RegExp
				? value.toString().replace(/^\/|\/$/g, '') :
			value instanceof Array
				? value.map(toJson)
				: toJson(value)
	}
	return processed;
}
