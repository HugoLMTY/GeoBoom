import { MathUtils, Vector3 } from 'three'
import { IEcosystem } from './ecosystem.interface'

export default [
  {
    name: 'Sun',
    position: new Vector3(0, 0, 0),

    atmosphere: null,
    atmosphereOptions: {
      scale: new Vector3(1.1, 1.1, 1.1),
      radius: 7,
      diffusion: 20,
      color: new Vector3(0.9, 0.2, 0.2),
      opacity: 1
    },

    planet: null,
    planetOptions: {
      size: 4,
      uv: 'src/assets/sun/uv.jpeg',
      normal: 'src/assets/sun/normal.jpg',
      displacement: 'src/assets/sun/displacement.jpg',

      material: {
        emissive: 0xEF2222,
        emissiveIntensity: 0.7
      }
    },

    entities: null
  },
  {
    name: 'Nauvis',
    position: new Vector3(
      MathUtils.randFloatSpread(50),
      MathUtils.randFloatSpread(50),
      MathUtils.randFloatSpread(50)
    ),

    atmosphere: null,
    atmosphereOptions: {
      scale: new Vector3(1.1, 1.1, 1.1),
      radius: 1.05,
      diffusion: 0.94,
      color: new Vector3(0.3, 0.6, 1.0),
      opacity: 1
    },

    planet: null,
    planetOptions: {
      size: 2,
      uv: 'src/assets/earth/uv.jpg',
      normal: 'src/assets/earth/normal.jpg',
      displacement: 'src/assets/earth/displacement.jpg',

    },

    entities: null
  },
  {
    name: 'Vulcanus',
    position: new Vector3(
      MathUtils.randFloatSpread(50),
      MathUtils.randFloatSpread(50),
      MathUtils.randFloatSpread(50)
    ),

    atmosphere: null,
    atmosphereOptions: {
      scale: new Vector3(1.1, 1.1, 1.1),
      radius: 1.05,
      diffusion: 0.94,
      color: new Vector3(0.7, 0.3, 0.2),
      opacity: 1
    },

    planet: null,
    planetOptions: {
      size: 2.4,
      uv: 'src/assets/mars/uv.jpg',
      normal: 'src/assets/mars/normal.jpg',
      displacement: 'src/assets/mars/displacement.jpg',
    },

    entities: null
  },
  {
    name: 'Gleba',
    position: new Vector3(
      MathUtils.randFloatSpread(50),
      MathUtils.randFloatSpread(50),
      MathUtils.randFloatSpread(50)
    ),

    atmosphere: null,
    atmosphereOptions: {
      scale: new Vector3(1.1, 1.1, 1.1),
      radius: 1.05,
      diffusion: 0.94,
      color: new Vector3(0.7, 0.7, 1.0),
      opacity: 1
    },

    planet: null,
    planetOptions: {
      size: 2.4,
      uv: 'src/assets/pluto/uv.jepg',
      normal: 'src/assets/pluto/normal.jpg',
      displacement: 'src/assets/pluto/displacement.jpg',

      material: {
        emissive: 0x4222FF,
        emissiveIntensity: 0.1
      }
    },

    entities: null
  },
  {
    name: 'Freeball',
    position: new Vector3(
      MathUtils.randFloatSpread(50),
      MathUtils.randFloatSpread(50),
      MathUtils.randFloatSpread(50)
    ),

    atmosphere: null,
    atmosphereOptions: {
      scale: new Vector3(
        MathUtils.randFloatSpread(1),
        MathUtils.randFloatSpread(1),
        MathUtils.randFloatSpread(1)
      ),
      radius: MathUtils.randFloatSpread(1.5),
      diffusion: MathUtils.randFloatSpread(1),
      color: new Vector3(
        MathUtils.randFloatSpread(1),
        MathUtils.randFloatSpread(1),
        MathUtils.randFloatSpread(1)
      ),
      opacity: MathUtils.randFloatSpread(1)
    },

    planet: null,
    planetOptions: {
      size: MathUtils.randFloatSpread(5),
      uv: 'src/assets/uranus/uv.jpg',
      normal: 'src/assets/uranus/normal.jpg',
      displacement: 'src/assets/uranus/displacement.jpg',

      material: {
        emissive: 0x4222FF,
        emissiveIntensity: MathUtils.randFloatSpread(0.5)
      }
    },

    entities: null
  },
] as IEcosystem[]