import { MathUtils, TextureLoader } from "three";

const loader = new TextureLoader()

export const planets = [
  {
    name: 'Sun',
    color: 0xfcba03,
    size: 4,

    material: {
      color: 0xffffff,
      map: loader.load("src/assets/saturn.jpg"),
      // displacementMap: loader.load('src/assets/saturn-bump.jpg'),
      // displacementScale: 0.5,

      normalMap: loader.load('https://threejs.org/examples/textures/water/Water_1_M_Normal.jpg')
    },

    emissive: 0xffa500,
    emissiveIntensity: 1000000,

    sphere: null,
    ecosystem: null,
    position: {
      x: 0,
      y: 0,
      z: 0
    }
  },
  {
    name: 'Nauvis',
    color: 0x00ff00,
    size: 2,

    sphere: null,
    ecosystem: null,

    population: {
      group: null,

      entities: [
        {
          name: 'Nest',
          material: { color: 0xf73123 },
          geometry: {
            size: 0.18,
            widthSegment: 3,
            heightSegment: 2
          }
        },
        {
          name: 'Bitters',
          material: { color: 0x496e35 },
          geometry: {
            size: 0.12,
            widthSegment: 2,
            heightSegment: 4
          }
        },
        {
          name: 'Spitters',
          material: { color: 0xdb851d },
          geometry: {
            size: 0.1,
            widthSegment: 3,
            heightSegment: 6
          }
        },
      ],

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
      y: null,
      z: null,
    },

    rotationSpeed: {
      x: MathUtils.randFloatSpread(0.01),
      y: MathUtils.randFloatSpread(0.01),
      z: MathUtils.randFloatSpread(0.01),
    },
  },
  {
    name: 'Vulcanus',
    color: 0xb5512a,
    size: 2.1,

    sphere: null,
    ecosystem: null,

    population: {
      entities: [
        {
          name: 'Worms',
          color: 0xd1250f,
          geometry: {
            size: 0.17,
            widthSegment: 3,
            heightSegment: 3
          }
        },
        {
          name: 'Volcano',
          color: 0x995832,
          geometry: {
            size: 0.21,
            widthSegment: 2,
            heightSegment: 2
          }
        },
      ]
    },

    position: {
      x: 0,
      y: null,
      z: null,
    },

    rotationSpeed: {
      x: MathUtils.randFloatSpread(0.01),
      y: MathUtils.randFloatSpread(0.01),
      z: MathUtils.randFloatSpread(0.01),
    }
  },
  {
    name: 'Gleba',
    color: 0xffffff,
    size: 1,

    sphere: null,
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
      x: 0,
      y: null,
      z: null,
    },

    rotationSpeed: {
      x: MathUtils.randFloatSpread(0.01),
      y: MathUtils.randFloatSpread(0.01),
      z: MathUtils.randFloatSpread(0.01),
    }
  },
]?.slice(0, 1)
