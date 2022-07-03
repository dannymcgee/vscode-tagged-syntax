# VS Code Tagged grammar

This repo is a hacky mess. It generates embedded grammar bindings for various
tagged template literals in TypeScript for VS Code.

For example, the text in this template will be highlighted as a regular expression:
```typescript
const ident = regex`/[$_a-zA-Z][$_a-zA-Z0-9]*/`;
```

And this one will be highlighted as HTML:
```typescript
const message = "Hello, world!";
const heading = html`<h1>${message}</h1>`;
```

And here's some markdown:
```typescript
const markdown = md`
# To-Do List

 * Lorem **Ipsum**
 * Dolor Sit _Amet_
 * Consectetur
`;
```

How about some GLSL:
```typescript
const vert = glsl`
attribute vec3 a_position;
varying vec2 v_uv;

void main() {
	gl_Position = vec4(a_position, 1.0);
	v_uv = a_position.xy;
}
`;

const frag = glsl`
varying vec2 v_uv;

void main() {
	gl_FragColor = vec4(v_uv, 0.0, 1.0);
}
`;
```

The codebase is a wreck. I wrote it in a hurry about a year ago and never
bothered to clean it up or document anything. If you've somehow stumbled across
this and want to use it, just clone it and run:

```sh
> yarn # install dependencies
> yarn test-run # build and install the extension
```

Some day I might clean it up and publish it to the VS Code marketplace. But I
have a lot of projects competing for my attention, so probably not. :)
