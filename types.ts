import type { Dancer } from '@prisma/client'

// export type DancerNameId = Pick<Dancer, 'firstName' | 'id'>

export type ParentNavData = {
  dancers: Pick<Dancer, 'firstName' | 'id'>[]
}
