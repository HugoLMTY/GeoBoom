import * as THREE from 'three'
// import TWEEN from '@tweenjs/tween.js'

import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { planets } from './planets'

const loader = new THREE.TextureLoader()

const scene = new THREE.Scene()
scene.background = loader.load('src/assets/background.jpg')

let rotation = false

const axes = ['x', 'y', 'z']

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const controls = new OrbitControls(camera, renderer.domElement)
camera.position.z = 20

const light = new THREE.AmbientLight(0xffffbb, 1)
scene.add(light)

const raycaster = new THREE.Raycaster()
const pointer = new THREE.Vector2()

document.body.append(renderer.domElement)

planets?.forEach(planet => {
  planet.ecosystem = new THREE.Group()

  const getRandomPosition = () => THREE.MathUtils.randFloatSpread(22)
  const getEcosystemPosition = () => {
    const rand = axes?.map(axis => ({ [axis]: getRandomPosition() }))
    console.log({ rand })


    // TODO Fix this overlap avoiding stuff
    const isTooClose = planets
      ?.filter(({ position, name }) => planet.name !== name && axes?.every(axis => position[axis] !== null ))
      ?.filter(({ position, size }) => {

        const biggestPlanet = size > planet.size ? size : planet.size

        return axes?.filter((axis, i) => {
          const curPos = position[axis]
          const target = rand[i][axis]

          const overlap = (curPos - biggestPlanet) < target < (curPos + biggestPlanet)
          // console.log({ overlap, axis, pos: position[axis], rand: rand[i][axis], biggestPlanet })

          return overlap
        })
      })
      ?.length >= 2

    const pos = {
      x: rand[0].x,
      y: rand[1].y,
      z: rand[2].z
    }

    return pos
    // return isTooClose ? getEcosystemPosition() : pos
  }

  if (!axes.every(axis => planet.position[axis] !== null)) {
    const position = getEcosystemPosition()
    planet.position = position
  }

  axes?.forEach(axis => planet.ecosystem.position[axis] =  planet.position[axis])

  const geometry = new THREE.SphereGeometry(planet.size, 64, 64)
  const material = new THREE.MeshStandardMaterial({
    ...planet.material,
    // color: planet.color,
    // wireframe: true,
    // emissive: planet.emissive || 0,
    // emissiveIntensity: planet.emissiveIntensity || 0,
  })
  planet.sphere = new THREE.Mesh(geometry, material)

  planet.sphere.name = planet.name

  planet.ecosystem.add(planet.sphere)
  scene.add(planet.ecosystem)
})


function animate () {
  requestAnimationFrame(animate)

  if (rotation) {
    planets?.forEach(planet => {
      if (!planet.rotationSpeed) { return }

      axes?.forEach(axis => planet.ecosystem.rotation[axis] += planet.rotationSpeed[axis])
    })
  }

  controls.update()
  // TWEEN.update()

  renderer.render(scene, camera)
}

function addEcosystemEntity (planet, intersect) {
  console.log({
    planet: planet.name,
    ecosystem: planet.ecosystem
  })


  const { entities } = planet.population || []
  const entityToAdd = entities[ Math.floor(Math.random() * entities?.length) ]
  if (!entityToAdd) { return }

  const {
    size,
    widthSegment,
    heightSegment
  } = entityToAdd.geometry || {
    size: 0.1,
    widthSegment: 3,
    heightSegment: 2
  }

  const geometry = new THREE.SphereGeometry(size, widthSegment, heightSegment)
  const material = new THREE.MeshBasicMaterial(entityToAdd.material)
  const entity = new THREE.Mesh(geometry, material)

  // TODO add autoincrement counter
  // entity.name = name

  const { x, y, z } = intersect.point

  entity.position.x = x - planet.position.x
  entity.position.y = y - planet.position.y
  entity.position.z = z - planet.position.z

  planet.ecosystem.add(entity)
}

function handlePlanetsIntersection () {

  const intersections = []

  planets?.forEach(planet => {
    if (!planet?.population) { return }

    const intersect = raycaster.intersectObjects(planet.ecosystem.children, true)
      ?.find(({ object }) => object.name === planet.name)
    if (!intersect) { return }

    intersections?.push({ planet, intersect })
  })
  if (intersections?.length <= 0) { return }

  const { planet, intersect } = intersections
    ?.sort((a, b) => camera.position.distanceTo(a.intersect.point) - camera.position.distanceTo(b.intersect.point))
    ?.[0]

  addEcosystemEntity(planet, intersect)
}

function onMouseDown (mouseEvent) {
  if (rotation) { return }

  pointer.x = (mouseEvent.clientX / window.innerWidth) * 2 - 1
  pointer.y = -((mouseEvent.clientY / window.innerHeight) * 2 - 1)

  raycaster.setFromCamera(pointer, camera)

  handlePlanetsIntersection()
}

window.toggleRotation = () => {
  rotation = !rotation

  if (!rotation) {
    planets.forEach(planet => {
      axes?.forEach(axis => planet.ecosystem.rotation[axis] = 0)
    })
  }
}
document.addEventListener('mousedown', onMouseDown)

animate()
