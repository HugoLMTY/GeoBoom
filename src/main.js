import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

import ecosystemsList from './ecosystem/ecosystems.list'
import { generateEcosystem } from './ecosystem/generate'
import { animateEcosystem } from './ecosystem/animate'

// const loader = new THREE.TextureLoader()

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)

document.body.append(renderer.domElement)

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const controls = new OrbitControls(camera, renderer.domElement)
camera.position.z = 25

const light = new THREE.DirectionalLight(0xffffff, 1)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)

light.position.set(10, 10, 1)
scene.add(light)
scene.add(ambientLight)

ecosystemsList?.forEach(ecosystem => {
  const ecosystemGroup = generateEcosystem(ecosystem)

  scene.add(ecosystemGroup)
})

function animate () {
  requestAnimationFrame(animate)

  controls.update()

  ecosystemsList?.forEach(ecosystem => {
    animateEcosystem(ecosystem)
  })


  renderer.render(scene, camera)
}

animate()

window.toggleRotation = () => {
  rotation = !rotation
}