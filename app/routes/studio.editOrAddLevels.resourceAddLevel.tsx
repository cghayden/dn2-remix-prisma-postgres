import { type ActionFunctionArgs } from '@remix-run/node' // or cloudflare/deno
import type { Errors } from 'types'
import { prisma } from '~/db.server'
import { requireUserId } from '~/session.server'

export const action = async ({ request }: ActionFunctionArgs) => {
  const userId = await requireUserId(request)
  const formData = await request.formData()
  const levelType = formData.get('levelType')
  const newLevel = formData.get('newLevel')
  const description = formData.get('description')

  const errors: Errors = {
    newLevel: null,
    description: null,
  }

  if (typeof newLevel !== 'string' || newLevel.length === 0) {
    return {
      errors: { ...errors, newLevel: 'a ageLevel is required' },
      status: 400,
    }
  }

  if (typeof description !== 'string') {
    return {
      errors: { ...errors, description: 'description must be a string' },
      status: 400,
    }
  }

  if (levelType === 'ageLevel') {
    const prismaReturn = await prisma.ageLevel.create({
      data: {
        name: newLevel,
        description,
        studio: {
          connect: {
            userId,
          },
        },
      },
    })
    return { success: true, errors: null, status: 200, prismaReturn }
  }

  if (levelType === 'skillLevel') {
    const prismaReturn = await prisma.skillLevel.create({
      data: {
        name: newLevel,
        description,
        studio: {
          connect: {
            userId,
          },
        },
      },
    })
    return { success: true, errors: null, status: 200, prismaReturn }
  }
  return { success: false, errors: null, status: 200, prismaReturn: null }
}
