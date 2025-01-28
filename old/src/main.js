import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

import gsap from 'gsap'

import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

import atmosphereVertexShader from './shaders/atmosphereVertex.glsl'
import atmosphereFragmentShader from './shaders/atmosphereFragment.glsl'

const loader = new THREE.TextureLoader()
let rotation = false

const mouse = {
  x: 0,
  y: 0,
}

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)

document.body.append(renderer.domElement)

const scene = new THREE.Scene()

// const light = new THREE.DirectionalLight(0xffffff, 1);
// light.position.set(10, 10, 1);
// scene.add(light);
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
// scene.add(ambientLight)

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)

const controls = new OrbitControls(camera, renderer.domElement)
camera.position.z = 15

const group = new THREE.Group()

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(5, 50, 50),
  new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      globeTexture: {
        value: loader.load('src/earth/uv.jpg')
      }
    }
  })
)
group.add(earth)

const atmosphere = new THREE.Mesh(
  new THREE.SphereGeometry(5, 50, 50),
  new THREE.ShaderMaterial({
    vertexShader: atmosphereVertexShader,
    fragmentShader: atmosphereFragmentShader,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide
  })
)
atmosphere.scale.set(1.1, 1.1, 1.1)
group.add(atmosphere)

scene.add(group)

function animate () {
  requestAnimationFrame(animate)

  controls.update()

  if (rotation) {
    earth.rotation.y += 0.01
  }

  gsap.to(group.rotation, {
    x: -mouse.y * 0.3,
    y: mouse.x * 0.5,
    duration: 2
  })


  renderer.render(scene, camera)
}

animate()


function onMouseMove (mouseEvent) {
  mouse.x = (mouseEvent.clientX / innerWidth) * 2 - 1
  mouse.y = -(mouseEvent.clientY / innerHeight) * 2 - 1
}
document.addEventListener('mousemove', onMouseMove)


window.toggleRotation = () => {
  rotation = !rotation
}