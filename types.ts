import type { AgeLevel, Dancer, SkillLevel } from '@prisma/client'

// export type DancerNameId = Pick<Dancer, 'firstName' | 'id'>

export type ParentNavData = {
  dancers: Pick<Dancer, 'firstName' | 'id'>[]
}

export type Errors = {
  [key: string]: string | null
}

export type ActionResponse = {
  errors: Errors | null
  success?: boolean | null
  status: number
  prismaReturn: SkillLevel | AgeLevel
}

export type NavLink = {
  label: string
  url: string
}

export type DeleteItem = {
  itemId: string
  itemType: 'tights' | 'footwear'
}
