import * as THREE from 'three'

import atmosphereVertexShader from './../shaders/atmosphereVertex.glsl'
import atmosphereFragmentShader from './../shaders/atmosphereFragment.glsl'

const loader = new THREE.TextureLoader()

export function generateEcosystem (ecosystem) {
  const group = new THREE.Group()
  group.name = ecosystem.name
  group.position.copy(ecosystem.position)


  const { planetOptions } = ecosystem
  ecosystem.planet = new THREE.Mesh(
    new THREE.SphereGeometry(planetOptions.size || 1, 50, 50),
    new THREE.MeshStandardMaterial({
      map: loader.load(planetOptions.uv),
      normalMap: loader.load(planetOptions.normal),
      ...planetOptions.material,
    })
  )
  ecosystem.planet.name = `${ecosystem.name}_planet`

  const { atmosphereOptions } = ecosystem
  ecosystem.atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(planetOptions.size || 1, 50, 50),
    new THREE.ShaderMaterial({
      vertexShader: atmosphereVertexShader,
      fragmentShader: atmosphereFragmentShader,

      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,

      transparent: true,
      depthWrite: false,

      uniforms: {
        diffusion: {
          value: atmosphereOptions.diffusion || 0.9
        },
        radius: {
          value: atmosphereOptions.radius || 0.9
        },
        color: {
          value: atmosphereOptions.color
        },
        opacity: {
          value: atmosphereOptions.opacity
        }
      }
    })
  )
  ecosystem.atmosphere.scale.copy(atmosphereOptions.scale)
  ecosystem.atmosphere.name = `${ecosystem.name}_atmosphere`

  group.add(ecosystem.planet)
  group.add(ecosystem.atmosphere)

  return group
}