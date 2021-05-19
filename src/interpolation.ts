import { interpGrammar } from './utility';

export const regexInterp = interpGrammar('regex', {
	injectionSelector: 'L:meta.embedded.regexp.ts string.regexp.ts',
});
export const htmlInterp = interpGrammar('html');
export const glslInterp = interpGrammar('glsl');
