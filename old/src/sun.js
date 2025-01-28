import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const loader = new THREE.TextureLoader()

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.append(renderer.domElement)

const scene = new THREE.Scene()

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 0, 1);
scene.add(light);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const controls = new OrbitControls(camera, renderer.domElement)
camera.position.z = 6

const sunGroup = new THREE.Group()

const sunGeometry = new THREE.SphereGeometry(3, 32, 32)
const sunMaterial = new THREE.MeshStandardMaterial({
  color: 0xcbd44c,
  emissive: 0xdb5d23,
  emissiveIntensity: 2,

  map: loader.load('src/assets/spiral.png'),
  normalMap: loader.load('src/assets/saturn-normal.png'),

  displacementMap: loader.load('https://media.istockphoto.com/id/977547086/video/abstract-curves-parametric-curved-lines-and-shapes-seamless-loop-background.jpg?s=640x640&k=20&c=N9JHMK9dQVI5_wVVmz6Vk1jih7-NNR0eV179TOEK7aY='),
  displacementScale: 0.4
})
const sun = new THREE.Mesh(sunGeometry, sunMaterial)
sun.rotation.z = 1
sunGroup.add(sun)

const waterGeometry = new THREE.SphereGeometry(3.13, 32, 32)
const waterMaterial = new THREE.MeshStandardMaterial({
  color: 0x505491,
  emissive: 0x505491,
  emissiveIntensity: 0.3,

  map: loader.load('src/assets/water.jpg'),
  normalMap: loader.load('src/assets/water-normal.jpeg'),

  displacementMap: loader.load('src/assets/water-displacement.jpg'),
  displacementScale: 0.1
})
const water = new THREE.Mesh(waterGeometry, waterMaterial)
sunGroup.add(water)

scene.add(sunGroup)

const geometry = new THREE.SphereGeometry(1, 32, 32)
const material = new THREE.MeshStandardMaterial({
  map: loader.load('src/assets/spiral.png'),
  normalMap: loader.load('src/assets/spiral-normal.png'),
  displacementMap: loader.load('src/assets/spiral-displacement.png'),
  displacementScale: 3
})
const planet = new THREE.Mesh(geometry, material)
planet.position.x = 7
planet.position.y = 7
scene.add(planet)

function animate () {
  requestAnimationFrame(animate)

  controls.update()

  // planet.rotation.x += 0.01
  planet.rotation.y += 0.01
  planet.rotation.z += 0.01

  sunGroup.rotation.x += 0.002
  sunGroup.rotation.y += 0.002
  sunGroup.rotation.z += 0.002

  const windSpeed = Math.random() / 200

  water.rotation.x += windSpeed - THREE.MathUtils.randFloatSpread(0.001)
  water.rotation.y += windSpeed - THREE.MathUtils.randFloatSpread(0.001)
  water.rotation.z += windSpeed - THREE.MathUtils.randFloatSpread(0.001)


  renderer.render(scene, camera)
}

animate()