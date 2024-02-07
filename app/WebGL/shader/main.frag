precision highp float;
uniform float u_time;
uniform vec2 u_resolution;

void main(){
	gl_FragColor= vec4(1.0,sin(u_time),0.0,1.0);
}