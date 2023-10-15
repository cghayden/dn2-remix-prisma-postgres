import { type ActionFunctionArgs } from '@remix-run/node' // or cloudflare/deno
import type { ActionResponse, Errors } from 'types'
import { prisma } from '~/db.server'
import { requireUserId } from '~/session.server'

export const action = async ({
  request,
}: ActionFunctionArgs): Promise<ActionResponse> => {
  const userId = await requireUserId(request)
  const formData = await request.formData()
  const newLevel = formData.get('newLevel')
  const description = formData.get('description')

  const errors: Errors = {
    newLevel: null,
    description: null,
  }

  if (typeof newLevel !== 'string' || newLevel.length === 0) {
    return {
      errors: { ...errors, newLevel: 'a level is required' },
      status: 400,
    }
  }

  if (typeof description !== 'string') {
    return {
      errors: { ...errors, description: 'description must be a string' },
      status: 400,
    }
  }

  await prisma.danceLevel.create({
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

  return { success: true, errors: null, status: 200 }
}
