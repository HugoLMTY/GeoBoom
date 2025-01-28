import { Vector3 } from "three"

export interface IEcosystem {
  name: string
  position: Vector3

  atmosphere: any
  atmosphereOptions?: {
    scale: Vector3,

    radius: number,
    diffusion: number,

    color: Vector3,
    opacity: number
  }

  planet: any
  planetOptions: {
    size?: number

    uv?: string
    normal?: string
    displacement?: string
  }

  entities: any
}