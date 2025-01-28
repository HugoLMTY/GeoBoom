import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene()

let rotation = false

const axes = ['x', 'y', 'z']
const planets = [
  {
    name: 'Nauvis',
    color: 0x00ff00,
    size: 1.5,

    ecosystem: null,
    population: {
      group: null,

      name: 'Natives',
      color: 0x00afefe,
      geometry: {
        size: 0.1,
        widthSegment: 3,
        heightSegment: 2
      }
    },

    position: {
      x: 0,
      y: 0,
      z: 0
    },

    rotationSpeed: {
      // x: 0.001,
      // y: 0.2,
      // z: 0
      x: THREE.MathUtils.randFloatSpread(0.01),
      y: THREE.MathUtils.randFloatSpread(0.01),
      z: THREE.MathUtils.randFloatSpread(0.01),
      // x: 0,
      // y: 0,
      // z: 0
    },

    sphere: null
  },
  {
    name: 'Vulcanus',
    color: 0xffff00,
    size: 1.5,

    ecosystem: null,
    population: {
      group: null,
      name: 'Worms',
      color: 0x10a1ef4,
      geometry: {
        size: 0.1,
        widthSegment: 3,
        heightSegment: 2
      }
    },

    position: {
      x: null,
      y: null,
      z: null,
    },

    rotationSpeed: {
      x: THREE.MathUtils.randFloatSpread(0.01),
      y: THREE.MathUtils.randFloatSpread(0.01),
      z: THREE.MathUtils.randFloatSpread(0.01),
    },

    sphere: null
  },
  {
    name: 'Gleba',
    color: 0xffffff,
    size: 1,

    ecosystem: null,
    population: {
      group: null,
      name: 'Pentapods',
      color: 0xabb1c44,
      geometry: {
        size: 0.1,
        widthSegment: 3,
        heightSegment: 2
      }
    },

    position: {
      x: null,
      y: null,
      z: null,
    },

    rotationSpeed: {
      x: THREE.MathUtils.randFloatSpread(0.01),
      y: THREE.MathUtils.randFloatSpread(0.01),
      z: THREE.MathUtils.randFloatSpread(0.01),
    },

    sphere: null
  },
]?.slice(0, 3)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const controls = new OrbitControls(camera, renderer.domElement)
camera.position.z = 13

const raycaster = new THREE.Raycaster()
const pointer = new THREE.Vector2()

document.body.append(renderer.domElement)

planets?.forEach(planet => {
  planet.ecosystem = new THREE.Group()

  const getRandomPosition = () => THREE.MathUtils.randFloatSpread(12)
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

  const geometry = new THREE.SphereGeometry(planet.size, 32, 32)
  const material = new THREE.MeshBasicMaterial({ color: planet.color, wireframe: true  })
  planet.sphere = new THREE.Mesh(geometry, material)

  planet.sphere.name = planet.name

  planet.ecosystem.add(planet.sphere)
  scene.add(planet.ecosystem)
})


function animate () {
  requestAnimationFrame(animate)

  if (rotation) {
    planets?.forEach(planet => {
      axes?.forEach(axis => planet.ecosystem.rotation[axis] += planet.rotationSpeed[axis])
    })
  }

  controls.update();

  renderer.render(scene, camera)
}

function onMouseDown (mouseEvent) {
  if (!rotation) { return }

  pointer.x = (mouseEvent.clientX / window.innerWidth) * 2 - 1
  pointer.y = -((mouseEvent.clientY / window.innerHeight) * 2 - 1)

  raycaster.setFromCamera(pointer, camera)

  planets?.forEach(planet => {
    const intersect = raycaster.intersectObjects(planet.ecosystem.children, true)
      ?.find(({ object }) => object.name === planet.name)
    if (!intersect) { return }
    console.log({
      planet: planet.name,
      ecosystem: planet.ecosystem
    })

    const { x, y, z } = intersect.point

    const { name, color, geometry } = planet.population
    const { size, widthSegment, heightSegment } = geometry || { size: 0.1, widthSegment: 3, heightSegment: 2}

    const entityGeometry = new THREE.SphereGeometry(size, widthSegment, heightSegment)
    const entityMaterial = new THREE.MeshBasicMaterial({ color })
    const entity = new THREE.Mesh(entityGeometry, entityMaterial)

    // TODO add autoincrement counter
    // entity.name = name

    entity.position.x = x - planet.position.x
    entity.position.y = y - planet.position.y
    entity.position.z = z - planet.position.z

    planet.ecosystem.add(entity)
  })
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
