import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const loader = new THREE.TextureLoader()

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)

document.body.append(renderer.domElement)

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)

const controls = new OrbitControls(camera, renderer.domElement)
camera.position.z = 15

function animate () {
  requestAnimationFrame(animate)

  controls.update()
  renderer.render(scene, camera)
}

animate()

window.toggleRotation = () => {
  rotation = !rotation
}