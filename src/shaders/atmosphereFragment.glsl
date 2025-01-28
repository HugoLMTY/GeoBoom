varying vec3 vertexNormal;
uniform vec3 color;
uniform float opacity;

void main () {
  float intensity = pow(0.6 - dot(vertexNormal, vec3(0, 0, 1.0)), 2.0);

  gl_FragColor = vec4(color, opacity) * intensity;
}