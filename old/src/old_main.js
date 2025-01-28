import * as THREE from 'three'

const state = {
  mousedown: false,
}

const initalSpherePosition = {
  x: null,
  y: null
}

const initialClickPosition = {
  x: null,
  y: null
}

const lastMousePosition = {
  timestamp: null,
  x: null,
  y: null
}
const mouseSpeed = {
  x: null,
  y: null
}

const inertia = {
  x: 0.7,
  y: 0.7
}

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 5

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)

document.body.append(renderer.domElement)

const geometry = new THREE.SphereGeometry(1, 32, 16)
const material = new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: true })
const sphere = new THREE.Mesh(geometry, material)
scene.add( sphere );

function animate () {
  requestAnimationFrame(animate)

  if (!state.mousedown) {

    if (mouseSpeed.y >= 0) {
      mouseSpeed.y -= inertia.y
      console.log(mouseSpeed.y)

      sphere.rotation.x += mouseSpeed.y
    }
    // else {
    //   sphere.rotation.x += 0.01
    // }

    if (mouseSpeed.x >= 0) {
      mouseSpeed.x -= inertia.x

      sphere.rotation.y += mouseSpeed.x
    }
    // else {
    //   sphere.rotation.y += 0.01
    // }
  }

  renderer.render(scene, camera)
}

function onMouseDown (mouseEvent) {
  state.mousedown = true

  initialClickPosition.x = mouseEvent.x
  initialClickPosition.y = mouseEvent.y

  initalSpherePosition.x = sphere.rotation.x
  initalSpherePosition.y = sphere.rotation.y

  // console.log({ mouse: 'down', sphereX: sphere.rotation.x, sphereY: sphere.rotation.y })
}
function onMouseUp (mouseEvent) {
  state.mousedown = false

  initialClickPosition.x = null
  initialClickPosition.y = null

  initalSpherePosition.x = sphere.rotation.x
  initalSpherePosition.y = sphere.rotation.y

  // console.log({ mouse: 'up', sphereX: sphere.rotation.x, sphereY: sphere.rotation.y })
}

function onMouseMove (mouseEvent) {
  if (!state.mousedown) { return }

  const offset = (axis) => (mouseEvent[axis] - initialClickPosition[axis]) / 100

  sphere.rotation.x = initalSpherePosition.x + offset('y')
  sphere.rotation.y = initalSpherePosition.y - offset('x')

  // _ Get mouse speed
  if (!lastMousePosition.timestamp) {
    lastMousePosition.timestamp = Date.now()

    lastMousePosition.x = mouseEvent.screenX
    lastMousePosition.y = mouseEvent.screenY
  }

  const dt = Date.now() - lastMousePosition.timestamp
  const dx = mouseEvent.screenX - lastMousePosition.x
  const dy = mouseEvent.screenY - lastMousePosition.y

  mouseSpeed.x = dx > 0 ? dx / 3 : -dx / 3
  mouseSpeed.y = dy > 0 ? dy / 3 : -dy / 3

  // console.log({ mouse: 'move', sphereX: sphere.rotation.x, sphereY: sphere.rotation.y })
}

document.addEventListener('mousemove', onMouseMove)
document.addEventListener('mousedown', onMouseDown)
document.addEventListener('mouseup', onMouseUp)

animate()
