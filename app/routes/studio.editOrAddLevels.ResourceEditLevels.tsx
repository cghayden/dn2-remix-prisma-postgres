import { json, type ActionFunctionArgs } from '@remix-run/node'
import { updateAgeLevel } from '~/models/studio.server'

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const ageLevelId = formData.get('ageLevelId')
  const newLevelName = formData.get('newLevelName')

  const errors = {
    newLevel: null,
    description: null,
  }

  if (typeof ageLevelId !== 'string') {
    return {
      errors: { ...errors, newLevel: 'ageLevel id was not provided' },
      status: 400,
    }
  }

  if (typeof newLevelName !== 'string' || newLevelName.length === 0) {
    return {
      errors: { ...errors, description: 'new name must be a string' },
      status: 400,
    }
  }

  await updateAgeLevel(ageLevelId, newLevelName).catch((err) => {
    throw new Error(err.message)
  })

  return json({ success: true })
}
