import { type ActionFunctionArgs } from '@remix-run/node'
import { updateDanceLevel } from '~/models/studio.server'

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const levelId = formData.get('levelId')
  const newLevelName = formData.get('newLevelName')
  console.log('newLevelName', newLevelName)
  console.log('levelId', levelId)

  const errors = {
    newLevel: null,
    description: null,
  }

  if (typeof levelId !== 'string') {
    return {
      errors: { ...errors, newLevel: 'level id was not provided' },
      status: 400,
    }
  }

  if (typeof newLevelName !== 'string' || newLevelName.length === 0) {
    return {
      errors: { ...errors, description: 'new name must be a string' },
      status: 400,
    }
  }

  await updateDanceLevel(levelId, newLevelName).catch((err) => {
    throw new Error(err.message)
  })

  return { success: true, errors: null, status: 200 }
}
