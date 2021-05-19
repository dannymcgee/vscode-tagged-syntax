import { TMGrammar, TMGrammarScope } from '../types';

export function interpGrammar(
	id: string,
	overrides: Partial<TMGrammar> = {},
): TMGrammar {
	return {
		scopeName: `source.tagged.${id}.interpolation`,
		injectionSelector: `L:meta.embedded.${id}`,
		patterns: [{ include: 'source.ts#template-substitution-element' }],
		...overrides,
	};
}

export function templateScope(
	id: string,
	targetScope: string,
	overrides: Partial<TMGrammarScope> = {},
): TMGrammarScope {
	return {
		begin: `(${id})(\`)`,
		beginCaptures: {
			1: { name: `entity.name.function.tagged-${id}.ts` },
			2: { name: `punctuation.definition.string.template.begin.ts` },
		},
		end: /(`)/,
		endCaptures: {
			1: { name: `punctuation.definition.string.template.end.ts` },
		},
		contentName: `meta.embedded.${id}`,
		patterns: [
			{ include: 'source.ts#template-substitution-element' },
			{ include: targetScope },
		],
		...overrides,
	};
}
