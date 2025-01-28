varying vec3 vertexNormal;
uniform float diffusion;
uniform float radius;

void main() {
  vertexNormal = normalize(normalMatrix * normal);

  vec4 worldPosition = modelMatrix * vec4(position * radius, 1.0);
  gl_Position = projectionMatrix * viewMatrix * worldPosition;
}
