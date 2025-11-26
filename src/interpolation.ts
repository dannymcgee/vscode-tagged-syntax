import { interpGrammar } from './utility';

export const regexInterp = interpGrammar('regex', {
	injectionSelector: 'L:meta.embedded.regexp.ts string.regexp.ts',
});
export const htmlInterp = interpGrammar('html');
export const templateInterp = interpGrammar('template');
export const cssInterp = interpGrammar('css');
export const scssInterp = interpGrammar('scss');
export const sassInterp = interpGrammar('sass');
export const glslInterp = interpGrammar('glsl');
export const markdownInterp = interpGrammar('markdown');
