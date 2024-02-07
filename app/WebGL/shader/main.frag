precision highp float;
varying vec2 vUv;
uniform float u_time;
uniform vec2 u_resolution;

void main() {	
	gl_FragColor = vec4(1.,sin(u_time*2.),1.,1.);
}