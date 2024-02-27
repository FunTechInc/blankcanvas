precision highp float;
varying vec2 vUv;
uniform float u_time;
uniform vec2 u_resolution;
uniform sampler2D u_tex;

void main() {
	gl_FragColor = texture2D(u_tex, vUv);
}