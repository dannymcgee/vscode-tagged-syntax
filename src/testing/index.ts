// @ts-nocheck

let name = 'world';

let pattern = regex`/^[Hh]ello,?\s+(${name})!?$/`;

let element = html`
	<span>Hello, <strong>${name}</strong>!</span>
`;

let vertSrc = glsl`
	attribute vec4 aVertexPosition;

	uniform mat4 uModelViewMatrix;
	uniform mat4 uProjectionMatrix;

	void main() {
		gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
	}
`
