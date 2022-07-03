// @ts-nocheck

let name = 'world';

let pattern = regex`/^[Hh]ello,?\s+(${name})!?$/`;
let pattern = re`/^[Hh]ello,?\s+(${name})!?$/`;

let element = html`
	<span>Hello, <strong>${name}</strong>!</span>
`;
let element = template`
	<span>Hello, <string>${name}</string>!</span>
`;

let vertSrc = glsl`
	attribute vec4 aVertexPosition;

	uniform mat4 uModelViewMatrix;
	uniform mat4 uProjectionMatrix;

	void main() {
		gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
	}
`

let markdown = md`
# Heading
Here's some text!
`;
